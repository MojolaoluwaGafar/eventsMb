import React from 'react'

export default function Pagination() {
  return (
    <div className="flex justify-between items-center">
      <button className="w-[100px] font-bold border-2 rounded-md py-2 px-2 h-[50px] hover:bg-purple-500 hover:border-0 hover:text-white">Previous</button>
      <div>page <span>
        num</span> of num</div>
        <button className="w-[100px] font-bold rounded-md bg-purple-500 py-2 px-2 h-[50px] hover:bg-purple-800 hover:text-white">Next</button>
    </div>
  )
}
