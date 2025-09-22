import LOGO from "../img/dashbaord.png"
import React, { useState, useEffect } from "react";
import { MdDashboard, MdSupervisedUserCircle, MdContacts, MdLogout, MdSettings } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaRegUserCircle } from "react-icons/fa";
import { PiUserCheckFill } from "react-icons/pi";
import { FaBars, FaTimes } from "react-icons/fa";


function AuthLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const location = useLocation(); // get current path

  const handleclick = () => {
    localStorage
      && localStorage
        .removeItem("token")
    toast.success("Logout successfully!");
    navigate("/")
  };

  const linkClasses = (path) =>
    `px-[15px] flex flex-wrap items-center gap-x-2 py-[7px] rounded-full text-[16px] font-poppins font-[500]  tracking-[-0.03em] hover:text-[#0367F7] ${location.pathname === path
      ? "bg-[#004AAD] bg-opacity-10 text-[#004AAD]"
      : "text-[#8D929A]"
    }`;

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white border-b border-gray-200 shadow-sm">
        <img src={LOGO} alt="Logo" className="" />
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          {isSidebarOpen ? (
            <FaTimes className="text-2xl text-gray-700" /> // Close icon
          ) : (
            <FaBars className="text-2xl text-gray-700" /> // Open icon
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-50 w-[260px] md:w-[280px] lg:w-[300px] fixed md:sticky left-0 top-0 bottom-0 overflow-y-auto bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out 
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="px-5 py-6">
          {/* Logo */}
          <div className="mb-8 text-center">
            <img src={LOGO} alt="logo" className="mx-auto " />
          </div>

          {/* Sidebar Links */}
          <h3 className="uppercase text-gray-500 text-sm font-semibold mb-4 tracking-wide">
            Overview
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/dashboard" className={linkClasses("/dashboard")}>
                <MdDashboard size={22} />
                <span className="ml-2">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/vendor" className={linkClasses("/vendor")}>
                <MdSupervisedUserCircle size={22} />
                <span className="ml-2">Vendor</span>
              </Link>
            </li>
            <li>
              <Link to="/sales" className={linkClasses("/sales")}>
                <FaRegUserCircle size={22} />
                <span className="ml-2">Sales</span>
              </Link>
            </li>
            <li>
              <Link to="/customer" className={linkClasses("/customer")}>
                <PiUserCheckFill size={22} />
                <span className="ml-2">Customer List</span>
              </Link>
            </li>
            <li>
              <Link to="/settings" className={linkClasses("/settings")}>
                <MdSettings size={22} />
                <span className="ml-2">Settings</span>
              </Link>
            </li>
          </ul>

          {/* Logout */}
          <div
            onClick={handleclick}
            className="mt-6 flex items-center gap-2 px-4 py-2 rounded-md text-red-600 hover:bg-red-50 cursor-pointer"
          >
            <MdLogout size={22} />
            <span>Logout</span>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>

  );
}

export default AuthLayout;
