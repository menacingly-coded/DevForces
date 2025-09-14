import React from 'react';

const Admin: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Users</h3>
          <p className="text-3xl font-bold text-primary-600">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Problems</h3>
          <p className="text-3xl font-bold text-primary-600">1</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Contests</h3>
          <p className="text-3xl font-bold text-primary-600">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Submissions</h3>
          <p className="text-3xl font-bold text-primary-600">0</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Admin Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <h3 className="font-semibold">Manage Users</h3>
            <p className="text-sm text-gray-600">View and edit user accounts</p>
          </button>
          
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <h3 className="font-semibold">Manage Problems</h3>
            <p className="text-sm text-gray-600">Create and edit problems</p>
          </button>
          
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <h3 className="font-semibold">Manage Contests</h3>
            <p className="text-sm text-gray-600">Create and schedule contests</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;