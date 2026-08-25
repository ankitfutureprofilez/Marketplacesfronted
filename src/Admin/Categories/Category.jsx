import React, { useEffect, useState } from "react";
import Listing from "../../Apis/Listing";
import AddCategory from "./AddCategory";
import HeaderAdmin from "../../common/HeaderAdmin";
import Delete from "./Delete";
import { FaChevronDown } from "react-icons/fa";
import moment from "moment";
import DeleteSubCategory from "../SubCategories/Delete";
import AddSubCategory from "../SubCategories/AddSubCategory";
import { FiPlus, FiEdit2, FiFolderPlus } from "react-icons/fi";
import { MdBlock } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";

export default function Category() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [categories, setCategories] = useState([]);
  
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

  // Fetch all categories for dropdown
  const fetchCategories = async () => {
    try {
      const api = new Listing();
      const response = await api.category();

      if (response?.data?.status) {
        setCategories(response.data.data);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  // console.log("data", data);

  return (
    <>
      <div className="w-full min-h-full">
        <HeaderAdmin title={"Customer "} />
        <div className="">
          <div className="mb-4 overflow-hidden">
            <div className="px-5 py-4 flex flex-wrap justify-between items-center bg-white gap-3 border border-gray-200 rounded-2xl mb-4">
              <div className="flex items-baseline gap-2">
                <h2 className="text-[15px] lg:text-base font-semibold font-[Poppins] text-[#14161A] tracking-tight m-0">
                  Category Listing
                </h2>
                <span className="font-[Poppins] text-[12px] text-[#8C9199]">
                  {data.length} {data.length === 1 ? "category" : "categories"}
                </span>
              </div>
              <button
                className="bg-blue-600 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-blue-700 active:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 transition-colors duration-150 text-[13px] font-medium font-[Poppins]"
                onClick={() => {
                  setSelected(null);
                  setIsOpen(true);
                }}
              >
                <FiPlus className="w-4 h-4" />
                <span>Add Category</span>
              </button>
            </div>

            <div className="bg-white border border-[#ECEDF2] rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full table-auto whitespace-nowrap">
                  <thead className="bg-[#FAFAFB] border-b border-gray-200">
                    <tr>
                      <th className="px-5 font-[Poppins] font-medium py-3 text-[13px] text-gray-600 uppercase tracking-wide text-center">
                        Sr. No.
                      </th>
                      <th className="px-5 font-[Poppins] font-medium py-3 text-[13px] text-gray-600 uppercase tracking-wide text-left">
                        Name
                      </th>
                      <th className="px-5 font-[Poppins] font-medium py-3 text-[13px] text-gray-600 uppercase tracking-wide text-center">
                        Image
                      </th>
                      <th className="px-5 font-[Poppins] font-medium py-3 text-[13px] text-gray-600 uppercase tracking-wide text-center">
                        Actions
                      </th>
                      <th className="px-5 font-[Poppins] font-medium py-3 text-[13px] text-gray-600 uppercase tracking-wide text-center">
                        Subcategories
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#F0F0F3]">
                    {data &&
                      data?.map((item, index) => {
                        const isOpen = openIndex === index;

                        return (
                          <React.Fragment key={item._id}>
                            <tr
                              className={`capitalize cursor-pointer transition-colors duration-150 hover:bg-[#FAFAFB] ${
                                item?.deleted_at ? "opacity-50" : ""
                              }`}
                              onClick={() => toggleRow(index)}
                            >
                              <td className="px-5 font-[Poppins] py-4 text-[13px] text-[#8C9199] text-center">
                                {String(index + 1).padStart(2, "0")}
                              </td>
                              <td className="px-5 font-[Poppins] py-4 text-left">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-[14px] font-medium text-[#14161A]">
                                    {item?.name}
                                  </span>
                                  {item?.deleted_at && (
                                    <span className="px-2 py-0.5 inline-flex text-[10px] leading-4 font-medium rounded-full font-[Poppins] bg-gray-100 text-gray-600 ring-1 ring-inset ring-gray-400/20 normal-case">
                                      Blocked
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-1.5 text-[11px] normal-case">
                                  <span className="px-2 py-0.5 bg-[#FAFAFB] border border-[#ECEDF2] rounded-full text-[#6B7280]">
                                    {item?.subcategoriesTotalCount} subcategories
                                  </span>
                                  <span className="px-2 py-0.5 bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20 rounded-full">
                                    {item?.subcategoriesActiveCount} active
                                  </span>
                                </div>
                              </td>
                              <td className="px-5 font-[Poppins] py-3 text-center">
                                <div className="flex justify-center items-center">
                                  <img
                                    src={item?.image}
                                    alt={item?.name}
                                    className="h-[46px] w-[46px] rounded-xl object-cover border border-[#ECEDF2]"
                                  />
                                </div>
                              </td>
                              <td className="px-5 font-[Poppins] py-4 text-center">
                                <div className="flex justify-center items-center gap-1.5">
                                  <button
                                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 transition-colors"
                                    title="Edit"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setIsOpen(true);
                                      setSelected(item);
                                    }}
                                  >
                                    <FiEdit2 size={14} className="text-blue-600" />
                                  </button>
                                  <button
                                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/40 transition-colors"
                                    title={item?.deleted_at ? "Unblock" : "Block"}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setDeleteIsOpen(true);
                                      setSelected(item);
                                    }}
                                  >
                                    {item?.deleted_at ? (
                                      <CgUnblock size={15} className="text-red-600" />
                                    ) : (
                                      <MdBlock size={15} className="text-red-600" />
                                    )}
                                  </button>
                                </div>
                              </td>
                              <td className="px-5 font-[Poppins] py-4 text-center">
                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#FAFAFB] border border-[#ECEDF2]">
                                  <FaChevronDown
                                    size={12}
                                    className={`text-[#8C9199] transition-transform duration-300 ${
                                      isOpen ? "rotate-180" : ""
                                    }`}
                                  />
                                </span>
                              </td>
                            </tr>

                            {isOpen && (
                              <tr className="bg-[#FAFAFB]">
                                <td colSpan={5} className="px-5 py-4">
                                  {/* Add Subcategory Button */}
                                  <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-[Poppins] font-semibold text-[13px] text-[#14161A]">
                                      Subcategories
                                    </h3>
                                    <button
                                      className="flex items-center gap-1.5 bg-white border border-[#ECEDF2] text-[#14161A] px-3 py-1.5 rounded-lg hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-colors text-[12px] font-medium font-[Poppins]"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setIsSubCategoryOpen(true);
                                        setSelected({category_id: item?._id});
                                      }}
                                    >
                                      <FiFolderPlus size={14} />
                                      Add Subcategory
                                    </button>
                                  </div>

                                  {/* Subcategory Table */}
                                  {item?.subcategories &&
                                  item?.subcategories?.length > 0 ? (
                                    <div className="bg-white border border-[#ECEDF2] rounded-xl overflow-hidden">
                                      <table className="w-full table-auto text-[13px]">
                                        <thead className="bg-[#FAFAFB] text-[#8C9199] uppercase text-[10px] tracking-wide font-[Poppins]">
                                          <tr>
                                            <th className="px-4 py-2.5 text-left font-semibold">
                                              Name
                                            </th>
                                            {/* <th className="px-4 py-2 text-left">
                                              Added At
                                            </th> */}
                                            <th className="px-4 py-2.5 text-center font-semibold">
                                              Actions
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#F0F0F3]">
                                          {item?.subcategories?.map((sub) => (
                                            <tr
                                              key={sub?._id}
                                              className={`hover:bg-[#FAFAFB] transition-colors ${
                                                sub?.deleted_at ? "opacity-50" : ""
                                              }`}
                                            >
                                              <td className="px-4 py-2.5 font-[Poppins] text-[#14161A] capitalize">
                                                <div className="flex items-center gap-2">
                                                  {sub?.name}
                                                  {sub?.deleted_at && (
                                                    <span className="px-1.5 py-0.5 inline-flex text-[9px] leading-3 font-medium rounded-full font-[Poppins] bg-gray-100 text-gray-600 ring-1 ring-inset ring-gray-400/20 normal-case">
                                                      Removed
                                                    </span>
                                                  )}
                                                </div>
                                              </td>

                                              {/* <td className="px-4 py-2 text-gray-500">
                                                {sub?.created_at
                                                  ? moment(sub?.created_at).format(
                                                      "DD MMM YYYY"
                                                    )
                                                  : "--"}
                                              </td> */}

                                              <td className="px-4 py-2.5 text-center">
                                                <div className="flex justify-center gap-1.5">
                                                  <button
                                                    className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                                                    title="Edit"
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      setIsSubCategoryOpen(true);
                                                      setSelected(sub);
                                                    }}
                                                  >
                                                    <FiEdit2 size={13} className="text-blue-600" />
                                                  </button>

                                                  <button
                                                    className="flex items-center justify-center w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 transition-colors"
                                                    title={sub?.deleted_at ? "Restore" : "Delete"}
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      setIsDeleteSubCategoryOpen(true);
                                                      setSelected(sub);
                                                    }}
                                                  >
                                                    {sub?.deleted_at ? (
                                                      <CgUnblock size={14} className="text-red-600" />
                                                    ) : (
                                                      <MdBlock size={14} className="text-red-600" />
                                                    )}
                                                  </button>
                                                </div>
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  ) : (
                                    <p className="font-[Poppins] text-[13px] text-[#8C9199] italic px-1">
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
        </div>
        <AddCategory
          isOpen={isOpen}
          onClose={closePopup}
          member={selected}
          isEdit={1}
          fecthSalesList={fetchData}
          fetchCategories={fetchCategories}
        />
        <Delete
          isOpen={DeleteIsOpen}
          onClose={closeDeletePopup}
          member={selected}
          fetchCustomerList={fetchData}
        />
        <AddSubCategory
          categories={categories}
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