import { IoMdEye } from "react-icons/io";
import HeaderAdmin from "../../common/HeaderAdmin";
import AuthLayout from "../../component/AuthLayout";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../common/LoadingSpinner";
import Nodata from "../../common/Nodata";
import MyLineChart from "./MyLineChart";
import { MdDelete } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import Listing from "../../Apis/Listing";
import { FaListAlt, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

function Dashboard() {
  const [team, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.AdminDashbaord();
      console.log("response", response?.data?.data);
      setTeams(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching team list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    <AuthLayout>
      <div className="w-full ">
        <HeaderAdmin title={"Admin Dashboard"} />
        <div className="px-4 py-2 lg:px-4 lg:py-4">
          <div className="w-full flex flex-wrap md:flex-nowrap gap-[15px] mb-[20px]">
            <Link
              to="/sales"
              className="flex items-center gap-[5px] xl:gap-[8px] lg:gap-[10px] xl:gap-[15px] bg-white rounded-[10px] md:rounded-[10px] lg:rounded-[20px] p-[10px] md:p-[10px] lg:p-[25px] w-full md:w-4/12"
            >
              <div className="flex items-center justify-center  w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[80px] lg:h-[80px] rounded-[8px]">
                <FaUsers className="text-black text-[30px]" />
              </div>
              <div className="pl-[2px] lg:pl-[10px] xl:pl-[15px]">
                <h3 className="capitalize font-[Poppins] font-[400] text-black text-[14px] leading-[15px] mb-[2px] lg:mb-[5px] lg:mb-[8px] ">
                  Total Sales Person
                </h3>
                <h2 className="font-[Poppins] font-[400] text-black text-[25px] md:text-[28px] lg:text-[35px] xl:text-[48px] leading-[48px]">
                  {team?.stats?.total_sales}
                </h2>
              </div>
            </Link>

            <Link
              to="/vendor"
              className="flex items-center gap-[5px] xl:gap-[8px] lg:gap-[10px] xl:gap-[15px] bg-white rounded-[10px] md:rounded-[10px] lg:rounded-[20px] p-[10px] md:p-[10px] lg:p-[25px] w-full md:w-4/12"
            >
              <div className="flex items-center justify-center  w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[80px] lg:h-[80px] rounded-[8px]">
                <FaListAlt className="text-black text-[30px]" />
              </div>
              <div className="pl-[2px] lg:pl-[10px] xl:pl-[15px]">
                <h3 className="capitalize font-[Poppins] font-[400] text-black text-[14px] leading-[15px] mb-[2px] lg:mb-[5px] lg:mb-[8px]  ">
                  Total Vendors
                </h3>
                <h2 className="font-[Poppins] font-[400] text-black text-[25px] md:text-[28px] lg:text-[35px] xl:text-[48px] leading-[48px]">
                  {team?.stats?.total_vendors}
                </h2>
              </div>
            </Link>

            <Link
              to="/vendor"
              className="flex items-center gap-[5px] xl:gap-[8px] lg:gap-[10px] xl:gap-[15px] bg-white rounded-[10px] md:rounded-[10px] lg:rounded-[20px] p-[10px] md:p-[10px] lg:p-[25px] w-full md:w-4/12"
            >
              <div className="flex items-center justify-center  w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[80px] lg:h-[80px] rounded-[8px]">
                <FaUsers className="text-black text-[30px]" />
              </div>
              <div className="pl-[2px] lg:pl-[10px] xl:pl-[15px]">
                <h3 className="capitalize font-[Poppins] font-[400] text-black text-[14px] leading-[15px] mb-[2px] lg:mb-[5px] lg:mb-[8px]  ">
                  Active Offers
                </h3>
                <h2 className="font-[Poppins] font-[400] text-black text-[25px] md:text-[28px] lg:text-[35px] xl:text-[48px] leading-[48px]">
                  {team?.stats?.active_offers}
                </h2>
              </div>
            </Link>

            <Link
              to="/vendor"
              className="flex items-center gap-[5px] xl:gap-[8px] lg:gap-[10px] xl:gap-[15px] bg-white rounded-[10px] md:rounded-[10px] lg:rounded-[20px] p-[10px] md:p-[10px] lg:p-[25px] w-full md:w-4/12"
            >
              <div className="flex items-center justify-center  w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[80px] lg:h-[80px] rounded-[8px]">
                <BiSolidOffer className="text-black text-[30px]" />
              </div>
              <div className="pl-[2px] lg:pl-[10px] xl:pl-[15px]">
                <h3 className="capitalize font-[Poppins] font-[400] text-black text-[14px] leading-[15px] mb-[2px] lg:mb-[5px] lg:mb-[8px] ">
                  OFFERS Sold
                </h3>
                <h2 className="font-[Poppins] font-[400] text-black text-[25px] md:text-[28px] lg:text-[35px] xl:text-[48px] leading-[48px]">
                  {team?.stats?.total_offer_buys}
                </h2>
              </div>
            </Link>
          </div>
          <div>
            <MyLineChart data={team?.last7Days} />
          </div>
          <div className="w-full  bg-white p-[10px] md:p-[25px] rounded-[10px] md:rounded-[20px] mt-[15px]">
            <div className="px-4 py-4 flex flex-wrap justify-between items-center border-b border-black  border-opacity-10">
              <h2 className=" text-base lg:text-lg font-bold font-[Poppins] font-[400] text-[#1E1E1E] m-0 tracking-[-0.03em]">
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
                      <td className="font-[Poppins] font-[400] text-black text-[16px] text-left px-[10px] py-[16px] capitalize">
                        {index + 1}
                      </td>
                      <td className="font-[Poppins] font-[400] text-black text-[16px] text-left px-[10px] py-[16px] capitalize">
                        {vendor?.business_name}
                      </td>
                      <td className="font-[Poppins] font-[400] text-black text-[16px] text-center px-[10px] py-[16px] capitalize">
                        {vendor?.user?.name}
                      </td>
                      <td className="font-[Poppins] font-[400] text-black text-[16px] text-center px-[10px] py-[16px] capitalize">
                        {vendor?.user?.phone}
                      </td>
                      <td className="font-[Poppins] font-[400] text-black text-[16px] text-center px-[10px] py-[16px] capitalize">
                        {vendor?.city}
                      </td>
                      <td className="font-[Poppins] font-[400] text-black text-[16px] text-center px-[10px] py-[16px] capitalize">
                        {vendor?.address}
                      </td>
                      <td className="text-center font-[Poppins] font-[400] text-black text-[16px] text-left px-[10px] py-[16px] capitalize">
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
    </AuthLayout>
  );
}

export default Dashboard;