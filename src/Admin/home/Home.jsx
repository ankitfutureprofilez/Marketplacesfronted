import React, { useState } from "react";
import Terms from "./Terms";
import Privacy from "./Privacy";
import HeaderAdmin from "../../common/HeaderAdmin";
import OfferPrice from "./OfferPrice";

export default function Home() {
  const [activeTab, setActiveTab] = useState("offer");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
      <div className="flex flex-col w-full">
        <HeaderAdmin title={"Website"} />
        <div className="bg-white px-4 py-2 lg:px-4 lg:py-2.5">
        <div className="flex border-b border-[rgba(0,0,0,.1)]">
          <button
            onClick={() => handleTabClick("offer")}
            className={` cursor-pointer tracking-[-0.04em] font-medium  px-2 md:px-4 lg:px-3 xl:px-8 pt-3 lg:pt-4 pb-3 lg:pb-4 text-sm 
            sm:text-base  xl:text-xl outline-none focus:outline-none ease-linear transition-all border-b duration-150  
            ${
              activeTab === "offer"
                ? "text-[#CC2828] border-[#CC2828]"
                : "text-[#535353]  border-[rgba(0,0,0,.0)] "
            }`}
          >
            Offers Price
          </button>

          <button
            onClick={() => handleTabClick("term")}
            className={` cursor-pointer tracking-[-0.04em] font-medium  px-2 md:px-4 lg:px-3 xl:px-8 pt-3 lg:pt-4 pb-3 lg:pb-4 text-sm 
            sm:text-base  xl:text-xl outline-none focus:outline-none ease-linear transition-all border-b duration-150  
            ${
              activeTab === "term"
                ? "text-[#CC2828] border-[#CC2828]"
                : "text-[#535353]  border-[rgba(0,0,0,.0)] "
            }`}
          >
            Terms & Conditions
          </button>

          <button
            onClick={() => handleTabClick("privacy")}
            className={` cursor-pointer tracking-[-0.04em] font-medium  px-2 md:px-4 lg:px-3 xl:px-8 pt-3 lg:pt-4 pb-3 
            lg:pb-4 text-sm sm:text-base  xl:text-xl outline-none focus:outline-none ease-linear transition-all 
            border-b duration-150  ${
              activeTab === "privacy"
                ? "text-[#CC2828] border-[#CC2828]"
                : "text-[#535353]  border-[rgba(0,0,0,.0)] "
            }`}
          >
            Privacy Policy
          </button>
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
