import React, { useContext } from "react";
import { useParams } from "react-router";
import AppLayout from "../Layouts/AppLayout";
import { TicketsContext } from "../Context/TicketContext";

export default function TicketDetail() {
    const { ticketId } = useParams();
  const { tickets, loading } = useContext(TicketsContext);

  if (loading) return <div>Loading ticket...</div>;

  const ticket = tickets.find((t) => t._id === ticketId);
  if (!ticket) return <div>Ticket not found.</div>;

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">{ticket.event?.name || "Event"} Ticket</h1>
        <div className="p-6 border rounded-md">
          <p><strong>Name:</strong> {ticket.userName || ticket.user?.name}</p>
          <p><strong>Email:</strong> {ticket.userEmail || ticket.user?.email}</p>
          <p><strong>Date:</strong> {ticket.eventDate ? new Date(ticket.eventDate).toLocaleString() : "N/A"}</p>
          <p><strong>Seat/Code:</strong> {ticket.ticketCode || ticket.reference}</p>
        </div>
      </div>
    </AppLayout>
  );
}
