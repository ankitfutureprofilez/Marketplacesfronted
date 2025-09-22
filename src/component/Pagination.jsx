import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-center py-4 px-4 border-t border-gray-200 mt-6">
      <div className="text-sm text-gray-600 mb-2 md:mb-0">
        Page <span className="font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span>
      </div>

      <ul className="inline-flex items-center space-x-1">
        {/* Previous Button */}
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md border text-sm ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            &larr;
          </button>
        </li>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <li key={page}>
              <button
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-md border text-sm ${
                  currentPage === page
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-white text-gray-700 hover:bg-gray-200'
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
            className={`px-3 py-1 rounded-md border text-sm ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-200'
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
