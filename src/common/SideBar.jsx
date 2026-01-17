import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../img/market.png"; // Ensure the path is correct
import { MdSpaceDashboard } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdDashboard, MdSettings, MdVerifiedUser } from "react-icons/md";
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

function SideBar() {
  const SIDEBAR_ITEMS = [
    { label: "Dashboard", path: "/", icon: MdDashboard },
    {
      label: "Customer Management",
      path: "/customer",
      icon: FaUser,
      permission: "manage_customers",
    },
    {
      label: "Sales Management",
      path: "/sales",
      icon: FaUserAlt,
      permission: "manage_sales",
    },
    {
      label: "Vendor Management",
      path: "/vendor",
      icon: FaUser,
      permission: "manage_vendors",
    },
    {
      label: "Categories",
      path: "/category",
      icon: FaUser,
      permission: "manage_categories",
    },
    {
      label: "Purchase History",
      path: "/purchase-history",
      icon: MdPayment,
      permission: "view_purchase",
    },
    { label: "Sub-Admin", path: "/sub-admin", icon: FaUser, role: "admin" },
    {
      label: "Website Content",
      path: "/home",
      icon: MdSettings,
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
        className={`z-50 custom_scroll sidebar border-opacity-10 w-[260px] md:w-[286px] fixed left-0 top-0 bottom-0 overflow-y-auto bg-white transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
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

        <div className="px-3 md:px-4 lg:px-6 text-center py-6 lg:py-8">
          <Link to="/">
            <img
              src={logo}
              alt="Marketplace"
              height={1000}
              width={1000}
              className="h-[85px] w-[100px] mx-2 inline-block"
            />
          </Link>
        </div>

        <div className="px-3 lg:px-4">
          <Link
            to="/setting"
            className="user_row p-2.5 bg-white shadow-md rounded-lg lg:rounded-xl flex items-center gap-3"
          >
            <div className="w-11 h-11 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {/* Replace with an actual image if needed */}
              <img
                src={user?.avatar || "/Placeholder.png"}
                alt="User profile photo"
                className="w-11 h-11 rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <p className="font-medium text-sm capitalize text-black -tracking-[0.04em]">
                  {user?.name || ""}
                </p>
              </div>
              <p className="text-xs capitalize #7A7A7A text-[#7A7A7A]">
                {user?.role || "Admin"}
              </p>
            </div>
          </Link>
        </div>
        <div className="py-6">
          <p className="px-6 uppercase text-[#727272] text-sm font-medium mb-4">
            Main Menu
          </p>

          <ul className="space-y-1">
            {visibleItems && visibleItems?.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={handleLinkClick}
                    className={`flex items-center gap-2 py-2.5 px-6 text-base font-medium
                        ${
                          isActive(item.path)
                            ? "text-blue-600 bg-gray-200"
                            : "text-[#565F66] hover:bg-gray-100"
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
                className={`flex items-center gap-2 py-2.5 px-6 text-base font-medium
                    ${
                      isActive("/setting")
                        ? "text-blue-600 bg-gray-200"
                        : "text-[#565F66] hover:bg-gray-100"
                    }`}
              >
                <MdSettings size={20} />
                Settings
              </Link>
            </li>

            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 py-2.5 px-6 text-base font-medium text-[#565F66] hover:bg-gray-100 w-full"
              >
                <IoLogOutSharp size={20} />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default SideBar;
