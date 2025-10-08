import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../Context/AuthContext";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const { user, token } = useContext(AuthContext);

  console.log("EventProvider mounted");
  console.log("User from AuthContext:", user);


  const [userEvents, setUserEvents] = useState({
    hosting: [],
    attending: [],
    previous: [],
    purchasedTickets: [],
    soldTickets: [],
  });

  const [allEvents, setAllEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [nearbyEvents, setNearbyEvents] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [loadingUpcoming, setLoadingUpcoming] = useState(false);
  const [loadingNearby, setLoadingNearby] = useState(false);
  const [loadingAll, setLoadingAll] = useState(false);
  const [loadingUserEvents, setLoadingUserEvents] = useState(false);

  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    category: "",
    tags: "",
    price: "",
  });

  // const fetchAllEvents = async (searchQuery = "", appliedFilters = {}) => {
  //   try {
  //     setLoadingAll(true);
  //     setError(null);

  //     let url = `${import.meta.env.VITE_EVENT_URL}/all`;
  //     const params = new URLSearchParams();

  //     if (searchQuery) params.append("query", searchQuery);
  //     if (appliedFilters.location) params.append("location", appliedFilters.location);
  //     if (appliedFilters.category) params.append("category", appliedFilters.category);
  //     if (appliedFilters.tags) params.append("tags", appliedFilters.tags);
  //     if (appliedFilters.price === "free") params.append("price", "free");
  //     if (appliedFilters.price === "paid") params.append("price", "paid");

  //     if ([...params].length > 0) {
  //       url = `${import.meta.env.VITE_EVENT_URL}/search?${params.toString()}`;
  //     }

  //     const res = await fetch(url);
  //     const data = await res.json();

  //     if (!res.ok) throw new Error(data?.message || "Failed to fetch events");
  //     setAllEvents(Array.isArray(data.events) ? data.events : []);
  //   } catch (err) {
  //     console.error("Error fetching all events:", err);
  //     setError(err.message);
  //     setAllEvents([]);
  //   } finally {
  //     setLoadingAll(false);
  //   }
  // };
  const fetchAllEvents = async (searchQuery = "", appliedFilters = {}, page = 1, limit = 10) => {
  try {
    setLoadingAll(true);
    setError(null);

    let url = `${import.meta.env.VITE_EVENT_URL}/all`;
    const params = new URLSearchParams();

    if (searchQuery) params.append("query", searchQuery);
    if (appliedFilters.location) params.append("location", appliedFilters.location);
    if (appliedFilters.category) params.append("category", appliedFilters.category);
    if (appliedFilters.tags) params.append("tags", appliedFilters.tags);
    if (appliedFilters.price) params.append("price", appliedFilters.price);

    params.append("page", page);
    params.append("limit", limit);

    if ([...params].length > 0) {
      url = `${import.meta.env.VITE_EVENT_URL}/search?${params.toString()}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) throw new Error(data?.message || "Failed to fetch events");

    setAllEvents(Array.isArray(data.events) ? data.events : []);
    return {
      totalPages: data.pages || 1,
      currentPage: data.page || 1
    };
  } catch (err) {
    console.error("Error fetching all events:", err);
    setError(err.message);
    setAllEvents([]);
    return { totalPages: 1, currentPage: 1 };
  } finally {
    setLoadingAll(false);
  }
};

const fetchUsersEvents = async (type, userId) => {
  if (!userId || !type) return;

  try {
    setLoadingUserEvents(true);
    setError(null);

    const baseUrl = import.meta.env.VITE_EVENT_URL.replace(/\/$/, "");
    const url = `${baseUrl}/${type}/${userId}`;
    console.log("Fetching from:", url);

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log("Response:", data);

    if (!res.ok) throw new Error(data?.message || "Failed to fetch events");

    const newEvents = Array.isArray(data?.events) ? data.events : [];

    setUserEvents((prev) => ({
      ...prev,
      [type]: newEvents,
    }));

    console.log(`${type} events set:`, newEvents.length);
  } catch (err) {
    console.error(`Error fetching ${type} events:`, err);
    setError(err.message);
    setUserEvents((prev) => ({ ...prev, [type]: [] }));
  } finally {
    setLoadingUserEvents(false);
  }
};


  const fetchPurchasedTickets = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_EVENT_URL}/tickets/purchased`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to fetch purchased tickets");

      setUserEvents((prev) => ({
        ...prev,
        purchasedTickets: Array.isArray(data?.tickets) ? data.tickets : [],
      }));
    } catch (err) {
      console.error("Error fetching purchased tickets:", err);
    }
  };

  const fetchSoldTickets = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_EVENT_URL}/tickets/sold`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to fetch sold tickets");

      setUserEvents((prev) => ({
        ...prev,
        soldTickets: Array.isArray(data?.tickets) ? data.tickets : [],
      }));
    } catch (err) {
      console.error("Error fetching sold tickets:", err);
    }
  };

  const fetchUpcomingEvents = async () => {
    try {
      setLoadingUpcoming(true);
      const res = await fetch(`${import.meta.env.VITE_EVENT_URL}/upcoming`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to fetch upcoming events");

      setUpcomingEvents(Array.isArray(data.events) ? data.events : []);
    } catch (err) {
      console.error("Error fetching upcoming events:", err);
      setUpcomingEvents([]);
    } finally {
      setLoadingUpcoming(false);
    }
  };

  const fetchNearbyEvents = async (lat, lng, radius = 25) => {
    try {
      setLoadingNearby(true);
      const res = await fetch(
        `${import.meta.env.VITE_EVENT_URL}/nearby?lat=${lat}&lng=${lng}&radius=${radius}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to fetch nearby events");

      setNearbyEvents(Array.isArray(data.events) ? data.events : []);
    } catch (err) {
      console.error("Error fetching nearby events:", err);
      setNearbyEvents([]);
    } finally {
      setLoadingNearby(false);
    }
  };

  const fetchSearchEvents = async (query, filters = {}) => {
    try {
      const params = new URLSearchParams({ search: query, ...filters });
      const res = await fetch(`${import.meta.env.VITE_EVENT_URL}/search?${params.toString()}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setSearchResults(Array.isArray(data.events) ? data.events : []);
    } catch (err) {
      console.error("Search error:", err);
      setSearchResults([]);
    }
  };


  useEffect(() => {
    if (user?._id) {
      console.log("User in frontend:", user?._id);
      console.log("User detected:", user._id);
      fetchUsersEvents("hosting", user._id);
      fetchUsersEvents("attending", user._id);
      fetchUsersEvents("previous", user._id);
      fetchPurchasedTickets();
      fetchSoldTickets();
    }else {
    console.log("No user yet");
  }
  }, [user]);


  useEffect(() => {
    fetchAllEvents(query, filters);
  }, [query, filters]);

  return (
    <EventContext.Provider
      value={{
        user,
        token,
        userEvents,
        allEvents,
        upcomingEvents,
        nearbyEvents,
        searchResults,
        query,
        setQuery,
        error,
        loadingUpcoming,
        loadingNearby,
        loadingAll,
        loadingUserEvents,
        fetchUpcomingEvents,
        fetchNearbyEvents,
        fetchAllEvents,
        fetchSearchEvents,
        fetchUsersEvents,
        fetchPurchasedTickets,
        fetchSoldTickets,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

EventProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
