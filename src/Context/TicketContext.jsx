import React, { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./AuthContext";

export const TicketsContext = createContext();

export const TicketsProvider = ({ children }) => {
  const { token, user } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const fetchTickets = async () => {
    if (!token || !user?._id) {
      setTickets([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/tickets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTickets(data.tickets || []);
    } catch (err) {
      console.error("Fetch tickets error:", err);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [user, token]);

  return (
    <TicketsContext.Provider value={{ tickets, loading, fetchTickets }}>
      {children}
    </TicketsContext.Provider>
  );
};

TicketsProvider.propTypes = { children: PropTypes.node.isRequired };
