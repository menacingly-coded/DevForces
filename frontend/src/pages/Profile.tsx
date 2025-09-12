import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold">Please login to view profile</h2>
          <p className="text-gray-600">You need to be logged in to access your profile.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;