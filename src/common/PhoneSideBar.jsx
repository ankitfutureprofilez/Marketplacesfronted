import { CiViewList } from "react-icons/ci";
import LOGO from "../img/marketplace.svg";
import { MdContacts, MdLogout, MdSettings, MdSupervisedUserCircle } from "react-icons/md";
import { SiBloglovin } from "react-icons/si";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiProductHuntLine } from "react-icons/ri";
import toast from "react-hot-toast";

function PhoneSideBar({ sideOpen, toggleSidebar }) {
    const navigate = useNavigate();


    const handleclick = () => {
        localStorage && localStorage.removeItem("token")
        toast.success("Logout successfully!");
        navigate("/admin/login")

    };
    const location = useLocation(); // current route

    const linkClasses = (path) =>
        `px-[15px] flex flex-wrap items-center py-[7px] rounded-full text-base tracking-[-0.03em] font-medium hover:text-[#0367F7] ${location.pathname === path
            ? "bg-[#0367F7] bg-opacity-10 text-[#0367F7]"
            : "text-[#8D929A]"
        }`;

    return (
        <div
            className={`w-[300px] fixed overflow-y-auto py-3 cursor-pointer items-center z-50 bg-white top-0 bottom-0 ${sideOpen ? "block" : "hidden"
                } md:block`}
        >
            <div className="px-4 py-4 md:px-6 md:py-6 lg:px-[28px] lg:py-8">
                <div className="mb-5 md:mb-10 lg:mb-[53px] text-center">
                    <img
                        className="max-w-[190px] lg:max-w-full block lg:m-auto"
                        src={LOGO}
                        alt="img"
                        width="208"
                    />
                </div>

                {/* Close button for mobile */}
                <div className="lg:hidden absolute top-6 right-3">
                    <button
                        type="button"
                        className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-[#0367F7] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={toggleSidebar}
                    >
                        <svg
                            className={`${sideOpen ? "block" : "hidden"} h-6 w-6`}
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <h3 className="uppercase text-[#808080] px-[15px] text-sm font-semibold mb-2.5 lg:mb-3.5">
                    Overview
                </h3>
                <ul className="space-y-3">
                    <li>
                        <Link
                            to="/admin/dashboard"
                            className={linkClasses("/admin/dashboard")}
                        >
                            <svg
                                className="inline align-middle mr-[4px]"
                                width="21"
                                height="20"
                                viewBox="0 0 21 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M11.4622 7.5V2.5H18.1289V7.5H11.4622ZM3.12891 10.8333V2.5H9.79557V10.8333H3.12891ZM11.4622 17.5V9.16667H18.1289V17.5H11.4622ZM3.12891 17.5V12.5H9.79557V17.5H3.12891Z"
                                    fill="currentColor"
                                />
                            </svg>
                            Dashboard
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/admin/team"
                            className={linkClasses("/admin/team")}
                        >
                            <MdSupervisedUserCircle size={24} />
                            Add team member
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/admin/contact-list"
                            className={linkClasses("/admin/contact-list")}
                        >
                            <MdContacts size={24} />
                            Contact List
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/admin/blog-list"
                            className={linkClasses("/admin/blog-list")}
                        >
                            <SiBloglovin size={24} />
                            Blog List
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
                            to="/admin/career-user-list"
                            className={linkClasses("/admin/career-user-list")}
                        >
                            <CiViewList size={24} />
                            Career List
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/admin/project-list"
                            className={linkClasses("/admin/project-list")}
                        >
                            <RiProductHuntLine size={24} />
                            Project List
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
                </ul>
                <div
                    onClick={handleclick}
                    className="gap-x-2 py-[7px] rounded-full hover:bg-red-700 bg-opacity-10  hover:text-white  flex gap-2 px-4 py-2 text-sm text-[#FF1B1B] hover:text-[#0367F7]"

                >
                    <MdLogout size={24} />
                    Logout
                </div>
            </div>
        </div>
    );
}

export default PhoneSideBar;
