import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../Context/AuthContext";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const { user, token } = useContext(AuthContext); // ✅ Use from AuthContext only

  const [userEvents, setUserEvents] = useState({
    hosting: [],
    attending: [],
    previous: [],
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

  const fetchUpcomingEvents = async () => {
    try {
      setLoadingUpcoming(true);
      setError(null);

      const res = await fetch(`${import.meta.env.VITE_EVENT_URL}/upcoming`, {
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to fetch events");

      setUpcomingEvents(Array.isArray(data.events) ? data.events : []);
    } catch (err) {
      setError(err.message);
      setUpcomingEvents([]);
    } finally {
      setLoadingUpcoming(false);
    }
  };

  const fetchNearbyEvents = async (lat, lng, radius = 25) => {
    try {
      setLoadingNearby(true);
      setError(null);

      const res = await fetch(
        `${import.meta.env.VITE_EVENT_URL}/nearby?lat=${lat}&lng=${lng}&radius=${radius}`
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to fetch nearby events");

      setNearbyEvents(Array.isArray(data.events) ? data.events : []);
      return data.events;
    } catch (err) {
      setError(err.message);
      setNearbyEvents([]);
      return [];
    } finally {
      setLoadingNearby(false);
    }
  };

  const fetchAllEvents = async (searchQuery = "", appliedFilters = {}) => {
    try {
      setLoadingAll(true);
      setError(null);

      let url = `${import.meta.env.VITE_EVENT_URL}/all`;
      const params = new URLSearchParams();

      if (searchQuery) params.append("query", searchQuery);
      if (appliedFilters.location) params.append("location", appliedFilters.location);
      if (appliedFilters.category) params.append("category", appliedFilters.category);
      if (appliedFilters.tags) params.append("tags", appliedFilters.tags);
      if (appliedFilters.price === "free") params.append("price", "free");
      if (appliedFilters.price === "paid") params.append("price", "paid");

      if ([...params].length > 0) {
        url = `${import.meta.env.VITE_EVENT_URL}/search?${params.toString()}`;
      }

      const res = await fetch(url, { headers: { "Content-Type": "application/json" } });
      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Failed to fetch events");
      setAllEvents(Array.isArray(data.events) ? data.events : []);
    } catch (err) {
      setError(err.message);
      setAllEvents([]);
    } finally {
      setLoadingAll(false);
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

  const fetchUsersEvents = async (type, userId) => {
    if (!userId) return;

    try {
      setLoadingUserEvents(true);
      setError(null);

      const res = await fetch(`${import.meta.env.VITE_EVENT_URL}/${type}/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to fetch user events");

      setUserEvents((prev) => ({ ...prev, [type]: data.events || [] }));
    } catch (err) {
      setError(err.message);
      setUserEvents((prev) => ({ ...prev, [type]: [] }));
    } finally {
      setLoadingUserEvents(false);
    }
  };

  useEffect(() => {
    fetchAllEvents(query, filters);
  }, [query, filters]);

  useEffect(() => {
    if (user?._id) {
      fetchUsersEvents("hosting", user._id);
      fetchUsersEvents("attending", user._id);
      fetchUsersEvents("previous", user._id);
    }
  }, [user]);

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
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

EventProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
