import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../img/market.png"; // Ensure the path is correct
import { MdContentPaste, MdLogout, MdOutlineCategory, MdSpaceDashboard } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdDashboard, MdSettings, MdVerifiedUser } from "react-icons/md";
import { LuMessageCircleMore, LuShieldCheck, LuUsers, LuUserSearch } from "react-icons/lu";
import { FaUser, FaUserAlt } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { FaRegEnvelope } from "react-icons/fa6";
import { FaListAlt } from "react-icons/fa";
import { IoCloseSharp, IoLogOutSharp } from "react-icons/io5";
import { MdEvent } from "react-icons/md";
import { MdContacts } from "react-icons/md";
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

    // { label: "Settings", path: "/setting", icon: MdSettings, role: "admin" },
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

  // console.log("user", user);

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

      <div
        className={`z-50 custom_scroll sidebar border-opacity-10 w-[260px] md:w-[286px] fixed left-0 top-0 bottom-0 overflow-y-auto bg-white transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:block`}
      >
        {isOpen && (
          <button
            className="lg:hidden p-1.5 absolute left-[213px] top-3 text-red-700 border border-red-700 z-[99] rounded"
            onClick={() => setIsOpen(false)}
          >
            <IoMdArrowRoundBack size={18} />
          </button>
        )}

        <div className="border-b border-gray-100 flex items-center px-3 md:px-4 lg:px-6 text-center py-6 lg:py-4">
          <Link to="/">
            <img
              src={logo}
              alt="Marketplace"
              height={1000}
              width={1000}
              className="h-[40px] w-[40px] mx-2 inline-block"
            />
          </Link>
          <p className="text-lg font-medium uppercase">Market Place</p>
        </div>

        
        <div className="py-6">
          <p className="px-6 uppercase text-[#727272] text-sm font-medium mb-4">
            Main Menu
          </p>

          <ul className="space-y-1 px-2">
            {visibleItems && visibleItems?.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={handleLinkClick}
                    className={`flex items-center gap-2 py-2.5 px-6 text-sm rounded-xl
                        ${isActive(item.path)
                        ? "text-white bg-blue-600"
                        : "text-gray-800 hover:bg-gray-100"
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
                className={`flex items-center gap-2 py-2.5 px-6 text-sm rounded-xl
                    ${isActive("/setting")
                    ? "text-blue-600 bg-gray-200"
                    : "text-gray-800 hover:bg-gray-100"
                  }`}
              >
                <MdSettings size={20} />
                Settings
              </Link>
            </li>

            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 py-2.5 px-6 text-sm text-red-600 hover:bg-gray-100 w-full rounded-xl"
              >
                <MdLogout size={20} />
                Logout
              </button>
            </li>
          </ul>
        </div>
        {/* Bottom User Profile Card */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50">
          <div className="p-2.5 rounded-xl bg-white border border-slate-200/70 flex items-center justify-between shadow-xs">
            <Link
              to="/setting"
              onClick={handleLinkClick}
              className="flex items-center gap-3 overflow-hidden"
            >
              <img
                src={user?.avatar || "/Placeholder.png"}
                alt="Profile"
                className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200/60 shrink-0"
              />
              <div className="min-w-0 text-left">
                <p className="text-xs font-semibold text-slate-900 truncate">
                  {user?.name || "Admin User"}
                </p>
                <p className="text-[11px] text-slate-400 capitalize truncate">
                  {user?.role || "Administrator"}
                </p>
              </div>
            </Link>

            <button
              onClick={handleLogout}
              title="Logout"
              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
            >
              <FiLogOut size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
