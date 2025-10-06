import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button";
import {toast} from "react-toastify"
import {AuthContext} from "../../Context/AuthContext";


export default function SelectTicketModal({ showModal, setShowModal, event }) {
  const {user} = useContext(AuthContext)
  const [vipCount, setVipCount] = useState(0);
  const [regularCount, setRegularCount] = useState(0);

  if (!showModal || !event) return null;

  const { free = false, vip = 0, regular = 0 } = event;
  const totalPrice = free ? 0 : vipCount * vip + regularCount * regular;

  const handlePayment = async () => {
  try {
    console.log("handlePayment triggered");

    if (!user?.userId || !user?.email) {
      toast.error("Please log in before purchasing a ticket");
      return;
    }
    let selectedTicket = "";
    let amount = 0;

    if (vipCount > 0) {
      selectedTicket = "vip";
      amount = vipCount * vip;
    } else if (regularCount > 0) {
      selectedTicket = "regular";
      amount = regularCount * regular;
    } else {
      toast.error("Please select at least one ticket");
      return;
    }

    console.log(" Selected Ticket:", selectedTicket, "Amount:", amount);

    const response = await fetch("http://localhost:5000/api/payments/initiate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        amount,
        eventId: event._id,
        ticketType: selectedTicket,
        userId: user.userId,
      }),
    });

    const data = await response.json();
    console.log("Payment init response:", data);

    if (data.success && data.authorization_url) {
      toast.info("Redirecting to Paystack...");
      window.location.href = data.authorization_url;
    } else {
      console.error("Payment init failed:", data.message);
      toast.error(data.message || "Payment initialization failed");
    }
  } catch (error) {
    console.error("Payment error:", error);
    toast.error("An error occurred while initializing payment");
  }
};





  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 h-screen w-screen bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-[999]"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#0E021E] w-[370px] max-w-full rounded-md p-4 text-white relative"
        >
          <h1 className="text-center font-semibold text-[25px] mb-4">
            Select Ticket
          </h1>

          <button
            onClick={() => setShowModal(false)}
            className="absolute top-2 right-2 text-white font-bold text-xl"
            aria-label="Close modal"
          >
            ×
          </button>

          <div className="py-3">
            {free ? (
              <TicketCounter
                label="Tickets"
                count={regularCount}
                setCount={setRegularCount}
              />
            ) : (
              <>
                <TicketCounter
                  label="VIP"
                  count={vipCount}
                  setCount={setVipCount}
                  price={vip}
                />
                <TicketCounter
                  label="Regular"
                  count={regularCount}
                  setCount={setRegularCount}
                  price={regular}
                />

                <div className="border-t border-gray-600 my-4" />
                <div className="flex justify-between items-center mb-4">
                  <span>Total</span>
                  <span className="font-bold">NGN {totalPrice}</span>
                </div>
              </>
            )}
          </div>

          <Button
            content={free ? "Get Tickets" : "Proceed to Payment"}
            width="100%"
            className={
              (free ? regularCount : totalPrice) <= 0
                ? "bg-gray-500 mt-5 w-full"
                : "bg-purple-600 mt-5 w-full hover:bg-purple-700"
            }
            // disabled={(free ? regularCount : totalPrice) <= 0}
            onClick={handlePayment}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function TicketCounter({ label, count, setCount, price }) {
  return (
    <div className="mt-4 flex justify-between items-center w-full">
      <div className="w-[80px]">{label}</div>
      <div className="flex gap-3 items-center w-[100px]">
        <button
          onClick={() => setCount((p) => Math.max(0, p - 1))}
          className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center"
        >
          -
        </button>
        <span>{count}</span>
        <button
          onClick={() => setCount((p) => p + 1)}
          className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center"
        >
          +
        </button>
      </div>
      {price !== undefined && (
        <span className="font-bold w-[60px] text-right">NGN {price * count}</span>
      )}
    </div>
  );
}
