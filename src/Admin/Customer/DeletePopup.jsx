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
      if (response?.data?.status) {
        toast.success(response?.data?.message);
        onClose();
        fetchCustomerList();
      }
      else{
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error("Error deleting person:", error);
      toast.error("Delete failed!");
    }
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose} size={"max-w-[460px]"}>
      <div className="p-6 text-center">
        {/* Modern Status Badge Icon */}
        <div
          className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${
            member?.deleted_at
              ? "bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50"
              : "bg-rose-50 text-rose-600 ring-8 ring-rose-50/50"
          }`}
        >
          {member?.deleted_at ? (
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          )}
        </div>

        {/* Modal Heading & Dynamic Text */}
        <h3 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 mb-2">
          {`Are you sure you want to 
                ${member?.deleted_at ? "Unblock" : "block"} 
                this account?`}
        </h3>

        <p className="text-xs leading-relaxed text-slate-500 mb-6 max-w-sm mx-auto">
          {member?.deleted_at
            ? "This will restore full access and permissions to the user account."
            : "This will restrict the user from accessing their account until unblocked."}
        </p>

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onClose}
            className="w-1/2 rounded-xl border border-slate-200/90 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 active:scale-[0.98] transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleDeletestatus(member?._id);
            }}
            className={`w-1/2 rounded-xl px-4 py-2.5 text-xs font-semibold text-white shadow-xs active:scale-[0.98] transition-all ${
              member?.deleted_at
                ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20"
                : "bg-rose-600 hover:bg-rose-700 shadow-rose-500/20"
            }`}
          >
            Yes
          </button>
        </div>
      </div>
    </Popup>
  );
}