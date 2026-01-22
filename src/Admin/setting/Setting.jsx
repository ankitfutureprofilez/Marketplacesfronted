import { useEffect, useState } from "react";
import HeaderAdmin from "../../common/HeaderAdmin";
import StudentChangePassword from "./studentChangePassword";
import Profileupdate from "./Profileupdate";
import Listing from "../../Apis/Listing";
import SwiperTest from "./SwiperTest";

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

  return (
    <div className="w-full">
      <HeaderAdmin title={"Admin Settings"} />
      <div className="py-2lg:py-2.5">
        <div className="bg-white rounded-[20px] p-5 shadow-md">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-4">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
                activeTab === "profile"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Profile Update
            </button>
            <button
              onClick={() => setActiveTab("password")}
              className={`ml-4 px-4 py-2 text-sm font-medium rounded-t-lg ${
                activeTab === "password"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Reset Password
            </button>
          </div>

          {/* Tab Content */}
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
  );
}

export default Setting;
