import React, { useContext, useEffect, useState } from 'react';
import { EventContext } from "../../Context/EventContext";
import EventsCard from '../EventsCard.jsx';

export default function EventsYouMightLike() {
  const { allEvents, loading } = useContext(EventContext);
  const [randomEvents, setRandomEvents] = useState([]);

  useEffect(() => {
    if (allEvents && allEvents.length > 0) {
      const shuffled = [...allEvents].sort(() => Math.random() - 0.5);
      setRandomEvents(shuffled.slice(0, 3));
    }
  }, [allEvents]);

  return (
    <div className="flex items-center py-5 px-8 lg:px-20">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold py-3">Other Events You Might Like</p>
          <button disabled className="text-lg text-gray-400 cursor-not-allowed">
            See All
          </button>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-5">
          {randomEvents.map((event) => (
            <EventsCard key={event.id || event._id} {...event} />
          ))}
        </div>
      </div>
    </div>
  );
}