import React from "react";
import Popup from "../../common/Popup.jsx";
import Listing from "../../Apis/Listing.jsx";
import toast from "react-hot-toast";

export default function DeletePopup({
  isOpen,
  onClose,
  member,
  fetchCustomerList,
}) {
  const handleDeletestatus = async (id) => {
    try {
      const main = new Listing();
      const response = await main.AdminDeleteSales(id);
      if (response) {
        toast.success("person deleted successfully");
        onClose();
        fetchCustomerList();
      }
    } catch (error) {
      console.error("Error deleting person:", error);
      toast.error("Delete failed!");
    }
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose} size={"max-w-[540px]"}>
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        {`Are you sure you want to 
              ${member?.deleted_at ? "block" : "Unblock"} 
              this account?`}
      </h3>
      <div className="flex justify-center gap-3">
        <button
          onClick={() => {
            handleDeletestatus(member?._id);
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Yes
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </Popup>
  );
}
