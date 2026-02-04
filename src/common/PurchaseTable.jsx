import React, { useState } from "react";
import { formatMultiPrice } from "../Hooks/ValueDataHook";
import { Link } from "react-router-dom";
import moment from "moment";

export default function PurchaseTable({ data, showCustomer }) {
  const [openRow, setOpenRow] = useState(null);
  // console.log("data", data);

  const headers = [
    "S. No.",
    "Offer Name",
    "Vendor Name",
    ...(showCustomer ? ["Customer"] : []),
    // "Total Amount",
    // "Discount",
    // "Total Offer Amount",
    // "Final Amount",
    "Amount Summary",
    "Time",
    "Bill",
    "Status",
  ];
  return (
    <table className="w-full table-auto whitespace-nowrap">
      <thead className="border-b border-[#000000] border-opacity-10">
        <tr>
          {headers &&
            headers?.map((header) => (
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
        {data?.map((item, index) => {
          const offerTitle =
            item?.offer?.flat?.title || item?.offer?.percentage?.title || "N/A";

          const hasUpgradeHistory =
            Array.isArray(item?.upgraded_from) && item.upgraded_from.length > 0;

          return (
            <React.Fragment key={item._id}>
              {/* MAIN ROW */}
              <tr className="bg-white cursor-pointer"
              onClick={() =>
                setOpenRow(openRow === item._id ? null : item._id)
              }>
                <td className="px-[10px] py-[16px] text-[16px]">{index + 1}</td>

                <td className="px-[10px] py-[16px] text-[16px] capitalize">
                  <div className="flex items-center gap-2">
                    {hasUpgradeHistory && (
                      <button
                        className="text-blue-600 text-sm font-bold"
                      >
                        {openRow === item._id ? "▾" : "▸"}
                      </button>
                    )}
                    <span>{offerTitle}</span>
                  </div>
                </td>

                {/* VENDOR */}
                <td className="px-[10px] py-[16px] text-[16px]">
                  <div className="flex flex-col">
                    <span className="font-medium capitalize">{item?.vendor?.business_name}</span>
                    <span className="text-[13px] text-gray-500 capitalize">{item?.vendor?.name}</span>
                    {item?.vendor?.email && (
                      <span className="text-[13px] text-gray-500">
                        {item?.vendor?.email}
                      </span>
                    )}
                    <span className="text-[13px] text-gray-500">
                      {item?.vendor?.phone}
                    </span>
                  </div>
                </td>

                {/* CUSTOMER (ADMIN ONLY) */}
                {showCustomer && (
                  <td className="px-[10px] py-[16px] text-[16px]">
                    <div className="flex flex-col">
                      <span className="font-medium">{item?.user?.name}</span>
                      {item?.user?.email && (
                        <span className="text-[13px] text-gray-500">
                          {item?.user?.email}
                        </span>
                      )}
                      <span className="text-[13px] text-gray-500">
                        {item?.user?.phone}
                      </span>
                    </div>
                  </td>
                )}

                {/* <td className="px-[10px] py-[16px]">
                  {item?.vendor_bill_status
                    ? formatMultiPrice(item.total_amount, "INR")
                    : "N/A"}
                </td>

                <td className="px-[10px] py-[16px]">
                  {item?.vendor_bill_status
                    ? formatMultiPrice(item.discount, "INR")
                    : "N/A"}
                </td>

                <td className="px-[10px] py-[16px]">
                  {formatMultiPrice(item.offer_paid_amount, "INR") || "N/A"}
                </td>

                <td className="px-[10px] py-[16px]">
                  {item?.vendor_bill_status
                    ? formatMultiPrice(item.final_amount, "INR")
                    : "N/A"}
                </td> */}

                <td className="px-[10px] py-[16px] text-[14px]">
                  {item?.vendor_bill_status ? (
                    <div className="space-y-1">
                      <div className="flex justify-between gap-4">
                        <span className="text-gray-500">Total</span>
                        <span className="font-medium">
                          {formatMultiPrice(item.total_amount, "INR")}
                        </span>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span className="text-gray-500">Discount</span>
                        <span className="font-medium text-red-600">
                          − {formatMultiPrice(item.discount, "INR")}
                        </span>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span className="text-gray-500">Offer Price</span>
                        <span className="font-medium text-red-600">
                          - {formatMultiPrice(item.offer_paid_amount, "INR")}
                        </span>
                      </div>

                      <div className="flex justify-between gap-4 border-t pt-1 mt-1">
                        <span className="font-semibold">Final</span>
                        <span className="font-semibold">
                          {formatMultiPrice(item.final_amount, "INR")}
                        </span>
                      </div>
                    </div>
                  ) : (
                    "N/A"
                  )}
                </td>

                <td className="px-[10px] py-[16px] text-[14px]">
                  <div className="flex flex-col gap-1">
                    <div>
                      <span className="text-gray-500">Purchased:</span>{" "}
                      <span className="font-medium">
                        {item?.createdAt
                          ? moment(item.createdAt).format("DD MMM YYYY, hh:mm A")
                          : "N/A"}
                      </span>
                    </div>

                    <div>
                      <span className="text-gray-500">Used:</span>{" "}
                      <span className="font-medium">
                        {item?.used_time
                          ? moment(item.used_time).format("DD MMM YYYY, hh:mm A")
                          : "—"}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="px-[10px] py-[16px]">
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

                <td className="px-[10px] py-[16px]">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      item?.vendor_bill_status
                        ? "bg-green-500 text-white"
                        : "bg-yellow-400 text-white"
                    }`}
                  >
                    {item?.vendor_bill_status ? "Redeemed" : "Pending"}
                  </span>
                </td>
              </tr>

              {/* 🔽 UPGRADE HISTORY DROPDOWN */}
              {openRow === item._id && hasUpgradeHistory && (
                <tr className="bg-gray-50">
                  <td colSpan={headers.length} className="px-6 py-4">
                    <div className="space-y-3">
                      {item.upgraded_from.map((history, idx) => {
                        const nextUpgradeDate =
                          item.upgraded_from[idx - 1]?.createdAt ||
                          item.createdAt;

                        const historyTitle =
                          history?.offer?.flat?.title ||
                          history?.offer?.percentage?.title ||
                          "N/A";

                        return (
                          <div
                            key={history?._id}
                            className="flex justify-between border-b pb-2 text-sm"
                          >
                            <div>
                              <div className="font-medium">{historyTitle}</div>
                              <div className="text-gray-500">
                                Purchased:{" "}
                                {moment(history?.createdAt).format(
                                  "DD MMM YYYY, hh:mm A"
                                )}
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="font-medium">
                                {formatMultiPrice(
                                  history?.payment_id?.amount,
                                  "INR"
                                )}
                              </div>
                              <div className="text-gray-500">
                                Upgraded:{" "}
                                {moment(nextUpgradeDate).format("DD MMM YYYY, hh:mm A")}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
}
