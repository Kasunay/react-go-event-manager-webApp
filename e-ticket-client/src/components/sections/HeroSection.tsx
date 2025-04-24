// src/components/sections/HeroSection.tsx
import React, { useState } from 'react';

const HeroSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <section className="relative bg-gray-900 text-white py-20">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: `url('https://via.placeholder.com/1920x600')`,
          opacity: 0.4
        }}
      />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Amazing Events Near You</h1>
        <p className="text-xl max-w-2xl mx-auto mb-8">
          Find and book tickets for concerts, festivals, sports events, theater shows, and more!
        </p>
        
        <div className="bg-white/90 rounded-full p-2 max-w-3xl mx-auto flex flex-col md:flex-row">
          <input
            type="text"
            placeholder="Search events, artists, venues..."
            className="flex-1 px-4 py-2 rounded-full bg-transparent focus:outline-none text-gray-900"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-red-500 text-white px-6 py-2 rounded-full font-medium hover:bg-red-600 transition-colors mt-2 md:mt-0">
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;