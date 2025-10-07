import React from 'react';

export default function Pagination({ currentPage, totalPages, onPrevious, onNext }) {
  return (
    <nav className="flex justify-between items-center px-5 lg:px-20 pb-5" aria-label="Pagination">
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="w-[100px] font-bold border-2 rounded-md py-2 px-2 h-[50px] hover:bg-purple-500 hover:border-0 hover:text-white"
      >
        Previous
      </button>

      <span className="text-lg font-medium">
        Page <span className="font-bold">{currentPage}</span> of <span className="font-bold">{totalPages}</span>
      </span>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="w-[100px] font-bold rounded-md bg-purple-500 py-2 px-2 h-[50px] hover:bg-purple-800 text-white"
      >
        Next
      </button>
    </nav>
  );
}
