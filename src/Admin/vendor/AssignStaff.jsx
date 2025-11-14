import React, { useState } from "react";
import Listing from "../../Apis/Listing";
import toast from "react-hot-toast";

export default function AssignStaff({ id, fetchTeamList, assign_staff, staffList = [], loadingStaff }) {
  const [assigning, setAssigning] = useState(false);

  console.log("staffList", staffList);

  const handleAssignStaff = async (staffId) => {
    if (!staffId) return;
    try {
      setAssigning(true);
      const main = new Listing();
      const response = await main.assignStaff({
        vendor_id: id,
        assign_staff: staffId,
      });
      if (response?.data?.status) {
        toast.success(response?.data?.message);
        fetchTeamList();
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error("Error assigning staff:", error);
      toast.error("Something went wrong while assigning staff.");
    } finally {
      setAssigning(false);
    }
  };

  if (assign_staff?._id) {
    return (
      <div className="text-sm font-medium text-gray-800 py-1">
        {assign_staff?.name || "—"}
      </div>
    );
  }

  return (
    <select
      disabled={loadingStaff || assigning}
      defaultValue=""
      onChange={(e) => handleAssignStaff(e.target.value)}
      className="rounded-md border border-[#D9D9D9] text-sm focus:outline-none focus:ring-0 tracking-[-0.03em] capitalize px-2 py-1"
    >
      <option value="">Select Staff</option>
      {staffList.map((s) => (
        <option key={s._id} value={s._id}>
          {s.name}
        </option>
      ))}
    </select>
  );
}
