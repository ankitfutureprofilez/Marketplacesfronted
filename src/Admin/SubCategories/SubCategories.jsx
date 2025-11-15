import React, { useEffect, useState } from "react";
import AuthLayout from "../../component/AuthLayout";
import Listing from "../../Apis/Listing";
import AddCategory from "./AddSubCategory";
import HeaderAdmin from "../../common/HeaderAdmin";
import Delete from "./Delete";
export default function SubCategories() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [DeleteIsOpen, setDeleteIsOpen] = useState(false);

  const closePopup = () => {
    setIsOpen(false);
  }

  const closeDeletePopup = () => {
    setDeleteIsOpen(false);
  }
  const fetchData = async () => {
    try {
      //   setLoading(true);
      const main = new Listing();
      const response = await main.Subcategory();
      if (response?.data?.status) {
        console.log("response", response);
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
  console.log("data", data)
  useEffect(() => {
    fetchData();
  }, []);
  console.log("data", data);

  return (
    <AuthLayout>
      <div className="w-full">
        <HeaderAdmin title={"Sub Categories "} />
        <div className="px-4 py-2 lg:px-4 lg:py-2.5">
          <div className="bg-white rounded-[20px] mb-[10px] p-2">
            <div className="px-2 py-2 flex flex-wrap justify-between items-center border-b border-black  border-opacity-10">
              <h2 className=" text-base lg:text-lg font-bold font-[Poppins] font-[400] text-[#1E1E1E] m-0 tracking-[-0.03em]">
                Sub Categories Listing
              </h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-150"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                Add SubCategories 
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto whitespace-nowrap">
                <thead className="mb-[15px] border-b border-[#000000] border-opacity-10">
                  <tr>
                    <th className="px-6 font-[Poppins] font-[600] py-3 text-[16px] font-medium text-[#8C9199] uppercase tracking-wider text-center"
                    >Sr. No.</th>
                    <th className="px-6 font-[Poppins] font-[600] py-3 text-[16px] font-medium text-[#8C9199] uppercase tracking-wider text-center"
                    >Category Image</th>
                    <th className="px-6 font-[Poppins] font-[600] py-3 text-[16px] font-medium text-[#8C9199] uppercase tracking-wider text-center"
                    >Category Name</th>
                    <th className="px-6 font-[Poppins] font-[600] py-3 text-[16px] font-medium text-[#8C9199] uppercase tracking-wider text-center"
                    >SUB Category Name</th>
                    <th className="px-6 font-[Poppins] font-[600] py-3 text-[16px] font-medium text-[#8C9199] uppercase tracking-wider text-center"
                    >Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data && data?.map((item, index) => (
                    <tr key={item._id} className="border-b hover:bg-gray-50">
                      <td className="px-6 font-[Poppins] font-[400] py-4 whitespace-nowrap text-sm text-[#46494D] text-center">{index + 1}</td>
                      <td className="px-6 font-[Poppins] font-[600] py-3 text-[16px] font-medium text-[#8C9199] uppercase tracking-wider text-center"
                      >
                        <img
                          src={item?.category_id?.image}
                          alt={item?.category_id?.name}
                          className="h-[50px] w-[50px] rounded-xl object-cover"
                        />
                      </td>
                      <td className="px-6 font-[Poppins] font-[400] py-4 whitespace-nowrap text-sm text-[#46494D] text-center">{item?.category_id?.name}</td>

                      <td className="px-6 font-[Poppins] font-[400] py-4 whitespace-nowrap text-sm text-[#46494D] text-center">{item.name}</td>

                      <td className="px-6 font-[Poppins] font-[400] py-4 whitespace-nowrap text-sm text-[#46494D] text-center">
                        <div className="flex justify-center items-center gap-2">
                          <button
                            onClick={() => {
                              setIsOpen(true);
                              setSelected(item);
                            }}
                            className="border border-red-500 text-red-500 px-4 py-1.5 rounded-md hover:bg-red-500 hover:text-white transition duration-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setDeleteIsOpen(true);
                              setSelected(item);
                            }}
                            className="border border-red-500 text-red-500 px-4 py-1.5 rounded-md hover:bg-red-500 hover:text-white transition duration-200"
                          >
                            {item?.deleted_at ? "Unblock" : "Block"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
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
      </div>
    </AuthLayout>
  );
}
