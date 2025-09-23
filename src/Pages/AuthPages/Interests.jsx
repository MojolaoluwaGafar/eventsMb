import React, { useState } from 'react';
import Button from "../../Components/Button";

export default function Interests() {
  const btnContent = [
    { id: 1, content: "Football" },
    { id: 2, content: "Basketball" },
    { id: 3, content: "Music" },
    { id: 4, content: "Travel" },
    { id: 5, content: "Technology" },
    { id: 6, content: "Gaming" },
    { id: 7, content: "Art" },
    { id: 8, content: "Fitness" },
    { id: 9, content: "Movies" },
    { id: 10, content: "Cooking" },
    { id: 11, content: "Reading" },
    { id: 12, content: "Photography" },
    { id: 13, content: "Fashion" },
  ];

  const [selected, setSelected] = useState([]);

  const toggleInterest = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-5 max-w-[560px] w-full">
        <h1 className="text-2xl font-bold mb-2">Your Interests</h1>
        <p className="mb-4 font-bold">
          To enhance your feed and tailor it to your preferences, select at least <span className="font-semibold text-purple-500">5</span> areas of interest that resonate with you.
        </p>

        <div className="flex flex-wrap gap-3 ">
          {btnContent.map((btn) => (
            <button
              key={btn.id}
              onClick={() => toggleInterest(btn.id)}
              className={`px-4 py-2 rounded-md border font-semibold transition-colors duration-200 ${
                selected.includes(btn.id)
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {btn.content}
            </button>
          ))}
        </div>

          <Button className="w-[150px] mt-10" content="Continue" />
      </div>
    </div>
  );
}