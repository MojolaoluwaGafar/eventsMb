// import React, { useState, useEffect, useContext } from "react";
// import AppLayout from "../Layouts/AppLayout";
// import { EventContext } from "../Context/EventContext";
// import EventsCard from "../Components/EventsCard"
// import Loader from "../Components/Loader"

// export default function YourEventsPage() {
//   const { fetchUsersEvents,userEvents, loading, error,user,token } = useContext(EventContext);
//   const [activeBtn, setActiveBtn] = useState(1);

//   const btns = [
//     { id: 1, content: "Hosting", type: "hosting" },
//     { id: 2, content: "Attending", type: "attending" },
//     { id: 3, content: "Previous", type: "previous" },
//     { id:4 , content: "Tickets", type: ""}
//   ];

//   const activeType = btns.find((b) => b.id === activeBtn).type;
//   const currentEvents = userEvents[activeType] || [];
//   useEffect(() => {
//   if (user && token) {
//     fetchUsersEvents(activeType);
//   }
// }, [activeType, user, token]);



//   return (
//     <AppLayout>
//       <div className="flex-row items-center py-5 px-5 lg:px-20">
//         <div className="container mx-auto">
//           <h1 className="text-start text-2xl font-bold pb-5">Your Events</h1>

//           <div className="flex noflex-wrap w-full lg:flex-nowrap gap-3 justify-between rounded-md my-3 mx-auto">
//             {btns.map((btn) => {
//               const isActive = btn.id === activeBtn;
//               const btnClass = isActive
//                 ? "h-[40px] lg:h-[60px] w-[80px] lg:w-1/4 bg-black text-white lg:text-lg font-semibold px-4 py-2 rounded-md flex items-center justify-center"
//                 : "h-[40px] lg:h-[60px] w-[80px] lg:w-1/4 text-black lg:text-lg font-semibold border-2 border-black px-4 py-2 rounded-md flex items-center justify-center";
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

//           <div className="mt-6">
//             {loading ? (
//               <Loader />
//             ) : error ? (
//               <p className="text-red-500">{error}</p>
//             ) : currentEvents.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {currentEvents.map((event) => (
//                   <EventsCard key={event._id} {...event} />
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500">No events found</p>
//             )}
//           </div>

//         </div>
//       </div>
//     </AppLayout>
//   );
// }

import React, { useState, useEffect, useContext } from "react";
import AppLayout from "../Layouts/AppLayout";
import { EventContext } from "../Context/EventContext";
import EventsCard from "../Components/EventsCard";
import Loader from "../Components/Loader";

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

  const btns = [
    { id: 1, content: "Hosting", type: "hosting" },
    { id: 2, content: "Attending", type: "attending" },
    { id: 3, content: "Previous", type: "previous" },
    { id: 4, content: "Tickets", type: "tickets" },
  ];

  const activeType = btns.find((b) => b.id === activeBtn).type;
  useEffect(() => {
  if (user && token) {
    console.log("Fetching events for:", activeType, user._id);
    const userId = user?._id || user?.id;
console.log(`Fetching events for: ${activeType}`, userId);
fetchUsersEvents(activeType, userId);
  } else {
    console.log("User or token missing:", { user, token });
  }
}, [activeType, user, token]);



  const renderContent = () => {
    if (loadingUserEvents) return <Loader />;
if (!loadingUserEvents && !userEvents[activeType]?.length && !error)
  return <NoEventMsg text="Loading your events..." />;

    switch (activeType) {
      case "hosting":
        return userEvents.hosting?.length ? (
          <EventGrid events={userEvents.hosting} />
        ) : (
          <NoEventMsg text="You’re not hosting any events yet." />
        );

      case "attending":
        return userEvents.attending?.length ? (
          <EventGrid events={userEvents.attending} />
        ) : (
          <NoEventMsg text="You’re not attending any events yet." />
        );

      case "previous":
        return userEvents.previous?.length ? (
          <EventGrid events={userEvents.previous} />
        ) : (
          <NoEventMsg text="You haven’t attended or hosted any past events yet." />
        );

      case "tickets":
        return (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-3">Purchased Tickets</h2>
              {userEvents.purchasedTickets?.length ? (
                <TicketList tickets={userEvents.purchasedTickets} />
              ) : (
                <NoEventMsg text="No purchased tickets found." />
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-3">Sold Tickets</h2>
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
      <div className="flex-row items-center py-5 px-5 lg:px-20">
        <div className="container mx-auto">
          <h1 className="text-start text-2xl font-bold pb-5">Your Events</h1>

          <div className="flex flex-wrap w-full lg:gap-2 justify-between rounded-md my-3 mx-auto">
            {btns.map((btn) => {
              const isActive = btn.id === activeBtn;
              const btnClass = isActive
                ? "h-[50px] lg:h-[60px] w-[95px] lg:w-[270px] bg-black text-white lg:text-lg font-semibold px-4 py-2 rounded-md flex items-center justify-center"
                : "h-[50px] lg:h-[60px] w-[95px] lg:w-[270px] text-black lg:text-lg font-semibold border-2 border-black px-4 py-2 rounded-md flex items-center justify-center";
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

function EventGrid({ events }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventsCard key={event._id} {...event} />
      ))}
    </div>
  );
}

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
            {isSold ? (
              <p className="text-xs text-gray-700">
                Buyer: {ticket.user?.fullName} ({ticket.user?.email})
              </p>
            ) : null}
          </div>
          <div className="font-semibold text-black">₦{ticket.amount}</div>
        </div>
      ))}
    </div>
  );
}

function NoEventMsg({ text }) {
  return <p className="text-gray-500 text-center">{text}</p>;
}
