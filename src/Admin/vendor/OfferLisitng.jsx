import DateFormate from "../../component/DateFormate";
import { CiEdit } from "react-icons/ci";
import AddOffer from "./AddOffer";
import { Link } from "react-router-dom";
import { BiSolidOffer } from "react-icons/bi";

export default function OfferListing({ Offer }) {
  console.log("Offer", Offer);

  return (
    <div className="bg-white rounded-lg overflow-x-auto mt-3">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="text-[13px] tracking-wider text-gray-600 uppercase bg-gray-50">
            <th className="px-6 py-3 text-left font-medium">Image</th>
            <th className="px-6 py-3 text-left font-medium">Offer Title</th>
            <th className="px-6 py-3 text-left font-medium">Offer Description</th>
            <th className="px-6 py-3 text-left font-medium">Discount Type</th>
            <th className="px-6 py-3 text-left font-medium">Min Bill Amount</th>
            <th className="px-6 py-3 text-left font-medium">Max Discount</th>
            <th className="px-6 py-3 text-left font-medium">Amount</th>
            <th className="px-6 py-3 text-left font-medium">Expire</th>
            <th className="px-6 py-3 text-left font-medium">Status</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {Offer &&
            Offer?.map((item, index) => {
              const record =
                item?.type === "flat" ? item?.flat : item?.percentage;
              return (
                <tr key={item?.createdAt || index} className="text-sm">
                  {/* Offer Image */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record?.offer_image ? (
                      <img
                        src={record?.offer_image}
                        alt={record?.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>

                  {/* Title */}
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 capitalize">
                    <div className="flex gap-2">
                      {record?.title || "N/A"}
                      <Link to={`/offer/${item._id}`}>
                        <CiEdit size={20} className="text-green-600 cursor-pointer" />
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {record?.description || "N/A"}
                  </td>
                  {/* Discount Type */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item?.type === "flat" ? "Flat" : "Percentage"}
                  </td>

                  {/* Min Bill Amount */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    ₹{record?.minBillAmount || 0}
                  </td>

                  {/* Max Discount */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    ₹{record?.maxDiscountCap || 0}
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    ₹{record?.amount || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <DateFormate data={record?.expiryDate} />
                  </td>
                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${record?.isExpired
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                        }`}
                    >
                      {record?.isExpired
                        ? "Expired"
                        : record?.status || "Active"}
                    </span>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {!Offer ||
        (Offer.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-14 px-4 text-center">
            {/* Glowing Alert Badge */}
            <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100/80 text-rose-500 flex items-center justify-center mb-4 shadow-sm shadow-rose-100">
              <BiSolidOffer className="w-7 h-7" />
            </div>

            {/* Heading */}
            <h4 className="text-lg font-bold text-slate-800 tracking-tight">
              No Active Offers Available
            </h4>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-md leading-relaxed">
              There are currently no discount campaigns or packages configured by vendors.
            </p>
          </div>
        ))}
    </div>
  );
}
