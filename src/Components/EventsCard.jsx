import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { HiTicket } from "react-icons/hi2";
import { Link } from "react-router";
import moment from "moment";
import { motion } from "framer-motion";

export default function EventsCard({
  _id,
  photo,
  title,
  hostName,
  category,
  location,
  date,
  free,
  regular,
  vip
}) {
  const id = _id;
  const image = photo ;
  const formattedDate = date
    ? moment(new Date(date)).format("MMM Do YYYY")
    : "No date provided";
  const displayedCategory = category ;

  const vipCount = Number(vip) || 0;
  const regularCount = Number(regular) || 0;

  return (
    <Link to={`/events/${id}`} className="text-gray-900 mx-auto my-4 w-full">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => console.log("hover started!")}
        className="mx-auto my-8 lg:my-0 w-full transition-shadow hover:shadow-lg hover:p-4 hover:rounded-md"
      >
        <img
          src={image}
          alt={title ? `${title} event poster` : "Event poster"}
          className="rounded-md w-full"
          loading="lazy"
        />
        <div className="mt-2 capitalize">
          <h3 className="text-lg my-auto font-semibold">{title || "No title"}</h3>
          <p className="text-lg">
            <span className="font-semibold">Host: <span>{hostName}</span></span>
          </p>
          <p className="mb-0">
            <span className="font-semibold text-lg mt-3 capitalize">
              Category:
            </span>{" "}
            {displayedCategory}
          </p>
          <div className="flex items-center text-lg gap-2">
            <FaLocationDot />{" "}
            <span>{location || "Online"}</span>
          </div>
          <div className="flex items-center text-lg gap-2">
            <FaCalendarAlt /> <span>{formattedDate}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            {free ? (
              <div className="text-lg flex items-center gap-2">
                <HiTicket /> <span>Free</span>
              </div>
            ) : (
              <div className="flex gap-2 items-center text-lg font-semibold">
                <HiTicket />
                <span>
                  {vipCount > 0 && "VIP"}
                  {vipCount > 0 && regularCount > 0 && ", "}
                  {regularCount > 0 && "Regular"}
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
