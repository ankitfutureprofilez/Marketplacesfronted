import React, { useEffect, useState } from "react";
import Listing from "../../Apis/Listing";
import toast from "react-hot-toast";

export default function AssignStaff({ id, fetchTeamList  , assign_staff}) {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(false);
    const [assigning, setAssigning] = useState(false);

    const fetchSalesList = async () => {
        try {
            setLoading(true);
            const main = new Listing();
            const response = await main.showsales();
            setStaff(response?.data?.data?.userData || []);
        } catch (error) {
            console.error("Error fetching staff list:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSalesList();
    }, []);

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
            <div className="text-sm font-medium text-gray-800 text-center py-1 ">
                {assign_staff?.name || "—"}
            </div>
        );
    }

    return (
        <select
            disabled={loading || assigning}
            defaultValue=""
            onChange={(e) => handleAssignStaff(e.target.value)}
            className="rounded-md border border-[#D9D9D9] text-sm text-center py-1 px-2 
                 focus:outline-none focus:ring-0 tracking-[-0.03em]"
        >
            <option value="">Select Staff</option>
            {staff.map((s) => (
                <option key={s._id} value={s._id}>
                    {s.name}
                </option>
            ))}
        </select>
    );
}
