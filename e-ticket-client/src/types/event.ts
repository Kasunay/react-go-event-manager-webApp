// types.ts

export type Event = {
    id: number;
    title: string;
    location: string;    // Changed from 'location'
    time: string;     // New field
    date: string;     // Format: "YYYY-MM-DD"
    imageUrl: string; // New field
    
  };