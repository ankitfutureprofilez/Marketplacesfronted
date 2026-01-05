import React, { useEffect, useState } from "react";
import Listing from "../../Apis/Listing";
import AddCategory from "./AddCategory";
import HeaderAdmin from "../../common/HeaderAdmin";
import Delete from "./Delete";
import { FaChevronDown } from "react-icons/fa";
import moment from "moment";
import DeleteSubCategory from "../SubCategories/Delete";
import AddSubCategory from "../SubCategories/AddSubCategory";

export default function Category() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  // Category ke liye
  const [isOpen, setIsOpen] = useState(false);
  const [DeleteIsOpen, setDeleteIsOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  // SubCategory ke liye
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
  const [isDeleteSubCategoryOpen, setIsDeleteSubCategoryOpen] = useState(false);


  const toggleRow = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };


  const closePopup = () => {
    setIsOpen(false);
  };

  const closeSubCategoryPopup = () => {
    setIsSubCategoryOpen(false);
  };

  const closeDeletePopup = () => {
    setDeleteIsOpen(false);
  };

  const closeSubcategoryDeletePopup = () => {
    setIsDeleteSubCategoryOpen(false);
  };

  const fetchData = async () => {
    try {
      //   setLoading(true);
      const main = new Listing();
      const response = await main.GetAllcategory();
      if (response?.data?.status) {
        // console.log("response", response);
        setData(response?.data?.data || []);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching team list:", error);
      setData([]);
    } finally {
      //   setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log("data", data);

  return (
    <>
      <div className="w-full">
        <HeaderAdmin title={"Customer "} />
        <div className="px-4 py-2 lg:px-4 lg:py-2.5">
          <div className="bg-white rounded-[20px] mb-[10px] p-2">
            <div className="px-2 py-2 flex flex-wrap justify-between items-center border-b border-black border-opacity-10">
              <h2 className="text-base lg:text-lg font-bold font-[Poppins] font-[400] text-[#1E1E1E] m-0 tracking-[-0.03em]">
                Category Listing
              </h2>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-150"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                Add Category
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full table-auto whitespace-nowrap">
                <thead className="mb-[15px] border-b border-[#000000] border-opacity-10">
                  <tr>
                    <th className="px-6 font-[Poppins] font-[600] py-3 text-[16px] text-[#8C9199] uppercase tracking-wider text-center">
                      Sr. No.
                    </th>
                    <th className="px-6 font-[Poppins] font-[600] py-3 text-[16px] text-[#8C9199] uppercase tracking-wider text-center">
                      Name
                    </th>
                    <th className="px-6 font-[Poppins] font-[600] py-3 text-[16px] text-[#8C9199] uppercase tracking-wider text-center">
                      Image
                    </th>
                    <th className="px-6 font-[Poppins] font-[600] py-3 text-[16px] text-[#8C9199] uppercase tracking-wider text-center">
                      Actions
                    </th>
                    <th className="px-6 font-[Poppins] font-[600] py-3 text-[16px] text-[#8C9199] uppercase tracking-wider text-center">
                      View Subcategories
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {data &&
                    data?.map((item, index) => {
                      const isOpen = openIndex === index;

                      return (
                        <React.Fragment key={item._id}>
                          <tr
                            className={`border-b hover:bg-gray-50 cursor-pointer ${
                              item?.deleted_at ? "opacity-50" : ""
                            }`}
                            onClick={() => toggleRow(index)}
                          >
                            <td className="px-6 font-[Poppins] font-[400] py-4 text-sm text-[#46494D] text-center">
                              {index + 1}
                            </td>
                            <td className="px-6 font-[Poppins] font-[400] py-4 text-sm text-[#46494D] text-center">
                              {item?.name}
                              <div className="text-xs text-gray-500 mt-1">
                                Subcategories: {item?.subcategoriesTotalCount} |
                                <span className="text-green-700">
                                  {" "}
                                  Active: {item?.subcategoriesActiveCount}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 font-[Poppins] font-[400] py-3 text-[16px] text-[#8C9199] uppercase tracking-wider text-center flex justify-center items-center">
                              <img
                                src={item?.image}
                                alt={item?.name}
                                className="h-[50px] w-[50px] rounded-xl object-cover"
                              />
                            </td>
                            <td className="px-6 font-[Poppins] font-[400] py-4 text-sm text-[#46494D] text-center">
                              <div className="flex justify-center items-center gap-2">
                                <button
                                  className="border border-red-500 text-red-500 px-4 py-1.5 rounded-md hover:bg-red-500 hover:text-white transition duration-200"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setIsOpen(true);
                                    setSelected(item);
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  className="border border-red-500 text-red-500 px-4 py-1.5 rounded-md hover:bg-red-500 hover:text-white transition duration-200"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDeleteIsOpen(true);
                                    setSelected(item);
                                  }}
                                >
                                  {item?.deleted_at ? "Unblock" : "Block"}
                                </button>
                              </div>
                            </td>
                            <td className="px-6 font-[Poppins] font-[400] py-4 text-sm text-[#46494D] text-center">
                              <FaChevronDown
                                className={`mx-auto transition-transform duration-300 ${
                                  isOpen ? "rotate-180" : ""
                                }`}
                              />
                            </td>
                          </tr>

                          {isOpen && (
                            <tr className="border-t bg-gray-50">
                              <td colSpan={5} className="px-6 py-4">
                                {/* Add Subcategory Button */}
                                <div className="flex justify-between items-center mb-3">
                                  <h3 className="font-semibold text-gray-700 text-[15px]">
                                    Subcategories
                                  </h3>
                                  <button
                                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setIsSubCategoryOpen(true);
                                      setSelected({category_id: item?._id});
                                    }}
                                  >
                                    + Add Subcategory
                                  </button>
                                </div>

                                {/* Subcategory Table */}
                                {item?.subcategories &&
                                item?.subcategories?.length > 0 ? (
                                  <table className="w-full table-auto text-sm mb-4">
                                    <thead className="bg-gray-200 text-gray-600 uppercase text-xs tracking-wider">
                                      <tr>
                                        <th className="px-4 py-2 text-left">
                                          Name
                                        </th>
                                        {/* <th className="px-4 py-2 text-left">
                                          Added At
                                        </th> */}
                                        <th className="px-4 py-2 text-center">
                                          Actions
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                      {item?.subcategories?.map((sub) => (
                                        <tr
                                          key={sub?._id}
                                          className={`${
                                            sub?.deleted_at ? "opacity-50" : ""
                                          }`}
                                        >
                                          <td className="px-4 py-2">
                                            {sub?.name}
                                          </td>

                                          {/* <td className="px-4 py-2 text-gray-500">
                                            {sub?.created_at
                                              ? moment(sub?.created_at).format(
                                                  "DD MMM YYYY"
                                                )
                                              : "--"}
                                          </td> */}

                                          <td className="px-4 py-2 text-center">
                                            <div className="flex justify-center gap-2">
                                              <button
                                                className="border border-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setIsSubCategoryOpen(true);
                                                  setSelected(sub);
                                                }}
                                              >
                                                Edit
                                              </button>

                                              <button
                                                className="border border-red-500 text-red-500 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setIsDeleteSubCategoryOpen(true);
                                                  setSelected(sub);
                                                }}
                                              >
                                                {sub?.deleted_at
                                                  ? "Restore"
                                                  : "Delete"}
                                              </button>
                                            </div>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                ) : (
                                  <p className="text-gray-500 italic">
                                    No subcategories found
                                  </p>
                                )}
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <AddCategory
          isOpen={isOpen}
          onClose={closePopup}
          member={selected}
          isEdit={1}
          fecthSalesList={fetchData}
        />
        <Delete
          isOpen={DeleteIsOpen}
          onClose={closeDeletePopup}
          member={selected}
          fetchCustomerList={fetchData}
        />
        <AddSubCategory
          isOpen={isSubCategoryOpen}
          onClose={closeSubCategoryPopup}
          member={selected}
          isEdit={1}
          fecthSalesList={fetchData}
        />
        <DeleteSubCategory
          isOpen={isDeleteSubCategoryOpen}
          onClose={closeSubcategoryDeletePopup}
          member={selected}
          fetchCustomerList={fetchData}
        />
      </div>
    </>
  );
}
