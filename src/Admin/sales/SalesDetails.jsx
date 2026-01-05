import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Listing from "../../Apis/Listing";
import HeaderAdmin from "../../common/HeaderAdmin";

function SalesDetails() {
  const { id } = useParams();

  const [record, setRecord] = useState(null); // Initialize as null for proper loading state
  console.log("record", record);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const main = new Listing();
    main
      .sales_details(id)
      .then((res) => {
        console.log("res", res);
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

  return (
    <>
        <div className="w-full">
          <HeaderAdmin title={"Sales Team"} />
          <div className="py-2lg:py-2.5">
            <div className="bg-white rounded-[20px] mb-[10px] p-2">
              <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-white rounded-lg shadow mb-6 border border-gray-100">
                <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xl font-bold flex items-center text-gray-800 capitalize">
                      {record?.sales?.name || "N/A"}
                      <span className="ml-2 w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>{" "}
                      {/* Enhanced status dot */}
                    </p>
                    <p className="text-sm text-gray-500 capitalize">
                      {record?.sales?.role || "Sales"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center sm:justify-end items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <span className="font-medium">
                      {record?.sales?.email || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      ></path>
                    </svg>
                    <span className="font-medium">
                      {record?.sales?.phone || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {[
                  { label: "Active", value: record?.total_offer_stats?.active },
                  {
                    label: "Expired",
                    value: record?.total_offer_stats?.expired,
                  },
                  {
                    label: "Redeemed",
                    value: record?.total_offer_stats?.redeemed,
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 border rounded-xl p-4 text-center shadow-sm"
                  >
                    <p className="text-xl font-bold text-gray-800">
                      {stat.value ?? 0}
                    </p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {record?.vendors?.map((v, i) => (
                  <Link
                  to={`/vendor/${v?.vendors?._id}`}
                    key={i}
                    className="bg-white shadow rounded-xl p-5 border hover:shadow-lg transition"
                  >
                    <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden mb-4">
                      <img
                        src={v?.vendors?.business_logo}
                        alt={v?.vendors?.business_name}
                        className="h-full object-cover"
                      />
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {v?.vendors?.business_name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {v?.vendors?.address}
                    </p>

                    <div className="mt-4 space-y-2">
                      <p className="text-sm">
                        <span className="font-semibold">City:</span>{" "}
                        {v?.vendors?.city}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Status:</span>{" "}
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            v?.vendors?.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {v?.vendors?.status}
                        </span>
                      </p>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-700 mb-2">
                        Opening Hours
                      </h4>
                      <div className="max-h-[400px] overflow-y-auto border p-2 rounded-md text-sm bg-gray-50">
                        {Object.entries(v?.vendors?.opening_hours).map(
                          ([day, info], idx) => (
                            <div
                              key={idx}
                              className="flex justify-between text-gray-600"
                            >
                              <span>{day}:</span>
                              <span>
                                {info.active
                                  ? `${info.open} - ${info.close}`
                                  : "Closed"}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default SalesDetails;
