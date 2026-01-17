import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Listing from "../../Apis/Listing";
import { FaUserCircle, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import PurchaseTable from "../../common/PurchaseTable";
import { formatMultiPrice } from "../../Hooks/ValueDataHook";

export default function CustomerDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.CustomerDetail(id);
      if (response.data) {
        setData(response.data.data);
      } else {
        setData([]);
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  // console.log("data", data);

  return (
    <>
      <div className="py-2lg:py-2.5 w-full">
        <div className="bg-white rounded-[20px] mb-[10px] p-2">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-6 p-4">
            {/* User Info */}
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                <FaUserCircle className="text-blue-600 text-4xl" />
              </div>

              <div>
                <p className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
                  {data?.record?.name || "N/A"}
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
                </p>
                <p className="text-sm text-gray-500 capitalize">
                  {data?.record?.role || "N/A"}
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap justify-center sm:justify-end gap-6 text-sm text-gray-700">
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border">
                <FaEnvelope className="text-gray-400" />
                <a href={`mailto:${data?.record?.email || "N/A"}`} className="font-medium">
                  {data?.record?.email || "N/A"}
                </a>
              </div>

              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border">
                <FaPhoneAlt className="text-gray-400" />
                <a href={`tel:${data?.record?.phone || "N/A"}`} className="font-medium">
                  {data?.record?.phone || "N/A"}
                </a>
              </div>
            </div>
          </div>

          {/* Stats/Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 rounded-xl shadow-lg text-white bg-gradient-to-br from-blue-600 to-blue-400">
              <p className="text-sm opacity-80">Total Offers</p>
              <p className="text-4xl font-extrabold mt-1">
                {data?.stats?.totalCount ?? 0}
              </p>
            </div>
            <div className="p-4 rounded-xl shadow-lg text-gray-800 bg-white border border-gray-200">
              <p className="text-sm font-medium text-gray-500">
                Redeemed Offers
              </p>
              <p className="text-4xl font-extrabold mt-1">
                {data?.stats?.vendorBillTrueCount ?? 0}
              </p>
            </div>
            <div className="p-4 rounded-xl shadow-lg text-gray-800 bg-green-50 border border-green-200">
              <p className="text-sm font-medium text-green-700">
                Pending Offers
              </p>
              <p className="text-4xl font-extrabold text-green-600 mt-1">
                {data?.stats?.vendorBillFalseCount ?? 0}
              </p>
            </div>
            <div className="p-4 rounded-xl shadow-lg text-gray-800 bg-yellow-50 border border-yellow-200">
              <p className="text-sm font-medium text-yellow-700">
                Total Amount Paid
              </p>
              <p className="text-3xl font-extrabold text-yellow-600 mt-1">
                {formatMultiPrice(data?.stats?.totalFinalAmountPaid, "INR") ?? 0}
              </p>
            </div>
          </div>

          {/* Purchases */}
          <div className="flex flex-col border-t border-black border-opacity-10 mt-4">
          {/* Title */}
          <div className="px-4 py-4">
            <h2 className="text-[16px] lg:text-[18px] font-bold text-[#1E1E1E]">
              Customer Purchases
            </h2>
          </div>
          {/* Table (NO padding) */}
          <div className="w-full">
            <PurchaseTable data={data?.offerBuys} showCustomer={false} />
          </div>
        </div>
        </div>
      </div>
    </>
  );
}