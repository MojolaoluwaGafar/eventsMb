import React, { useState, useEffect, useContext } from "react";
import AppLayout from "../Layouts/AppLayout";
import SearchBoxInput from "../Components/AllEventsPageComponents/SearchBoxInput";
import Loader from "../Components/Loader";
import { AnimatePresence } from "framer-motion";
import AllEvents from "../Components/AllEventsPageComponents/AllEvents";
import { EventContext } from "../Context/EventContext";
import Pagination from "../Components/AllEventsPageComponents/Pagination";

export default function EventsPage() {
  const [pageLoading, setPageLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { allEvents, searchResults, fetchAllEvents } = useContext(EventContext);

  const eventsToShow = searchResults.length > 0 ? searchResults : allEvents;

  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { totalPages: tp, currentPage: cp } = await fetchAllEvents("", {}, currentPage, 9);
      setTotalPages(tp);
      setCurrentPage(cp);
    };
    fetchData();
  }, [currentPage]);

  if (pageLoading) return <Loader />;

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <AnimatePresence>
      <AppLayout>
        <SearchBoxInput />
        <AllEvents events={eventsToShow} />
        <Pagination
         currentPage={currentPage}
         totalPages={totalPages}
         onPrevious={handlePrev}
         onNext={handleNext}/>

      </AppLayout>
    </AnimatePresence>
  );
}
