import React, { useEffect, useState } from "react";
import PhoneSideBar from "./PhoneSideBar";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdLogout, MdSettings } from "react-icons/md";
import toast from "react-hot-toast";
import Listing from "../Apis/Listing";
import { useNavigate } from "react-router-dom";


function HeaderAdmin({ title, back }) {
    const [sideOpen, setSideOpen] = useState(false);
    const toggleSidebar = (e) => {
        setSideOpen(!sideOpen);
    };
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = (e) => {
        e.preventDefault();
        setMenuOpen(!menuOpen);
    };
   
const navigate = useNavigate();
    const handleclick = () => {
        localStorage
            && localStorage
                .removeItem("token")
        toast.success("Logout successfully!");
        navigate("/admin/login")
    };
      const [listing, setListing] = useState("");

      const fetchData = async (signal) => {
        try {
          const main = new Listing();
          const response = await main.profileVerify({ signal });
          setListing(response?.data?.data)
          console.log("response", response)
        } catch (error) {
          localStorage && localStorage.removeItem("AdminToken");
        //   toast.error("Please log in first.");
        }
      }
    
      useEffect(() => {
        fetchData();
      }, []);
    return (
        <>
            <div className=" px-4 py-2 lg:px-10 lg:py-2.5">
                <div className="flex  justify-between items-center">
                    <div className="flex items-center" >
                        {back === 1 && <IoMdArrowRoundBack size={24} className="mr-2 cursor-pointer" />}
                      
                        <div className="flex items-center" >
                    <h2 className="flex items-center lg:block text-[#1E1E1E] font-semibold text-[26px]">
                    Dashboard
                    </h2>
                </div>
                    </div>
                    <div className="lg:hidden">
                        <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu"
                            aria-expanded={sideOpen} onClick={toggleSidebar}
                        >
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className={`${sideOpen ? 'hidden' : 'block'} h-6 w-6`}
                                fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <svg
                                className={`${sideOpen ? 'block' : 'hidden'} h-6 w-6`}
                                fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>


                    </div>
                    <div className="flex justify-end items-center space-x-3">
                        <div className="p-[6px] lg:p-[11px] pr-5 lg:pr-8 flex items-center bg-white rounded-xl relative">
                            <button onClick={toggleMenu} className="h-[38px] lg:h-[44px]  flex rounded-full  text-sm text-black focus:outline-none focus:ring-0 focus:ring-white">
                                <img className="h-[38px] w-[38px] lg:h-[44px] lg:w-[44px] rounded-full lg:mr-2.5" src={listing?.profileImage} alt="admin" />

                                <div className=" hidden lg:block text-left ">
                                    <div className="text-[#3A3C40] font-medium lg:text-base tracking-[-0.03em] capitalize">{listing?.name} </div>
                                    <div className="text-[#0367F7] font-normal text-[13px] tracking-[-0.03em]">Admin </div>
                                </div>
                                <svg className={` absolute right-1 lg:right-3 top-[20px] transition-transform ${menuOpen ? 'rotate-180' : 'rotate-0 '}`} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.90902 5.99975L0.666016 1.75775L2.08102 0.34375L4.90902 3.17175L7.73702 0.34375L9.15202 1.75775L4.90902 5.99975Z" fill="black" />
                                </svg>
                            </button>
                            {/* dropdown  */}
                            <div className={`absolute right-0 top-full z-10  w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${menuOpen ? 'block' : 'hidden'}`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                <div className="block px-4 py-3 text-sm text-gray-70 ">
                                    <div className="py-2 mb-1">
                                        Admin Profile
                                    </div>
                                    <div className="flex rounded-full items-center text-sm text-white  ">
                                        <img className="h-[44px] w-[44px] rounded-full mr-2.5" src={listing?.profileImage} alt="" />
                                        <div className=" text-left ">
                                            <div className="text-[#3A3C40] font-medium text-base tracking-[-0.03em] capitalize">{listing?.name}  </div>
                                            <div className="text-[#3A3C40] font-medium text-base tracking-[-0.03em]">{listing?.email}  </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-1" role="none">
                                    <a href="/admin/settings" className="flex gap-2  px-4 py-2 text-sm text-gray-700 hover:text-[#0367F7]" role="menuitem" tabindex="-1" id="menu-item-5">
                                        <MdSettings size={22} />
                                        Profile Settings</a>
                                </div>
                                <div className="py-1" role="none">
                                    <button onClick={handleclick}
                                     className="flex gap-2 px-4 py-2 text-sm text-[#FF1B1B] hover:text-[#0367F7]"
                                      role="menuitem" tabindex="-1" id="menu-item-6">
                                        <MdLogout size={22} />
                                        Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="block lg:hidden">
                {sideOpen && <PhoneSideBar sideOpen={sideOpen} toggleSidebar={toggleSidebar} />}
            </div>
        </>);
};

export default HeaderAdmin;
