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

  return (
    <>
      <div className="w-full">
        <HeaderAdmin title={"Sub Admins"} />
        <div className="py-2 lg:py-2.5">
          <div className="bg-white rounded-[20px] mb-[10px] p-2">
            {/* Header */}
            <div className="px-4 py-4 flex flex-wrap justify-between items-center border-b border-black  border-opacity-10">
              <h2 className=" text-[16px] lg:text-[18px] font-bold font-[Poppins] font-[400] text-[#1E1E1E] m-0 tracking-[-0.03em]">
                {" "}
                Sub Admins Listing
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
                      setSelected(null);
                      setIsAddOpen(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-150"
                  >
                    <HiOutlineUserAdd className="w-5 h-5" />
                    <span>Add Sub Admin</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-auto">
              {loading ? (
                <LoadingSpinner />
              ) : data && data?.length === 0 ? (
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
                      <th className=" font-[Poppins] text-[14px] text-[#8C9199] font-[600] uppercase text-left p-[10px] mb-[10px]">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {data &&
                      data?.map((member, index) => {
                        const isDeleted = !!member.deleted_at;
                        return (
                          <tr
                            key={member._id}
                            className={`bg-white ${
                              isDeleted ? "opacity-50" : ""
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
                              <div className="flex gap-1">
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
                                >
                                  <MdEdit
                                    size={22}
                                    className="text-green-600 hover:text-green-900"
                                  />
                                </button>
                                <button
                                  onClick={() => {
                                    // setIsOpen(true);
                                    // setSelected(member);
                                  }}
                                  title="Block"
                                >
                                  {member?.deleted_at ? (
                                    <CgUnblock
                                      size={24}
                                      className="text-red-600 hover:text-red-700"
                                    />
                                  ) : (
                                    <MdBlock
                                      size={24}
                                      className="text-red-600 hover:text-red-700"
                                    />
                                  )}
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
      <Add
        isOpen={isAddOpen}
        onClose={closeAddPopup}
        member={selected}
        isEdit={selected !== null ? true : false}
        fecthSalesList={fetchAdmins}
      />
    </>
  );
}
