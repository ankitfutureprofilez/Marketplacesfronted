import React from "react";
import Popup from "../../common/Popup.jsx";
import Listing from "../../Apis/Listing.jsx";
import toast from "react-hot-toast";

export default function DeleteVendor({
  isOpen,
  onClose,
  member,
  fetchTeamList,
}) {
//   console.log("member", member);

  const handleDelete = (id) => {
    const main = new Listing();
    main
      .AdminDeleteSales(id)
      .then((res) => {
        if (res?.data?.status) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data?.message || "Something went wrong.");
        }
        fetchTeamList();
        onClose();
      })
      .catch((error) => {
        console.error("error", error);
        toast.error(error?.response?.data?.message || "Internal Server Error");
      });
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose} size={"max-w-[540px]"}>
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        {`Are you sure you want to 
              ${member?.user?.deleted_at ? "Unblock" : "block"} 
              this account?`}
      </h3>
      <div className="flex justify-center gap-3">
        <button
          onClick={() => {
            handleDelete(member?.user?._id);
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
