import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineImage } from "react-icons/md";

const BusinessImageGallery = ({ images = [], onDelete }) => {
  // console.log("images", images);
  if (!images?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-8 border border-dashed border-gray-300 rounded-xl bg-gray-50">
        <MdOutlineImage size={40} className="text-gray-400 mb-2" />
        <p className="text-gray-500 text-sm">No business images uploaded</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images &&
          images?.map((img, i) => (
            <div
              key={i}
              className="relative group rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-white hover:shadow-md transition-all duration-200"
            >
              <img
                src={img}
                alt={"Gallery Image"}
                className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                {onDelete && (
                  <button
                    onClick={() => onDelete(i)}
                    className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                    title="Remove image"
                  >
                    <FaTrashAlt size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BusinessImageGallery;
