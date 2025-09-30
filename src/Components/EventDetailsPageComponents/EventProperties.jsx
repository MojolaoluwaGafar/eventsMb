import React from 'react'
import moment from "moment"
import { FaLocationDot } from "react-icons/fa6"
import { FaCalendarAlt } from "react-icons/fa"
import PaymentCard from "./PaymentCard"


export default function EventProperties({id,image,title,location,date,tags,price,description,startTime}) {

  return (
    <div className="flex items-center px-5 lg:px-20">
        <div className="container mx-auto">
        <img className="w-full h-[345px] rounded-lg" src={image} alt="" />
        <div className="lg:flex mt-5 mb-3 justify-between">
            
            <div>

                <div className="flex text-[20px] lg:text-[30px] py-2 gap-2 items-center font-semibold">
                    <FaCalendarAlt /> {date ? moment(date).format("dddd, MMMM Do YYYY") : "No date provided"} {startTime && ` - ${startTime}`}
                </div>


                 <div className="flex lg:py-2 text-[20px] lg:text-[30px] gap-2 items-center font-semibold">
              <FaLocationDot /> {location || "Online"}
            </div>

                <div className="flex py-3 gap-2 items-center ">
                    {tags.map((tag, index)=>{
                        return (
                            <p className="text-gray-600 border-1 py-1 px-2 rounded-md " key={index}>{tag}</p>
                        )
                    })}
                </div>
                <h1 className="text-2xl py-2 lg:text-5xl font-semibold">{title}</h1>
                <p className="text-[23px]">{description}</p>
            </div>

            <div>
                <PaymentCard event={{ id, image, title, location, date, tags,  free: event.free,
    regular: event.regular,
    vip: event.vip, description, startTime }} />
            </div>
        </div>
    </div>
    </div>
  )
}
