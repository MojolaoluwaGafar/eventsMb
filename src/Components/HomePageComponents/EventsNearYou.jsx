import React, { useEffect, useState, useContext } from "react";
import EventsCard from "../EventsCard.jsx";
import { EventContext } from "../../Context/EventContext";

export default function EventsNearYou() {
  const { fetchNearbyEvents, nearbyEvents } = useContext(EventContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetchNearbyEvents(latitude, longitude, 25);
        },
        () => setError("Permission denied. Cannot fetch nearby events.")
      );
    } else {
      setError("Geolocation not supported");
    }
  }, [fetchNearbyEvents]);

  return (
    <div className="flex items-center py-5 px-5 lg:px-20">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <p className="text-[30px] font-semibold">Events Near You</p>
          <button className="text-lg text-blue-500">See All</button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex flex-col lg:flex-row justify-between items-center lg:gap-5">
          {nearbyEvents?.length > 0 ? (
            nearbyEvents.slice(0, 3).map((event) => (
              <EventsCard key={event._id} {...event} />
            ))
          ) : (
            <p className="text-gray-400">No events nearby</p>
          )}
        </div>
      </div>
    </div>
  );
}

