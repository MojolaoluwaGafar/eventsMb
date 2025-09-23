import React, {useState, useEffect} from 'react'
import AppLayout from "../Layouts/AppLayout"

export default function YourEventsPage() {
    const [activeBtn,  setActiveBtn] = useState(1)
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    const btns = [
        {id:1,
            content: "Hosting"
        },
        {id:2,
            content: "Attending"
        },
        {id:3,
            content: "Previous"
        }
    ]
    useEffect(() => {
  const fetchEvents = async () => {
    setLoading(true);
    try {
      let url = "";
      if (activeBtn === 1) url = `/api/events/hosting/${userId}`;
      if (activeBtn === 2) url = `/api/events/attending/${userId}`;
      if (activeBtn === 3) url = `/api/events/previous/${userId}`;

      const res = await fetch(url);
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error("Error fetching events", err);
    } finally {
      setLoading(false);
    }
  };

  fetchEvents();
}, [activeBtn]);


  return (
    <AppLayout>
        <div className="flex-row items-center py-5 px-5 lg:px-20">
           <div className="container mx-auto">
             <h1 className="text-lg font-semibold">Your Events</h1>

            <div className="flex gap-4 rounded-md my-3 mx-auto">
                {btns.map((btn)=>{
                    const isActive = btn.id === activeBtn
                    const btnClass = isActive ? "h-[50px] lg:h-[80px] sm:w-[md] lg:w-1/3 bg-black text-white px-4 py-2" : "h-[50px] lg:h-[80px] sm:w-[md] lg:w-1/3 text-black border-1 border-black px-4 py-2 "
                    return <button onClick={() => setActiveBtn(btn.id)} className={btnClass} key={btn.id}>{btn.content}</button>
                })}
            </div>

            <div className="mt-6">
  {loading ? (
    <p>Loading...</p>
  ) : events.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <div key={event._id} className="border rounded-lg p-4 shadow">
          <img
            src={event.photo}
            alt={event.title}
            className="w-full h-40 object-cover rounded-md mb-3"
          />
          <h2 className="font-bold text-lg">{event.title}</h2>
          <p className="text-sm text-gray-600">
            {event.date} · {event.location || "Online"}
          </p>
          <p className="mt-2 text-sm">{event.description.slice(0, 80)}...</p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500">No events found</p>
  )}
</div>

           </div>


        </div>
    </AppLayout>
  )
}
