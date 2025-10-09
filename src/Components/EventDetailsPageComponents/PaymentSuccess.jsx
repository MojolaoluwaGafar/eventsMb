import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button";
import { useNavigate } from "react-router";

export default function PaymentSuccessModal({ show, setShow, paymentData }) {
  const navigate = useNavigate();

  const { amount = 0, ticketType, ticketCount = 1, eventId } = paymentData || {};

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
        navigate(`/event/${eventId}`);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [show, navigate, eventId, setShow]);

  if (!show) return <></>;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-[1000]"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#0E021E] text-white w-[360px] max-w-full rounded-md p-6 relative shadow-xl"
        >
          <button
            onClick={() => setShow(false)}
            className="absolute top-2 right-3 text-white text-lg font-bold hover:text-purple-400"
            aria-label="Close modal"
          >
            ×
          </button>

          <div className="flex flex-col items-center justify-center text-center mt-4">
            <h1 className="text-2xl font-bold text-green-500 mb-2">
              Payment Successful
            </h1>

            {amount === 0 ? (
              <p className="text-gray-300 mb-2">
                You’ve successfully claimed{" "}
                <span className="text-white font-semibold">
                  {ticketCount}
                </span>{" "}
                free ticket{ticketCount > 1 ? "s" : ""} for this event.
              </p>
            ) : (
              <p className="text-gray-300 mb-2">
                Your payment of{" "}
                <span className="font-semibold text-white">
                  ₦{amount.toLocaleString()}
                </span>{" "}
                for{" "}
                <span className="text-white font-semibold">
                  {ticketCount}
                </span>{" "}
                ticket{ticketCount > 1 ? "s" : ""} was successful!
              </p>
            )}

            <p className="text-gray-400 mb-6">
              Ticket Type:{" "}
              <span className="text-white capitalize">{ticketType}</span>
            </p>

            <Button
              content="Close"
              width="100%"
              className="bg-purple-600 w-full hover:bg-purple-700"
              onClick={() => setShow(false)}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
