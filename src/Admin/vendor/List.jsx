import { useEffect, useRef, useState } from "react";
import Listing from "../../Apis/Listing";
import LoadingSpinner from "../../common/LoadingSpinner";
import Nodata from "../../common/Nodata";
import HeaderAdmin from "../../common/HeaderAdmin";
import { IoMdEye } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import AssignStaff from "./AssignStaff";
import DeleteVendor from "./DeleteVendor";
import { MdBlock } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import { useRole } from "../../context/RoleContext";
import { hasPermission } from "../../common/Permissions";
import { FiSearch, FiMapPin, FiPhone, FiShoppingBag, FiX, FiUserCheck } from "react-icons/fi";

function List() {
  const [team, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [categories, setCategories] = useState([]);
  const timerRef = useRef(null);
  const { user } = useRole();

  const canCreate = hasPermission(user, "create_vendor");
  const canUpdate = hasPermission(user, "update_vendor");
  const canDelete = hasPermission(user, "delete_vendor");

  const [isOpen, setIsOpen] = useState(false);
  const closePopup = () => setIsOpen(false);

  const [selected, setSelected] = useState(null);

  const initials = (name = "") =>
    name
      .trim()
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("") || "?";

  const avatarPalette = [
    "bg-indigo-50 text-indigo-600",
    "bg-emerald-50 text-emerald-600",
    "bg-orange-50 text-orange-600",
    "bg-purple-50 text-purple-600",
    "bg-rose-50 text-rose-600",
    "bg-sky-50 text-sky-600",
  ];
  const avatarColor = (name = "") => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return avatarPalette[Math.abs(hash) % avatarPalette.length];
  };

  // ✅ Fetch Vendor List
  const fetchTeamList = async (search = "", status = "", category = "", loading = true) => {
    try {
      if (loading) {
        setLoading(true);
      }
      const main = new Listing();
      const response = await main.Vendorget(search, status, category);
      setTeams(response?.data?.vendor || []);
    } catch (error) {
      console.error("Error fetching vendor list:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Search (with debounce)
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      fetchTeamList(
        val,
        statusFilter === "All Status" ? "" : statusFilter,
        categoryFilter
      );
    }, 600);
  };

  // ✅ Handle Status Filter
  const handleStatusChange = (e) => {
    const val = e.target.value;
    setStatusFilter(val);
    fetchTeamList(searchQuery, val === "All Status" ? "" : val, categoryFilter);
  };

  // ✅ Handle Category Filter
  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setCategoryFilter(val);
    fetchTeamList(
      searchQuery,
      statusFilter === "All Status" ? "" : statusFilter,
      val
    );
  };

  const STATUS_OPTIONS = [
    { value: "pending", label: "Pending" },
    { value: "verify", label: "Verify" },
    { value: "rejected", label: "Rejected" },
  ];

  // ✅ Status Label Classes
  const getStatusClasses = (status) => {
    switch (status) {
      case "verify":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ✅ Toggle Vendor Status
  const handleStatusToggle = async (id, newStatus) => {
    try {
      // setLoading(true);
      const main = new Listing();
      await main.vendorStatus(id, newStatus);
      fetchTeamList(searchQuery, statusFilter, categoryFilter, false);
    } catch (error) {
      console.error("Error updating vendor status:", error);
    } finally {
      // setLoading(false);
    }
  };


  // ✅ Initial Data Load
  useEffect(() => {
    fetchTeamList();
    const main = new Listing();
    main
      .category()
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const [staffList, setStaffList] = useState([]);
  const [loadingStaff, setLoadingStaff] = useState(false);

  const fetchSalesList = async () => {
    try {
      setLoadingStaff(true);
      const main = new Listing();
      const response = await main.getsales();
      setStaffList(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching staff list:", error);
    } finally {
      setLoadingStaff(false);
    }
  };

  // Fetch once on mount
  useEffect(() => {
    fetchSalesList();
  }, []);

  return (
    <>
      <style>{`
        @keyframes vendorCardIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .vendor-card {
          animation: vendorCardIn 0.35s ease both;
        }
      `}</style>

      <div className="w-full min-h-full">
        <HeaderAdmin title="Vendor Listing" />

        <div className="">
          <div className="mb-4 overflow-hidden">
            {/* 🔹 Header + Filters */}
            <div className="px-5 py-4 flex flex-wrap justify-between items-center bg-white gap-4 border border-gray-200 rounded-2xl mb-4">
              <div className="flex items-baseline gap-2">
                <h2 className="text-[15px] lg:text-base font-semibold font-[Poppins] text-[#14161A] tracking-tight m-0">
                  Vendor Listing
                </h2>
                {!loading && (
                  <span className="font-[Poppins] text-[12px] text-[#8C9199]">
                    {team.length} {team.length === 1 ? "vendor" : "vendors"}
                  </span>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 w-full md:w-auto">
                {/* Search */}
                <div className="relative w-full sm:w-60">
                  <FiSearch className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C9199]" />
                  <input
                    type="text"
                    placeholder="Search by owner or business name"
                    className="w-full pl-10 pr-9 py-2.5 bg-[#FAFAFB] border border-[#ECEDF2] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 text-[13px] font-[Poppins] text-[#14161A] placeholder:text-[#8C9199] transition-colors"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        fetchTeamList("", statusFilter === "All Status" ? "" : statusFilter, categoryFilter);
                      }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-md text-[#8C9199] hover:text-[#14161A] hover:bg-[#ECEDF2] transition-colors"
                    >
                      <FiX size={14} />
                    </button>
                  )}
                </div>

                {/* Status Filter */}
                <select
                  className="w-full sm:w-36 py-2.5 px-3 bg-[#FAFAFB] border border-[#ECEDF2] rounded-xl text-[13px] font-[Poppins] text-[#14161A] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-colors cursor-pointer"
                  value={statusFilter}
                  onChange={handleStatusChange}
                >
                  <option>All Status</option>
                  <option value="verify">Verify</option>
                  <option value="unverify">Unverify</option>
                  <option value="pending">Pending</option>
                </select>

                {/* Category Filter */}
                <select
                  className="w-full sm:w-40 py-2.5 px-3 bg-[#FAFAFB] border border-[#ECEDF2] rounded-xl text-[13px] font-[Poppins] text-[#14161A] focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-colors cursor-pointer"
                  value={categoryFilter}
                  onChange={handleCategoryChange}
                >
                  <option value="">All Categories</option>
                  {categories?.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                {/* Add Vendor Button */}
                {canCreate && (
                  <Link
                    to="/vendor/add"
                    className="bg-blue-600 text-white px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 active:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 transition-colors duration-150 text-[13px] font-medium font-[Poppins] whitespace-nowrap"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Add Vendor</span>
                  </Link>
                )}
              </div>
            </div>

            {/* 🔹 Cards Grid */}
            <div className="">
              {loading ? (
                <div className="py-16 flex justify-center">
                  <LoadingSpinner />
                </div>
              ) : team.length === 0 ? (
                <div className="text-center">
                  <Nodata />
                  <p className="font-[Poppins] text-[13px] text-[#8C9199] -mt-2">
                    {searchQuery
                      ? `No vendors match search query.`
                      : "Vendors you add will show up here."}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {team &&
                    team?.map((vendor, index) => {
                      const isDeleted = !!vendor?.user?.deleted_at;
                      return (
                        <div
                          key={vendor._id}
                          style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
                          className={`vendor-card relative bg-white border border-[#ECEDF2] rounded-2xl p-4 transition-all duration-200 hover:shadow-[0_4px_20px_rgba(20,22,26,0.06)] hover:-translate-y-0.5 ${
                            isDeleted ? "opacity-60" : ""
                          }`}
                        >
                          {/* Card Header */}
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <span
                                className={`flex items-center justify-center w-11 h-11 rounded-full text-[14px] font-semibold shrink-0 transition-transform duration-200 group-hover:scale-105 ${avatarColor(
                                  vendor?.business_name || ""
                                )}`}
                              >
                                {initials(vendor?.business_name)}
                              </span>
                              <div className="min-w-0">
                                <h3 className="font-[Poppins] font-semibold text-[14px] text-[#14161A] capitalize truncate" title={vendor?.business_name}>
                                  {vendor?.business_name}
                                </h3>
                                <p className="font-[Poppins] text-[11px] text-gray-500 truncate">
                                  Owner: <span className="font-semibold text-gray-700 capitalize">{vendor?.user?.name || "--"}</span>
                                </p>
                              </div>
                            </div>

                            {/* Status Selector Dropdown */}
                            <select
                              value={vendor?.Verify_status}
                              onChange={(e) =>
                                handleStatusToggle(vendor._id, e.target.value)
                              }
                              disabled={loading}
                              className={`px-2.5 py-1 text-[11px] font-semibold rounded-full cursor-pointer outline-none ring-1 ring-inset ring-opacity-10 capitalize ${getStatusClasses(
                                vendor?.Verify_status
                              )}`}
                            >
                              {STATUS_OPTIONS.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                              ))}
                            </select>
                          </div>

                          {/* Card Body */}
                          <div className="space-y-2 mb-4 font-[Poppins] text-[13px] text-gray-600">
                            <div className="flex items-center gap-2 min-w-0">
                              <FiPhone className="text-gray-500 shrink-0" size={14} />
                              <span className="truncate">{vendor?.user?.phone || "--"}</span>
                            </div>
                            <div className="flex items-center gap-2 min-w-0">
                              <FiMapPin className="text-gray-500 shrink-0" size={14} />
                              <span className="truncate capitalize">{vendor?.city || "--"}</span>
                            </div>
                            <div className="flex items-center gap-2 min-w-0">
                              <FiShoppingBag className="text-gray-500 shrink-0" size={14} />
                              <span className="truncate text-slate-600">
                                {vendor.category?.name || "No Category"} 
                                {vendor.subcategory?.name && ` • ${vendor.subcategory?.name}`}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FiUserCheck className="text-gray-500 shrink-0" size={14} />
                              <span className="text-xs text-slate-500">
                                Created By:{" "}
                                <span className="font-semibold text-slate-700 capitalize">
                                  {vendor?.assign_staff ? (vendor?.added_by?.role || "admin") : "--"}
                                </span>
                              </span>
                            </div>
                          </div>

                          {/* Card Footer */}
                          <div className="flex items-center justify-between pt-3 border-t border-[#F0F0F3] gap-2">
                            <div className="min-w-0">
                              <AssignStaff
                                id={vendor._id}
                                fetchTeamList={fetchTeamList}
                                assign_staff={vendor?.assign_staff}
                                staffList={staffList}
                                loadingStaff={loadingStaff}
                              />
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <Link
                                to={`/vendor/${vendor?._id}`}
                                title="View"
                                aria-label={`View ${vendor?.business_name}`}
                                className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 transition-colors"
                              >
                                <IoMdEye size={16} className="text-blue-600" />
                              </Link>
                              {canUpdate && (
                                <Link
                                  to={`/vendor/add/${vendor._id}`}
                                  title="Edit"
                                  aria-label={`Edit ${vendor?.business_name}`}
                                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-50 hover:bg-green-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/40 transition-colors"
                                >
                                  <MdEdit size={16} className="text-green-600" />
                                </Link>
                              )}
                              {canDelete && (
                                <button
                                  onClick={() => {
                                    setSelected(vendor);
                                    setIsOpen(true);
                                  }}
                                  title={isDeleted ? "Unblock" : "Block"}
                                  aria-label={`${isDeleted ? "Unblock" : "Block"} ${vendor?.business_name}`}
                                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40 transition-colors cursor-pointer"
                                >
                                  {isDeleted ? (
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
      <DeleteVendor
        isOpen={isOpen}
        onClose={closePopup}
        member={selected}
        fetchTeamList={fetchTeamList}
      />
    </>
  );
}

export default List;
