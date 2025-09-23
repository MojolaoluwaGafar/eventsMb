import React, {useState} from 'react'
import AppLayout from "../Layouts/AppLayout"
import {useLocation} from "react-router"

export default function YourEventsPage() {
    const location = useLocation()
    const [activeBtn,  setActiveBtn] = useState(1)
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
           </div>


        </div>
    </AppLayout>
  )
}
