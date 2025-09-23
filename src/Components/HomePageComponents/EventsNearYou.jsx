import React from 'react';
import { events } from '../../data.js';
import EventsCard from '../EventsCard.jsx';

export default function EventsNearYou() {
  const getRandomEvents = (arr, count) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomEvents = getRandomEvents(events, 3);

  return (
    <div className="flex items-center py-5 px-5 lg:px-20">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold py-3">Events Near You</p>
          <button disabled className="text-lg text-gray-400 cursor-not-allowed">
            See All
          </button>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center lg:gap-5">
          {randomEvents.map((event) => (
            <EventsCard key={event.id} {...event} />
          ))}
        </div>
      </div>
    </div>
  );
}