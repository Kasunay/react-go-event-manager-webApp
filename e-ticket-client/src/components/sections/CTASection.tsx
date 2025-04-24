// src/components/sections/CTASection.tsx
import React from 'react';

const CTASection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-800 text-white text-center">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold mb-4">Don't Miss Any Event!</h2>
        <p className="text-lg mb-8">
          Sign up for our newsletter and be the first to know about upcoming events, exclusive offers, and special discounts.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <a href="#" className="px-8 py-3 bg-red-500 rounded-full font-bold uppercase tracking-wide hover:bg-red-600 transition-colors">
            Sign Up Now
          </a>
          <a href="#" className="px-8 py-3 border-2 border-white rounded-full font-bold uppercase tracking-wide hover:bg-white hover:text-indigo-900 transition-colors">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;