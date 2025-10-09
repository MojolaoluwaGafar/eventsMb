// import React, { useState, useEffect, useContext } from "react";
// import AppLayout from "../Layouts/AppLayout";
// import { EventContext } from "../Context/EventContext";
// import EventsCard from "../Components/EventsCard";
// import Loader from "../Components/Loader";
// import Pagination from "../Components/UsersEventPage Components/userEventsPagination";

// export default function YourEventsPage() {
//   const {
//     fetchUsersEvents,
//     userEvents,
//     loadingUserEvents,
//     error,
//     user,
//     token,
//   } = useContext(EventContext);

//   const [activeBtn, setActiveBtn] = useState(1);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [paginatedEvents, setPaginatedEvents] = useState([]);

//   const EVENTS_PER_PAGE = 9;

//   const btns = [
//     { id: 1, content: "Hosting", type: "hosting" },
//     { id: 2, content: "Attending", type: "attending" },
//     { id: 3, content: "Previous", type: "previous" },
//     { id: 4, content: "Tickets", type: "tickets" },
//   ];

//   const activeType = btns.find((b) => b.id === activeBtn).type;

//   useEffect(() => {
//     if (user && token) {
//       const userId = user?._id || user?.id;
//       fetchUsersEvents(activeType, userId);
//     }
//   }, [activeType, user, token]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [activeBtn, activeType]);

//   useEffect(() => {
//     const eventsArray = userEvents[activeType] || [];
//     const total = Math.ceil(eventsArray.length / EVENTS_PER_PAGE) || 1;
//     setTotalPages(total);

//     const startIdx = (currentPage - 1) * EVENTS_PER_PAGE;
//     const endIdx = startIdx + EVENTS_PER_PAGE;
//     setPaginatedEvents(eventsArray.slice(startIdx, endIdx));
//   }, [userEvents, activeType, currentPage]);

//   const handlePrev = () => {
//     if (currentPage > 1) setCurrentPage((prev) => prev - 1);
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
//   };

//   const renderContent = () => {
//     if (loadingUserEvents) return <Loader height="150px" />;
//     if (!loadingUserEvents && !userEvents[activeType]?.length && !error)
//       return <Loader height="150px" />;
//     if (!userEvents[activeType]?.length) {
//       return <><p className="text-center mx-auto text-lg">no events</p></>
//     }
//     if(error){
//       console.log(error)
//     }

//     switch (activeType) {
//       case "hosting":
//       case "attending":
//       case "previous":
//         return paginatedEvents.length ? (
//           <>
//             <EventGrid events={paginatedEvents} />
//             <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPrevious={handlePrev}
//               onNext={handleNext}
//             />
//           </>
//         ) : (
//           <NoEventMsg
//             text={
//               activeType === "hosting"
//                 ? "You’re not hosting any events yet."
//                 : activeType === "attending"
//                 ? "You’re not attending any events yet."
//                 : "You haven’t attended or hosted any past events yet."
//             }
//           />
//         );

//       case "tickets":
//         return (
//           <div className="flex flex-col gap-6">
//             <div>
//               <h2 className="text-lg font-semibold mb-3">Purchased Tickets</h2>
//               {userEvents.purchasedTickets?.length ? (
//                 <TicketList tickets={userEvents.purchasedTickets} />
//               ) : (
//                 <NoEventMsg text="No purchased tickets found." />
//               )}
//             </div>
//             <div>
//               <h2 className="text-lg font-semibold mb-3">Sold Tickets</h2>
//               {userEvents.soldTickets?.length ? (
//                 <TicketList tickets={userEvents.soldTickets} isSold />
//               ) : (
//                 <NoEventMsg text="No sold tickets found." />
//               )}
//             </div>
//           </div>
//         );

//       default:
//         return <NoEventMsg text="No events found" />;
//     }
//   };

//   return (
//     <AppLayout>
//       <div className="flex-row items-center py-5 px-8 lg:px-20">
//         <div className="container mx-auto">
//           <h1 className="text-start text-2xl font-bold pb-5">Your Events</h1>

//           <div className="flex flex-wrap md:flex:nowrap w-full lg:gap-2 justify-between rounded-md my-3 mx-auto">
//             {btns.map((btn) => {
//               const isActive = btn.id === activeBtn;
//               const btnClass = isActive
//                 ? "h-[50px] lg:h-[60px] w-[95px] md:w-[150px] lg:w-[270px] bg-black text-white lg:text-lg font-semibold px-4 py-2 rounded-md flex items-center justify-center"
//                 : "h-[50px] lg:h-[60px] w-[95px] md:w-[150px] lg:w-[270px] text-black lg:text-lg font-semibold border-2 border-black px-4 py-2 rounded-md flex items-center justify-center";
//               return (
//                 <button
//                   onClick={() => setActiveBtn(btn.id)}
//                   className={btnClass}
//                   key={btn.id}
//                 >
//                   {btn.content}
//                 </button>
//               );
//             })}
//           </div>

//           <div className="mt-6">{renderContent()}</div>
//         </div>
//       </div>
//     </AppLayout>
//   );
// }

// function EventGrid({ events }) {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//       {events.map((event) => (
//         <EventsCard key={event._id} {...event} />
//       ))}
//     </div>
//   );
// }

// function TicketList({ tickets, isSold }) {
//   return (
//     <div className="space-y-3">
//       {tickets.map((ticket) => (
//         <div
//           key={ticket._id}
//           className="border border-gray-300 p-4 rounded-md shadow-sm flex justify-between items-center"
//         >
//           <div>
//             <p className="font-semibold">{ticket.event?.title}</p>
//             <p className="text-sm text-gray-500">
//               {new Date(ticket.event?.date).toLocaleDateString()}
//             </p>
//             {isSold ? (
//               <p className="text-xs text-gray-700">
//                 Buyer: {ticket.user?.fullName} ({ticket.user?.email})
//               </p>
//             ) : null}
//           </div>
//           <div className="font-semibold text-black">₦{ticket.amount}</div>
//         </div>
//       ))}
//     </div>
//   );
// }

