import React, { useState } from "react";
import Popup from "../../common/Popup.jsx";
import Listing from "../../Apis/Listing.jsx";
import toast from "react-hot-toast";
import { FiAlertTriangle, FiCheckCircle, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { CgSpinner } from "react-icons/cg";

export default function DeleteVendor({
  isOpen,
  onClose,
  member,
  fetchTeamList,
}) {
  const [loading, setLoading] = useState(false);

  const isBlocked = Boolean(member?.user?.deleted_at);
  const actionText = isBlocked ? "Unblock" : "Block";
  const businessName = member?.business_name || member?.user?.name || "Vendor";
  const ownerName = member?.user?.name || "—";
  const email = member?.user?.email;
  const phone = member?.user?.phone;
  const location = member?.city 
    ? `${member.city}${member?.address ? `, ${member.address}` : ""}` 
    : member?.address;
  const initials = businessName ? businessName.substring(0, 2).toUpperCase() : "VN";

  const handleDelete = async (id) => {
    if (!id) return;
    try {
      setLoading(true);
      const main = new Listing();
      const res = await main.AdminDeleteSales(id);

      if (res?.data?.status) {
        toast.success(res.data.message);
        fetchTeamList();
        onClose();
      } else {
        toast.error(res?.data?.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("error", error);
      toast.error(error?.response?.data?.message || "Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose} size={"max-w-[480px]"}>
      <div className="p-1 sm:p-3 text-center flex flex-col items-center">
        
        {/* Status Alert Badge (Fixed Size & Centering) */}
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3.5 border shrink-0 ${
            isBlocked
              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
              : "bg-rose-50 text-rose-600 border-rose-100"
          }`}
        >
          {isBlocked ? (
            <FiCheckCircle className="w-6 h-6 stroke-[2]" />
          ) : (
            <FiAlertTriangle className="w-6 h-6 stroke-[2]" />
          )}
        </div>

        {/* Modal Heading */}
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
          {actionText} Vendor Account
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
          {isBlocked
            ? "Are you sure you want to restore access and activate this vendor?"
            : "Are you sure you want to block and restrict access for this vendor?"}
        </p>

        {/* Vendor Information Card */}
        {member && (
          <div className="w-full mt-5 p-4 bg-white border border-slate-200/90 rounded-2xl text-left shadow-xs">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-blue-600 font-bold text-xs flex items-center justify-center shrink-0">
                  {initials}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-900 text-sm truncate capitalize">
                    {businessName}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium truncate">
                    Owner: {ownerName}
                  </p>
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

            <div className="pt-3 space-y-2 text-xs text-slate-600">
              {email && (
                <div className="flex items-center gap-2 truncate">
                  <FiMail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{email}</span>
                </div>
              )}
              {phone && (
                <div className="flex items-center gap-2 font-mono">
                  <FiPhone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{phone}</span>
                </div>
              )}
              {location && (
                <div className="flex items-center gap-2 capitalize">
                  <FiMapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 self-start mt-0.5" />
                  <span className="leading-snug">{location}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="w-full grid grid-cols-2 gap-3 mt-6">
          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 active:scale-[0.99] text-slate-700 font-semibold text-xs sm:text-sm rounded-xl transition-all disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => handleDelete(member?.user?._id)}
            className={`w-full py-2.5 px-4 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-all disabled:opacity-50 active:scale-[0.99] flex items-center justify-center gap-1.5 ${
              isBlocked
                ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20"
                : "bg-rose-600 hover:bg-rose-700 shadow-rose-600/20"
            }`}
          >
            {loading ? (
              <>
                <CgSpinner className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <span>Confirm {actionText}</span>
            )}
          </button>
        </div>

      </div>
    </Popup>
  );
}