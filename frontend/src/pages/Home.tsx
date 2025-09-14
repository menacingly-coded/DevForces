import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to DevForces
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          A competitive programming platform where developers can solve algorithmic problems, 
          participate in contests, and improve their programming skills.
        </p>
        <div className="space-x-4">
          <Link 
            to="/register"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors inline-block"
          >
            Get Started
          </Link>
          <Link 
            to="/problems"
            className="border border-primary-600 text-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors inline-block"
          >
            Browse Problems
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-600 text-2xl">🧮</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Problem Archive</h3>
            <p className="text-gray-600">
              Solve hundreds of algorithmic problems across different difficulty levels and topics.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-600 text-2xl">🏆</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Contests</h3>
            <p className="text-gray-600">
              Participate in regular programming contests and compete with other developers.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-600 text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Auto Judge</h3>
            <p className="text-gray-600">
              Get instant feedback on your submissions with our automated judging system.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-12">Platform Statistics</h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary-600">0</div>
            <div className="text-gray-600">Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600">0</div>
            <div className="text-gray-600">Problems</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600">0</div>
            <div className="text-gray-600">Submissions</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600">0</div>
            <div className="text-gray-600">Contests</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;