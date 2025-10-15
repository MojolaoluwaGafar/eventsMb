// import React, { useContext, useEffect, useState } from 'react';
// import { EventContext } from "../../Context/EventContext";
// import EventsCard from '../EventsCard.jsx';

// export default function EventsYouMightLike() {
//   const { allEvents, loading } = useContext(EventContext);
//   const [randomEvents, setRandomEvents] = useState([]);

//   useEffect(() => {
//     if (allEvents && allEvents.length > 0) {
//       const shuffled = [...allEvents].sort(() => Math.random() - 0.5);
//       setRandomEvents(shuffled.slice(0, 3));
//     }
//   }, [allEvents]);

//   return (
//     <div className="flex items-center py-5 px-8 lg:px-20">
//       <div className="container mx-auto">
//         <div className="flex justify-between items-center">
//           <p className="text-lg font-semibold py-3">Other Events You Might Like</p>
//           <button disabled className="text-lg text-gray-400 cursor-not-allowed">
//             See All
//           </button>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {randomEvents.map((event) => (
//             <EventsCard key={event.id || event._id} {...event} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useContext, useEffect, useState, useRef } from "react";
import { EventContext } from "../../Context/EventContext";
import EventsCard from "../EventsCard.jsx";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function EventsYouMightLike() {
  const { allEvents } = useContext(EventContext);
  const [randomEvents, setRandomEvents] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (allEvents && allEvents.length > 0) {
      const shuffled = [...allEvents].sort(() => Math.random() - 0.5);
      setRandomEvents(shuffled);
    }
  }, [allEvents]);

  const isMobile = window.innerWidth < 768;
  const displayEvents = isMobile ? randomEvents.slice(0, 15) : randomEvents.slice(0, 3);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="py-5 px-4 lg:px-20">
      <div className="container mx-auto relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <p className="text-lg lg:text-2xl font-semibold">
            Other Events You Might Like
          </p>
          <button disabled className="text-lg text-gray-400 cursor-not-allowed">
            See All
          </button>
        </div>

        {/* Card container with arrows on sides */}
        <div className="relative">
          {/* Left Arrow */}
          {isMobile && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md rounded-full p-2"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
          )}

          {/* Scrollable / Grid Layout */}
          <div
            ref={scrollRef}
            className={`
              ${isMobile
                ? "flex overflow-x-auto scroll-smooth gap-5 pb-4 snap-x snap-mandatory"
                : "grid md:grid-cols-3 gap-6"
              }
            `}
          >
            {displayEvents.map((event) => (
              <div
                key={event._id || event.id}
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

          {/* Right Arrow */}
          {isMobile && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md rounded-full p-2"
            >
              <ArrowRight className="w-5 h-5 text-gray-700" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
