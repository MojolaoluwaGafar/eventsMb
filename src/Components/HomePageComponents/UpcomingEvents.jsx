import React, { useEffect, useContext } from "react";
import { EventContext } from "../../Context/EventContext";
import Loader from "../../Components/Loader";
import EventsCard from "../../Components/EventsCard";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router"
export default function UpcomingEvents() {
  const { fetchUpcomingEvents, upcomingEvents, loadingUpcoming, error } =
    useContext(EventContext);
  const { user, loadingUser } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchUpcomingEvents();
    }
  }, [user]);

  if (loadingUser || loadingUpcoming) {
    return (
      <div className="flex justify-center py-10">
        <Loader height="200px" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 text-[18px] lg:text-[25px] text-center py-5">
        {error || "Failed to load upcoming events."}
      </p>
    );
  }
  if (!user) {
    return (
       <div className="flex items-center py-5 px-8 lg:px-20">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-5">
          <p className="text-[25px] lg:text-[30px] font-semibold">Upcoming Events</p>
          <button
            disabled
            className="text-lg text-gray-400 cursor-not-allowed"
          >
            See All
          </button>
        </div>
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-gray-500 text-[18px] lg:text-[25px]">
          Oops! No events. Please <Link to="/auth/signIn"><span className="font-semibold text-purple-800">log in </span></Link>to see upcoming events.
        </p>
      </div>
      </div>
      </div>
    );
  }
  if (upcomingEvents.length === 0) {
    return (
       <div className="flex items-center py-5 px-8 lg:px-20">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-5">
          <p className="text-[25px] lg:text-[30px] font-semibold">Upcoming Events</p>
          <button
            disabled
            className="text-lg text-gray-400 cursor-not-allowed"
          >
            See All
          </button>
        </div>
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-gray-500 text-[18px] lg:text-[25px]">
          No upcoming events at the moment.
        </p>
      </div>
      </div>
      </div>
    );
  }

  return (
    <div className="flex items-center py-5 px-8 lg:px-20">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-5">
          <p className="text-[25px] lg:text-[30px] font-semibold">Upcoming Events</p>
          <button
            disabled
            className="text-lg text-gray-400 cursor-not-allowed"
          >
            See All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {upcomingEvents.slice(0, 3).map((event) => (
            <EventsCard key={event._id} {...event} />
          ))}
        </div>
      </div>
    </div>
  );
}
