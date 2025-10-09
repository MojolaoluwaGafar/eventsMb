import React, { useContext } from "react";
import { TicketsContext } from "../Context/TicketContext";
import { Link } from "react-router";
import Loader from "../Components/Loader";
import Layout from "../Layouts/AppLayout";

export default function TicketsPage() {
  const { tickets, loading,fetchTickets } = useContext(TicketsContext);

  return (
    <Layout>
      {loading ? (
        <Loader height="450px" />
      ) : tickets.length === 0 ? (
        <div className="p-4 text-center text-lg">No tickets purchased yet.</div>
      ) : (
        <div className="p-4 container mx-auto space-y-4">
          <h1 className="text-2xl font-bold mb-6">My Tickets</h1>
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="p-4 border rounded shadow flex justify-between items-center bg-white dark:bg-[#1B1B1B]"
            >
              <div>
                <h2 className="font-semibold">{ticket?.event || "Event Name"}</h2>
                <p>Type: {ticket.ticketType}</p>
                <p>Status: {ticket.status}</p>
                <p>Ref: {ticket.reference}</p>
              </div>
              <Link
                to={`/tickets/${ticket._id}`}
                className="px-4 py-2 bg-primary text-white rounded"
              >
                View
              </Link>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
