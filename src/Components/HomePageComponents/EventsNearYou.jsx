import React, { useEffect, useState, useContext, useRef } from "react";
import EventsCard from "../EventsCard.jsx";
import { EventContext } from "../../Context/EventContext";
import { AuthContext } from "../../Context/AuthContext";
import Loader from "../Loader.jsx";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router";

export default function EventsNearYou() {
  const { fetchNearbyEvents, nearbyEvents, loadingNearby } =
    useContext(EventContext);
  const { user, loadingUser } = useContext(AuthContext);

  const [error, setError] = useState(null);
  const [locationFetched, setLocationFetched] = useState(false);
  const [shuffledEvents, setShuffledEvents] = useState([]);
  const fetchedRef = useRef(false);
  const scrollRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Geolocation + fetch
  useEffect(() => {
    if (!user || fetchedRef.current) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetchNearbyEvents(latitude, longitude, 25); // radius in km
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

  // Shuffle events
  useEffect(() => {
    if (nearbyEvents && nearbyEvents.length > 0) {
      const shuffled = [...nearbyEvents].sort(() => Math.random() - 0.5);
      setShuffledEvents(shuffled);
    }
  }, [nearbyEvents]);

  // Scroll behavior
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  // Loading state
  if (loadingUser || loadingNearby) {
    return (
      <div className="flex justify-center py-10">
        <Loader height="200px" />
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="flex items-center py-5 px-8 lg:px-20">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-5">
            <p className="text-[25px] lg:text-[30px] font-semibold">
              Events Near You
            </p>
            <button
              disabled
              className="text-lg text-gray-400 cursor-not-allowed"
            >
              See All
            </button>
          </div>
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-gray-500 text-[18px] lg:text-[25px] text-center">
              Oops! No events. Please{" "}
              <Link to="/auth/signIn">
                <span className="font-semibold text-purple-800">log in </span>
              </Link>
              to see events near you.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    console.log(error);
    return (
      <div className="flex items-center py-5 px-8 lg:px-20">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-5">
            <p className="text-[25px] lg:text-[30px] font-semibold">
              Events Near You
            </p>
            <button
              disabled
              className="text-lg text-gray-400 cursor-not-allowed"
            >
              See All
            </button>
          </div>
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-red-500 text-[18px] lg:text-[25px] text-center py-5">
              Failed to load Nearby events.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // No events found
  if (locationFetched && shuffledEvents.length === 0) {
    return (
      <div className="flex items-center py-5 px-8 lg:px-20">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-5">
            <p className="text-[25px] lg:text-[30px] font-semibold">
              Events Near You
            </p>
            <button disabled className="text-lg text-gray-400 cursor-not-allowed">
              See All
            </button>
          </div>
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-gray-800 text-[18px] lg:text-[25px]">
              <span className="text-purple-500 font-bold">Oops! </span>
              No events nearby right now.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Main layout with scroll + arrows (mobile) / grid (desktop)
  return (
    <div className="py-5 px-4 lg:px-20">
      <div className="container mx-auto relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <p className="text-[25px] lg:text-[30px] font-semibold">
            Events Near You
          </p>
          <button disabled className="text-lg text-gray-400 cursor-not-allowed">
            See All
          </button>
        </div>

        {/* Events container */}
        <div className="relative">
          <div
            ref={scrollRef}
            className={
              isMobile
                ? "flex overflow-x-auto scroll-smooth gap-5 pb-4 snap-x snap-mandatory"
                : "grid md:grid-cols-3 gap-6"
            }
          >
            {shuffledEvents
              .slice(0, isMobile ? 15 : 3)
              .map((event) => (
                <div
                  key={event._id}
                  className={
                    isMobile
                      ? "snap-start flex-shrink-0 w-[85%] sm:w-[70%]"
                      : ""
                  }
                >
                  <EventsCard {...event} />
                </div>
              ))}
          </div>

          {/* Scroll arrows (mobile only) */}
          {isMobile && (
            <>
              <button
                onClick={() => scroll("left")}
                className="absolute top-1/2 -translate-y-1/2 left-2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md"
              >
                <ArrowLeft className="h-5 w-5 text-gray-700" />
              </button>

              <button
                onClick={() => scroll("right")}
                className="absolute top-1/2 -translate-y-1/2 right-2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md"
              >
                <ArrowRight className="h-5 w-5 text-gray-700" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
