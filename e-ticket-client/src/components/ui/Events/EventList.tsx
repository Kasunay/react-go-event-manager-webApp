import { useState, useEffect } from 'react';
import EventCard from '../EventCard';
import { Event } from '../../../types/event';
import {fetchEvents} from '../../../api/events';




const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchEvents()
      .then(setEvents)
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  }, []);
  

  if (loading) return <div className="text-center py-8">Loading events...</div>;
  if (!events.length) return <div className="text-center py-8">No upcoming events</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
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
    </div>
  );
};

export default EventList;