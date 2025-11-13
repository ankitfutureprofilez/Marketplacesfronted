import { useEffect, useRef, useState } from "react";
import AuthLayout from "../../component/AuthLayout";
import Listing from "../../Apis/Listing";
import HeaderAdmin from "../../common/HeaderAdmin";
import Nodata from "../../common/Nodata";
import LoadingSpinner from "../../common/LoadingSpinner";
import DeletePopup from "./DeletePopup";

function CustomerList() {
  const [team, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const closePopup = () => setIsOpen(false);

  const [selected, setSelected] = useState(null);

  const timerRef = useRef(null);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      fetchCustomerList(val);
    }, 600);
  };

  const fetchCustomerList = async (search = "") => {
    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.customer(search);
      setTeams(response?.data?.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching team list:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerList();
  }, []);

  const handlestatus = async (id, status) => {
    const Statusdata = status === "active" ? "inactive" : "active";
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.StatusSales(id, Statusdata);
      if (response) fetchCustomerList();
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 uppercase";
      case "inactive":
        return "bg-red-200 text-gray-700 uppercase";
      default:
        return "";
    }
  };

  return (
    <AuthLayout>
      <div className="w-full ">
        <HeaderAdmin title={"Customer "} />
        <div className="px-4 py-2 lg:px-4 lg:py-2.5">
          <div className="bg-white rounded-[20px] mb-[10px] p-2">
            <div className="px-2 py-2 flex flex-wrap justify-between items-center border-b border-black  border-opacity-10">
              <h2 className=" text-base lg:text-lg font-bold font-[Poppins] font-[400] text-[#1E1E1E] m-0 tracking-[-0.03em]">
                Customer Listing
              </h2>
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
                <div className="relative w-full md:w-auto">
                  <input
                    type="text"
                    placeholder="Search by name and email"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              {loading ? (
                <LoadingSpinner />
              ) : team.length === 0 ? (
                <Nodata />
              ) : (
                <table className="w-full table-auto whitespace-nowrap">
                  <thead className="mb-[15px] border-b border-[#000000] border-opacity-10">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 font-[Poppins] font-[600] py-3 text-left text-[16px] font-medium text-[#8C9199] uppercase tracking-wider"
                      >
                        {" "}
                        S.No.
                      </th>
                      <th
                        scope="col"
                        className="px-6 font-[Poppins] font-[600] py-3 text-left text-[16px] font-medium text-[#8C9199] uppercase tracking-wider"
                      >
                        {" "}
                        NAME
                      </th>
                      <th
                        scope="col"
                        className="px-6 font-[Poppins] font-[600] py-3 text-left text-[16px] font-medium text-[#8C9199] uppercase tracking-wider"
                      >
                        EMAIL
                      </th>
                      <th
                        scope="col"
                        className="px-6 font-[Poppins] font-[600] py-3 text-left text-[16px] font-medium text-[#8C9199] uppercase tracking-wider"
                      >
                        PHONE
                      </th>
                      {/* <th
                        scope="col"
                        className="px-6 font-[Poppins] font-[600] py-3 text-left text-[16px] font-medium text-[#8C9199] uppercase tracking-wider"
                      >
                        Total coupons
                      </th> */}
                      <th
                        scope="col"
                        className="px-6 font-[Poppins] font-[600] py-3 text-left text-[16px] font-medium text-[#8C9199] uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 font-[Poppins] font-[600] py-3 text-left text-[16px] font-medium text-[#8C9199] uppercase tracking-wider"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {team &&
                      team?.map((member, index) => {
                        const isDeleted = !!member.deleted_at;
                        return (
                          <tr
                            key={index}
                            className={`bg-white ${
                              isDeleted ? "opacity-50" : ""
                            }`}
                          >
                            <td className="px-6 font-[Poppins] font-[400] py-4 whitespace-nowrap text-sm text-[#46494D]">
                              {index + 1}
                            </td>
                            <td className="px-6 font-[Poppins] font-[400] py-4 whitespace-nowrap text-sm  text-gray-900 capitalize">
                              {member?.name}
                            </td>

                            <td className="px-6 font-[Poppins] font-[400] py-4 whitespace-nowrap text-sm text-[#46494D]">
                              {member?.email}
                            </td>
                            <td className="px-6 font-[Poppins] font-[400] py-4 whitespace-nowrap text-sm text-[#46494D] capitalize">
                              {member?.phone}
                            </td>
                            <td className="font-[Poppins] uppercase text-black text-[16px] text-left px-[10px] py-[16px]">
                              <span
                                onClick={() =>
                                  handlestatus(member?._id, member?.status)
                                }
                                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer font-[Poppins] ${getStatusClasses(
                                  member?.status
                                )}`}
                              >
                                {member?.status}
                              </span>
                            </td>
                            <td className="px-6 font-[Poppins] font-[400] py-4 whitespace-nowrap text-sm text-[#46494D]">
                              <button
                                onClick={() => {
                                  setIsOpen(true);
                                  setSelected(member);
                                }}
                                className="border border-red-500 text-red-500 px-4 py-1.5 rounded-md hover:bg-red-500 hover:text-white transition duration-200"
                              >
                                {member?.deleted_at ? "Unblock" : "Block"}
                              </button>
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
      <DeletePopup
        isOpen={isOpen}
        onClose={closePopup}
        member={selected}
        fetchCustomerList={fetchCustomerList}
      />
    </AuthLayout>
  );
}

export default CustomerList;
