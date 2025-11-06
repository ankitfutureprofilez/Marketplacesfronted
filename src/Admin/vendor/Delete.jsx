import React, { useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import toast from 'react-hot-toast';
import Listing from '../../Apis/Listing';

export default function Delete({ step, Id, fetchTeamList, users }) {
    console.log("Id ", Id)
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };
    const handlePackageDelete = () => {
        setLoading(true);
        const main = new Listing();

        main.VendorDelete(Id)
            .then((res) => {
                if (res?.data?.status) {
                    toast.success(res.data.message);
                } else {
                    toast.error(res.data?.message || "Something went wrong.");
                }
                setLoading(false);
                fetchTeamList();
                toggleModal();
            })
            .catch((error) => {
                console.error("error", error);
                toast.error(error?.response?.data?.message || "Internal Server Error");
                setLoading(false);
            });
    };


    const handleUserDelete = () => {
        setLoading(true);
        const main = new Listing();
        const response = main.userDelete({ Id });
        response
            .then((res) => {
                if (res && res?.data?.status) {
                    toast.success(res.data.message);
                } else {
                    toast.error(res.data?.message || "Something went wrong.");
                }
                setLoading(false);
                users();
                toggleModal();
            })
            .catch((error) => {
                console.log("error", error);
                toast.error(error?.response?.data?.message);
                setLoading(false);
            });
    };
    const handleClick = (e) => {
        e.preventDefault();
        if (step === 1) {
            handlePackageDelete(e);
        } else if (step === 2) {
            handleUserDelete(e)
        } else {
            console.warn('Invalid step');
        }
    };

    return (
        <div className=" ">
            <button
                onClick={toggleModal}
                className=' gap-[10px] m-auto font-[Poppins] font-[600] text-white '
            >
                <MdDelete size={24} className='text-red-600 hover:text-red-700' />
            </button>
            {/* Modal */}
            {isOpen && (
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
                            Are you sure you want to delete this {step === 1 ? "package" : "user"} ?
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
                                onClick={handleClick}
                                className="bg-[#f00000] hover:bg-[#f00000] font-[Poppins] font-[700] text-[14px] px-[20px] py-[10px] text-white rounded-[5px] text-center"
                            >
                                {loading ? "Loading..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}