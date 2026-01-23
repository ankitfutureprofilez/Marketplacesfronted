import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Listing from "../../Apis/Listing";
import OfferLisitng from "../vendor/OfferLisitng";
import HeaderAdmin from "../../common/HeaderAdmin";
import PurchaseTable from "../../common/PurchaseTable";
import { FaUserCircle, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import moment from "moment";

function SalesDetails() {
  const { id } = useParams();
  const offersRef = useRef(null);
  const purchaseRef = useRef(null);

  const [record, setRecord] = useState(null); // Initialize as null for proper loading state
  // console.log("record", record);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="w-full">
      {/* <HeaderAdmin title={"Sales Team"} /> */}

      <div className="py-2 lg:py-2.5">
        <div className="bg-white rounded-[20px] mb-[10px] p-2">
          {/* ================= Sales Info ================= */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-6 p-4">
            {/* Sales Info */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <FaUserCircle className="text-blue-600 text-4xl" />
              </div>

              <div>
                <p className="text-2xl font-extrabold text-gray-800 flex items-center gap-2 capitalize">
                  {record?.sales?.name || "N/A"}
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
                </p>
                <p className="text-sm text-gray-500 capitalize">
                  Joined at- {moment(record?.sales?.createdAt).format("DD MMM-YYYY, HH:MM A") || "N/A"}
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap justify-center sm:justify-end gap-6 text-sm text-gray-700">
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href={`mailto:${record?.sales?.email}`}
                  className="font-medium"
                >
                  {record?.sales?.email || "N/A"}
                </a>
              </div>

              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a href={`tel:${record?.sales?.phone}`} className="font-medium">
                  {record?.sales?.phone || "N/A"}
                </a>
              </div>
            </div>
          </div>

          {/* ================= Stats ================= */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div
              onClick={() =>
                offersRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              className="p-4 rounded-xl shadow-lg text-white bg-gradient-to-br from-blue-600 to-blue-400 cursor-pointer"
            >
              <p className="text-sm opacity-80">Active Offers</p>
              <p className="text-4xl font-extrabold mt-1">
                {record?.total_offer_stats?.activeOffers ?? 0}
              </p>
            </div>

            <div
              onClick={() =>
                purchaseRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              cursor-pointer
              className="p-4 rounded-xl shadow-lg bg-white border cursor-pointer"
            >
              <p className="text-sm text-gray-500">Offers Sold</p>
              <p className="text-4xl font-extrabold text-gray-800 mt-1">
                {record?.total_offer_stats?.totalOfferBuys ?? 0}
              </p>
            </div>

            <div
              onClick={() =>
                purchaseRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              className="p-4 rounded-xl shadow-lg bg-green-50 border border-green-200 cursor-pointer"
            >
              <p className="text-sm text-green-700">Redeemed Offers</p>
              <p className="text-4xl font-extrabold text-green-600 mt-1">
                {record?.total_offer_stats?.redeemedOffers ?? 0}
              </p>
            </div>

            <div
              onClick={() =>
                purchaseRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              className="p-4 rounded-xl shadow-lg bg-yellow-50 border border-yellow-200 cursor-pointer"
            >
              <p className="text-sm text-yellow-700">Total Earnings</p>
              <p className="text-3xl font-extrabold text-yellow-600 mt-1">
                {record?.total_offer_stats?.totalAmount ?? 0}
              </p>
            </div>
          </div>

          {/* ================= Vendors ================= */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {record?.vendors?.map((v, i) => (
              <Link
                to={`/vendor/${v?._id}`}
                key={i}
                className="bg-white border rounded-xl p-5 shadow hover:shadow-lg transition"
              >
                <div className="w-full h-40 bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <img
                    src={v?.business_logo}
                    alt={v?.business_name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {v?.business_name}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{v?.address}</p>

                <div className="flex justify-between text-sm">
                  <span className="font-medium">{v?.city}</span>
                  <span
                    className={`px-2 py-1 text-xs rounded-full capitalize ${
                      v?.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {v?.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* ================= Purchases ================= */}
          <div
            className="flex flex-col border-t border-black border-opacity-10 mt-4"
            ref={purchaseRef}
          >
            <div className="px-4 py-4">
              <h2 className="text-[16px] lg:text-[18px] font-bold text-[#1E1E1E]">
                Purchases
              </h2>
            </div>

            <div className="w-full">
              <PurchaseTable data={record?.purchases} showCustomer={true} />
            </div>
          </div>

          {/*  ================= Offers ================= */}
          <div
            className="flex flex-col border-t border-black border-opacity-10 mt-4"
            ref={offersRef}
          >
            <div className="px-4 py-4">
              <h2 className="text-[16px] lg:text-[18px] font-bold text-[#1E1E1E]">
                Offers
              </h2>
            </div>
            <div className="w-full">
              <OfferLisitng Offer={record?.offers} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesDetails;
