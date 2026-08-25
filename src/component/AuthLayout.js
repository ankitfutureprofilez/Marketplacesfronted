import React, { useEffect, useState, useRef } from "react";
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
  const dropdownRef = useRef(null);
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
      permission: "manage_website",
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
    { path: "/home", title: "Website Content" },
    { path: "/sub-admin", title: "Sub-Admin" },
    { path: "/enquiries", title: "Enquiries" },
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
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const main = new Listing();
      const response = await main.profileVerify({ signal });
      if (response.data?.status) {
        setUser(response.data.data);
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
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetchData(signal);
    return () => {
      controller.abort();
    };
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!user) return;

    const currentPath = location.pathname;

    const matchedItem = SIDEBAR_ITEMS.find(
      (item) =>
        currentPath === item.path ||
        currentPath.startsWith(item.path + "/")
    );

    if (!matchedItem) return;

    const allowed = hasAccess(user, matchedItem);

    if (!allowed) {
      toast.error("You do not have access to this page");
      navigate("/", { replace: true });
    }
  }, [location.pathname, user]);

  const handleLogout = () => {
    localStorage && localStorage.removeItem("token");
    localStorage && localStorage.removeItem("AdminToken");
    toast.success("Logout Successful");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <SideBar />

      {/* Main Container aligned with Sidebar width (286px) */}
      <div className="lg:pl-[286px] flex flex-col min-h-screen">
        {/* Modern Sticky Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
            {/* Title Section */}
            <div className="pl-12 lg:pl-0 flex items-center gap-3">
              <div>
                <h1 className="text-slate-900 text-lg sm:text-xl font-bold tracking-tight">
                  {getPageTitle(location.pathname)}
                </h1>
                <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                  Marketplace Admin Portal
                </p>
              </div>
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center gap-2.5 p-1 sm:pr-3 rounded-full border border-slate-200/80 bg-white hover:bg-slate-50 transition-colors shadow-xs"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-semibold text-xs border border-blue-100">
                  <FaRegUser size={13} />
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-semibold text-slate-800 leading-tight">
                    {user?.name || "Admin User"}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium capitalize leading-tight">
                    {user?.role || "Administrator"}
                  </span>
                </div>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200/90 rounded-2xl shadow-xl shadow-slate-900/5 z-50 overflow-hidden p-1.5 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-xs font-semibold text-slate-900 truncate">
                      {user?.name || "Admin"}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {user?.email || "admin@marketplace.com"}
                    </p>
                  </div>

                  <Link
                    to="/setting"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 rounded-xl transition-colors"
                  >
                    <IoSettingsOutline size={16} className="text-slate-400" />
                    Settings
                  </Link>

                  <div className="my-1 border-t border-slate-100" />

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      handleLogout();
                    }}
                    className="flex w-full items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <MdLogout size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}