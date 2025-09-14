-- Create database schema for DevForces

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    rating INTEGER DEFAULT 1500,
    max_rating INTEGER DEFAULT 1500,
    solved_problems INTEGER DEFAULT 0,
    role VARCHAR(20) DEFAULT 'user', -- user, admin
    avatar_url TEXT,
    country VARCHAR(2),
    organization VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contests table
CREATE TABLE contests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_time TIMESTAMP NOT NULL,
    duration INTEGER NOT NULL, -- in minutes
    max_participants INTEGER,
    is_public BOOLEAN DEFAULT true,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Problems table
CREATE TABLE problems (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    input_format TEXT,
    output_format TEXT,
    constraints TEXT,
    time_limit INTEGER DEFAULT 2000, -- in milliseconds
    memory_limit INTEGER DEFAULT 256, -- in MB
    difficulty VARCHAR(20) DEFAULT 'medium', -- easy, medium, hard
    tags TEXT[], -- array of tags
    author_id UUID REFERENCES users(id),
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Test cases for problems
CREATE TABLE test_cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    problem_id UUID REFERENCES problems(id) ON DELETE CASCADE,
    input TEXT NOT NULL,
    expected_output TEXT NOT NULL,
    is_sample BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contest problems (many-to-many)
CREATE TABLE contest_problems (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contest_id UUID REFERENCES contests(id) ON DELETE CASCADE,
    problem_id UUID REFERENCES problems(id) ON DELETE CASCADE,
    points INTEGER DEFAULT 100,
    problem_order INTEGER,
    UNIQUE(contest_id, problem_id)
);

-- User submissions
CREATE TABLE submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    problem_id UUID REFERENCES problems(id),
    contest_id UUID REFERENCES contests(id),
    language VARCHAR(20) NOT NULL,
    source_code TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- pending, running, accepted, wrong_answer, time_limit_exceeded, memory_limit_exceeded, runtime_error, compilation_error
    execution_time INTEGER, -- in milliseconds
    memory_used INTEGER, -- in KB
    score INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contest participants
CREATE TABLE contest_participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contest_id UUID REFERENCES contests(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    score INTEGER DEFAULT 0,
    penalty INTEGER DEFAULT 0, -- in minutes
    rank INTEGER,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(contest_id, user_id)
);

-- Blog posts
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_id UUID REFERENCES users(id),
    tags TEXT[],
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blog comments
CREATE TABLE blog_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
    author_id UUID REFERENCES users(id),
    content TEXT NOT NULL,
    parent_id UUID REFERENCES blog_comments(id), -- for threaded comments
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_rating ON users(rating);
CREATE INDEX idx_contests_start_time ON contests(start_time);
CREATE INDEX idx_problems_difficulty ON problems(difficulty);
CREATE INDEX idx_problems_tags ON problems USING GIN(tags);
CREATE INDEX idx_submissions_user_id ON submissions(user_id);
CREATE INDEX idx_submissions_problem_id ON submissions(problem_id);
CREATE INDEX idx_submissions_contest_id ON submissions(contest_id);
CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_contest_participants_contest_id ON contest_participants(contest_id);
CREATE INDEX idx_contest_participants_user_id ON contest_participants(user_id);
CREATE INDEX idx_blog_posts_author_id ON blog_posts(author_id);
CREATE INDEX idx_blog_comments_post_id ON blog_comments(post_id);

-- Sample data
INSERT INTO users (username, email, password_hash, full_name, role) VALUES 
('admin', 'admin@devforces.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lewxh1Q7w4YKP.T8O', 'Administrator', 'admin'),
('testuser', 'test@devforces.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lewxh1Q7w4YKP.T8O', 'Test User', 'user');

-- Sample problem
INSERT INTO problems (title, description, input_format, output_format, constraints, difficulty, author_id) 
SELECT 
    'A+B Problem',
    'Given two integers A and B, find their sum.',
    'Two integers A and B (-10^9 ≤ A, B ≤ 10^9)',
    'Output A + B',
    'Time limit: 1 second, Memory limit: 256 MB',
    'easy',
    id
FROM users WHERE username = 'admin' LIMIT 1;