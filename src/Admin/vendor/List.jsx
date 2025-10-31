import { useEffect, useRef, useState } from "react";
import Listing from "../../Apis/Listing";
import LoadingSpinner from "../../common/LoadingSpinner";
import Nodata from "../../common/Nodata";
import HeaderAdmin from "../../common/HeaderAdmin";
import AuthLayout from "../../component/AuthLayout";
import { IoMdEye } from "react-icons/io";
import { Link } from "react-router-dom";
import Delete from "./Delete";
import { MdEdit } from "react-icons/md";
import AssignStaff from "./AssignStaff";

function List() {
  const [team, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categoryFilter, setCategoryFilter] = useState("");

  const [categories, setCategories] = useState([]);
  const timerRef = useRef(null);

  // ✅ Fetch Vendor List
  const fetchTeamList = async (
    search = "",
    status = "",
    category = ""
  ) => {
    try {
      setLoading(true);
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
      fetchTeamList(val, statusFilter === "All Status" ? "" : statusFilter, categoryFilter);
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
    fetchTeamList(searchQuery, statusFilter === "All Status" ? "" : statusFilter, val);
  };

  // ✅ Status Label Classes
  const getStatusClasses = (status) => {
    switch (status) {
      case "verify":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "unverify":
      case "deleted":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ✅ Toggle Vendor Status
  const handleStatusToggle = async (id, status) => {
    const newStatus = status === "verify" ? "unverify" : "verify";
    try {
      setLoading(true);
      const main = new Listing();
      await main.vendorStatus(id, newStatus);
      fetchTeamList(searchQuery, statusFilter, categoryFilter);
    } catch (error) {
      console.error("Error updating vendor status:", error);
    } finally {
      setLoading(false);
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
      const response = await main.showsales();
      setStaffList(response?.data?.data?.userData || []);
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
    <AuthLayout>
      <div className="w-full">
        <HeaderAdmin title="Vendor Listing" />

        <div className="px-4 py-2 lg:px-10 lg:py-2.5">
          <div className="bg-white rounded-[20px] mb-[30px] p-6">
            {/* 🔹 Header + Filters */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
              <h1 className="text-2xl font-semibold text-gray-800">Vendors Listing</h1>

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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Status Filter */}
                <select
                  className="w-full md:w-40 py-2 px-3 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm focus:ring-2 focus:ring-blue-500"
                  value={statusFilter}
                  onChange={handleStatusChange}
                >
                  <option>All Status</option>
                  <option value="verify">Verify</option>
                  <option value="unverify">UnVerify</option>
                </select>

                {/* Category Filter */}
                <select
                  className="w-full md:w-40 py-2 px-3 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm focus:ring-2 focus:ring-blue-500"
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

                {/* Add Vendor */}
                <Link
                  to="/vendor/add"
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Add Vendor</span>
                </Link>
              </div>
            </div>

            {/* 🔹 Table */}
            <div className="overflow-x-auto">
              {loading ? (
                <LoadingSpinner />
              ) : team.length === 0 ? (
                <Nodata />
              ) : (
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "S. No.",
                        "Business Name",
                        "Owner Name",
                        "Mobile",
                        "Category",
                        "Sub Category",
                        "City",
                        "Sales",
                        "Status",
                        "Action",
                      ].map((header) => (
                        <th
                          key={header}
                          className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {team.map((vendor, index) => {
                      const isDeleted = !!vendor.delete_At;
                      return (
                        <tr
                          key={vendor._id}
                          className={`${isDeleted ? "bg-gray-200 opacity-60 pointer-events-none" : "bg-white"}`}
                        >
                          <td className="px-6 py-4">{index + 1}</td>
                          <td className="px-6 py-4 font-medium text-gray-900">{vendor.business_name}</td>
                          <td className="px-6 py-4 text-[#46494D]">{vendor?.user?.name}</td>
                          <td className="px-6 py-4 text-[#46494D]">{vendor.user?.phone}</td>
                          <td className="px-6 py-4 text-[#46494D]">{vendor.category?.name}</td>
                          <td className="px-6 py-4 text-[#46494D]">{vendor.subcategory?.name}</td>
                          <td className="px-6 py-4 text-[#46494D]">{vendor.city}</td>
                          <td className="px-6 py-4 text-[#46494D]">
                            <AssignStaff
                              id={vendor._id}
                              fetchTeamList={fetchTeamList}
                              assign_staff={vendor?.assign_staff}
                              staffList={staffList}
                              loadingStaff={loadingStaff}
                            />
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full cursor-pointer ${isDeleted
                                ? "bg-gray-400 text-white"
                                : getStatusClasses(vendor?.Verify_status)
                                }`}
                              onClick={() =>
                                !isDeleted && handleStatusToggle(vendor._id, vendor?.Verify_status)
                              }
                            >
                              {isDeleted ? "Deleted" : vendor?.Verify_status}
                            </span>
                          </td>
                          <td className="px-6 py-4 flex justify-center gap-3">
                            {!isDeleted && (
                              <>
                                <Link to={`/vendor/${vendor._id}`}>
                                  <IoMdEye size={22} className="text-blue-600 hover:text-blue-900" />
                                </Link>
                                <Link to={`/vendor/add/${vendor._id}`}>
                                  <MdEdit size={22} className="text-green-600 hover:text-green-900" />
                                </Link>
                                <Delete Id={vendor._id} step={1} fetchTeamList={fetchTeamList} />
                              </>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default List;
