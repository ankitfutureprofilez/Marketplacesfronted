import React, { useEffect, useRef, useState } from "react";
import Listing from "../../Apis/Listing";
import HeaderAdmin from "../../common/HeaderAdmin";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdBlock } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import { HiOutlineUserAdd } from "react-icons/hi";
import LoadingSpinner from "../../common/LoadingSpinner";
import Nodata from "../../common/Nodata";
import Add from "./Add";
import DeletePopup from "../Customer/DeletePopup";
import { FiSearch, FiX, FiMail, FiPhone } from "react-icons/fi";

export default function AdminList() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const timerRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const closePopup = () => setIsOpen(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const closeAddPopup = () => setIsAddOpen(false);

  const [selected, setSelected] = useState(null);

  const fetchAdmins = async (search = "") => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.getSubAdmin(search);
      if (response?.data?.status) {
        setData(response?.data?.data || []);
      } else {
        // toast.error(response?.data?.message);
        setData([]);
      }
    } catch (error) {
      // toast.error(error?.response?.data?.message);
      console.error("Error fetching team list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      fetchAdmins(val || "");
    }, 600);
  };

  const clearSearch = () => {
    setSearchQuery("");
    if (timerRef.current) clearTimeout(timerRef.current);
    fetchAdmins("");
  };

  return (
    <>
      <style>{`
        @keyframes adminCardIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .admin-card {
          animation: adminCardIn 0.35s ease both;
        }
      `}</style>

      <div className="w-full min-h-full">
        <HeaderAdmin title={"Sub Admins"} />
        <div className="">
          <div className="mb-4 overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 flex flex-wrap justify-between items-center bg-white gap-3 border border-gray-200 rounded-3xl mb-4">
              <div className="flex items-baseline gap-2">
                <h2 className="text-[15px] lg:text-base font-semibold font-[Poppins] text-[#14161A] tracking-tight m-0">
                  Sub Admins Listing
                </h2>
                {!loading && (
                  <span className="font-[Poppins] text-[12px] text-[#8C9199]">
                    {data.length} {data.length === 1 ? "sub admin" : "sub admins"}
                  </span>
                )}
              </div>
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto">
                {/* Search */}
                <div className="relative w-full md:w-64">
                  <FiSearch className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C9199]" />
                  <input
                    type="text"
                    aria-label="Search sub admins by name and email"
                    placeholder="Search by name and email"
                    className="w-full pl-10 pr-9 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 text-[13px] font-[Poppins] text-[#14161A] placeholder:text-[#8C9199] transition-colors"
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
                {/* <AddSales fecthSalesList={fecthSalesList} /> */}
                <div className="inline-block">
                  <button
                    onClick={() => {
                      setSelected(null);
                      setIsAddOpen(true);
                    }}
                    className="bg-blue-800 text-white px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-900 active:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 transition-colors duration-150 text-[13px] font-medium font-[Poppins] whitespace-nowrap"
                  >
                    <HiOutlineUserAdd className="w-4 h-4" />
                    <span>Add Sub Admin</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Cards */}
            <div className="">
              {loading ? (
                <div className="py-16 flex justify-center">
                  <LoadingSpinner />
                </div>
              ) : data && data?.length === 0 ? (
                <div className="text-center">
                  <Nodata />
                  <p className="font-[Poppins] text-[13px] text-[#8C9199] -mt-2">
                    {searchQuery
                      ? `No sub admins match "${searchQuery}".`
                      : "Sub admins you add will show up here."}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {data &&
                    data?.map((member, index) => {
                      const isDeleted = !!member.deleted_at;
                      return (
                        <div
                          key={member._id}
                          style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
                          className={`admin-card relative bg-white border border-[#ECEDF2] rounded-3xl p-4 transition-all duration-200 shadow-sm hover:shadow-[0_4px_20px_rgba(20,22,26,0.06)] hover:-translate-y-0.5 ${
                            isDeleted ? "opacity-60" : ""
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <img
                                className={`h-11 w-11 rounded-full object-cover shrink-0 ring-1`}
                                src={member?.avatar || "/placeholder.png"}
                                alt={member?.name}
                              />
                              <div className="min-w-0">
                                <h3 className="font-[Poppins] font-semibold text-[14px] text-[#14161A] capitalize truncate">
                                  {member?.name}
                                </h3>
                                <p className="font-[Poppins] text-[12px] text-gray-600">
                                  #{String(index + 1).padStart(2, "0")}
                                </p>
                              </div>
                            </div>
                            <span
                              className={`px-2.5 py-1 shrink-0 inline-flex text-[11px] leading-4 font-medium rounded-full font-[Poppins] ${
                                isDeleted
                                  ? "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20"
                                  : "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20"
                              }`}
                            >
                              {isDeleted ? "Blocked" : "Active"}
                            </span>
                          </div>

                          <div className="space-y-2 mb-4 font-[Poppins]">
                            <div className="flex items-center gap-2 text-[13px] text-gray-600 min-w-0">
                              <FiMail className="text-gray-600 shrink-0" size={14} />
                              <span className="truncate">{member?.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[13px] text-gray-600">
                              <FiPhone className="text-gray-600 shrink-0" size={14} />
                              <span>{member?.phone}</span>
                            </div>
                          </div>

                          {/* <div className="font-[Poppins] uppercase text-gray-800 text-[14px] mb-3">
                            <span
                              onClick={() =>
                                handlestatus(member?._id, member?.status)
                              }
                              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer ${getStatusClasses(
                                member?.status
                              )}`}
                            >
                              {member?.status}
                            </span>
                          </div> */}

                          <div className="flex items-center justify-end gap-1.5 pt-3 border-t border-[#F0F0F3]">
                            {/* <Link to={`/sales/${member?._id}`} title="View">
                              <IoMdEye
                                size={22}
                                className="text-blue-600 hover:text-blue-900"
                              />
                            </Link> */}
                            <button
                              onClick={() => {
                                setIsAddOpen(true);
                                setSelected(member);
                              }}
                              title="Edit"
                              aria-label={`Edit ${member?.name}`}
                              className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-50 hover:bg-green-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/40 transition-colors"
                            >
                              <MdEdit size={16} className="text-green-600" />
                            </button>
                            <button
                              onClick={() => {
                                setIsOpen(true);
                                setSelected(member);
                              }}
                              title={member?.deleted_at ? "Unblock" : "Block"}
                              aria-label={`${member?.deleted_at ? "Unblock" : "Block"} ${member?.name}`}
                              className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40 transition-colors"
                            >
                              {member?.deleted_at ? (
                                <CgUnblock size={16} className="text-red-600" />
                              ) : (
                                <MdBlock size={16} className="text-red-600" />
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <DeletePopup
        isOpen={isOpen}
        onClose={closePopup}
        member={selected}
        fetchCustomerList={fetchAdmins}
      />
      <Add
        isOpen={isAddOpen}
        onClose={closeAddPopup}
        member={selected}
        isEdit={selected !== null ? true : false}
        fetchData={fetchAdmins}
      />
    </>
  );
}