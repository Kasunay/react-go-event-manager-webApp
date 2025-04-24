// src/components/sections/FeaturedEvents.tsx
import React from 'react';
import EventCard from '../ui/EventCard';
import { Event } from '../../types/event';

interface FeaturedEventsProps {
  events: Event[];
}

const FeaturedEvents: React.FC<FeaturedEventsProps> = ({ events }) => {
  // Filter or sort featured events if needed
  const featuredEvents = events // If you have a featured flag
    .slice(0, 4); // Show maximum 4 events

  return (
    <section className="py-16 bg-gray-50"> {/* Added light background */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 relative inline-block pb-3">
            Featured Events
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-red-500"></span>
          </h2>
          <p className="text-gray-600 mt-2">
            Discover our most popular upcoming events
          </p>
        </div>
        
        {featuredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"> {/* Increased gap */}
            {featuredEvents.map(event => (
              <EventCard
                key={event.id}
                title={event.title}
                location={event.location}
                time={event.time}
                date={event.date}
                imageUrl={event.imageUrl}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No featured events available</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedEvents;