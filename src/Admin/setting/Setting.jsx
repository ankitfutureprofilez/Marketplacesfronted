import { useEffect, useState } from "react";
import HeaderAdmin from "../../common/HeaderAdmin";
import StudentChangePassword from "./studentChangePassword";
import Profileupdate from "./Profileupdate";
import Listing from "../../Apis/Listing";
import SwiperTest from "./SwiperTest";
import { FiMail, FiPhone, FiCheckCircle, FiUser } from "react-icons/fi";

function Setting() {
  const [activeTab, setActiveTab] = useState("profile");
  const [listing, setListing] = useState("");

  const fetchData = async (signal) => {
    try {
      const main = new Listing();
      const response = await main.profileVerify({ signal });
      setListing(response?.data?.data);
    } catch (error) {
      localStorage && localStorage.removeItem("token");
      // toast.error("Please log in first.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const initials = (listing?.name || "Admin").substring(0, 2).toUpperCase();

  return (
    <div className="w-full space-y-6">
      <HeaderAdmin title={"Admin Settings"} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Form Settings Tabs */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs">
            {/* Tabs */}
            <div className="flex mb-6 font-[Poppins]">
              <div className="flex items-center h-11 bg-slate-100 rounded-2xl p-1.5 shrink-0">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`flex items-center h-full px-5 rounded-xl text-[13.5px] font-semibold transition-all duration-200 cursor-pointer ${
                    activeTab === "profile"
                      ? "bg-white text-slate-900 shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Profile Update
                </button>
                <button
                  onClick={() => setActiveTab("password")}
                  className={`flex items-center h-full px-5 rounded-xl text-[13.5px] font-semibold transition-all duration-200 cursor-pointer ${
                    activeTab === "password"
                      ? "bg-white text-slate-900 shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Reset Password
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="animate-fadeIn">
              {activeTab === "profile" && (
                <Profileupdate
                  listing={listing}
                  setListing={setListing}
                  fetchData={fetchData}
                />
              )}

              {activeTab === "password" && (
                <StudentChangePassword listing={listing} />
              )}

              {activeTab === "swiper" && (
                <SwiperTest />
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Profile Summary Details Card */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs flex flex-col items-center text-center">
            <h2 className="text-base lg:text-lg font-bold font-[Poppins] text-slate-900 tracking-tight self-start mb-6 border-b border-slate-100 pb-3 w-full text-left">
              Profile Summary
            </h2>
            
            <div className="relative shrink-0 mt-2">
              {listing?.avatar ? (
                <img
                  src={listing?.avatar}
                  alt={listing?.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-slate-100 shadow-sm"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-slate-900 text-white font-extrabold text-2xl flex items-center justify-center shadow-xs">
                  {initials}
                </div>
              )}
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 tracking-tight font-[Poppins] capitalize mt-4">
              {listing?.name || "Admin"}
            </h3>
            
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 font-[Poppins] mt-1.5">
              {listing?.role || "Administrator"}
            </span>

            <div className="w-full border-t border-slate-100 my-5"></div>

            <div className="w-full space-y-4 font-[Poppins]">
              {/* Email */}
              <div className="w-full flex items-center gap-3 text-left">
                <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center border border-orange-200/80 shrink-0">
                  <FiMail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-semibold text-gray-400 uppercase block">Email Address</span>
                  <span className="text-sm font-medium text-slate-700 block truncate" title={listing?.email}>{listing?.email || "N/A"}</span>
                </div>
              </div>

              {/* Phone */}
              <div className="w-full flex items-center gap-3 text-left">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center border border-blue-200/80 shrink-0">
                  <FiPhone className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-semibold text-gray-400 uppercase block">Phone Number</span>
                  <span className="text-sm font-medium text-slate-700 block truncate">{listing?.phone || "N/A"}</span>
                </div>
              </div>

              {/* Status */}
              <div className="w-full flex items-center gap-3 text-left">
                <div className="w-8 h-8 rounded-xl bg-green-50 text-green-500 flex items-center justify-center border border-green-200/80 shrink-0">
                  <FiCheckCircle className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-semibold text-gray-400 uppercase block">Account Status</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full capitalize mt-0.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    {listing?.status || "active"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
