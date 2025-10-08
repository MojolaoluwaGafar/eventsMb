import React, { useContext } from "react";
import EventsCard from "../EventsCard";
import Loader from "../../Components/Loader";
import { EventContext } from "../../Context/EventContext"; 
import { useParams } from "react-router"

export default function AllEvents({ events = [] }) {
  const { eventId } = useParams();
  const { allEvents, loading } = useContext(EventContext);

  if (loading) return <Loader height="200px" />;

  return (
    <div className="flex items-center py-5 px-8 lg:px-20">
      <div className="container mx-auto">
        <p className="text-[30px] font-semibold">
          {allEvents.length ? "All Events" : "No events found"}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {allEvents.map((event) => (
            <EventsCard key={event.id || event._id } {...event} />
          ))}
        </div>
      </div>
    </div>
  );
}
