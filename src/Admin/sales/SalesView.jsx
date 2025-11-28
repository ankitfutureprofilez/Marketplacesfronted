import { useEffect, useRef, useState } from "react";
import Listing from "../../Apis/Listing";
import HeaderAdmin from "../../common/HeaderAdmin";
import LoadingSpinner from "../../common/LoadingSpinner";
import Nodata from "../../common/Nodata";
import AuthLayout from "../../component/AuthLayout";
import AddSales from "./AddSales";
import DeletePopup from "../Customer/DeletePopup";
import { HiOutlineUserAdd } from "react-icons/hi";
import { Link } from "react-router-dom";
import { IoMdEye } from "react-icons/io";

function SalesView() {
  const [Sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // console.log("searchQuery" ,searchQuery)
  const [isOpen, setIsOpen] = useState(false);
  const closePopup = () => setIsOpen(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const closeAddPopup = () => setIsAddOpen(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const closeEditPopup = () => setIsEditOpen(false);

  const [selected, setSelected] = useState(null);

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

  // console.log("Sales", Sales);

  return (
    <AuthLayout>
      <div className="w-full">
        <HeaderAdmin title={"Sales Team"} />
        <div className="px-4 py-2 lg:px-4 lg:py-2.5">
          <div className="bg-white rounded-[20px] mb-[10px] p-2">
            {/* Header */}
            <div className="px-4 py-4 flex flex-wrap justify-between items-center border-b border-black  border-opacity-10">
              <h2 className=" text-[16px] lg:text-[18px] font-bold font-[Poppins] font-[400] text-[#1E1E1E] m-0 tracking-[-0.03em]">
                {" "}
                Sales Team Listing
              </h2>
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
                {/* Search */}
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
                {/* <AddSales fecthSalesList={fecthSalesList} /> */}
                <div className="inline-block">
                  <button
                    onClick={() => {
                      setIsAddOpen(true);
                      setSelected(null);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-150"
                  >
                    <HiOutlineUserAdd className="w-5 h-5" />
                    <span>Add Salesperson</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-auto">
              {loading ? (
                <LoadingSpinner />
              ) : Sales.length === 0 ? (
                <Nodata />
              ) : (
                <table className="w-full table-auto whitespace-nowrap">
                  <thead className="mb-[15px] border-b border-[#000000] border-opacity-10">
                    <tr>
                      <th className=" font-[Poppins] text-[14px] text-[#8C9199] font-[600] uppercase text-left p-[10px] mb-[10px]">
                        S. No.
                      </th>
                      <th className=" font-[Poppins] text-[14px] text-[#8C9199] font-[600] uppercase text-left p-[10px] mb-[10px]">
                        SALES NAME
                      </th>
                      <th className=" font-[Poppins] text-[14px] text-[#8C9199] font-[600] uppercase text-left p-[10px] mb-[10px]">
                        EMAIL
                      </th>
                      <th className=" font-[Poppins] text-[14px] text-[#8C9199] font-[600] uppercase text-left p-[10px] mb-[10px]">
                        PHONE
                      </th>
                      <th className=" font-[Poppins] text-[14px] text-[#8C9199] font-[600] uppercase p-[10px] mb-[10px] text-center">
                        MERCHANTS Assigned
                      </th>
                      {/* <th className=" font-[Poppins] text-[14px] text-[#8C9199] font-[600] uppercase text-left p-[10px] mb-[10px]">
                        STATUS
                      </th> */}
                      <th className=" font-[Poppins] text-[14px] text-[#8C9199] font-[600] uppercase text-left p-[10px] mb-[10px]">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {Sales &&
                      Sales?.map((member, index) => {
                        const isDeleted = !!member.deleted_at;
                        return (
                          <tr
                            key={member._id}
                            className={`bg-white ${isDeleted ? "opacity-50" : ""
                              }`}
                          >
                            <td className="font-[Poppins]  text-black text-[16px] text-left px-[10px] py-[16px]  ">
                              {index + 1}
                            </td>

                            <td className="font-[Poppins]  text-black text-[16px] text-left px-[10px] py-[16px] capitalize">
                              <div className="flex items-center space-x-3">
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={member?.avatar || "/placeholder.png"}
                                  alt={member?.name}
                                />
                                <span>{member?.name}</span>
                              </div>
                            </td>

                            <td className="font-[Poppins]  text-black text-[16px] text-left px-[10px] py-[16px]  ">
                              {member?.email}
                            </td>
                            <td className="font-[Poppins]  text-black text-[16px] text-left px-[10px] py-[16px]  ">
                              {member?.phone}
                            </td>
                            <td className="font-[Poppins] text-black text-[16px] px-[10px] py-[16px] text-center">
                              {member?.assigned_vendors}
                            </td>
                            {/* <td className="font-[Poppins] uppercase  text-black text-[16px] text-left px-[10px] py-[16px]">
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
                            </td> */}

                            <td className="font-[Poppins]  text-black text-[16px] text-left px-[10px] py-[16px]  ">
                              <div className="flex gap-2">
                                <Link to={`/sales/${member?._id}`} title="View">
                                  {/* <IoMdEye
                                    size={22}
                                    className="text-blue-600 hover:text-blue-900"
                                  /> */}
                                  <button
                                  // onClick={() => {
                                  //   setIsAddOpen(true);
                                  //   setSelected(member);
                                  // }}
                                  className="border border-red-500 text-red-500 px-4 py-1.5 rounded-md hover:bg-red-500 hover:text-white transition duration-200"
                                >
                                  View
                                </button>
                                </Link>
                                <button
                                  onClick={() => {
                                    setIsAddOpen(true);
                                    setSelected(member);
                                  }}
                                  className="border border-red-500 text-red-500 px-4 py-1.5 rounded-md hover:bg-red-500 hover:text-white transition duration-200"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => {
                                    setIsOpen(true);
                                    setSelected(member);
                                  }}
                                  className="border border-red-500 text-red-500 px-4 py-1.5 rounded-md hover:bg-red-500 hover:text-white transition duration-200"
                                >
                                  {member?.deleted_at ? "Unblock" : "Block"}
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
        fetchCustomerList={fecthSalesList}
      />
      <AddSales
        isOpen={isAddOpen}
        onClose={closeAddPopup}
        member={selected}
        isEdit={1}
        fecthSalesList={fecthSalesList}
      />
    </AuthLayout>
  );
}

export default SalesView;
