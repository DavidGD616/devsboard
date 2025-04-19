// src/components/Pagination.jsx
"use client";

import Link from 'next/link';

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  basePath = '',
}) {
  // How many page buttons to show in the “window”
  const maxButtons = 5;
  let start = Math.max(currentPage - Math.floor(maxButtons / 2), 1);
  let end = start + maxButtons - 1;
  if (end > totalPages) {
    end = totalPages;
    start = Math.max(end - maxButtons + 1, 1);
  }
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const href = (page) => {
    const url = new URL(basePath || window.location.pathname, window.location.origin);
    url.searchParams.set('page', page);
    return url.toString().replace(window.location.origin, '');
  };

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center p-4">
      {/* Previous */}
      <Link
        href={href(Math.max(currentPage - 1, 1))}
        className={`w-8 h-8 flex items-center justify-center rounded-full transition ${
          currentPage === 1
            ? 'bg-gray-200 cursor-not-allowed'
            : 'bg-gray-100 hover:bg-gray-200'
        }`}
        aria-label="Previous page"
      >
        <img src="/angle-left-solid.svg" alt="Previous" className="w-4 h-4" />
      </Link>

      {/* Page numbers */}
      <ul className="flex items-center space-x-2 mx-4">
        {start > 1 && (
          <>
            <li>
              <Link href={href(1)} className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200">
                1
              </Link>
            </li>
            {start > 2 && <li><span className="px-3 py-1">…</span></li>}
          </>
        )}

        {pages.map((p) => (
          <li key={p}>
            <Link
              href={href(p)}
              className={`px-3 py-1 rounded-md transition ${
                p === currentPage
                  ? 'bg-black text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {p}
            </Link>
          </li>
        ))}

        {end < totalPages && (
          <>
            {end < totalPages - 1 && <li><span className="px-3 py-1">…</span></li>}
            <li>
              <Link href={href(totalPages)} className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200">
                {totalPages}
              </Link>
            </li>
          </>
        )}
      </ul>

      {/* Next */}
      <Link
        href={href(Math.min(currentPage + 1, totalPages))}
        className={`w-8 h-8 flex items-center justify-center rounded-full transition ${
          currentPage === totalPages
            ? 'bg-gray-200 cursor-not-allowed'
            : 'bg-gray-100 hover:bg-gray-200'
        }`}
        aria-label="Next page"
      >
        <img src="/angle-right-solid.svg" alt="Next" className="w-4 h-4" />
      </Link>
    </nav>
  );
}