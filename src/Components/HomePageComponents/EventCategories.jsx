import React from 'react';
import image from "../../assets/Frame 1171276721.png";
import image2 from "../../assets/Frame 1171276722.png";
import image3 from "../../assets/Frame 1171276723.png";
import { Link } from "react-router";
import {useNavigate} from "react-router"

export default function EventCategories() {
  const navigate = useNavigate()
  const handleSeeAll =(e)=>{
    e.preventDefault();
    navigate("/events")
  }
  const categories = [
    { id: 1, img: image, category: "Concert" },
    { id: 2, img: image2, category: "Education" },
    { id: 3, img: image3, category: "Party" },
  ];

  return (
    <div className="flex items-center px-8 lg:px-20">
      <div className="container mx-auto">
      <div className="flex justify-between items-center">
        <p className="text-[25px] lg:text-[30px] font-semibold">Events Categories</p>
        <button onClick={handleSeeAll} className="text-lg">See all</button>
      </div>

      <div className="flex flex-wrap gap-5 md:flex-nowrap my-4">
        {categories.map((one) => (
          <div className="relative w-full transition-shadow hover:shadow-lg" key={one.id}>
            <img
              src={one.img}
              alt={one.category}
              className="w-full h-auto object-cover rounded-md"
            />
            <div className="absolute inset-0 bg-black opacity-30 hover:opacity-80 rounded-md"></div>
            <button className="bg-white text-black px-4 py-2 rounded hover:bg-purple-700 hover:text-white absolute top-1/2 left-1/2 transform -translate-y-5 -translate-x-1/2 z-10">
              <Link to="/events">
                {one.category}
              </Link>
            </button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}