// function NoEventMsg({ text }) {
//   return <p className="text-gray-500 text-center">{text}</p>;
// }
import React, { useState, useEffect, useContext } from "react";
import AppLayout from "../Layouts/AppLayout";
import { EventContext } from "../Context/EventContext";
import EventsCard from "../Components/EventsCard";
import Loader from "../Components/Loader";
import Pagination from "../Components/UsersEventPage Components/userEventsPagination";

export default function YourEventsPage() {
  const {
    fetchUsersEvents,
    userEvents,
    loadingUserEvents,
    error,
    user,
    token,
  } = useContext(EventContext);

  const [activeBtn, setActiveBtn] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const EVENTS_PER_PAGE = 9;

  const btns = [
    { id: 1, content: "Hosting", type: "hosting" },
    { id: 2, content: "Attending", type: "attending" },
    { id: 3, content: "Previous", type: "previous" },
    { id: 4, content: "Tickets", type: "tickets" },
  ];

  const activeType = btns.find((b) => b.id === activeBtn).type;

  // Fetch events when active type changes or user/token changes
  useEffect(() => {
    if (user && token) {
      const userId = user?._id || user?.id;
      fetchUsersEvents(activeType, userId);
    }
  }, [activeType, user, token]);

  // Reset to first page when active type changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeBtn, activeType]);

  // Pagination calculation
  const eventsArray = userEvents[activeType] || [];
  const totalPages = Math.ceil(eventsArray.length / EVENTS_PER_PAGE) || 1;
  const startIdx = (currentPage - 1) * EVENTS_PER_PAGE;
  const endIdx = startIdx + EVENTS_PER_PAGE;
  const paginatedEvents = eventsArray.slice(startIdx, endIdx);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const renderContent = () => {
    if (loadingUserEvents) return <Loader height="150px" />;

    if (!loadingUserEvents && !userEvents[activeType]?.length && !error) {
      return <Loader height="150px" />;
    }

    if (!userEvents[activeType]?.length) {
      return (
        <p className="text-center mx-auto text-lg">
          Oops! No events found
        </p>
      );
    }

    if (error) {
      console.error(error);
    }

    switch (activeType) {
      case "hosting":
      case "attending":
      case "previous":
        return paginatedEvents.length ? (
          <>
            <EventGrid events={paginatedEvents} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPrevious={handlePrev}
              onNext={handleNext}
            />
          </>
        ) : (
          <NoEventMsg
            text={
              activeType === "hosting"
                ? "You’re not hosting any events yet."
                : activeType === "attending"
                ? "You’re not attending any events yet."
                : "You haven’t attended or hosted any past events yet."
            }
          />
        );

      case "tickets":
        return (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-3">
                Purchased Tickets
              </h2>
              {userEvents.purchasedTickets?.length ? (
                <TicketList tickets={userEvents.purchasedTickets} />
              ) : (
                <NoEventMsg text="No purchased tickets found." />
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-3">
                Sold Tickets
              </h2>
              {userEvents.soldTickets?.length ? (
                <TicketList tickets={userEvents.soldTickets} isSold />
              ) : (
                <NoEventMsg text="No sold tickets found." />
              )}
            </div>
          </div>
        );

      default:
        return <NoEventMsg text="No events found" />;
    }
  };

  return (
    <AppLayout>
      <div className="flex-row items-center py-5 px-8 lg:px-20">
        <div className="container mx-auto">
          <h1 className="text-start text-2xl font-bold pb-5">Your Events</h1>

          {/* Filter Buttons */}
<div className="flex flex-wrap gap-2 overflow-x-auto">
  {btns.map((btn) => {
    const isActive = btn.id === activeBtn;
    const btnClass = isActive
      ? "h-12 w-17 sm:h-14 md:h-16 lg:w-[270px] px-3 sm:px-4 md:px-6 text-sm sm:text-base md:text-lg font-semibold bg-black text-white rounded-md flex items-center justify-center flex-shrink-0"
      : "h-12 w-19 sm:h-14 md:h-16 lg:w-[270px] px-3 sm:px-4 md:px-6 text-sm sm:text-base md:text-lg font-semibold border-2 border-black text-black rounded-md flex items-center justify-center flex-shrink-0";

    return (
      <button
        onClick={() => setActiveBtn(btn.id)}
        className={btnClass}
        key={btn.id}
      >
        {btn.content}
      </button>
    );
  })}
</div>


          <div className="mt-6">{renderContent()}</div>
        </div>
      </div>
    </AppLayout>
  );
}

// Event grid display
function EventGrid({ events }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventsCard key={event._id} {...event} />
      ))}
    </div>
  );
}

// Ticket list display
function TicketList({ tickets, isSold }) {
  return (
    <div className="space-y-3">
      {tickets.map((ticket) => (
        <div
          key={ticket._id}
          className="border border-gray-300 p-4 rounded-md shadow-sm flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{ticket.event?.title}</p>
            <p className="text-sm text-gray-500">
              {new Date(ticket.event?.date).toLocaleDateString()}
            </p>
            {isSold && (
              <p className="text-xs text-gray-700">
                Buyer: {ticket.user?.fullName} ({ticket.user?.email})
              </p>
            )}
          </div>
          <div className="font-semibold text-black">₦{ticket.amount}</div>
        </div>
      ))}
    </div>
  );
}

// No event message
function NoEventMsg({ text }) {
  return <p className="text-gray-500 text-center">{text}</p>;
}
