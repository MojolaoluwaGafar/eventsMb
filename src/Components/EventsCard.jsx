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
    <Link to={`/event/${id}`} className="text-gray-900 mx-auto my-4 w-full shadow-xl">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="mx-auto my-8 lg:my-0 w-full transition-shadow hover:shadow-lg hover:p-4 hover:rounded-md"
      >
        <img
          src={image}
          alt={title ? `${title} event poster` : "Event poster"}
          className="rounded-md w-full h-[150px]"
          loading="lazy"
        />
          <h3 className="text-[16px] pt-1 my-auto font-semibold">{title || "No title"}</h3>
        <div className="mt-2 capitalize">
          <p className="text-[13px]">
            <span className="font-semibold">Host: <span>{hostName}</span></span>
          </p>
          <p className="mb-0 text-[13px]">
            <span className="font-semibold text-[13px] mt-3 capitalize">
              Category:
            </span>
            {displayedCategory}
          </p>
          <div className="flex items-center text-[13px] gap-2">
            <FaLocationDot />
            <span>{location || "Online"}</span>
          </div>
          <div className="flex items-center text-[13px] gap-2">
            <FaCalendarAlt /> <span>{formattedDate}</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            {free ? (
              <div className="text-[13px] flex items-center gap-2 font-semibold">
                <HiTicket /> <span>Free</span>
              </div>
            ) : (
              <div className="flex gap-2 items-center text-[13px] font-semibold">
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
