import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../common/HeaderAdmin";
import Listing from "../../Apis/Listing";
import Nodata from "../../common/Nodata";
import PurchaseTable from "../../common/PurchaseTable";

export default function PurchaseHistory() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.PurchasedOfferGet();
      if (response?.data?.status) {
        setData(response?.data?.data || []);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching team list:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("data", data);

  return (
    <>
      <div className="w-full">
        <HeaderAdmin title="Purchased Offers" />
        {/* 🔹 Purchases Section */}
        <div className="px-4 py-2 lg:px-4 lg:py-2.5">
          <div className="bg-white rounded-[20px] mb-[10px] p-2">
            {/* Header */}
            <div className="px-4 py-4 flex justify-between items-center border-b border-black border-opacity-10">
              <h2 className="text-[16px] lg:text-[18px] font-bold font-[Poppins] font-[400] text-[#1E1E1E] tracking-[-0.03em] m-0">
                Customer Purchases
              </h2>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              {!data?.purchased?.length ? (
                <Nodata />
              ) : (
                <PurchaseTable data={data?.purchased} showCustomer={true} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
