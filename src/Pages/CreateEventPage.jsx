import React, { useState, useEffect } from 'react'
import AppLayout from "../Layouts/AppLayout"
import CreateEventForm from "../Components/CreateEventPageComponents/CreateEventForm"
import CreateEventsSuccessModal from "../Components/CreateEventPageComponents/CreateEventsSuccessModal"
import Loader from '../Components/Loader'

export default function CreateEventPage() {
   const [showModal, setShowModal] = useState(false);
   const [pageLoading, setPageLoading] = useState(true);
   
        useEffect(() => {
        const timer = setTimeout(() => setPageLoading(false), 10);
        return () => clearTimeout(timer);
      }, []); 
    
       if (pageLoading) return <Loader/>;
  return (
    <>
    <AppLayout>
       <div className="flex items-center px-8 py-2 lg:px-20">
        <div className="container mx-auto">
             <h1 className="text-[30px] font-semibold">Create event</h1>
             {showModal && ( <CreateEventsSuccessModal showModal={showModal} setShowModal={setShowModal} />)}
             <CreateEventForm />
        </div>
       </div>
    </AppLayout>
    </>
  )
}
  