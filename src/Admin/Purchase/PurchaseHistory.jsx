import React, { useEffect, useState } from "react";
import AuthLayout from "../../component/AuthLayout";
import HeaderAdmin from "../../common/HeaderAdmin";
import Listing from "../../Apis/Listing";
import Nodata from "../../common/Nodata";

export default function PurchaseHistory() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.PurchasedOfferGet();
      if(response?.data?.status){
        setData(response?.data?.data || []);
      }
      else{
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
    <AuthLayout>
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
        <table className="w-full table-auto whitespace-nowrap">
          <thead className="border-b border-[#000000] border-opacity-10">
            <tr>
              {[
                "S. No.",
                "Offer Name",
                "Customer",
                "Total Amount",
                "Discount",
                "Final Amount",
                "Used Time",
                "Bill",
                "Status"
              ].map((header) => (
                <th
                  key={header}
                  className="font-[Poppins] text-[14px] text-[#8C9199] font-[600] uppercase text-left p-[10px]"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {data?.purchased?.map((item, index) => {
              const offerTitle =
                item?.offer?.flat?.title ||
                item?.offer?.percentage?.title ||
                "N/A";

              return (
                <tr key={item?._id} className="bg-white">
                  <td className="font-[Poppins] text-black text-[16px] px-[10px] py-[16px]">
                    {index + 1}
                  </td>

                  <td className="font-[Poppins] text-black text-[16px] px-[10px] py-[16px]">
                    {offerTitle}
                  </td>

                  <td className="font-[Poppins] text-black text-[16px] px-[10px] py-[16px]">
                    {item?.user?.name}
                  </td>

                  <td className="font-[Poppins] text-[16px] text-left px-[10px] py-[16px]">
                    ₹{item?.total_amount}
                  </td>

                  <td className="font-[Poppins] text-[16px] text-left px-[10px] py-[16px]">
                    ₹{item?.discount}
                  </td>

                  <td className="font-[Poppins] text-[16px] text-left px-[10px] py-[16px]">
                    ₹{item?.final_amount}
                  </td>

                  <td className="font-[Poppins] text-[16px] text-left px-[10px] py-[16px]">
                    {item?.used_time
                      ? new Date(item?.used_time).toLocaleString()
                      : "N/A"}
                  </td>

                  {/* Bill Preview */}
                  <td className="font-[Poppins] text-[16px] px-[10px] py-[16px]">
                    {item?.bill ? (
                      <a
                        href={item.bill}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>

                  <td className="font-[Poppins] uppercase text-xs font-semibold px-[10px] py-[16px]">
                    <span
                      className={`px-2 py-1 rounded-full ${
                        item?.vendor_bill_status
                          ? "bg-green-500 text-white"
                          : "bg-yellow-400 text-white"
                      }`}
                    >
                      {item?.vendor_bill_status ? "Redeemed" : "Pending"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  </div>
</div>
      </div>
    </AuthLayout>
  );
}
