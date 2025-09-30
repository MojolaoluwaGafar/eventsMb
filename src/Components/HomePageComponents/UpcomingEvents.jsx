import React, { useEffect, useContext } from "react";
import { EventContext } from "../../Context/EventContext";
import Loader from "../../Components/Loader";
import EventsCard from "../../Components/EventsCard";

export default function UpcomingEvents() {
  const { fetchUpcomingEvents, upcomingEvents, loadingUpcoming, error } = useContext(EventContext);

  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  if (loadingUpcoming) return <Loader height="200px" />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex items-center py-5 px-5 lg:px-20">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-5">
          <p className="text-[30px] font-semibold">Upcoming Events</p>
          <button disabled className="text-lg text-gray-400 cursor-not-allowed">
            See All
          </button>
        </div>

        {upcomingEvents.length === 0 ? (
          <p className="text-gray-500 text-center">No upcoming events at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.slice(0, 3).map((event) => (
              <EventsCard key={event._id} {...event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
