import React from 'react'
import { FaLocationDot } from "react-icons/fa6"
import { FaCalendarAlt } from "react-icons/fa"
import { HiTicket } from "react-icons/hi2"
import { Link } from "react-router"
import moment from "moment"
import { motion } from "framer-motion"
// import { FaRegBookmark, FaBookmark } from "react-icons/fa";

export default function EventsCard({
  id,
  image,
  title,
  hostedBy: { fullName },
  category,
  location,
  date,
  price
}) {

  // const [bookmarked, setBookmarked] = useState(false);

  // const toggleBookmark = (e) => {
  //   e.preventDefault(); 
  //   setBookmarked(prev => !prev);

  //   // Optional: persist to localStorage or backend
  //   // localStorage.setItem(`bookmark-${id}`, JSON.stringify(!bookmarked));
  //   // or call an API to save the bookmark
  // };

  return (
    <Link
      to={`/events/${id}`}
      className="text-gray-900 mx-auto my-4 w-full"
    >
      <motion.div  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  onHoverStart={() => console.log('hover started!')} className="mx-auto my-8 lg:my-0 w-full transition-shadow hover:shadow-lg hover:p-4 hover:rounded-md">
        <img
          src={image}
          alt={title}
          className="rounded-md w-full"
          loading="lazy"
        />
        <div className="mt-2  capitalize">
          <h3 className="text-lg my-auto font-semibold">
            {title}
          </h3>
          <p className="text-lg">
            <span className="font-semibold">Host: {fullName}</span>
          </p>
          <p className="mb-0">
            <span className="font-semibold text-lg mt-3 capitalize">
              Category: 
            </span>
             {category}
          </p>
          <div className="flex items-center text-lg gap-2">
            <FaLocationDot /> <span>{location}</span>
          </div>
          <div className="flex items-center text-lg gap-2">
            <FaCalendarAlt /> <span>{moment(date).format("MMM Do YYYY")}</span>
          </div>
         <div className="flex justify-between items-center">
          <div>
             {price.free ? (
            <div className="text-lg flex items-center gap-2">
              <HiTicket /> <span>Free</span>
            </div>
          ) : (
            <div className="flex gap-2 items-center text-lg font-semibold">
              <HiTicket />
              <span>
                {price.vip > 0 && "VIP"}
                {price.vip > 0 && price.regular > 0 && ", "}
                {price.regular > 0 && "Regular"}
              </span>
            </div>
          )}
          </div>
          {/* <div>
            <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={toggleBookmark}
            className="text-xl hover:text-purple-600">
              {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
              </motion.button>
          </div> */}
         </div>
        </div>
      </motion.div>
    </Link>
  )
}