// src/api/events.ts
import { Event } from '../types/event';

export const fetchEvents = async (): Promise<Event[]> => {
    try {
      const response = await fetch('http://localhost:8080/events');
      
      // Check for HTTP errors (fetch doesn't throw on 404/500!)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data: Event[] = await response.json();
  
      return data.map(event => ({
        ...event,
        venue: event.location,
        time: new Date(event.date).toLocaleTimeString(),
        date: new Date(event.date).toLocaleDateString(),
        imageUrl: event.imageUrl || '/default-event.jpg',
      }));
    } catch (error) {
      console.error('Failed to fetch events:', error);
      throw error; // Re-throw to let the caller handle it
    }
  };