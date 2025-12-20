import moment from 'moment';
import React from 'react'
import { formatMultiPrice } from '../Hooks/ValueDataHook';
import { Link } from 'react-router-dom';

export default function PurchaseTable({data, showCustomer}) {
    const headers = [
    "S. No.",
    "Offer Name",
    "Vendor Name",
    ...(showCustomer ? ["Customer"] : []),
    "Total Amount",
    "Discount",
    "Final Amount",
    "Used Time",
    "Bill",
    "Status",
  ];
  return (
    <table className="w-full table-auto whitespace-nowrap">
          <thead className="border-b border-[#000000] border-opacity-10">
            <tr>
              {headers && headers?.map((header) => (
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
            {data && data?.map((item, index) => {
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

                <td 
                // to={`/vendor/${item?.vendor?.user}`} 
                 className="font-[Poppins] text-black text-[16px] px-[10px] py-[16px]">
                    <div className="flex flex-col leading-tight">
                        <span className="font-medium">{item?.vendor?.name}</span>
                        {item?.vendor?.email && (
                        <span className="text-[13px] text-gray-500 mt-[2px]">
                            {item.vendor.email}
                        </span>
                        )}
                    </div>
                </td>

                  {showCustomer && (
                        <td className="font-[Poppins] text-black text-[16px] px-[10px] py-[16px]">
                        <div className="flex flex-col leading-tight">
                            <span className="font-medium">{item?.user?.name}</span>
                            {item?.user?.email && (
                            <span className="text-[13px] text-gray-500 mt-[2px]">
                                {item.user.email}
                            </span>
                            )}
                        </div>
                        </td>
                    )}

                  <td className="font-[Poppins] text-[16px] text-left px-[10px] py-[16px]">
                    {item?.vendor_bill_status ? `${formatMultiPrice(item?.total_amount, "INR")}` : "N/A"}
                  </td>

                  <td className="font-[Poppins] text-[16px] text-left px-[10px] py-[16px]">
                    {item?.vendor_bill_status ? `${formatMultiPrice(item?.discount, "INR")}` : "N/A"}
                  </td>

                  <td className="font-[Poppins] text-[16px] text-left px-[10px] py-[16px]">
                    {item?.vendor_bill_status ? `${formatMultiPrice(item?.final_amount, "INR")}` : "N/A"}
                  </td>

                  <td className="font-[Poppins] text-[16px] text-left px-[10px] py-[16px]">
                    {item?.used_time ? moment(item.used_time).format("DD MMM YYYY, hh:mm A") : "N/A"}
                  </td>

                  {/* Bill Preview */}
                  <td className="font-[Poppins] text-[16px] px-[10px] py-[16px]">
                    {item?.bill ? (
                      <a
                        href={item?.bill}
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
  )
}