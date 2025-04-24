import React from 'react';

import { Event } from '../../types/event';


type EventCardProps = Omit<Event, 'id'>;

const EventCard: React.FC<EventCardProps> = ({ title, location, time, date, imageUrl }) => {
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-1">
      <div className="relative h-48">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3 bg-red-500 text-white font-bold px-3 py-1 rounded">
          {date}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <div className="flex justify-between text-gray-600 mb-4 text-sm">
          <span>{location}</span>
          <span>{time}</span>
        </div>
        <a 
          href="#" 
          className="block text-center bg-gray-700 text-white py-2 px-4 rounded font-medium hover:bg-gray-400 transition-colors"
        >
          Buy Tickets
        </a>
      </div>
    </div>
  );
};

export default EventCard;