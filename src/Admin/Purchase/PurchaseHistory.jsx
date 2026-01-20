import React, { useEffect, useRef, useState } from "react";
import HeaderAdmin from "../../common/HeaderAdmin";
import Listing from "../../Apis/Listing";
import Nodata from "../../common/Nodata";
import PurchaseTable from "../../common/PurchaseTable";
import LoadingSpinner from "../../common/LoadingSpinner";
import { CiSearch } from "react-icons/ci";

export default function PurchaseHistory() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.PurchasedOfferGet(searchQuery, statusFilter);
      if (response?.data?.status) {
        setData(response?.data?.data || []);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching team list:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 600);
    return () => clearTimeout(timer);
  }, [searchQuery, statusFilter]);


  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
  };

  // ✅ Handle Status Filter
  const handleStatusChange = (e) => {
    const val = e.target.value;
    setStatusFilter(val);
  };

  // console.log("data", data);

  return (
    <>
      <div className="w-full">
        <HeaderAdmin title="Purchased Offers" />
        {/* 🔹 Purchases Section */}
        <div className="py-2lg:py-2.5">
          <div className="bg-white rounded-[20px] mb-[10px] p-2">
            {/* Header */}
            <div className="px-4 py-4 flex flex-wrap justify-between items-center border-b border-black  border-opacity-10">
              <h2 className=" text-[16px] lg:text-[18px] font-bold font-[Poppins] font-[400] text-[#1E1E1E] m-0 tracking-[-0.03em]">
                Customer Purchases
              </h2>

              <div className="flex flex-col md:flex-row items-center w-full md:w-auto space-y-4 md:space-y-0 md:space-x-4">
                {/* Search */}
                <div className="relative w-full md:w-64">
                  <input
                    type="text"
                    placeholder="Search by owner or business name"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <CiSearch size={24} className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                </div>

                {/* Status Filter */}
                <select
                  className="w-full md:w-40 py-2 px-3 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm focus:ring-2 focus:ring-blue-500"
                  value={statusFilter}
                  onChange={handleStatusChange}
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="redeemed">Redeemed</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              {loading ? (
                <LoadingSpinner />
              ) : !data?.purchased?.length ? (
                <Nodata />
              ) : (
                <PurchaseTable data={data?.purchased} showCustomer={true} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
