import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import Listing from "../../Apis/Listing";
import toast from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";

const Delete = ({ member, fecthSalesList }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const confirmDelete = () => {
    handleDeletestatus(member._id);
    setShowConfirm(false);
  };

      const [deletingId, setDeletingId] = useState(null);
    const handleDeletestatus = async (id) => {
        setDeletingId(id); // mark the row as deleting (for gray effect)
        try {
            const main = new Listing();
            const response = await main.AdminDeleteSales(id);
            if (response) {
                toast.success("Salesperson deleted successfully");
                await fecthSalesList();
            }
        } catch (error) {
            console.error("Error deleting salesperson:", error);
            toast.error("Delete failed!");
        } finally {
            setDeletingId(null);
        }
    };

  const toggleModal = () => setShowConfirm(false);



  return (
    <>
        <button
          onClick={() => setShowConfirm(true)}
          className="bg-red-600 text-white px-3 py-2 rounded-lg flex items-center hover:bg-red-700 transition duration-150"
        >
          <MdDelete size={20} />
        </button>
      {/* Confirmation Popup */}
        {showConfirm && (
                   <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-[9]">
                       <div className="relative bg-[#ffffff] rounded-lg p-[15px] lg:p-[20px] w-[96%] max-w-[500px]">
                           <div className="flex items-center justify-between mb-4">
                               <h3 className="text-[30px] font-semibold text-black">Delete</h3>
                               <IoCloseSharp
                                   size={30}
                                   className="cursor-pointer text-black"
                                   onClick={toggleModal}
                               />
                           </div>
   
                           {/* Responsive Paragraph */}
                           <p className="text-black mb-[6px] text-[12px] sm:text-[14px] md:text-[17px] font-[400] text-left">
                               Are you sure you want to delete this user ?
                           </p>
                           <p className="mb-[40px] text-[12px] sm:text-[12px] md:text-[15px] font-[400] text-left text-[#f00000]">
                               (This action cannot be undone.)
                           </p>
   
                           <div className="flex justify-end gap-[8px]">
                               <button
                                   type="button"
                                   onClick={toggleModal}
                                   className="text-black mr-2 px-4 py-2 border border-gray-300 rounded-md"
                               >
                                   Cancel
                               </button>
                               <button
                                   type="button"
                                   onClick={confirmDelete}
                                   className="bg-[#f00000] hover:bg-[#f00000] font-manrope font-[700] text-[14px] px-[20px] py-[10px] text-white rounded-[5px] text-center"
                               >
                                   {deletingId ? "Loading..." : "Delete"}
                               </button>
                           </div>
                       </div>
                   </div>
               )}
    </>
  );
};

export default Delete;
