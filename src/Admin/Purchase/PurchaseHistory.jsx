import React, { useEffect, useRef, useState } from "react";
import HeaderAdmin from "../../common/HeaderAdmin";
import Listing from "../../Apis/Listing";
import Nodata from "../../common/Nodata";
import PurchaseTable from "../../common/PurchaseTable";
import LoadingSpinner from "../../common/LoadingSpinner";
import Pagination from "../../component/Pagination";
import { CiSearch } from "react-icons/ci";
import { FiX } from "react-icons/fi";

export default function PurchaseHistory() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.PurchasedOfferGet(searchQuery, statusFilter, page);
      if (response?.data?.status) {
        const newData = response?.data?.data?.purchased || [];
        setData(newData);
        setTotalPages(response?.data?.data?.total_pages || 1);
      } else {
        setData([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching team list:", error);
      setData([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 600);
    return () => clearTimeout(timer);
  }, [searchQuery, statusFilter, page]);


  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    setPage(1);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setPage(1);
  };

  // ✅ Handle Status Filter
  const handleStatusChange = (e) => {
    const val = e.target.value;
    setStatusFilter(val);
    setPage(1);
  };

  // console.log("data", data);

  return (
    <>
      <div className="w-full min-h-full">
        <HeaderAdmin title="Purchased Offers" />
        {/* 🔹 Purchases Section */}
        <div className="">
          <div className="mb-4 overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 flex flex-wrap justify-between items-center bg-white gap-3 border border-gray-200 rounded-2xl mb-4">
              <div className="flex items-baseline gap-2">
                <h2 className="text-[15px] lg:text-base font-semibold font-[Poppins] text-[#14161A] tracking-tight m-0">
                  Customer Purchases
                </h2>
                {!loading && (
                  <span className="font-[Poppins] text-[12px] text-[#8C9199]">
                    {data.length} {data.length === 1 ? "purchase" : "purchases"}
                  </span>
                )}
              </div>

              <div className="flex flex-col md:flex-row items-stretch md:items-center w-full md:w-auto gap-3">
                {/* Search */}
                <div className="relative w-full md:w-64">
                  <CiSearch
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C9199]"
                  />
                  <input
                    type="text"
                    aria-label="Search by vendor name"
                    placeholder="Search by vendor name"
                    className="w-full pl-10 pr-9 py-2.5 bg-[#FAFAFB] border border-[#ECEDF2] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 text-[13px] font-[Poppins] text-[#14161A] placeholder:text-[#8C9199] transition-colors"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      aria-label="Clear search"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-md text-[#8C9199] hover:text-[#14161A] hover:bg-[#ECEDF2] transition-colors"
                    >
                      <FiX size={14} />
                    </button>
                  )}
                </div>

                {/* Status Filter */}
                <select
                  aria-label="Filter by status"
                  className="w-full md:w-40 py-2.5 px-3 bg-[#FAFAFB] border border-[#ECEDF2] rounded-xl text-[#14161A] text-[13px] font-[Poppins] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-colors"
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
            <div className="bg-white border border-[#ECEDF2] rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                {loading ? (
                  <div className="py-16 flex justify-center">
                    <LoadingSpinner />
                  </div>
                ) : !data?.length ? (
                  <div className="text-center py-4">
                    <Nodata />
                    <p className="font-[Poppins] text-[13px] text-[#8C9199] -mt-2">
                      {searchQuery
                        ? `No purchases match "${searchQuery}".`
                        : "Purchases will show up here once customers redeem offers."}
                    </p>
                  </div>
                ) : (
                  <PurchaseTable data={data} showCustomer={true} />
                )}
              </div>

              {totalPages > 1 && (
                <div className="px-5 py-3 border-t border-[#ECEDF2]">
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={(p) => setPage(p)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}