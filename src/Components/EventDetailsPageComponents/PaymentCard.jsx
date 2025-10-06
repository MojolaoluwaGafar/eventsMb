import React, { useState } from "react";
import Button from "../Button";
import SelectTicketModal from "../EventDetailsPageComponents/SelectTicketModal";

export default function PaymentCard({ event }) {
  const [showModal, setShowModal] = useState(false);
  const { free, vip, regular, vipEnabled, regularEnabled } = event || {};

  const handleOpenModal = () => setShowModal(true);

  return (
    <div className="bg-black w-[220px] text-white rounded-md p-3">
      <h1 className="text-center font-semibold my-1">Pricing</h1>

      {!free ? (
        <div className="mt-4">
          {(vipEnabled || vip > 0) && (
            <div className="flex justify-between py-3">
              <span>VIP</span>
              <span className="font-bold">NGN {vip}</span>
            </div>
          )}
          {(regularEnabled || regular > 0) && (
            <div className="flex justify-between pb-3">
              <span>Regular</span>
              <span className="font-bold">NGN {regular}</span>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-400 my-4">This event is free</p>
      )}

      <Button
        className="my-2 w-full"
        content="Select Tickets"
        onClick={handleOpenModal}
      />

      <SelectTicketModal
        showModal={showModal}
        setShowModal={setShowModal}
        event={event}
      />
    </div>
  );
}
