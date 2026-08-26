import { useEffect, useRef, useState } from "react";
import Listing from "../../Apis/Listing";
import HeaderAdmin from "../../common/HeaderAdmin";
import LoadingSpinner from "../../common/LoadingSpinner";
import Nodata from "../../common/Nodata";
import AddSales from "./AddSales";
import DeletePopup from "../Customer/DeletePopup";
import { HiOutlineUserAdd } from "react-icons/hi";
import { Link } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdBlock } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import { FiSearch, FiX, FiMail, FiPhone, FiMapPin, FiUsers } from "react-icons/fi";
import { useRole } from "../../context/RoleContext";
import { hasPermission } from "../../common/Permissions";

function SalesView() {
  const [Sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // console.log("searchQuery" ,searchQuery)
  const [isOpen, setIsOpen] = useState(false);
  const closePopup = () => setIsOpen(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const closeAddPopup = () => setIsAddOpen(false);

  const [selected, setSelected] = useState(null);
  const { user } = useRole();

  const canCreate = hasPermission(user, "create_sales");
  const canUpdate = hasPermission(user, "update_sales");
  const canDelete = hasPermission(user, "delete_sales");

  const timerRef = useRef(null);

  // const getStatusClasses = (status) => {
  //   switch (status) {
  //     case "active":
  //       return "bg-green-100 text-green-700 uppercase";
  //     case "inactive":
  //       return "bg-red-200 text-gray-700 uppercase";
  //     default:
  //       return "";
  //   }
  // };

  const fecthSalesList = async (search = "") => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.showsales(search);
      console.log("response", response);
      setSales(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching team list:", error);
      setSales([])
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fecthSalesList();
  }, []);

  // const handlestatus = async (id, status) => {
  //   const Statusdata = status === "active" ? "inactive" : "active";
  //   try {
  //     setLoading(true);
  //     const main = new Listing();
  //     const response = await main.StatusSales(id, Statusdata);
  //     if (response) fecthSalesList();
  //   } catch (error) {
  //     console.error("Error updating status:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      fecthSalesList(val || "");
    }, 600);
  };

  const clearSearch = () => {
    setSearchQuery("");
    if (timerRef.current) clearTimeout(timerRef.current);
    fecthSalesList("");
  };

  // console.log("Sales", Sales);

  return (
    <>
      <style>{`
        @keyframes salesCardIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .sales-card {
          animation: salesCardIn 0.35s ease both;
        }
      `}</style>

      <div className="w-full min-h-full">
        <HeaderAdmin title={"Sales Team"} />
        <div className="">
          <div className="mb-4 overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 flex flex-wrap justify-between items-center bg-white gap-3 border border-gray-200 rounded-2xl mb-4">
              <div className="flex items-baseline gap-2">
                <h2 className="text-[15px] lg:text-base font-semibold font-[Poppins] text-[#14161A] tracking-tight m-0">
                  Sales Team Listing
                </h2>
                {!loading && (
                  <span className="font-[Poppins] text-[12px] text-[#8C9199]">
                    {Sales.length} {Sales.length === 1 ? "salesperson" : "salespeople"}
                  </span>
                )}
              </div>
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto">
                {/* Search */}
                <div className="relative w-full md:w-64">
                  <FiSearch className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C9199]" />
                  <input
                    type="text"
                    aria-label="Search salespeople by name and email"
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
                  {canCreate && (
                    <button
                      onClick={() => {
                        setSelected(null);
                        setIsAddOpen(true);
                      }}
                      className="bg-blue-800 text-white px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-900 active:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 transition-colors duration-150 text-[13px] font-medium font-[Poppins] whitespace-nowrap"
                    >
                      <HiOutlineUserAdd className="w-4 h-4" />
                      <span>Add Salesperson</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Cards */}
            <div className="">
              {loading ? (
                <div className="py-16 flex justify-center">
                  <LoadingSpinner />
                </div>
              ) : Sales.length === 0 ? (
                <div className="text-center">
                  <Nodata />
                  <p className="font-[Poppins] text-[13px] text-[#8C9199] -mt-2">
                    {searchQuery
                      ? `No salespeople match "${searchQuery}".`
                      : "Salespeople you add will show up here."}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {Sales &&
                    Sales?.map((member, index) => {
                      const isDeleted = !!member.deleted_at;
                      return (
                        <div
                          key={member._id}
                          style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
                          className={`sales-card relative bg-white border border-[#ECEDF2] rounded-2xl p-4 transition-all duration-200 hover:shadow-[0_4px_20px_rgba(20,22,26,0.06)] hover:-translate-y-0.5 ${
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
                              <span>
                                {member?.phone}
                                {member?.alternate_phone && (
                                  <span className="text-gray-600"> · {member?.alternate_phone}</span>
                                )}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-[13px] text-gray-600 min-w-0">
                              <FiMapPin className="text-gray-600 shrink-0" size={14} />
                              <span className="truncate" title={member?.address}>
                                {member?.address || "N/A"}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-[#F0F0F3]">
                            <div className="flex items-center gap-1.5 text-[13px] font-[Poppins]">
                              <FiUsers className="text-gray-600" size={14} />
                              <span className="text-[#14161A] font-semibold tabular-nums">
                                {member?.assigned_vendors ?? 0}
                              </span>
                              <span className="text-gray-600">Vendors</span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <Link
                                to={`/sales/${member?._id}`}
                                title="View"
                                aria-label={`View ${member?.name}`}
                                className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 transition-colors"
                              >
                                <IoMdEye size={16} className="text-blue-600" />
                              </Link>
                              {canUpdate && (
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
                              )}
                              {canDelete && (
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
                              )}
                            </div>
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
        fetchCustomerList={fecthSalesList}
      />
      <AddSales
        isOpen={isAddOpen}
        onClose={closeAddPopup}
        member={selected}
        isEdit={selected !== null ? true : false}
        fecthSalesList={fecthSalesList}
      />
    </>
  );
}

export default SalesView;