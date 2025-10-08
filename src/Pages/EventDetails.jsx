import React, {useContext} from 'react'
import AppLayout from "../Layouts/AppLayout"
import EventProperties from "../Components/EventDetailsPageComponents/EventProperties.jsx"
// import { events } from "../data.js"
import { useParams } from "react-router"
import { FaGreaterThan } from "react-icons/fa";
import { Link } from "react-router"
import OtherEvents from "../Components/EventDetailsPageComponents/EventsYouMightLike"
import { EventContext } from "../Context/EventContext";

export default function EventDetails() {

    const { eventId } = useParams()

    const { allEvents } = useContext(EventContext);
    const event = allEvents.find((e) => String(e._id) === String(eventId));

  return (
    <>
    <AppLayout>
      <div className="flex items-center px-8 lg:px-20">
         <div className="container mx-auto my-6 flex items-center gap-1 text-[15px] md:text-lg">
        <Link to="/"><p>Home</p></Link>
        <span className="text-purple-800 text-[12px]"><FaGreaterThan /></span>
        <Link to="/events"><p  className="font-semibold">Event</p></Link>
        <span className="text-purple-800 text-[12px]"><FaGreaterThan /></span>
        <p className="text-purple-800 font-semibold">Event Details</p>
       </div>
      </div>

      {event ? (
       <EventProperties
       id={event._id}
       image={event.photo}
       title={event.title}
       location={event.location}
       date={event.date}
       tags={event.tags}
       description={event.description}
       startTime={event.timeStart}
       free={event.free}
       regular={event.regular}
       vip={event.vip}
       vipEnabled={event.vipEnabled}
       regularEnabled={event.regularEnabled}/>)
        :
        (<p>Event not found</p>)
        }


        <OtherEvents />
    </AppLayout>
    </>
  )
}
