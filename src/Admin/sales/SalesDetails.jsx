import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Listing from "../../Apis/Listing";
import OfferLisitng from "../vendor/OfferLisitng";
import HeaderAdmin from "../../common/HeaderAdmin";
import PurchaseTable from "../../common/PurchaseTable";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import moment from "moment";
import { formatMultiPrice } from "../../Hooks/ValueDataHook";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowLeft,
  FiTag,
  FiClock,
  FiCheckCircle,
  FiDollarSign,
  FiBriefcase,
  FiLayers,
  FiShoppingBag,
  FiUser,
  FiArrowRight
} from "react-icons/fi";
import { CgSpinner } from "react-icons/cg";
import { LiaShoppingBagSolid } from "react-icons/lia";

function SalesDetails() {
  const { id } = useParams();
  const offersRef = useRef(null);
  const purchaseRef = useRef(null);

  const [record, setRecord] = useState(null); // Initialize as null for proper loading state
  // console.log("record", record);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("vendors");

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const main = new Listing();
    main
      .sales_details(id)
      .then((res) => {
        // console.log("res", res);
        if (res?.data?.data) {
          setRecord(res.data.data);
        } else {
          // Handle case where data is empty but request succeeded
          setRecord(null);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching vendor details:", err);
        setError("Failed to load vendor details.");
        setIsLoading(false);
      });
  }, [id]);

  // console.log("record", record);

  const salespersonName = record?.sales?.name || "Salesperson Profile";
  const initials = salespersonName.substring(0, 2).toUpperCase();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <CgSpinner className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Loading salesperson console...
        </p>
      </div>
    );
  }

  if (error || !record) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 bg-white border border-slate-200/90 rounded-2xl text-center max-w-md mx-auto my-12 shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center text-xl mb-3">
          <FiUser className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900 font-[Poppins]">Salesperson Not Found</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-xs font-[Poppins]">
          No salesperson record matching ID #{id} was found in the system.
        </p>
        <Link
          to="/sales"
          className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-2xl text-xs font-semibold hover:bg-slate-800 transition-colors font-[Poppins]"
        >
          <FiArrowLeft className="w-4 h-4" /> Return to directory
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 pb-12">
      {/* 1. TOP SALES IDENTITY BAR */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        {/* Top: Avatar, Name & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              {record?.sales?.avatar ? (
                <img
                  src={record?.sales?.avatar}
                  alt={salespersonName}
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
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight capitalize font-[Poppins]">
                  {salespersonName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 font-[Poppins]">
                  Sales Representative
                </span>
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1 font-[Poppins]">
                Joined on {moment(record?.sales?.createdAt).format("DD MMM YYYY, hh:mm A")}
              </p>
            </div>
          </div>

          <Link
            to="/sales"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors self-start sm:self-center font-[Poppins]"
          >
            <div className="bg-gray-100 rounded-full p-2">
              <FiArrowLeft className="w-3.5 h-3.5" />
            </div>
            Back to List
          </Link>
        </div>

        {/* Bottom: Contact & Details */}
        <div className="pt-4 flex flex-wrap items-center gap-y-2.5 gap-x-6 text-xs sm:text-sm text-slate-600 font-[Poppins]">
          <a
            href={`mailto:${record?.sales?.email}`}
            className="flex items-center gap-2 hover:text-blue-600 transition-colors"
          >
            <div className="w-7 h-7 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center border border-slate-200/80">
              <FiMail className="w-3.5 h-3.5" />
            </div>
            <span className="font-medium">{record?.sales?.email || "N/A"}</span>
          </a>

          <a
            href={`tel:${record?.sales?.phone}`}
            className="flex items-center gap-2 hover:text-blue-600 transition-colors"
          >
            <div className="w-7 h-7 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center border border-slate-200/80">
              <FiPhone className="w-3.5 h-3.5" />
            </div>
            <span className="font-medium">{record?.sales?.phone || "N/A"}</span>
          </a>

          {record?.sales?.alternate_phone && (
            <a
              href={`tel:${record?.sales?.alternate_phone}`}
              className="flex items-center gap-2 hover:text-blue-600 transition-colors"
            >
              <div className="w-7 h-7 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center border border-slate-200/80">
                <FiPhone className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium">{record?.sales?.alternate_phone} (Alt)</span>
            </a>
          )}

          {record?.sales?.address && (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center border border-slate-200/80 shrink-0">
                <FiMapPin className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium text-slate-700 capitalize leading-relaxed">
                {record?.sales?.address}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 2. STATS / METRICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Active Offers */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 block font-[Poppins]">
              Active Offers
            </span>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1 font-[Poppins]">
              {record?.total_offer_stats?.activeOffers ?? 0}
            </h3>
            <span className="text-[11px] text-blue-600 font-medium mt-1 block font-[Poppins]">Live campaigns</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center text-xl shrink-0">
            <FiTag />
          </div>
        </div>

        {/* Offers Sold */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 block font-[Poppins]">
              Offers Sold
            </span>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1 font-[Poppins]">
              {record?.total_offer_stats?.totalOfferBuys ?? 0}
            </h3>
            <span className="text-[11px] text-amber-600 font-medium mt-1 block font-[Poppins]">Purchased deals</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center text-xl shrink-0">
            <FiLayers />
          </div>
        </div>

        {/* Redeemed Offers */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 block font-[Poppins]">
              Redeemed Offers
            </span>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1 font-[Poppins]">
              {record?.total_offer_stats?.redeemedOffers ?? 0}
            </h3>
            <span className="text-[11px] text-emerald-600 font-medium mt-1 block font-[Poppins]">Completed checkouts</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center text-xl shrink-0">
            <FiCheckCircle />
          </div>
        </div>

        {/* Total Earnings */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 block font-[Poppins]">
              Total Earnings
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1 font-[Poppins]">
              {record?.total_offer_stats?.totalAmount ?? 0}
            </h3>
            <span className="text-[11px] text-purple-600 font-medium mt-1 block font-[Poppins]">Gross volume</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center text-xl shrink-0">
            <FiDollarSign />
          </div>
        </div>

        {/* Total Profit/Earning */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 block font-[Poppins]">
              Total Profit
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1 font-[Poppins] truncate max-w-[120px]" title={formatMultiPrice(record?.total_offer_stats?.totalEarningProfit || 0, "INR")}>
              {formatMultiPrice(record?.total_offer_stats?.totalEarningProfit || 0, "INR")}
            </h3>
            <span className="text-[11px] text-teal-600 font-medium mt-1 block font-[Poppins]">Net commissions</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center text-xl shrink-0">
            <FiBriefcase />
          </div>
        </div>
      </div>

      {/* 3. TABS CONTAINER */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs">
        <div className="flex items-center justify-between gap-4   mb-6 font-[Poppins] overflow-hidden">
          {/* Left: icon + heading + description */}
          <div className="flex items-center gap-3 h-11">
            <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-blue-50 shrink-0">
              <FiBriefcase className="text-blue-600 h-6 w-6" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-slate-800 leading-tight truncate">
                Vendor Network
              </h2>
              <p className="text-[11.5px] text-slate-500 leading-tight truncate">
                Manage vendors, purchases & offers
              </p>
            </div>
          </div>

          {/* Right: tabs */}
          <div className="flex items-center h-11 bg-slate-100 rounded-2xl p-1.5 shrink-0">
            <button
              onClick={() => setActiveTab("vendors")}
              className={`flex items-center h-full px-5 rounded-xl text-[13.5px] font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === "vendors"
                  ? "bg-white text-slate-900 shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Vendors ({record?.vendors?.length || 0})
            </button>

            <button
              onClick={() => setActiveTab("purchases")}
              className={`flex items-center h-full px-5 rounded-xl text-[13.5px] font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === "purchases"
                  ? "bg-white text-slate-900 shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Purchases ({record?.purchases?.length || 0})
            </button>

            <button
              onClick={() => setActiveTab("offers")}
              className={`flex items-center h-full px-5 rounded-xl text-[13.5px] font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === "offers"
                  ? "bg-white text-slate-900 shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Offers ({record?.offers?.length || 0})
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        <div className="transition-all duration-200">
          {activeTab === "vendors" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fadeIn">
              {record?.vendors?.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-12 px-4 rounded-2xl text-center">
                  {/* Icon Badge */}
                  <div className="w-14 h-14 rounded-2xl border border-blue-200 bg-blue-50 text-slate-400 flex items-center justify-center text-2xl mb-3.5 shadow-xs">
                    <LiaShoppingBagSolid className="w-7 h-7 text-blue-800 stroke-1" />
                  </div>

                  <h4 className="font-semibold text-gray-800 tracking-tight">
                    No Vendors Assigned
                  </h4>

                  {/* Subtitle / Description */}
                  <p className="text-[13px] text-gray-500 mt-1 max-w-xs leading-relaxed">
                    There are currently no merchant accounts linked to this salesperson.
                  </p>
                </div>
              ) : (
                record?.vendors?.map((v, i) => (
                  <Link
                    to={`/vendor/${v?._id}`}
                    key={i}
                    className="group bg-white border border-gray-200 rounded-2xl p-4 transition-all duration-200 hover:-translate-y-0.5 flex flex-col"
                  >
                    {/* Storefront image */}
                    <div className="w-full h-36 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden mb-3 relative">
                      <img
                        src={v?.business_logo || "/shopdefault.png"}
                        alt={v?.business_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Header: name + status */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="min-w-0">
                        <h3 className="font-[Poppins] font-bold text-[15px] text-gray-800 truncate">
                          {v?.business_name || "Unnamed Vendor"}
                        </h3>
                      </div>
                      <span
                        className={`px-2.5 py-1 shrink-0 text-[11px] font-semibold font-[Poppins] rounded-full capitalize ${v?.status === "active"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-red-50 text-red-600 border border-red-200"
                          }`}
                      >
                        {v?.status || "inactive"}
                      </span>
                    </div>

                    {/* Detail rows */}
                    <div className="space-y-2 mb-4 font-[Poppins]">
                      <div className="flex items-center gap-2 text-[12.5px] text-gray-500 min-w-0">
                        <HiOutlineBuildingStorefront className="text-gray-500 shrink-0" size={16}  />
                        <span className="truncate font-medium">{v?.address || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[12.5px] text-gray-500">
                        <FiMapPin className="text-gray-500 shrink-0" size={16} />
                        <span className="capitalize font-medium">{v?.city || "N/A"}</span>
                      </div>
                    </div>

                    {/* Footer affordance */}
                    <div className="flex items-center justify-between pt-3 mt-auto border-t border-slate-50">
                      <span className="font-[Poppins] text-[12px] text-gray-500">Storefront</span>
                      <span className="flex items-center gap-1 font-[Poppins] text-[12px] font-semibold text-blue-700">
                        View Details
                        <FiArrowRight
                          size={13}
                          className="group-hover:translate-x-0.5 transition-transform"
                        />
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}

          {activeTab === "purchases" && (
            <div className="w-full animate-fadeIn" ref={purchaseRef}>
              <PurchaseTable data={record?.purchases} showCustomer={true} />
            </div>
          )}

          {activeTab === "offers" && (
            <div className="w-full animate-fadeIn" ref={offersRef}>
              <OfferLisitng Offer={record?.offers} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SalesDetails;
