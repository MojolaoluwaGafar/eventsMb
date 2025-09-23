import React from "react";

export default function Pagination({ currentPage, setCurrentPage, numOfPages }) {
  const buttonStyles = (isDisabled) => ({
    cursor: isDisabled ? "not-allowed" : "pointer",
  });
  return (
    <div className="container d-flex justify-content-between align-items-center py-5 pagination-container">
      <button
        className="border border-dark border-2 text-dark rounded-1 fs-5 fw-medium"
        style={buttonStyles(currentPage === 1)}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </button>
      <p>
        Page {currentPage} of {numOfPages}
      </p>
      <button
        className="main-bg-color text-white rounded-1 border-0 fs-5 fw-medium specialbtn"
        style={buttonStyles(currentPage === numOfPages)}
        disabled={currentPage === numOfPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

