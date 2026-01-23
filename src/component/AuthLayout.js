import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import SideBar from "../common/SideBar";
import { MdLogout } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import Listing from "../Apis/Listing";
import { useRole } from "../context/RoleContext";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, setUser } = useRole();

  const SIDEBAR_ITEMS = [
    { label: "Dashboard", path: "/" },

    {
      label: "Customer Management",
      path: "/customer",
      permission: "manage_customers",
    },
    {
      label: "Sales Management",
      path: "/sales",
      permission: "manage_sales",
    },
    {
      label: "Vendor Management",
      path: "/vendor",
      permission: "manage_vendors",
    },
    {
      label: "Categories",
      path: "/category",
      permission: "manage_categories",
    },
    {
      label: "Purchase History",
      path: "/purchase-history",
      permission: "view_purchase",
    },
    {
      label: "Sub-Admin",
      path: "/sub-admin",
      role: "admin",
    },
    {
      label: "Website Content",
      path: "/home",
      role: "admin",
    },
  ];

  const PAGE_TITLES = [
    { path: "/", title: "Dashboard", exact: true },
    { path: "/vendor/add", title: "Add Vendor" },
    { path: "/vendor", title: "Vendor Management" },
    { path: "/vendor/:id", title: "Vendor Details" },
    { path: "/sales", title: "Sales Management" },
    { path: "/sales/:id", title: "Sales Details" },
    { path: "/category", title: "Categories" },
    { path: "/customer", title: "Customer Management" },
    { path: "/customer/:id", title: "Customer Details" },
    { path: "/purchase-history", title: "Purchase History" },
    { path: "/home", title: "manage_website" },
    { path: "/sub-admin", title: "Sub-Admin" },
    { path: "/setting", title: "Settings" },
  ];

  const getPageTitle = (pathname) => {
    const exactMatch = PAGE_TITLES.find(
      (item) => item.exact && item.path === pathname
    );
    if (exactMatch) return exactMatch.title;
    const matched = PAGE_TITLES.find((item) => {
      if (item.path.includes("/:")) {
        const basePath = item.path.split("/:")[0];
        return pathname.startsWith(basePath + "/");
      }
      return pathname === item.path;
    });
    return matched?.title || "Dashboard";
  };

  const hasAccess = (user, item) => {
    if (!user) return false;
    if (user.role === "admin") return true;
    if (item.role && item.role !== user.role) return false;
    if (item.permission) return user.permissions?.includes(item.permission);
    return true;
  };

  const fetchData = async (signal) => {
    // setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const main = new Listing();
      const response = await main.profileVerify({ signal });
      // console.log("response", response);
      if (response.data?.status) {
        setUser(response.data.data);
      }
      else{
        // throw error("Error in profile api");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      if (
        error.response?.status === 401 ||
        error.message === "No token found"
      ) {
        localStorage.removeItem("token");
        toast.error("Please log in again");
        navigate("/login");
      }
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetchData(signal);
    return () => {
      console.log("Aborting fetch...");
      controller.abort();
    };
  }, [location.pathname]);

  useEffect(() => {
    if (!user) return;

    const currentPath = location.pathname;

    const matchedItem = SIDEBAR_ITEMS.find(
      (item) =>
        currentPath === item.path ||
        currentPath.startsWith(item.path + "/") // handles /sales/123
    );

    if (!matchedItem) return; // public or unknown route

    const allowed = hasAccess(user, matchedItem);

    if (!allowed) {
      toast.error("You do not have access to this page");
      navigate("/", { replace: true });
    }
  }, [location.pathname, user]);

  const handleLogout = () => {
    localStorage && localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logout Successfully");
    // setUser(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="md:flex flex-wrap bg-black items-start">
      <SideBar />
      <div className="w-full lg:ml-[286px] lg:w-[calc(100%-286px)]">
        <div className="fixed right-0  z-10 pl-0 lg:pl-[30px] top-0 w-full lg:w-[calc(100%-286px)] ">
          <div className="justify-between px-4 md:px-5 lg:px-[30px] py-3 lg:py-4 top-0 bg-white flex items-center w-full flex-wrap rounded-b-[10px]">
            <div className="w-7/12 sm:w-4/12 pl-6 lg:pl-0">
              <h1 className="text-blue-600 text-lg sm:text-xl lg:text-2xl tracking-[-0.04em] font-semibold">
                {getPageTitle(location.pathname) || "Dashboard"}
              </h1>
            </div>
            <div className="w-5/12 sm:w-8/12 flex justify-end space-x-2.5 md:space-x-4">
              <div className="relative">
                <button
                  className="border border-[rgba(0,0,0,0.2)] rounded-md lg:rounded-xl
                            w-[44px] lg:w-[48px] h-[34px] lg:h-[38px]
                            flex items-center justify-center
                            text-black bg-white
                            hover:bg-black hover:text-white
                            transition-colors duration-200
                            cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <FaRegUser size={18} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                    <ul className="py-1">
                      <Link
                        to="/setting"
                        className="flex gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <IoSettingsOutline size={20} /> Settings
                      </Link>
                      <li
                        className="flex gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={handleLogout}
                      >
                        <MdLogout size={20} /> Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="pl-0 md:pl-5 lg:pl-[30px] pt-20 lg:pt-24 pb-8 bg-[#F2F2F2]">
          <div className=" rounded-[10px] lg:rounded-[10px] ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}