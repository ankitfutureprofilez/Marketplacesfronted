import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Listing from "../../Apis/Listing";
import OfferLisitng from "./OfferLisitng";
import BusinessImageGallery from "./BusinessImageGallery";
import GalleryPopup from "./GalleryPopup";
import moment from "moment";
import { formatMultiPrice } from "../../Hooks/ValueDataHook";

import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiTag,
  FiArrowLeft,
  FiExternalLink,
  FiBriefcase,
  FiShield,
  FiFileCheck,
  FiLayers,
  FiHash,
} from "react-icons/fi";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { CgSpinner } from "react-icons/cg";

export default function Details() {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (allowLoading = true) => {
    try {
      if (allowLoading) setLoading(true);
      const main = new Listing();
      const response = await main.vendor_details(id);
      if (response?.data?.status) {
        setRecord(response.data.data);
      } else {
        setRecord(null);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setRecord(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const vendorRecord = record?.record || {};
  const userInfo = vendorRecord.user || {};
  const openingHours = vendorRecord.opening_hours || {};
  const offers = record?.offer || [];

  const businessName = vendorRecord.business_name || userInfo.name || "Vendor Profile";
  const initials = businessName.substring(0, 2).toUpperCase();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <CgSpinner className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Loading vendor console...
        </p>
      </div>
    );
  }

  if (!record || Object.keys(vendorRecord).length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 bg-white border border-slate-200/90 rounded-2xl text-center max-w-md mx-auto my-12 shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center text-xl mb-3">
          <HiOutlineBuildingStorefront className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900">Vendor Not Found</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-xs">
          No merchant record matching ID #{id} was found in the system.
        </p>
        <Link
          to="/vendor"
          className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-2xl text-xs font-semibold hover:bg-slate-800 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" /> Return to directory
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 pb-12">
      {/* 1. TOP VENDOR IDENTITY BAR */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        {/* Top: Avatar, Name & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              {vendorRecord.business_logo ? (
                <img
                  src={vendorRecord.business_logo}
                  alt={businessName}
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
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight capitalize">
                  {businessName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Verified Vendor
                </span>
                {vendorRecord?.added_by && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                    Assigned by {vendorRecord?.added_by?.role}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Owner: <span className="text-slate-800 font-semibold">{userInfo.name || "N/A"}</span> • Joined on {moment(vendorRecord?.createdAt).format("DD MMM YYYY, hh:mm A")}
              </p>
            </div>
          </div>

          <Link
            to="/vendor"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors self-start sm:self-center"
          >
            <div className="bg-gray-100 rounded-full p-2">
              <FiArrowLeft className="w-3.5 h-3.5" />
            </div>
            Back to List
          </Link>
        </div>

        {/* Bottom: Contact & Full Address Details */}
        <div className="pt-4 flex flex-wrap items-center gap-y-2.5 gap-x-6 text-xs sm:text-sm text-slate-600">
          <a
            href={`mailto:${vendorRecord?.user?.email || ""}`}
            className="flex items-center gap-2 hover:text-blue-600 transition-colors"
          >
            <div className="w-7 h-7 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center border border-slate-200/80">
              <FiMail className="w-3.5 h-3.5" />
            </div>
            <span className="font-medium">{vendorRecord?.user?.email || "N/A"}</span>
          </a>

          <a
            href={`tel:${vendorRecord?.user?.phone || ""}`}
            className="flex items-center gap-2 hover:text-blue-600 transition-colors"
          >
            <div className="w-7 h-7 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center border border-slate-200/80">
              <FiPhone className="w-3.5 h-3.5" />
            </div>
            <span className="font-medium">{vendorRecord?.user?.phone || "N/A"}</span>
          </a>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center border border-slate-200/80 shrink-0">
              <FiMapPin className="w-3.5 h-3.5" />
            </div>
            <span className="font-medium text-slate-700 capitalize leading-relaxed">
              {vendorRecord?.address || "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* 2. STATS / METRICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Offers */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[12px] font-semibold uppercase tracking-wider text-gray-500 block">
              Active Offers
            </span>
            <h3 className="text-3xl font-extrabold text-slate-900 font-poppins tracking-tight mt-1">
              {record?.stats?.total_offers ?? 0}
            </h3>
            <span className="text-[11px] text-blue-600 font-medium mt-1 block">Live campaigns</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center text-xl shrink-0">
            <FiTag />
          </div>
        </div>

        {/* Pending Claims */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 block">
              Pending Offers
            </span>
            <h3 className="text-3xl font-extrabold text-slate-900  tracking-tight mt-1">
              {record?.stats?.vendor_bill_false ?? 0}
            </h3>
            <span className="text-[11px] text-amber-600 font-medium mt-1 block">Awaiting audit</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center text-xl shrink-0">
            <FiClock />
          </div>
        </div>

        {/* Total Redeemed */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 block">
              Total Redeemed
            </span>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              {record?.stats?.vendor_bill_true ?? 0}
            </h3>
            <span className="text-[11px] text-emerald-600 font-medium mt-1 block">Completed checkouts</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center text-xl shrink-0">
            <FiCheckCircle />
          </div>
        </div>

        {/* Total Earning */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 block">
              Total Earning
            </span>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              {formatMultiPrice(record?.stats?.totalEarning, "INR") || 0}
            </h3>
            <span className="text-[11px] text-purple-600 font-medium mt-1 block">Gross earnings</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center text-xl shrink-0">
            <FiDollarSign />
          </div>
        </div>
      </div>

      {/* 3. BUSINESS INFORMATION & OPENING HOURS (2 Columns Single Row) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Column 1: Business Information */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 pb-4 mb-5 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                <FiBriefcase className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                  Business Information
                </h2>
                <p className="text-xs text-gray-500">Merchant registration & categorizations</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-gray-500 font-semibold uppercase tracking-wider text-[11px]">
                  Business Name
                </span>
                <p className="font-semibold text-gray-800 text-sm mt-0.5">
                  {vendorRecord.business_name || "N/A"}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-semibold uppercase text-[11px]">
                  Category
                </span>
                <p className="font-semibold text-gray-800 text-sm mt-0.5 truncate">
                  {vendorRecord.category?.name || "N/A"}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-semibold uppercase text-[11px]">
                  Subcategory
                </span>
                <p className="font-semibold text-gray-800 text-sm mt-0.5 truncate">
                  {vendorRecord.subcategory?.name || "N/A"}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-semibold uppercase text-[11px]">
                  Landmark / Area
                </span>
                <p className="font-semibold text-gray-800 text-sm mt-0.5">
                  {vendorRecord.area || "N/A"}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-semibold uppercase text-[11px]">
                  City / State
                </span>
                <p className="font-semibold text-gray-800 text-sm mt-0.5">
                  {vendorRecord.city || "N/A"}, {vendorRecord.state || "N/A"}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                  Pincode
                </span>
                <p className="font-semibold text-gray-800 text-sm mt-0.5">
                  {vendorRecord.pincode || "N/A"}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                  Business Reg. No.
                </span>
                <p className="font-semibold text-gray-800 text-sm mt-0.5">
                  {vendorRecord.business_register || "N/A"}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                  GST Number
                </span>
                <p className="font-semibold text-gray-800 text-sm mt-0.5">
                  {vendorRecord.gst_number || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm">
            <span className="text-slate-500 font-semibold uppercase text-[11px]">
              Full Physical Address
            </span>
            <p className="font-medium text-gray-800 mt-1">
              {vendorRecord.address || "N/A"}
            </p>
          </div>
        </div>

        {/* Column 2: Business Opening Hours */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 pb-4 mb-5 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                <FiClock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                  Business Opening Hours
                </h2>
                <p className="text-xs text-gray-500">Weekly operational store hours</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              {Object.entries(openingHours).map(([day, { open, close, active }]) => (
                <div
                  key={day}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50/70 border border-slate-200/70"
                >
                  <span className="capitalize font-medium text-gray-800">{day}</span>
                  {active ? (
                    <span className="font-semibold text-gray-700 bg-white px-3 py-1 rounded-lg border border-slate-200/80 shadow-2xs">
                      {open} - {close}
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-lg text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-100">
                      Closed
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {vendorRecord.weekly_off_day && vendorRecord.weekly_off_day.length > 0 && (
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
              <span className="text-gray-600 font-medium">Weekly Off Scheduled</span>
              <span className="font-semibold text-blue-600 text-xs">
                {vendorRecord.weekly_off_day
                  .map((day) => moment(day).format("DD MMM YYYY"))
                  .join(", ")}
              </span>
            </div>
          )}
        </div>

      </div>

      {/* 4. BUSINESS DOCUMENTS */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs">
        <div className="flex items-center gap-3 pb-4 mb-5 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
            <FiShield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Business Documents
            </h2>
            <p className="text-xs text-gray-500">Identity verifications and legal filings</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[
            { title: "PAN Card", src: vendorRecord.pan_card_image },
            { title: "ID Proof Front", src: vendorRecord.aadhaar_front },
            { title: "ID Proof Back", src: vendorRecord.aadhaar_back },
            { title: "GST Certificate", src: vendorRecord.gst_certificate },
            { title: "Business Logo", src: vendorRecord.business_logo, isLogo: true },
          ].map((doc, index) => (
            <div
              key={index}
              className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 flex flex-col items-center justify-between hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all"
            >
              <div className="w-full aspect-square bg-white border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center p-1 relative">
                {doc.src ? (
                  <a
                    href={doc.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-full block"
                  >
                    <img
                      src={doc.src}
                      alt={doc.title}
                      className={`w-full h-full object-cover transition-transform hover:scale-105 ${doc.isLogo ? "rounded-full p-2" : "rounded-lg"
                        }`}
                    />
                  </a>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-1 text-slate-300">
                    <FiFileText className="w-6 h-6" />
                    <span className="text-[10px] font-semibold text-rose-500">Not uploaded</span>
                  </div>
                )}
              </div>

              <div className="w-full mt-2.5 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-700 truncate">{doc.title}</span>
                {doc.src && (
                  <a
                    href={doc.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    <FiExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. BUSINESS IMAGE GALLERY */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
              <FiLayers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Business Images Gallery
              </h2>
              <p className="text-xs text-gray-500">Storefront showcase and promotional gallery</p>
            </div>
          </div>

          <GalleryPopup
            data={vendorRecord?.business_image || []}
            id={vendorRecord?.user?._id}
            fetchData={fetchData}
          />
        </div>

        <BusinessImageGallery images={vendorRecord?.business_image || []} />
      </div>

      {/* 6. VENDOR OFFERS */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-3 pb-4 mb-5 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <FiTag className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Vendor Offers
            </h2>
            <p className="text-xs text-gray-500">All discount offers and campaigns created by this vendor</p>
          </div>
        </div>

        <OfferLisitng Offer={offers} />
      </div>

    </div>
  );
}