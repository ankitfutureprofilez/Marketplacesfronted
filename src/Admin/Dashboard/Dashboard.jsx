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
import { FiUserCheck, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import moment from "moment";

function Dashboard() {
  const [data, setData] = useState([]);
  const [team, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  const [startDate, setStartDate] = useState(moment().subtract(30, "days").format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));

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
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "active":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "";
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
          <div className="w-full  bg-white p-[10px] md:p-[25px] rounded-[10px] md:rounded-[20px] mt-[15px]">
            <div className=" flex flex-wrap justify-between items-center border-b border-black  border-opacity-10">
              <h2 className=" text-base lg:text-lg font-bold font-[Poppins] font-[400] text-[#1E1E1E] mb-4 tracking-[-0.03em]">
                Latest Vendors
              </h2>
            </div>
            <div className="overflow-auto">
              <table className="w-full table-auto whitespace-nowrap">
                <thead className="mb-[15px]">
                  <tr>
                    <th className="font-[Poppins] font-[600] text-[14px] text-[#8C9199] uppercase text-left p-[10px] mb-[10px]">
                      S. No.
                    </th>
                    <th className="font-[Poppins] font-[600] text-[14px] text-[#8C9199] uppercase text-left p-[10px] mb-[10px]">
                      BUSINESS NAME
                    </th>
                    <th className="font-[Poppins] font-[600] text-[14px] text-[#8C9199] uppercase text-center p-[10px]">
                      OWNER NAME
                    </th>
                    <th className="font-[Poppins] font-[600] text-[14px] text-[#8C9199] uppercase text-center p-[10px]">
                      MOBILE
                    </th>
                    <th className="font-[Poppins] font-[600] text-[14px] text-[#8C9199] uppercase text-center p-[10px]">
                      CITY
                    </th>
                    <th className="font-[Poppins] font-[600] text-[14px] text-[#8C9199] uppercase text-center p-[10px]">
                      ADDRESS
                    </th>
                    <th className="font-[Poppins] font-[600] text-[14px] text-[#8C9199] uppercase text-center p-[10px]">
                      STATUS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {team?.vendors && team?.vendors?.map((vendor, index) => (
                    <tr
                      key={index}
                      className="bg-white border-t transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                      <td className="font-[Poppins] font-[400] text-gray-800 text-[14px] text-left px-[10px] py-[16px] capitalize">
                        {index + 1}
                      </td>
                      <td className="font-[Poppins] font-[400] text-gray-800 text-[14px] text-left px-[10px] py-[16px] capitalize">
                        {vendor?.business_name}
                      </td>
                      <td className="font-[Poppins] font-[400] text-gray-800 text-[14px] text-center px-[10px] py-[16px] capitalize">
                        {vendor?.user?.name}
                      </td>
                      <td className="font-[Poppins] font-[400] text-gray-800 text-[14px] text-center px-[10px] py-[16px] capitalize">
                        {vendor?.user?.phone}
                      </td>
                      <td className="font-[Poppins] font-[400] text-gray-800 text-[14px] text-center px-[10px] py-[16px] capitalize">
                        {vendor?.city}
                      </td>
                      <td className="font-[Poppins] font-[400] text-gray-800 text-[14px] text-center px-[10px] py-[16px] capitalize">
                        {vendor?.address}
                      </td>
                      <td className="text-center font-[Poppins] font-[400] text-black text-[14px] text-left px-[10px] py-[16px] capitalize">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${getStatusClasses(
                            vendor?.status
                          )}`}
                        >
                          {vendor?.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;