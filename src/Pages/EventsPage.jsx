import React, { useState , useEffect} from 'react'
import AppLayout from "../Layouts/AppLayout"
import SearchBoxInput from "../Components/AllEventsPageComponents/SearchBoxInput"
import Loader from '../Components/Loader'
import { AnimatePresence } from "framer-motion"
import AllEvents from "../Components/AllEventsPageComponents/AllEvents"

export default function EventsPage() {
  const [pageLoading, setPageLoading] = useState(true);
  
      useEffect(() => {
      const timer = setTimeout(() => setPageLoading(false), 1000);
      return () => clearTimeout(timer);
    }, []); 
  
     if (pageLoading) return <Loader/>;
  return (
    <AnimatePresence>
    <AppLayout>
        <SearchBoxInput />
        <AllEvents />





    </AppLayout>
    </AnimatePresence>
  )
}
