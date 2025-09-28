import React, { useState, useEffect } from 'react'
import AppLayout from "../Layouts/AppLayout"
import HeroSection from "../Components/HomePageComponents/HeroSection"
import UpcomingEvents from "../Components/HomePageComponents/UpcomingEvents"
import EventCategories from "../Components/HomePageComponents/EventCategories"
import HowItWorks from "../Components/HomePageComponents/HowItWorks"
import Loader from '../Components/Loader'
import EventsNearYou from "../Components/HomePageComponents/EventsNearYou"

export default function HomePage() {
   const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 10);
    return () => clearTimeout(timer);
  }, []); 

   if (pageLoading) return <Loader/>;
  return (
    <AppLayout>
        <HeroSection />
        <UpcomingEvents />
        <EventCategories />
        <HowItWorks />
        <EventsNearYou />
    </AppLayout>
  )
}
