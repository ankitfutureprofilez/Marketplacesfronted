import React, { useState } from "react";
import Terms from "./Terms";
import Privacy from "./Privacy";
import HeaderAdmin from "../../common/HeaderAdmin";
import OfferPrice from "./OfferPrice";

export default function Home() {
  const [activeTab, setActiveTab] = useState("term");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
      <div className="flex flex-col w-full">
        <HeaderAdmin title={"Website"} />
        <div className="bg-white border border-gray-200 rounded-3xl py-4 lg:p-6">
          {/* Tab Headers */}
          <div className="flex mb-6 font-[Poppins]">
            <div className="flex items-center h-11 bg-slate-100 rounded-2xl p-1.5 shrink-0">
              {/* <button
                onClick={() => setActiveTab("offer")}
                className={`flex items-center h-full px-5 rounded-xl text-[13.5px] font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === "offer"
                    ? "bg-white text-slate-900 shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Offers Price
              </button> */}

              <button
                onClick={() => setActiveTab("term")}
                className={`flex items-center h-full px-5 rounded-xl text-[13.5px] font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === "term"
                    ? "bg-white text-slate-900 shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Terms & Conditions
              </button>

              <button
                onClick={() => setActiveTab("privacy")}
                className={`flex items-center h-full px-5 rounded-xl text-[13.5px] font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === "privacy"
                    ? "bg-white text-slate-900 shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Privacy Policy
              </button>
            </div>
          </div>
        <div className="min-h-[75vh]">
          <div className="mt-0">
            {activeTab === "offer" && <OfferPrice />}
            {activeTab === "term" && <Terms />}
            {activeTab === "privacy" && <Privacy />}
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
