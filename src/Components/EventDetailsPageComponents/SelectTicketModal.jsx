import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from "../Button";

export default function SelectTicketModal({ showModal, setShowModal, event }) {
  const [vipCount, setVipCount] = useState(0);
  const [regularCount, setRegularCount] = useState(0);

  const { price = {} } = event || {};
  const { free = false, vip = 0, regular = 0 } = price;

  const totalPrice = vipCount * vip + regularCount * regular;

  const handleVipChange = (type) => {
    setVipCount((prev) => Math.max(0, type === 'increase' ? prev + 1 : prev - 1));
  };

  const handleRegularChange = (type) => {
    setRegularCount((prev) => Math.max(0, type === 'increase' ? prev + 1 : prev - 1));
  };

  const handlePayment = () => {
    console.log('Proceeding to payment...');
    setShowModal(false);
  };

  if (!showModal || !event) return null;

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
          <h1 className="text-center font-semibold text-[25px] mb-4">Select Ticket</h1>
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-2 right-2 text-white font-bold text-xl"
            aria-label="Close modal"
          >
            X
          </button>

          <div className="py-3">
            {free ? (
              <div className="mt-4 flex justify-center gap-8 items-center">
                <span className="w-[15%] text-lg">Tickets</span>
                <div className="flex gap-3 items-center">
                  <button
                    onClick={() => handleVipChange("decrease")}
                    className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-[20%] text-center">{vipCount}</span>
                  <button
                    onClick={() => handleVipChange("increase")}
                    className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mt-4 flex justify-between items-center">
                  <span className="w-[15%]">VIP</span>
                  <div className="flex gap-3 items-center">
                    <button
                      onClick={() => handleVipChange("decrease")}
                      className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-[20%] text-center">{vipCount}</span>
                    <button
                      onClick={() => handleVipChange("increase")}
                      className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-bold w-[100px] text-right">
                    NGN {vip * vipCount}
                  </span>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <span className="w-[15%]">Regular</span>
                  <div className="flex gap-3 items-center">
                    <button
                      onClick={() => handleRegularChange("decrease")}
                      className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-[20%] text-center">{regularCount}</span>
                    <button
                      onClick={() => handleRegularChange("increase")}
                      className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-bold w-[100px] text-right">
                    NGN {regular * regularCount}
                  </span>
                </div>

                <div className="border-t border-gray-600 my-4" />

                <div className="flex justify-between items-center mb-4">
                  <span>Total</span>
                  <span className="font-bold">NGN {totalPrice}</span>
                </div>
              </>
            )}
          </div>

          {free ? (
            <Button
              content="Get tickets"
              width="100%"
              className={vipCount <= 0 ? "bg-gray-500 mt-5 mx-auto w-full" : "bg-purple-600 mt-5 w-full hover:bg-purple-700 mx-auto"}
              disable={vipCount <= 0}
              cursor={vipCount <= 0 ? "not-allowed" : "pointer"}
              handleClick={handlePayment}
            />
          ) : (
            <Button
              content="Proceed to payment"
              width="100%"
              className={totalPrice <= 0 ? "bg-gray-500 mt-5 mx-auto w-full" : "bg-purple-600 mt-5 w-full hover:bg-purple-700 mx-auto"}
              disable={totalPrice <= 0}
              cursor={totalPrice <= 0 ? "not-allowed" : "pointer"}
              handleClick={handlePayment}
            />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}