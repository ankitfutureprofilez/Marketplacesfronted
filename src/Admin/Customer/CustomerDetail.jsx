import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import moment from "moment";
import Listing from "../../Apis/Listing";
import PurchaseTable from "../../common/PurchaseTable";
import { formatMultiPrice } from "../../Hooks/ValueDataHook";
import AddCustomer from "./AddCustomer";
import {
  FiMail,
  FiPhone,
  FiArrowLeft,
  FiTag,
  FiCheckCircle,
  FiDollarSign,
  FiLayers,
  FiShoppingBag,
  FiUser,
  FiEdit3
} from "react-icons/fi";
import { CgSpinner } from "react-icons/cg";
import { BiPurchaseTag } from "react-icons/bi";

export default function CustomerDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const closeAddPopup = () => setIsAddOpen(false);
  const [selected, setSelected] = useState(null);

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

  const customerName = data?.record?.name || "Customer Profile";
  const initials = customerName.substring(0, 2).toUpperCase();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <CgSpinner className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Loading customer console...
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 bg-white border border-slate-200/90 rounded-2xl text-center max-w-md mx-auto my-12 shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center text-xl mb-3">
          <FiUser className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900 font-[Poppins]">Customer Not Found</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-xs font-[Poppins]">
          No client record matching ID #{id} was found in the system.
        </p>
        <Link
          to="/customer"
          className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-2xl text-xs font-semibold hover:bg-slate-800 transition-colors font-[Poppins]"
        >
          <FiArrowLeft className="w-4 h-4" /> Return to directory
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="w-full space-y-6 pb-12">
        {/* 1. TOP CUSTOMER IDENTITY BAR */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
          {/* Top: Avatar, Name & Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                {data?.record?.avatar ? (
                  <img
                    src={data?.record?.avatar}
                    alt={customerName}
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-2xs"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white font-extrabold text-xl flex items-center justify-center shadow-xs">
                    {initials}
                  </div>
                )}
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => {
                      setIsAddOpen(true);
                      setSelected(data?.record);
                    }}
                    className="text-left cursor-pointer focus:outline-none hover:opacity-85"
                    title="Edit Customer Details"
                  >
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight capitalize font-[Poppins] flex items-center gap-2">
                      {customerName}
                      <FiEdit3 className="w-4 h-4 text-slate-400 hover:text-slate-600 transition-colors" />
                    </h1>
                  </button>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 font-[Poppins]">
                    Client
                  </span>
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-1 font-[Poppins]">
                  Joined on {moment(data?.record?.createdAt).format("DD MMM YYYY, hh:mm A")}
                </p>
              </div>
            </div>

            <Link
              to="/customer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors self-start sm:self-center font-[Poppins]"
            >
              <div className="bg-gray-100 rounded-full p-2">
                <FiArrowLeft className="w-3.5 h-3.5" />
              </div>
              Back to List
            </Link>
          </div>

          {/* Bottom: Contact Info */}
          <div className="pt-4 flex flex-wrap items-center gap-y-2.5 gap-x-6 text-xs sm:text-sm text-slate-600 font-[Poppins]">
            <a
              href={`mailto:${data?.record?.email || ""}`}
              className="flex items-center gap-2 hover:text-blue-600 transition-colors"
            >
              <div className="w-7 h-7 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center border border-slate-200/80">
                <FiMail className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium">{data?.record?.email || "N/A"}</span>
            </a>

            <a
              href={`tel:${data?.record?.phone || ""}`}
              className="flex items-center gap-2 hover:text-blue-600 transition-colors"
            >
              <div className="w-7 h-7 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center border border-slate-200/80">
                <FiPhone className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium">{data?.record?.phone || "N/A"}</span>
            </a>
          </div>
        </div>

        {/* 2. STATS / METRICS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Total Purchased */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 block font-[Poppins]">
                Total Purchased
              </span>
              <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1 font-[Poppins]">
                {data?.stats?.totalCount ?? 0}
              </h3>
              <span className="text-[11px] text-blue-600 font-medium mt-1 block font-[Poppins]">Acquired campaigns</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center text-xl shrink-0">
              <FiShoppingBag />
            </div>
          </div>

          {/* Redeemed Offers */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 block font-[Poppins]">
                Redeemed Offers
              </span>
              <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1 font-[Poppins]">
                {data?.stats?.vendorBillTrueCount ?? 0}
              </h3>
              <span className="text-[11px] text-emerald-600 font-medium mt-1 block font-[Poppins]">Checked out</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center text-xl shrink-0">
              <FiCheckCircle />
            </div>
          </div>

          {/* Money Spent */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 block font-[Poppins]">
                Money Spent
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1 font-[Poppins] truncate max-w-[120px]" title={formatMultiPrice(data?.stats?.totalOfferPaidAmount || 0, "INR")}>
                {formatMultiPrice(data?.stats?.totalOfferPaidAmount || 0, "INR")}
              </h3>
              <span className="text-[11px] text-indigo-600 font-medium mt-1 block font-[Poppins]">Offer value</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center text-xl shrink-0">
              <FiLayers />
            </div>
          </div>

          {/* Total Amount Paid */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 block font-[Poppins]">
                Total Paid
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1 font-[Poppins] truncate max-w-[120px]" title={formatMultiPrice(data?.stats?.totalFinalAmountPaid || 0, "INR")}>
                {formatMultiPrice(data?.stats?.totalFinalAmountPaid || 0, "INR")}
              </h3>
              <span className="text-[11px] text-amber-600 font-medium mt-1 block font-[Poppins]">Final checkout</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center text-xl shrink-0">
              <FiDollarSign />
            </div>
          </div>

          {/* Total Money Saved */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 block font-[Poppins]">
                Money Saved
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1 font-[Poppins] truncate max-w-[120px]" title={formatMultiPrice(data?.stats?.totalDiscount || 0, "INR")}>
                {formatMultiPrice(data?.stats?.totalDiscount || 0, "INR")}
              </h3>
              <span className="text-[11px] text-green-600 font-medium mt-1 block font-[Poppins]">Instant discount</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 border border-green-100 flex items-center justify-center text-xl shrink-0">
              <FiTag />
            </div>
          </div>
        </div>

        {/* 3. PURCHASES CONTAINER */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs">
          {/* Tab Headers */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-blue-50 shrink-0">
              <BiPurchaseTag className="text-blue-600 h-6 w-6" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-slate-800 leading-tight truncate">
                Purchase History
              </h2>
              <p className="text-[11.5px] text-slate-500 leading-tight truncate mt-1">
                Track customer purchases, bills, and redemptions.
              </p>
            </div>
          </div>

          <div className="w-full">
            <PurchaseTable data={data?.offerBuys} showCustomer={false} />
          </div>
        </div>
      </div>

      <AddCustomer
        isOpen={isAddOpen}
        onClose={closeAddPopup}
        member={selected}
        isEdit={selected !== null ? true : false}
        fetchSalesList={fetchData}
      />
    </>
  );
}