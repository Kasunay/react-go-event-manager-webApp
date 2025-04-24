// src/components/layout/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 relative pb-2">
              EventTix
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-red-500"></span>
            </h3>
            <p className="text-gray-300">
              Your one-stop platform for discovering and booking tickets to amazing events around you.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 relative pb-2">
              Quick Links
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-red-500"></span>
            </h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-red-500 transition-colors">Home</Link></li>
              <li><Link to="/events" className="text-gray-300 hover:text-red-500 transition-colors">Events</Link></li>
              <li><Link to="/categories" className="text-gray-300 hover:text-red-500 transition-colors">Categories</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-red-500 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-red-500 transition-colors">Contact</Link></li>
            </ul>

          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 relative pb-2">
              Help & Support
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-red-500"></span>
            </h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-gray-300 hover:text-red-500 transition-colors">FAQ</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-red-500 transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-red-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/refunds" className="text-gray-300 hover:text-red-500 transition-colors">Refund Policy</Link></li>
              <li><Link to="/support" className="text-gray-300 hover:text-red-500 transition-colors">Support Center</Link></li>
            </ul>

          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 relative pb-2">
              Contact Us
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-red-500"></span>
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: info@eventtix.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Event Street, City</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-4 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2025 EventTix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;