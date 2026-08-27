import { IoMdEye } from "react-icons/io";
import HeaderAdmin from "../../common/HeaderAdmin";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../common/LoadingSpinner";
import Nodata from "../../common/Nodata";
import MyLineChart from "./MyLineChart";
import { MdDelete } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import Listing from "../../Apis/Listing";
import { FaListAlt, } from "react-icons/fa";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { FiUserCheck, FiUsers, FiPhone, FiMapPin, FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import moment from "moment";

function Dashboard() {
  const [data, setData] = useState([]);
  const [team, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  const [startDate, setStartDate] = useState(moment().subtract(30, "days").format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));

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

  const fetchData = async () => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.AdminDashbaord();
      // console.log("response", response?.data?.data);
      setTeams(response?.data?.data || {});
    } catch (error) {
      console.error("Error fetching team list:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSalesData = async (startDate, endDate) => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.AdminDashbaordSales(startDate, endDate);
      // console.log("response", response?.data?.data);
      setData(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching team list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      fetchSalesData(startDate, endDate);
    }
  }, [startDate, endDate]);

  const getStatusClasses = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
      case "active":
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

  //   console.log("team", team);

  return (
    <>
      <div className="w-full ">
        <HeaderAdmin title={"Admin Dashboard"} />
        <div className="py-2 lg:py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
            {/* Sales Personnel */}
            <Link
              to="/sales"
              className="group relative bg-white border border-slate-200/90 hover:border-emerald-500 rounded-[2rem] p-6 shadow-xs hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Ambient Watermark Icon */}
              <FiUsers className="absolute -right-3 -bottom-3 text-7xl text-slate-100 group-hover:text-emerald-500/10 transition-colors pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl shadow-md shadow-emerald-600/30 transition-transform">
                  <FiUsers className="text-2xl" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                  Team
                </span>
              </div>

              <div className="relative z-10 mt-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-600 block">
                  Total Sales Person
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
                  {team?.stats?.total_sales ?? 0}
                </h2>
              </div>
            </Link>

            {/* Total Vendors */}
            <Link
              to="/vendor"
              className="group relative bg-white border border-slate-200/90 hover:border-blue-500 rounded-[2rem] p-6 shadow-xs hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <LiaShoppingBagSolid className="absolute -right-3 -bottom-3 text-7xl text-slate-100 group-hover:text-blue-500/10 transition-colors pointer-events-none" />
              <div className="relative z-10 flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl shadow-md shadow-blue-600/30 transition-transform">
                  <LiaShoppingBagSolid className="text-2xl" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
                  Vendors
                </span>
              </div>
              <div className="relative z-10 mt-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-600 block">
                  Total Vendors
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
                  {team?.stats?.total_vendors ?? 0}
                </h2>
              </div>
            </Link>

            {/* Active Offers */}
            <Link
              to="/vendor"
              className="group relative bg-white border border-slate-200/90 hover:border-amber-500 rounded-[2rem] p-6 shadow-xs hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <BiSolidOffer className="absolute -right-3 -bottom-3 text-7xl text-slate-100 group-hover:text-amber-500/10 transition-colors pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl shadow-md shadow-amber-500/30 transition-transform">
                  <BiSolidOffer className="text-2xl" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200/60">
                  Deals
                </span>
              </div>
              <div className="relative z-10 mt-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-600 block">
                  Active Offers
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
                  {team?.stats?.active_offers ?? 0}
                </h2>
              </div>
            </Link>

            {/* Total Customers */}
            <Link
              to="/customer"
              className="group relative bg-white border border-slate-200/90 hover:border-purple-500 rounded-[2rem] p-6 shadow-xs hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <FiUserCheck className="absolute -right-3 -bottom-3 text-7xl text-slate-100 group-hover:text-purple-500/10 transition-colors pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-xl shadow-md shadow-purple-600/30 transition-transform">
                  <FiUserCheck className="text-2xl" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200/60">
                  Clients
                </span>
              </div>

              <div className="relative z-10 mt-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-600 block">
                  Total Customers
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
                  {team?.stats?.total_customers ?? 0}
                </h2>
              </div>
            </Link>
          </div>
          <div>
            <MyLineChart data={data} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
          </div>
          <style>{`
            @keyframes vendorCardIn {
              from { opacity: 0; transform: translateY(6px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .vendor-card {
              animation: vendorCardIn 0.35s ease both;
            }
          `}</style>

          <div className="w-full bg-white rounded-2xl p-4 md:p-6 mt-[20px]">
            <div className="flex flex-wrap justify-between items-center border-opacity-10 mb-4 pb-2">
              <h2 className="text-base lg:text-lg font-bold font-[Poppins] text-[#1E1E1E] tracking-[-0.03em]">
                Latest Vendors
              </h2>
            </div>
            
            {team?.vendors && team?.vendors.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-2xl border border-gray-100 shadow-xs">
                <Nodata />
                <p className="font-[Poppins] text-[13px] text-[#8C9199] -mt-2">
                  No vendors found.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {team?.vendors && team?.vendors?.map((vendor, index) => {
                  const isDeleted = !!vendor?.user?.deleted_at;
                  return (
                    <div
                      key={vendor._id || index}
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

                        <span
                          className={`px-2.5 py-1 text-[11px] font-semibold rounded-full capitalize ${getStatusClasses(
                            vendor?.status
                          )}`}
                        >
                          {vendor?.status}
                        </span>
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
                      <div className="flex items-center justify-end pt-3 border-t border-[#F0F0F3]">
                        <Link
                          to={`/vendor/${vendor?._id}`}
                          title="View"
                          aria-label={`View ${vendor?.business_name}`}
                          className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 transition-colors"
                        >
                          <IoMdEye size={16} className="text-blue-600" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;