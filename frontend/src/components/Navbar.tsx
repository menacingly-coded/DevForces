import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2563eb', textDecoration: 'none' }}>
            DevForces
          </Link>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link to="/problems" style={{ color: '#374151', textDecoration: 'none' }}>
              Problems
            </Link>
            <Link to="/contests" style={{ color: '#374151', textDecoration: 'none' }}>
              Contests
            </Link>
            <Link to="/leaderboard" style={{ color: '#374151', textDecoration: 'none' }}>
              Leaderboard
            </Link>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link to="/login" style={{ color: '#374151', textDecoration: 'none' }}>
                Login
              </Link>
              <Link to="/register" className="btn-primary" style={{ textDecoration: 'none' }}>
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;