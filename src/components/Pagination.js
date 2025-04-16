// components/Pagination.jsx
import React from 'react';

export default function Pagination() {
  return (
    <nav aria-label="Pagination" className="flex items-center justify-center p-4">
      {/* Prev */}
      <button
        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
        aria-label="Previous page"
      >
        <img
          src="/angle-left-solid.svg"
          alt="Previous"
          className="w-4 h-4"
        />
      </button>

      {/* Page numbers */}
      <ul className="flex items-center space-x-2 mx-4">
        {/* First page always visible */}
        <li>
          <button className="px-3 py-1 rounded-md bg-black text-white">1</button>
        </li>

        {/* A couple of pages, hide on smaller screens */}
        <li>
          <button className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200">2</button>
        </li>
        <li>
          <button className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200">3</button>
        </li>

        {/* Ellipsis for overflow, only on md+ */}
        <li>
          <span className="px-3 py-1">…</span>
        </li>

        {/* Last page always visible */}
        <li>
          <button className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200">10</button>
        </li>
      </ul>

      {/* Next */}
      <button
        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
        aria-label="Next page"
      >
        <img
          src="/angle-right-solid.svg"
          alt="Previous"
          className="w-4 h-4"
        />
      </button>
    </nav>
  );
}