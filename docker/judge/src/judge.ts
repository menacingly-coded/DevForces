import express from 'express';
import fs from 'fs-extra';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

interface JudgeRequest {
  submissionId: string;
  language: string;
  sourceCode: string;
  testCases: Array<{
    input: string;
    expectedOutput: string;
  }>;
  timeLimit: number; // in milliseconds
  memoryLimit: number; // in MB
}

interface JudgeResult {
  submissionId: string;
  status: 'accepted' | 'wrong_answer' | 'time_limit_exceeded' | 'memory_limit_exceeded' | 'runtime_error' | 'compilation_error';
  executionTime: number;
  memoryUsed: number;
  testCaseResults: Array<{
    status: string;
    executionTime: number;
    memoryUsed: number;
    output?: string;
    error?: string;
  }>;
}

// Judge submission endpoint
app.post('/judge', async (req, res) => {
  try {
    const judgeRequest: JudgeRequest = req.body;
    console.log(`Judging submission ${judgeRequest.submissionId}`);

    const result = await judgeSubmission(judgeRequest);
    
    // Send result back to backend
    if (process.env.BACKEND_URL) {
      try {
        // TODO: Send result to backend API
        console.log('Result would be sent to backend:', result);
      } catch (error) {
        console.error('Failed to send result to backend:', error);
      }
    }

    res.json(result);
  } catch (error) {
    console.error('Judge error:', error);
    res.status(500).json({ 
      error: 'Internal judge error',
      submissionId: req.body.submissionId 
    });
  }
});

async function judgeSubmission(judgeRequest: JudgeRequest): Promise<JudgeResult> {
  const { submissionId, language, sourceCode, testCases, timeLimit, memoryLimit } = judgeRequest;
  
  // Create temporary directory for this submission
  const submissionDir = path.join('/tmp', `submission_${submissionId}`);
  await fs.ensureDir(submissionDir);

  try {
    // Write source code to file
    const sourceFile = await writeSourceCode(submissionDir, language, sourceCode);
    
    // Compile if needed
    const compilationResult = await compile(submissionDir, language, sourceFile);
    if (compilationResult.status === 'compilation_error') {
      return {
        submissionId,
        status: 'compilation_error',
        executionTime: 0,
        memoryUsed: 0,
        testCaseResults: [{
          status: 'compilation_error',
          executionTime: 0,
          memoryUsed: 0,
          error: compilationResult.error
        }]
      };
    }

    // Run test cases
    const testCaseResults = [];
    let maxExecutionTime = 0;
    let maxMemoryUsed = 0;
    let overallStatus = 'accepted';

    for (const testCase of testCases) {
      const result = await runTestCase(
        submissionDir,
        language,
        compilationResult.executable!,
        testCase,
        timeLimit,
        memoryLimit
      );

      testCaseResults.push(result);
      maxExecutionTime = Math.max(maxExecutionTime, result.executionTime);
      maxMemoryUsed = Math.max(maxMemoryUsed, result.memoryUsed);

      if (result.status !== 'accepted') {
        overallStatus = result.status;
        // Continue running other test cases for complete feedback
      }
    }

    return {
      submissionId,
      status: overallStatus as any,
      executionTime: maxExecutionTime,
      memoryUsed: maxMemoryUsed,
      testCaseResults
    };

  } finally {
    // Cleanup
    await fs.remove(submissionDir);
  }
}

async function writeSourceCode(dir: string, language: string, sourceCode: string): Promise<string> {
  const extensions: { [key: string]: string } = {
    'cpp': 'cpp',
    'c': 'c',
    'java': 'java',
    'python': 'py',
    'javascript': 'js'
  };

  const extension = extensions[language] || 'txt';
  const filename = `solution.${extension}`;
  const filepath = path.join(dir, filename);
  
  await fs.writeFile(filepath, sourceCode);
  return filename;
}

async function compile(dir: string, language: string, sourceFile: string) {
  const commands: { [key: string]: string } = {
    'cpp': `g++ -o solution ${sourceFile} -std=c++17 -O2`,
    'c': `gcc -o solution ${sourceFile} -std=c11 -O2`,
    'java': `javac ${sourceFile}`,
  };

  if (!commands[language]) {
    // No compilation needed (interpreted languages)
    return { status: 'success', executable: sourceFile };
  }

  try {
    const { stdout, stderr } = await execAsync(commands[language], { cwd: dir });
    
    if (language === 'java') {
      return { status: 'success', executable: 'java Solution' };
    } else {
      return { status: 'success', executable: './solution' };
    }
  } catch (error: any) {
    return { 
      status: 'compilation_error', 
      error: error.stderr || error.message 
    };
  }
}

async function runTestCase(
  dir: string,
  language: string,
  executable: string,
  testCase: { input: string; expectedOutput: string },
  timeLimit: number,
  memoryLimit: number
) {
  const inputFile = path.join(dir, 'input.txt');
  await fs.writeFile(inputFile, testCase.input);

  const commands: { [key: string]: string } = {
    'cpp': executable,
    'c': executable,
    'java': executable,
    'python': `python3 ${executable}`,
    'javascript': `node ${executable}`
  };

  const command = commands[language] || executable;
  const startTime = Date.now();

  try {
    // Use timeout and memory limits (simplified implementation)
    const { stdout, stderr } = await execAsync(
      `timeout ${Math.ceil(timeLimit / 1000)}s ${command} < input.txt`,
      { 
        cwd: dir,
        maxBuffer: 1024 * 1024 // 1MB output limit
      }
    );

    const executionTime = Date.now() - startTime;
    const output = stdout.trim();
    const expectedOutput = testCase.expectedOutput.trim();

    if (output === expectedOutput) {
      return {
        status: 'accepted',
        executionTime,
        memoryUsed: 0, // TODO: Implement memory measurement
        output
      };
    } else {
      return {
        status: 'wrong_answer',
        executionTime,
        memoryUsed: 0,
        output,
        error: `Expected: ${expectedOutput}, Got: ${output}`
      };
    }

  } catch (error: any) {
    const executionTime = Date.now() - startTime;
    
    if (error.killed && error.signal === 'SIGTERM') {
      return {
        status: 'time_limit_exceeded',
        executionTime: timeLimit,
        memoryUsed: 0,
        error: 'Time limit exceeded'
      };
    } else {
      return {
        status: 'runtime_error',
        executionTime,
        memoryUsed: 0,
        error: error.stderr || error.message
      };
    }
  }
}

app.listen(PORT, () => {
  console.log(`🏛️ Judge service running on port ${PORT}`);
});