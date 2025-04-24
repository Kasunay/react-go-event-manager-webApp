// src/components/ui/CategoryCard.tsx
import React from 'react';
import { Category } from '../../types';

type CategoryCardProps = Omit<Category, 'id'>;

const CategoryCard: React.FC<CategoryCardProps> = ({ icon, name }) => {
  return (
    <div className="bg-white rounded-lg p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-gray-700 hover:text-white">
      <div className="text-4xl mb-4 text-red-500 group-hover:text-red-300">{icon}</div>
      <h3 className="font-bold">{name}</h3>
    </div>
  );
};

export default CategoryCard;