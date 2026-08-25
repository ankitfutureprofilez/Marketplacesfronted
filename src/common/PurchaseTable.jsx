import React, { useState } from "react";
import { formatMultiPrice } from "../Hooks/ValueDataHook";
import { Link } from "react-router-dom";
import moment from "moment";
import { FiChevronDown, FiChevronRight, FiFileText } from "react-icons/fi";

export default function PurchaseTable({ data, showCustomer }) {
  const [openRow, setOpenRow] = useState(null);
  // console.log("data", data);

  const headers = [
    "S. No.",
    "Offer Name",
    "Vendor Name",
    ...(showCustomer ? ["Customer"] : []),
    "Amount Summary",
    "Earning/Profit",
    // "Total Amount",
    // "Discount",
    // "Total Offer Amount",
    // "Final Amount",
    "Time",
    "Bill",
    "Status",
  ];
  return (
    <table className="w-full table-auto whitespace-nowrap">
      <thead className="bg-[#FAFAFB] border-b border-gray-200">
        <tr>
          {headers &&
            headers?.map((header) => (
              <th
                key={header}
                className="font-[Poppins] text-[13px] text-gray-600 font-medium uppercase tracking-wide text-left py-3 px-4"
              >
                {header}
              </th>
            ))}
        </tr>
      </thead>

      <tbody className="divide-y divide-[#F0F0F3]">
        {data?.map((item, index) => {
          const offerTitle =
            item?.offer?.flat?.title || item?.offer?.percentage?.title || "N/A";

          const hasUpgradeHistory =
            Array.isArray(item?.upgraded_from) && item.upgraded_from.length > 0;

          return (
            <React.Fragment key={item._id}>
              {/* MAIN ROW */}
              <tr className={`hover:bg-[#FAFAFB] transition-colors duration-150 ${hasUpgradeHistory ? "cursor-pointer" : ""}`}
              onClick={() =>
                setOpenRow(openRow === item._id ? null : item._id)
              }>
                <td className="px-4 py-4 text-[13px] font-[Poppins] text-[#8C9199]">{String(index + 1).padStart(2, "0")}</td>

                <td className="px-4 py-4 text-[13px] font-[Poppins] capitalize">
                  <div className="flex items-center gap-2">
                    {hasUpgradeHistory && (
                      <button
                        className="flex items-center justify-center w-6 h-6 rounded-md bg-blue-50 text-blue-600 shrink-0"
                      >
                        {openRow === item._id ? <FiChevronDown size={13} /> : <FiChevronRight size={13} />}
                      </button>
                    )}
                    <span className="font-medium text-[#14161A]">{offerTitle}</span>
                  </div>
                </td>

                {/* VENDOR */}
                <td className="px-4 py-4 text-[13px] font-[Poppins]">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-[#14161A] capitalize">{item?.vendor?.name}</span>
                    <span className="text-[12px] text-[#8C9199] capitalize">{item?.vendor?.business_name}</span>
                    {item?.vendor?.email && (
                      <span className="text-[12px] text-[#8C9199]">
                        {item?.vendor?.email}
                      </span>
                    )}
                    <span className="text-[12px] text-[#8C9199]">
                      {item?.vendor?.phone}
                    </span>
                  </div>
                </td>

                {/* CUSTOMER (ADMIN ONLY) */}
                {showCustomer && (
                  <td className="px-4 py-4 text-[13px] font-[Poppins]">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-[#14161A]">{item?.user?.name}</span>
                      {item?.user?.email && (
                        <span className="text-[12px] text-[#8C9199]">
                          {item?.user?.email}
                        </span>
                      )}
                      <span className="text-[12px] text-[#8C9199]">
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

                <td className="px-4 py-4 text-[13px] font-[Poppins]">
                  {item?.vendor_bill_status ? (
                    <div className="bg-[#FAFAFB] border border-[#ECEDF2] rounded-xl p-2.5 space-y-1 min-w-[170px]">
                      <div className="flex justify-between gap-4">
                        <span className="text-[#8C9199]">Total</span>
                        <span className="font-medium text-[#14161A] tabular-nums">
                          {formatMultiPrice(item.total_amount, "INR")}
                        </span>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span className="text-[#8C9199]">Discount</span>
                        <span className="font-medium text-red-600 tabular-nums">
                          − {formatMultiPrice(item.discount, "INR")}
                        </span>
                      </div>

                      {hasUpgradeHistory ? (
                        <>
                          <div className="flex justify-between gap-4">
                            <span className="text-[#8C9199]">Offer Price</span>
                            <span className="font-medium text-red-600 tabular-nums">
                              - {formatMultiPrice(item.upgraded_from[0]?.offer_paid_amount || 0, "INR")}
                            </span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-[#8C9199]">Upgrade Price</span>
                            <span className="font-medium text-red-600 tabular-nums">
                              - {formatMultiPrice(item.offer_paid_amount - (item.upgraded_from[0]?.offer_paid_amount || 0), "INR")}
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="flex justify-between gap-4">
                          <span className="text-[#8C9199]">Offer Price</span>
                          <span className="font-medium text-red-600 tabular-nums">
                            - {formatMultiPrice(item.offer_paid_amount, "INR")}
                          </span>
                        </div>
                      )}

                      <div className="flex justify-between gap-4 border-t border-[#ECEDF2] pt-1.5 mt-1.5">
                        <span className="font-semibold text-[#14161A]">Final</span>
                        <span className="font-semibold text-[#14161A] tabular-nums">
                          {formatMultiPrice(item.final_amount, "INR")}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#FAFAFB] border border-[#ECEDF2] rounded-xl p-2.5 space-y-1 min-w-[170px]">
                      {hasUpgradeHistory ? (
                        <>
                          <div className="flex justify-between gap-4">
                            <span className="text-[#8C9199]">Offer Price</span>
                            <span className="font-medium text-[#14161A] tabular-nums">
                              {formatMultiPrice(item.upgraded_from[0]?.offer_paid_amount || 0, "INR")}
                            </span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-[#8C9199]">Upgrade Price</span>
                            <span className="font-medium text-[#14161A] tabular-nums">
                              {formatMultiPrice(item.offer_paid_amount - (item.upgraded_from[0]?.offer_paid_amount || 0), "INR")}
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="flex justify-between gap-4">
                          <span className="text-[#8C9199]">Offer Price</span>
                          <span className="font-medium text-[#14161A] tabular-nums">
                            {formatMultiPrice(item?.offer?.flat?.amount || item?.offer?.percentage?.amount || 0, "INR")}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </td>

                <td className="px-4 py-4 text-[14px] font-[Poppins] font-semibold text-green-600 tabular-nums">
                  {formatMultiPrice(item?.offer_paid_amount || (item?.offer?.flat?.amount || item?.offer?.percentage?.amount || 0), "INR")}
                </td>

                <td className="px-4 py-4 text-[13px] font-[Poppins]">
                  <div className="flex flex-col gap-1">
                    <div>
                      <span className="text-[#8C9199]">Purchased:</span>{" "}
                      <span className="font-medium text-[#14161A]">
                        {item?.createdAt
                          ? moment(item.createdAt).format("DD MMM YYYY, hh:mm A")
                          : "N/A"}
                      </span>
                    </div>

                    <div>
                      <span className="text-[#8C9199]">Used:</span>{" "}
                      <span className="font-medium text-[#14161A]">
                        {item?.used_time
                          ? moment(item.used_time).format("DD MMM YYYY, hh:mm A")
                          : "—"}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4">
                  {item?.bill ? (
                    <a
                      href={item.bill}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-[12px] font-medium font-[Poppins] transition-colors"
                    >
                      <FiFileText size={13} />
                      View
                    </a>
                  ) : (
                    <span className="text-[#8C9199] text-[13px] font-[Poppins]">—</span>
                  )}
                </td>

                <td className="px-4 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium font-[Poppins] ${
                      item?.vendor_bill_status
                        ? "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20"
                        : "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20"
                    }`}
                  >
                    {item?.vendor_bill_status ? "Redeemed" : "Pending"}
                  </span>
                </td>
              </tr>

              {/* 🔽 UPGRADE HISTORY DROPDOWN */}
              {openRow === item._id && hasUpgradeHistory && (
                <tr className="bg-[#FAFAFB]">
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
                            className="flex justify-between bg-white border border-[#ECEDF2] rounded-xl px-4 py-3 text-[13px] font-[Poppins]"
                          >
                            <div>
                              <div className="font-medium text-[#14161A]">{historyTitle}</div>
                              <div className="text-[#8C9199] text-[12px] mt-0.5">
                                Purchased:{" "}
                                {moment(history?.createdAt).format(
                                  "DD MMM YYYY, hh:mm A"
                                )}
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="font-medium text-[#14161A] tabular-nums">
                                {formatMultiPrice(
                                  history?.payment_id?.amount,
                                  "INR"
                                )}
                              </div>
                              <div className="text-[#8C9199] text-[12px] mt-0.5">
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