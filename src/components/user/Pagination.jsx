import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <ul className="flex justify-center gap-1 text-gray-900 mt-8 flex-wrap">
      <li>
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="btn btn-ghost btn-sm rounded-r-none"
        >
          &lt;
        </button>
      </li>
      {[...Array(totalPages).keys()].map((num) => (
        <li key={num + 1}>
          <button
            onClick={() => onPageChange(num + 1)}
            className={`btn btn-ghost btn-sm ${
              currentPage === num + 1 ? "bg-warning text-white" : ""
            }`}
          >
            {num + 1}
          </button>
        </li>
      ))}
      <li>
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="btn btn-ghost btn-sm rounded-l-none"
        >
          &gt;
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
