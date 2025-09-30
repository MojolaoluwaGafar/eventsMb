import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button";

export default function SelectTicketModal({ showModal, setShowModal, event }) {
  const [vipCount, setVipCount] = useState(0);
  const [regularCount, setRegularCount] = useState(0);

  if (!showModal || !event) return null;

  const { free = false, vip = 0, regular = 0 } = event;
  const totalPrice = free ? 0 : vipCount * vip + regularCount * regular;

  const handlePayment = () => {
    if (free) {
      console.log("Free ticket claimed:", { tickets: vipCount + regularCount });
    } else {
      console.log("Proceeding to payment:", { vipCount, regularCount, totalPrice });
    }
    setShowModal(false);
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
            {free ? "Claim Free Ticket" : "Select Ticket"}
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
              <div className="mt-4 flex justify-center gap-8 items-center">
                <span className="text-lg">Tickets</span>
                <div className="flex gap-3 items-center">
                  <button
                    onClick={() => setRegularCount((p) => Math.max(0, p - 1))}
                    className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-[20%] text-center">{regularCount}</span>
                  <button
                    onClick={() => setRegularCount((p) => p + 1)}
                    className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mt-4 flex justify-between items-center">
                  <span>VIP</span>
                  <div className="flex gap-3 items-center">
                    <button
                      onClick={() => setVipCount((p) => Math.max(0, p - 1))}
                      className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center"
                    >
                      -
                    </button>
                    <span>{vipCount}</span>
                    <button
                      onClick={() => setVipCount((p) => p + 1)}
                      className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-bold">NGN {vip * vipCount}</span>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <span>Regular</span>
                  <div className="flex gap-3 items-center">
                    <button
                      onClick={() => setRegularCount((p) => Math.max(0, p - 1))}
                      className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center"
                    >
                      -
                    </button>
                    <span>{regularCount}</span>
                    <button
                      onClick={() => setRegularCount((p) => p + 1)}
                      className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-bold">NGN {regular * regularCount}</span>
                </div>

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
            disabled={(free ? regularCount : totalPrice) <= 0}
            handleClick={handlePayment}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
