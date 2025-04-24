// src/components/sections/CategoriesSection.tsx
import React from 'react';
import CategoryCard from '../ui/CategoryCard';
import { Category } from '../../types';

interface CategoriesSectionProps {
  categories: Category[];
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ categories }) => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 relative inline-block pb-3">
            Browse by Category
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-red-500"></span>
          </h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map(category => (
            <CategoryCard
              key={category.id}
              icon={category.icon}
              name={category.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;