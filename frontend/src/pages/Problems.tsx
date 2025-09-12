import React from 'react';

const Problems: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Problem Archive</h1>
        <div className="flex space-x-4">
          <select className="px-3 py-2 border border-gray-300 rounded-md">
            <option>All Difficulties</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <input
            type="text"
            placeholder="Search problems..."
            className="px-3 py-2 border border-gray-300 rounded-md w-64"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Problem
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Difficulty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acceptance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">A+B Problem</div>
                <div className="text-sm text-gray-500">Basic arithmetic operation</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Easy
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                95.2%
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Not attempted
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-center text-gray-500">
        More problems coming soon...
      </div>
    </div>
  );
};

export default Problems;