import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../img/market.png"; // Ensure the path is correct
import { MdContentPaste, MdOutlineCategory } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdDashboard, MdSettings } from "react-icons/md";
import { LuMessageCircleMore, LuShieldCheck, LuUsers, LuUserSearch } from "react-icons/lu";
import toast from "react-hot-toast";
import { useMemo, useState } from "react";
import { useRole } from "../context/RoleContext";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { BiPurchaseTag } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";

function SideBar() {
  const SIDEBAR_ITEMS = [
    { label: "Dashboard", path: "/", icon: MdDashboard },
    {
      label: "Customer Management",
      path: "/customer",
      icon: LuUsers,
      permission: "manage_customers",
    },
    {
      label: "Sales Management",
      path: "/sales",
      icon: LuUserSearch,
      permission: "manage_sales",
    },
    {
      label: "Vendor Management",
      path: "/vendor",
      icon: LiaShoppingBagSolid,
      permission: "manage_vendors",
    },
    {
      label: "Categories",
      path: "/category",
      icon: MdOutlineCategory,
      permission: "manage_categories",
    },
    {
      label: "Purchase History",
      path: "/purchase-history",
      icon: BiPurchaseTag,
      permission: "view_purchase",
    },
    { label: "Sub-Admin", path: "/sub-admin", icon: LuShieldCheck, role: "admin" },
    {
      label: "Enquiries",
      path: "/enquiries",
      icon: LuMessageCircleMore,
    },
    {
      label: "Website Content",
      path: "/home",
      icon: MdContentPaste,
      permission: "manage_website",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const navigate = useNavigate();
  const { user } = useRole();

  const hasAccess = (item) => {
    if (!user) return false;
    if (user.role === "admin") return true;
    if (item.role && item.role !== user.role) return false;
    if (item.permission) return user.permissions?.includes(item.permission);
    return true;
  };

  const visibleItems = useMemo(() => SIDEBAR_ITEMS.filter(hasAccess), [user]);

  const handleLinkClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage && localStorage.removeItem("AdminToken");
    toast.success("Logout Successful");
    navigate("/login");
  };

  return (
    <>
      {!isOpen && (
        <button
          className="lg:hidden p-2 fixed font-bold top-2.5 text-[#565F66] z-[99]"
          onClick={() => setIsOpen(true)}
        >
          <IoIosMenu size={24} />
        </button>
      )}

      {/* Main Container - uses flex-col and h-screen/fixed to pin elements */}
      <div
        className={`z-50 sidebar border-r border-gray-200 w-[260px] md:w-[286px] fixed left-0 top-0 bottom-0 bg-white flex flex-col justify-between transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:flex`}
      >
        {/* Top Scrollable Region */}
        <div className="flex flex-col flex-1 min-h-0">
          {isOpen && (
            <button
              className="lg:hidden p-1.5 absolute right-3 top-3 text-red-700 border border-red-700 z-[99] rounded"
              onClick={() => setIsOpen(false)}
            >
              <IoMdArrowRoundBack size={18} />
            </button>
          )}

          {/* Logo Header */}
          <div className="border-b border-gray-100 flex items-center px-3 md:px-4 lg:px-6 py-6 lg:py-4 shrink-0">
            <Link to="/" onClick={handleLinkClick} className="flex items-center">
              <img
                src={logo}
                alt="Marketplace"
                height={1000}
                width={1000}
                className="h-[40px] w-[40px] mx-2 inline-block object-contain"
              />
              <p className="text-lg font-medium uppercase text-slate-800">Market Place</p>
            </Link>
          </div>

          {/* Nav List - overflow-y-auto is placed only here so it scrolls independently */}
          <div className="py-4 overflow-y-auto flex-1 custom_scroll">
            <p className="px-6 uppercase text-[#727272] text-xs font-semibold tracking-wider mb-3">
              Main Menu
            </p>

            <ul className="space-y-1 px-3">
              {visibleItems &&
                visibleItems?.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={handleLinkClick}
                        className={`flex items-center gap-3 py-2.5 px-4 text-sm font-medium rounded-xl transition-colors ${
                          isActive(item.path)
                            ? "text-white bg-blue-800 shadow-sm"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <Icon size={20} />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}

              <li>
                <Link
                  to={"/setting"}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 py-2.5 px-4 text-sm font-medium rounded-xl transition-colors ${
                    isActive("/setting")
                      ? "text-white bg-blue-600 shadow-sm"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <MdSettings size={20} />
                  Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom User Profile Card - shrink-0 ensures it stays at the bottom */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50 shrink-0">
          <div className="p-2.5 rounded-xl bg-white border border-slate-200/70 flex items-center justify-between shadow-xs">
            <Link
              to="/setting"
              onClick={handleLinkClick}
              className="flex items-center gap-3 overflow-hidden min-w-0"
            >
              <img
                src={user?.avatar || "/Placeholder.png"}
                alt="Profile"
                className="w-9 h-9 rounded-lg object-cover ring-1 ring-slate-200 shrink-0"
              />
              <div className="min-w-0 text-left">
                <p className="text-xs font-semibold text-slate-900 truncate">
                  {user?.name || "Admin kumar"}
                </p>
                <p className="text-[11px] text-slate-400 capitalize truncate">
                  {user?.role || "Admin"}
                </p>
              </div>
            </Link>

            <button
              onClick={handleLogout}
              title="Logout"
              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors shrink-0"
            >
              <FiLogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;