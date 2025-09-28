import React from 'react'
import { events } from "../../data.js"
import EventsCard from "../EventsCard.jsx"
import { motion } from "framer-motion" 

export default function UpcomingEvents() {
  return (
    <div className="flex items-center py-5 px-5 lg:px-20">
      <div className="container mx-auto">
       <div className="flex justify-between">
         <p className="text-[30px] font-semibold">Upcoming Events</p>
         <button disabled className="text-lg">see all</button>
       </div>
        <div className="flex-col lg:flex lg:flex-row justify-between items-center gap-5">
            {events.slice(0,3).map((event)=>{
                return <EventsCard key={event.id} {...event} />
            })}
        </div>
      </div>
    </div>
  )
}
