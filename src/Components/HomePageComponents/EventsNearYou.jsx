import React, { useEffect, useState, useContext, useRef } from "react";
import EventsCard from "../EventsCard.jsx";
import { EventContext } from "../../Context/EventContext";
import { AuthContext } from "../../Context/AuthContext";
import Loader from "../Loader.jsx";
import { Link } from "react-router"
export default function EventsNearYou() {
  const { fetchNearbyEvents, nearbyEvents, loadingNearby } =
    useContext(EventContext);
  const { user, loadingUser } = useContext(AuthContext);

  const [error, setError] = useState(null);
  const [locationFetched, setLocationFetched] = useState(false);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!user || fetchedRef.current) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetchNearbyEvents(latitude, longitude, 25);
          setLocationFetched(true);
          fetchedRef.current = true;
        },
        (err) => {
          setError("Permission denied. Cannot fetch nearby events.");
          console.error("Geolocation error:", err);
        }
      );
    } else {
      setError("Geolocation not supported by your browser.");
    }
  }, [user, fetchNearbyEvents]);

  if (loadingUser || loadingNearby) {
    return (
      <div className="flex justify-center py-10">
        <Loader height="200px" />
      </div>
    );
  }

  if (!user) {
    return (
       <div className="flex items-center py-5 px-8 lg:px-20">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-5">
          <p className="text-[25px] lg:text-[30px] font-semibold">Events Near you</p>
          <button
            disabled
            className="text-lg text-gray-400 cursor-not-allowed"
          >
            See All
          </button>
        </div>
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-gray-500 text-[18px] lg:text-[25px]">
          Oops! No events. Please <Link to="/auth/signIn"><span className="font-semibold text-purple-800">log in </span></Link>to see events near you.
        </p>
      </div>
      </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-red-500 text-[18px] lg:text-[25px]">{error}</p>
      </div>
    );
  }

  if (locationFetched && nearbyEvents?.length === 0) {
    return (
       <div className="flex items-center py-5 px-8 lg:px-20">
        <div className="container mx-auto">
        <div className="flex justify-between items-center mb-5">
          <p className="text-[25px] lg:text-[30px] font-semibold">Events Near You</p>
          <button disabled className="text-lg text-gray-400 cursor-not-allowed">
            See All
          </button>
        </div>
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-gray-800 text-[18px] lg:text-[25px]"> <span className="text-purple-500 font-bold">Oops!</span>No events nearby right now.</p>
      </div>
       </div>
       </div>
    );
  }

  return (
    <div className="flex items-center py-5 px-8 lg:px-20">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-5">
          <p className="text-[25px] lg:text-[30px] font-semibold">Events Near You</p>
          <button disabled className="text-lg text-gray-400 cursor-not-allowed">
            See All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {nearbyEvents.slice(0, 3).map((event) => (
            <EventsCard key={event._id} {...event} />
          ))}
        </div>
      </div>
    </div>
  );
}
