import React from 'react'
import Button from "../Button"
import {Link} from "react-router"

export default function HowItWorks() {
  return (
    <div className="flex-row items-center py-5 px-5 lg:px-20">
     <div className="container mx-auto">
       <h1 className="text-[30px] font-semibold">How it works</h1>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 py-5">
        <div className="lg:w-1/2 bg-[#9747FF0F] p-10 rounded-md">
          <h1 className="font-semibold text-3xl">Join an Event</h1>
          <p className="py-3 font-semibold">Discover exciting events that match your interests and join with just a few clicks. Whether it's a concert, workshop, or social gathering, our platform makes it simple to find and book tickets. Stay updated with event details and enjoy seamless entry with digital tickets. Join the fun and make memories!</p>
          <Link to="/events"><Button content="Join Event" className="w-[200px]" /></Link>
        </div>

        <div className="lg:w-1/2 bg-[#0000000F] p-10 rounded-md">
          <h1 className="font-semibold text-3xl">Create an Event</h1>
          <p className="py-3 font-semibold">Bring your vision to life by creating and hosting your own event. From intimate meetups to large-scale gatherings, our easy-to-use platform helps you manage everything—from ticketing to promotion. Engage with your audience, track your attendees, and make your event a success in just a few steps.</p>
          <Link to="/createEvent"><button className="w-[200px] bg-black text-white h-[50px] rounded-md font-bold transition py-2 px-2 hover:bg-purple-900">Create Event</button></Link>
        </div>
      </div>
     </div>
    </div>
  )
}
