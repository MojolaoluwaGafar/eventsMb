import React, { useState } from 'react'
import { events } from "../../data.js"
import EventsCard from "../EventsCard"
import Loader from "../../Components/Loader"



export default function AllEvents() {
  const [isLoading, setIsLoading] = useState(false)

   if (isLoading){
  return <Loader height="200px"/>}



  return (
    <div className="flex items-center py-5 px-5 lg:px-20">
         <div className="container mx-auto">
            <p className="text-lg font-semibold">All events</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {events.map((event)=>{
                   return <EventsCard key={event.id} {...event} />
               })}
           </div>
         </div>
       </div>
  )
}

// const AllEvents = () => {

//   const {isLoading,events}=useAppContext()
// if (isLoading){
//   return <Loader height="200px"/>
// }

//   return (
   
//   );
// };

// export default AllEvents;
