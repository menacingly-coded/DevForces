import React from 'react';

const Contests: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Contests</h1>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors">
          Create Contest
        </button>
      </div>

      {/* Upcoming Contests */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Contests</h2>
        <div className="text-gray-500 text-center py-8">
          No upcoming contests scheduled
        </div>
      </div>

      {/* Past Contests */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Past Contests</h2>
        <div className="text-gray-500 text-center py-8">
          No past contests available
        </div>
      </div>
    </div>
  );
};

export default Contests;