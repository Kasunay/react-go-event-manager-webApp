import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-start md:items-center">
        <a href="#" className="text-2xl font-bold">
          Event<span className="text-red-500">Tix</span>
        </a>
        
        <nav className="mt-4 md:mt-0">
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:text-red-500 transition-colors">Home</Link></li>
            <li><Link to="/events" className="hover:text-red-500 transition-colors">Events</Link></li>
            <li><Link to="/categories" className="hover:text-red-500 transition-colors">Categories</Link></li>
            <li><Link to="/about" className="hover:text-red-500 transition-colors">About</Link></li>
            <li><Link to="/contact" className="hover:text-red-500 transition-colors">Contact</Link></li>
          </ul>
        </nav>
        
        <div className="mt-4 md:mt-0 flex">
          <Link to="/login" className="mr-2 px-4 py-2 border border-white rounded hover:bg-white/10 transition-colors">
            Log In
          </Link>
          <Link to="/signUp" className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition-colors">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;