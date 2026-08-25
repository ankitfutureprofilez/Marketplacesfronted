import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show page 1
      pageNumbers.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) {
        end = 3;
      }
      if (currentPage >= totalPages - 1) {
        start = totalPages - 2;
      }

      if (start > 2) {
        pageNumbers.push('...');
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      if (end < totalPages - 1) {
        pageNumbers.push('...');
      }

      // Always show last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-center py-4 px-4 border-t border-gray-200 mt-6 bg-white rounded-b-lg">
      <div className="text-sm text-gray-500 mb-2 md:mb-0">
        Showing Page <span className="font-semibold text-gray-800">{currentPage}</span> of <span className="font-semibold text-gray-800">{totalPages}</span>
      </div>

      <ul className="inline-flex items-center space-x-1.5">
        {/* Previous Button */}
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1.5 rounded-md border text-sm font-medium transition-colors duration-150 ${
              currentPage === 1
                ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            &larr;
          </button>
        </li>

        {/* Page Numbers */}
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <li key={`ellipsis-${index}`} className="px-2 py-1 text-gray-400 text-sm font-medium select-none">
                ...
              </li>
            );
          }
          return (
            <li key={page}>
              <button
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1.5 rounded-md border text-sm font-medium transition-colors duration-150 ${
                  currentPage === page
                    ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {page}
              </button>
            </li>
          );
        })}

        {/* Next Button */}
        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1.5 rounded-md border text-sm font-medium transition-colors duration-150 ${
              currentPage === totalPages
                ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            &rarr;
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
