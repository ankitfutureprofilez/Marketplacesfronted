import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../img/market.png"; // Ensure the path is correct
import { MdDashboard, MdSettings, MdVerifiedUser } from "react-icons/md";
import { FaUser, FaUserAlt } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { FaRegEnvelope } from "react-icons/fa6";
import { FaListAlt } from "react-icons/fa";
import { IoCloseSharp, IoLogOutSharp } from "react-icons/io5";
import { MdEvent } from "react-icons/md";
import { MdContacts } from "react-icons/md";
import toast from "react-hot-toast";

function SideBar({ isOpen, setIsOpen, toggleSidebar }) {
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
        <div
            className={`${isOpen ? "  w-![340px]  left-0 " : "h-full  w-[100%] -left-[500px]"} h-full border-r border-r-[#cccccc2e] xl:border-none border-r-[#ccc] max-w-[286px] bg-[#ffffff]  px-[15px] py-[20px] fixed z-100 top-[0px] lg:top-[0] xl:top-[15px] ${isOpen ? "left-[0px]" : "left-[-100%]"
                } z-[9] xl:left-[15px] transition-all duration-300`}
        >
            <div className="flex justify-between items-start mb-[40px]">
                <div className=" ">
                    <img src={logo} alt="Logo" className="max-w-[130px]" />
                </div>

                <button onClick={toggleSidebar} className="text-black">
                    {isOpen && <IoCloseSharp size={32} />}
                </button>
            </div>

            <div className="h-full">
                <ul>
                    <li className="flex mb-[5px]">
                        <Link
                            to=""

                            className={`flex font-[Poppins] items-center w-full text-base p-[10px] rounded-[10px] ${isActive("") ? "bg-[#F5F6FB] text-blue-600" : "text-black"} hover:bg-[#F5F6FB]`}
                        >
                            <i
                                onClick={handleLinkClick} // Toggle sidebar on click
                                className={`pr-[10px] ${isActive("") ? "text-blue-600" : "text-black"}`}>
                                <MdDashboard />
                            </i>
                            Dashboard
                        </Link>
                    </li>

                    <li className="flex mb-[5px]">
                        <Link
                            to="/user"
                            className={`flex font-[Poppins] items-center w-full text-base p-[10px] rounded-[10px] ${isActive("/user") ? "bg-[#F5F6FB] text-blue-600" : "text-black"} hover:bg-[#F5F6FB]`}
                        >
                            <i
                                onClick={toggleSidebar}
                                className={`pr-[10px] ${isActive("/user") ? "text-blue-600" : "text-black"}`}>
                                <FaUser />
                            </i>
                            User Management
                        </Link>
                    </li>

                    <li className="flex mb-[5px]">
                        <Link
                            to="/sales"
                            className={`flex font-[Poppins] items-center w-full text-base p-[10px] rounded-[10px] ${isActive("/sales") ? "bg-[#F5F6FB] text-blue-600" : "text-black"} hover:bg-[#F5F6FB]`}
                        >
                            <i
                                onClick={toggleSidebar}
                                className={`pr-[10px] ${isActive("/sales") ? "text-blue-600" : "text-black"}`} >
                                <FaUserAlt />
                            </i>
                            Sales Management
                        </Link>
                    </li>

                    <li className="flex mb-[5px]">
                        <Link
                            to="/vendor"
                            className={`flex  font-[Poppins] items-center w-full text-base p-[10px] rounded-[10px] ${isActive("/vendor") ? "bg-[#F5F6FB] text-blue-600" : "text-black"} hover:bg-[#F5F6FB]`}
                        >
                            <i
                                onClick={toggleSidebar}
                                className={`pr-[10px] ${isActive("/vendor") ? "text-blue-600" : "text-black"}`}>
                                <FaUser />
                            </i>
                            Vendor Management
                        </Link>
                    </li>

                    <li className="flex mb-[5px]">
                        <Link
                            to="/setting"
                            className={`flex  font-[Poppins] items-center w-full text-base p-[10px] rounded-[10px] ${isActive("/setting") ? "bg-[#F5F6FB] text-blue-600" : "text-black"} hover:bg-[#F5F6FB]`}
                        >
                            <i
                                onClick={toggleSidebar}
                                className={`pr-[10px] ${isActive("/setting") ? "text-blue-600" : "text-black"}`}>
                                <MdSettings />
                            </i>
                            Settings
                        </Link>
                    </li>
                </ul>
                <div className="absolute bottom-[40px] left-[35px]">
                    <button className="flex font-[Poppins] items-center text-[18px] text-black" onClick={handleLogout}>
                        <i onClick={toggleSidebar} className="text-red-600 pr-[8px]">
                            <IoLogOutSharp size={25} />
                        </i>
                        Log out
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SideBar;