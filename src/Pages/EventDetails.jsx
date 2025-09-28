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
      <div className="flex items-center px-5 lg:px-20">
         <div className="container mx-auto my-4 flex items-center gap-1 text-xl">
        <Link to="/"><p>Home</p></Link>
        <FaGreaterThan />
        <Link to="/events"><p  className="font-semibold">Event</p></Link>
        <span className="text-purple-800"><FaGreaterThan /></span>
        <p className="text-purple-800 font-semibold">Event Details</p>
       </div>
      </div>

      {event ? (
        <EventProperties id={event._id}
        image={event.photo}
        title={event.title}
        location={event.location}
        date={event.date}
        tags={event.tags || []}
        price={event.price || null}
        description={event.description}
        startTime={event.timeStart} />)
        :
        (<p>Event not found</p>)
        }


        <OtherEvents />
    </AppLayout>
    </>
  )
}
