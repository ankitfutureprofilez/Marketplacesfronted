import LOGO from "../img/marketplace.svg"
import React, { useState, useEffect } from "react";
import { MdDashboard, MdSupervisedUserCircle, MdContacts, MdLogout, MdSettings } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { SiBloglovin } from "react-icons/si";
import { CiViewList } from "react-icons/ci";
import { RiProductHuntLine } from "react-icons/ri";
import Listing from "../Apis/Listing";
import { FaRegUserCircle } from "react-icons/fa";
import { PiUserCheckFill } from "react-icons/pi";



function SideBarAdmin() {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); // get current path

    const handleclick = () => {
        localStorage
            && localStorage
                .removeItem("token")
        toast.success("Logout successfully!");
        navigate("/")
    };

    const linkClasses = (path) =>
        `px-[15px] flex flex-wrap items-center gap-x-2 py-[7px] rounded-full text-base tracking-[-0.03em] font-medium hover:text-[#0367F7] ${location.pathname === path
            ? "bg-[#0367F7] bg-opacity-10 text-[#0367F7]"
            : "text-[#8D929A]"
        }`;


    // const fetchData = async (signal) => {
    //     try {
    //         const main = new Listing();
    //         const response = await main.profileVerify({ signal });
    //         console.log("response", response)
    //     } catch (error) {
    //         localStorage && localStorage.removeItem("AdminToken");
    //         toast.error("Please log in first.");
    //         navigate("/");
    //     }
    // }

    // useEffect(() => {
    //     const controller = new AbortController();
    //     const { signal } = controller;
    //     fetchData(signal);
    //     return () => controller.abort();
    // }, []);

    return (
        <div
            className={`z-50 w-[260px] md:w-[304px] fixed lg:sticky left-0 top-0 bottom-0 overflow-y-auto bg-white ${isOpen ? "block" : "hidden lg:block"
                }`}
        >
            <div className="px-4 py-4 md:px-6 md:py-6 lg:px-[28px] lg:py-8">
                <div className="mb-5 md:mb-10 lg:mb-[53px] text-center">
                    <img
                        className="max-w-full block m-auto"
                        src={LOGO}
                        alt="logo"
                        width="208"
                    />
                </div>

                <h3 className="uppercase text-[#808080] px-[15px] text-sm font-semibold mb-2.5 lg:mb-3.5">
                    Overview
                </h3>
                <ul className="space-y-3">
                    <li>
                        <Link to="/dashboard"
                            className={linkClasses("/dashboard")}
                        >
                            <MdDashboard size={24} />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/vendor"
                            className={linkClasses("/vendor")}
                        >
                            <MdSupervisedUserCircle size={24} />
                            Vendor
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/sales"
                            className={linkClasses("/sales")}
                        >
                            <FaRegUserCircle size={24} />
                            Sales 
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/customer"
                            className={linkClasses("/customer")}
                        >
                            <PiUserCheckFill size={24} />
                            Coustomer List
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/admin/job-list"
                            className={linkClasses("/admin/job-list")}
                        >
                            <CiViewList size={24} />
                            Job List
                        </Link>
                    </li>

                   

                    <li>
                        <Link
                            to="/admin/settings"
                            className={linkClasses("/admin/settings")}
                        >
                            <MdSettings size={24} />
                            Settings
                        </Link>
                    </li>

                    <div
                        onClick={handleclick}
                        className="   gap-x-2 py-[7px] rounded-full hover:bg-red-700 bg-opacity-10  hover:text-white  flex gap-2 px-4 py-2 text-sm text-[#FF1B1B] hover:text-[#0367F7]"

                    >
                        <MdLogout size={24} />
                        Logout
                    </div>
                </ul>
            </div>
        </div>
    );
}

export default SideBarAdmin;
