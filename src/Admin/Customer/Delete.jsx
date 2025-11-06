import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import Listing from "../../Apis/Listing";
import toast from "react-hot-toast";

const Delete = ({ member, fetchCustomerList }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const confirmDelete = () => {
    handleDeletestatus(member._id);
    setShowConfirm(false);
  };

  const handleDeletestatus = async (id) => {
    try {
      const main = new Listing();
      const response = await main.AdminDeleteSales(id);
      if (response) {
        toast.success("person deleted successfully");
        await fetchCustomerList();
      }
    } catch (error) {
      console.error("Error deleting person:", error);
      toast.error("Delete failed!");
    }
  };
  const closeModal = () => setShowConfirm(false);



  return (
    <>
      <td className="px-6 font-[Poppins] font-[400] py-4 whitespace-nowrap text-sm text-[#46494D]">
        <button
          onClick={() => setShowConfirm(true)}
          className="bg-red-600 text-white px-3 py-2 rounded-lg flex items-center hover:bg-red-700 transition duration-150"
        >
          <MdDelete size={20} />
        </button>
      </td>

      {/* Confirmation Popup */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closeModal}
        >
          <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Are you sure?
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Delete;
