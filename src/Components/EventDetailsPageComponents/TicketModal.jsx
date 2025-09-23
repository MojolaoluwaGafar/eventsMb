import React from 'react'

export default function TicketModal({showModal ,setShowModal,event}) {

    const { price = {} } = event || {};
  const { free = false, vip = 0, regular = 0 } = price;


      if (!showModal || !event) return null;
  return (
    <div className="modal-container">
        <div className="modal">
           <h1 className="text-center font-semibold text-[25px] mb-4">Select Ticket</h1>
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-2 right-2 text-white font-bold text-xl"
          >
            X
          </button>

          {/* <div>
            {free ? ()}
          </div> */}


        </div>
    </div>
  )
}
