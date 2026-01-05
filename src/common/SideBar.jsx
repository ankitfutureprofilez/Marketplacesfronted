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
import { useState } from "react";

function SideBar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const handleLinkClick = () => {
        if (isOpen) {
            setIsOpen(false);
        }
    };
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage && localStorage.removeItem('AdminToken');
        toast.success("Logout Successful");
        navigate('/login');
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
                // src={user?.profile_photo || "/Placeholder.png"}
                src={"/Placeholder.png"}
                alt="User profile photo"
                className="w-11 h-11 rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col">
                <div className="flex items-center gap-2">
                <p className="font-medium text-sm capitalize text-black -tracking-[0.04em]">
                    {/* {user?.name || ""} */}
                </p>
            </div>
                <p className="text-xs capitalize #7A7A7A text-[#7A7A7A]">
                    {/* {user?.role || "Admin"} */}
                </p>
            </div>
          </Link>
        </div>
        <div className="py-6">
          <p className="px-6 uppercase text-[#727272] text-sm font-medium mb-4">
            Main Menu
          </p>

          <ul className="space-y-1">
            <li>
              <Link
                to="/"
                onClick={handleLinkClick}
                className={`flex items-center gap-2 py-2.5 px-6 text-base font-medium
                ${
                  isActive("/")
                    ? "text-blue-600 bg-gray-200"
                    : "text-[#565F66] hover:bg-gray-100"
                }`}
              >
                <MdSpaceDashboard size={20} />
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/customer"
                onClick={handleLinkClick}
                className={`flex items-center gap-2 py-2.5 px-6 text-base font-medium
                ${
                  isActive("/customer")
                    ? "text-blue-600 bg-gray-200"
                    : "text-[#565F66] hover:bg-gray-100"
                }`}
              >
                <FaUser size={20} />
                Customer Management
              </Link>
            </li>

            <li>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 py-2.5 px-6 text-[#565F66] hover:bg-gray-100"
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