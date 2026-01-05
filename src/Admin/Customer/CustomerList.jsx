import { useEffect, useRef, useState } from "react";
import Listing from "../../Apis/Listing";
import HeaderAdmin from "../../common/HeaderAdmin";
import Nodata from "../../common/Nodata";
import LoadingSpinner from "../../common/LoadingSpinner";
import DeletePopup from "./DeletePopup";
import { IoMdEye } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdBlock } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import { HiOutlineUserAdd } from "react-icons/hi";
import { Link } from "react-router-dom";
import AddCustomer from "./AddCustomer";

function CustomerList() {
  const [team, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const closePopup = () => setIsOpen(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const closeAddPopup = () => setIsAddOpen(false);
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

  return (
    <>
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
                <div className="inline-block">
                  <button
                    onClick={() => {
                      setSelected(null);
                      setIsAddOpen(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-150"
                  >
                    <HiOutlineUserAdd className="w-5 h-5" />
                    <span>Add Customer</span>
                  </button>
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
                        className="px-6 font-[Poppins] font-[600] py-3 text-[16px] font-medium text-[#8C9199] uppercase tracking-wider text-center"
                      >
                        {" "}
                        S.No.
                      </th>
                      <th
                        scope="col"
                        className="px-6 font-[Poppins] font-[600] py-3 text-[16px] font-medium text-[#8C9199] uppercase tracking-wider text-center"
                      >
                        {" "}
                        NAME
                      </th>
                      <th
                        scope="col"
                        className="px-6 font-[Poppins] font-[600] py-3 text-[16px] font-medium text-[#8C9199] uppercase tracking-wider text-center"
                      >
                        EMAIL
                      </th>
                      <th
                        scope="col"
                        className="px-6 font-[Poppins] font-[600] py-3 text-[16px] font-medium text-[#8C9199] uppercase tracking-wider text-center"
                      >
                        PHONE
                      </th>
                      <th
                        scope="col"
                        className="px-6 font-[Poppins] font-[600] py-3 text-[16px] font-medium text-[#8C9199] uppercase tracking-wider text-center"
                      >
                        Total Purchases
                      </th>
                      {/* <th
                        scope="col"
                        className="px-6 font-[Poppins] font-[600] py-3 text-[16px] font-medium text-[#8C9199] uppercase tracking-wider text-center"
                      >
                        Status
                      </th> */}
                      <th
                        scope="col"
                        className="px-6 font-[Poppins] font-[600] py-3 text-[16px] font-medium text-[#8C9199] uppercase tracking-wider text-center"
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
                            <td className="px-6 font-[Poppins] font-[400] py-4 whitespace-nowrap text-sm text-[#46494D] text-center">
                              {index + 1}
                            </td>
                            <td className="px-6 font-[Poppins] font-[400] py-4 whitespace-nowrap text-sm  text-gray-900 capitalize text-center">
                              {member?.name}
                            </td>

                            <td className="px-6 font-[Poppins] font-[400] py-4 whitespace-nowrap text-sm text-[#46494D] text-center">
                              {member?.email}
                            </td>
                            <td className="px-6 font-[Poppins] font-[400] py-4 whitespace-nowrap text-sm text-[#46494D] capitalize text-center">
                              {member?.phone}
                            </td>
                            <td className="px-6 font-[Poppins] font-[400] py-4 whitespace-nowrap text-sm text-[#46494D] capitalize text-center">
                              {member?.purchases_count}
                            </td>
                            {/* <td className="font-[Poppins] uppercase text-black text-[16px] px-[10px] py-[16px] text-center">
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
                            </td> */}
                            <td className="font-[Poppins] justify-items-center text-black text-[16px] px-[10px] py-[16px]  ">
                              <div className="flex gap-1">
                                <Link to={`/customer/${member?._id}`} title="View">
                                  <IoMdEye
                                    size={22}
                                    className="text-blue-600 hover:text-blue-900"
                                  />
                                </Link>
                                <button 
                                onClick={() => {
                                  setIsAddOpen(true);
                                  setSelected(member);
                                }}
                                title="Edit"
                                >
                                  <MdEdit size={22} className="text-green-600 hover:text-green-900" />
                                </button>
                                <button
                                 onClick={() => {
                                  setIsOpen(true);
                                  setSelected(member);
                                }}
                                  title="Block"
                                >
                                  {member?.deleted_at ? 
                                  <CgUnblock
                                    size={24}
                                    className="text-red-600 hover:text-red-700"
                                  />
                                  :
                                  <MdBlock
                                    size={24}
                                    className="text-red-600 hover:text-red-700"
                                  />
                                  }
                                </button>
                              </div>
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
      <AddCustomer
        isOpen={isAddOpen}
        onClose={closeAddPopup}
        member={selected}
        isEdit={selected !== null ? true : false}
        fetchSalesList={fetchCustomerList}
      />
    </>
  );
}

export default CustomerList;
