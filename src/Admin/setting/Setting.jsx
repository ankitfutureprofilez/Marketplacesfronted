import { useState } from "react";
import HeaderAdmin from "../common/HeaderAdmin";
import SideBarAdmin from "../common/SideBarAdmin";
import StudentChangePassword from "./studentChangePassword";
import Profileupdate from "./Profileupdate";

function Setting() {
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <div className="md:flex flex-wrap bg-[#F5F6FB]">
            <SideBarAdmin />
            <div className="w-full lg:w-[calc(100%-304px)]">
                <HeaderAdmin title={"Admin Settings"} />
                <div className="px-4 py-2 lg:px-10 lg:py-2.5">
                    <div className="bg-white rounded-[20px] p-5 shadow-md">

                        {/* Tabs */}
                        <div className="flex border-b border-gray-200 mb-4">
                            <button
                                onClick={() => setActiveTab("profile")}
                                className={`px-4 py-2 text-sm font-medium rounded-t-lg ${activeTab === "profile"
                                        ? "text-blue-600 border-b-2 border-blue-600"
                                        : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                Profile Update
                            </button>
                            <button
                                onClick={() => setActiveTab("password")}
                                className={`ml-4 px-4 py-2 text-sm font-medium rounded-t-lg ${activeTab === "password"
                                        ? "text-blue-600 border-b-2 border-blue-600"
                                        : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                Reset Password
                            </button>
                        </div>

                        {/* Tab Content */}
                        {activeTab === "profile" && (
                            <Profileupdate />
                        )}

                        {activeTab === "password" && (
                            <StudentChangePassword />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Setting;
