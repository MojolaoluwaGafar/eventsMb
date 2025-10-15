import React, { useEffect, useContext, useRef, useState } from "react";
import { EventContext } from "../../Context/EventContext";
import { AuthContext } from "../../Context/AuthContext";
import Loader from "../../Components/Loader";
import EventsCard from "../../Components/EventsCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router";

export default function UpcomingEvents() {
  const { fetchUpcomingEvents, upcomingEvents, loadingUpcoming, error } =
    useContext(EventContext);
  const { user, loadingUser } = useContext(AuthContext);

  const scrollRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch upcoming events when user logs in
  useEffect(() => {
    if (user) {
      fetchUpcomingEvents();
    }
  }, [user]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  // Loading state
  if (loadingUser || loadingUpcoming) {
    return (
      <div className="flex justify-center py-10">
        <Loader height="200px" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center py-5 px-8 lg:px-20">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-5">
            <p className="text-[25px] lg:text-[30px] font-semibold">
              Upcoming Events
            </p>
            <button disabled className="text-lg text-gray-400 cursor-not-allowed">
              See All
            </button>
          </div>
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-red-500 text-[18px] lg:text-[25px] text-center py-5">
              {error || "Failed to load upcoming events."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="flex items-center py-5 px-8 lg:px-20">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-5">
            <p className="text-[25px] lg:text-[30px] font-semibold">Upcoming Events</p>
            <button disabled className="text-lg text-gray-400 cursor-not-allowed">
              See All
            </button>
          </div>
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-gray-500 text-[18px] lg:text-[25px] text-center">
              Oops! No events. Please{" "}
              <Link to="/auth/signIn">
                <span className="font-semibold text-purple-800">log in</span>
              </Link>{" "}
              to see upcoming events.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // No events
  if (upcomingEvents.length === 0) {
    return (
      <div className="flex items-center py-5 px-8 lg:px-20">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-5">
            <p className="text-[25px] lg:text-[30px] font-semibold">Upcoming Events</p>
            <button disabled className="text-lg text-gray-400 cursor-not-allowed">
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

  // ✅ MAIN CONTENT (scroll-enabled for mobile)
  return (
    <div className="py-5 px-4 lg:px-20">
      <div className="container mx-auto relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <p className="text-[25px] lg:text-[30px] font-semibold">
            Upcoming Events
          </p>
          <button disabled className="text-lg text-gray-400 cursor-not-allowed">
            See All
          </button>
        </div>

        {/* Cards with scroll and arrows */}
        <div className="relative">
          {/* Scrollable area */}
          <div
            ref={scrollRef}
            className={`
              ${isMobile
                ? "flex overflow-x-auto scroll-smooth gap-5 pb-4 snap-x snap-mandatory"
                : "grid md:grid-cols-3 gap-6"}
            `}
          >
            {upcomingEvents.slice(0, 15).map((event) => (
              <div
                key={event._id}
                className={`${
                  isMobile
                    ? "snap-start flex-shrink-0 w-[85%] sm:w-[70%]"
                    : ""
                }`}
              >
                <EventsCard {...event} />
              </div>
            ))}
          </div>

          {/* Scroll buttons — only visible on mobile */}
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
