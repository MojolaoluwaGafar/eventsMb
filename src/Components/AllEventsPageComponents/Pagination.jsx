import React from 'react';

export default function Pagination({ currentPage, totalPages, onPrevious, onNext }) {
  return (
    <nav className="flex items-center py-5 px-8 lg:px-20" aria-label="Pagination">
     <div className="container mx-auto justify-between">
       <div className="flex justify-between items-center">
         <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="w-[100px] font-bold border-2 rounded-md py-2 px-2 h-[50px] hover:bg-purple-500 hover:border-0 hover:text-white"
      >
        Previous
      </button>

      <span className="text-sm font-medium">
        Page <span className="font-bold">{currentPage}</span> of <span className="font-bold">{totalPages}</span>
      </span>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="w-[100px] font-bold rounded-md bg-purple-500 py-2 px-2 h-[50px] hover:bg-purple-800 text-white"
      >
        Next
      </button>
       </div>
     </div>
    </nav>
  );
}
