import React, { useEffect, useState } from "react";
import AuthLayout from "../../component/AuthLayout";
import Listing from "../../Apis/Listing";
import AddCategory from "./AddCategory";

export default function Category() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const closePopup = () =>{
    setIsOpen(false);
  }


  const fetchData = async () => {
    try {
      //   setLoading(true);
      const main = new Listing();
      const response = await main.category();
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
  useEffect(() => {
    fetchData();
  }, []);
  console.log("data", data);

  return (
    <AuthLayout>
      <div className="p-8 w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Categories</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-150"
          onClick={()=>{
            setIsOpen(true);
          }}
          >
            Add Category
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl shadow-sm border">
          <table className="w-full border-collapse text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-4">Sr. No.</th>
                <th className="p-4">Name</th>
                <th className="p-4">Image</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data && data?.map((item, index) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{index+1}</td>
                  <td className="p-4 font-medium">{item.name}</td>
                  <td className="p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-[50px] w-[50px] rounded-xl object-cover"
                    />
                  </td>
                  <td className="p-4 flex gap-3">
                    <div className="flex gap-2">
                        <button
                            // onClick={() => {
                            // setIsAddOpen(true);
                            // setSelected(member);
                            // }}
                            className="border border-red-500 text-red-500 px-4 py-1.5 rounded-md hover:bg-red-500 hover:text-white transition duration-200"
                        >
                            Edit
                        </button>
                        <button
                            // onClick={() => {
                            // setIsOpen(true);
                            // setSelected(member);
                            // }}
                            className="border border-red-500 text-red-500 px-4 py-1.5 rounded-md hover:bg-red-500 hover:text-white transition duration-200"
                        >
                            Delete
                            {/* {member?.deleted_at ? "Unblock" : "Block"} */}
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddCategory
        isOpen={isOpen}
        onClose={closePopup}
        member={selected}
        isEdit={1}
        fecthSalesList={fetchData}
      />
    </AuthLayout>
  );
}
