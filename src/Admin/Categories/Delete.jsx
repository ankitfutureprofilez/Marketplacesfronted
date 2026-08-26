import React, { useState } from "react";
import Popup from "../../common/Popup.jsx";
import Listing from "../../Apis/Listing.jsx";
import toast from "react-hot-toast";
import { FiAlertTriangle, FiCheckCircle } from "react-icons/fi";
import { CgSpinner } from "react-icons/cg";
import { BiCategory } from "react-icons/bi";

export default function DeleteCategory({
  isOpen,
  onClose,
  member,
  fetchCustomerList,
}) {
  const [loading, setLoading] = useState(false);

  const isBlocked = Boolean(member?.deleted_at);
  const actionText = isBlocked ? "unblock" : "block";
  const categoryName = member?.name || member?.category_name || "Category";
  const subCategoryCount = member?.subcategories_count ?? member?.subcategories?.length ?? 0;
  const activeCount = member?.active_subcategories_count ?? (isBlocked ? 0 : subCategoryCount);
  const categoryImage = member?.image || member?.icon;

  const handleDeletestatus = async (id) => {
    if (!id) return;
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.deleteCategory(id);

      if (response?.data?.status) {
        toast.success(response?.data?.message);
        onClose();
        fetchCustomerList();
      } else {
        toast.error(response?.data?.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error updating category status:", error);
      toast.error("Operation failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose} size={"max-w-[460px]"}>
      <div className="p-2 sm:p-4 text-center flex flex-col items-center">
        
        {/* Status Indicator Icon */}
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border shrink-0 ${
            isBlocked
              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
              : "bg-rose-50 text-rose-500 border-rose-100"
          }`}
        >
          {isBlocked ? (
            <FiCheckCircle className="w-6 h-6 stroke-[2]" />
          ) : (
            <FiAlertTriangle className="w-6 h-6 stroke-[2]" />
          )}
        </div>

        {/* Header Title */}
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
          Are you sure you want to {actionText} this category?
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-400 mt-1.5 max-w-xs leading-relaxed">
          {isBlocked
            ? "This will restore this category and display all active subcategories on the marketplace."
            : "This will disable this category and hide all linked subcategories from users."}
        </p>

        {/* Selected Category Snapshot Card */}
        {member && (
          <div className="w-full mt-5 p-3.5 bg-slate-50/70 border border-slate-200/80 rounded-2xl text-left flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/80 p-1 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                {categoryImage ? (
                  <img
                    src={categoryImage}
                    alt={categoryName}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <BiCategory className="text-slate-400 text-xl" />
                )}
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-slate-900 text-sm truncate capitalize">
                  {categoryName}
                </h4>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200/60">
                    {subCategoryCount} subcategories
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                    {activeCount} active
                  </span>
                </div>
              </div>
            </div>

            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border shrink-0 ${
                isBlocked
                  ? "bg-rose-50 text-rose-600 border-rose-200"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
              }`}
            >
              {isBlocked ? "Blocked" : "Active"}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="w-full grid grid-cols-2 gap-3 mt-6">
          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-white border border-slate-200/90 hover:bg-slate-50 active:scale-[0.99] text-slate-700 font-bold text-xs sm:text-sm rounded-xl transition-all disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => handleDeletestatus(member?._id)}
            className={`w-full py-2.5 px-4 text-white font-bold text-xs sm:text-sm rounded-xl transition-all disabled:opacity-50 active:scale-[0.99] flex items-center justify-center gap-1.5 shadow-sm ${
              isBlocked
                ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20"
                : "bg-[#E11D48] hover:bg-[#BE123C] shadow-rose-600/20"
            }`}
          >
            {loading ? (
              <>
                <CgSpinner className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <span>Yes</span>
            )}
          </button>
        </div>

      </div>
    </Popup>
  );
}