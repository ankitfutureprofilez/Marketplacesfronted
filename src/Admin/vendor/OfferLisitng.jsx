import DateFormate from "../../component/DateFormate";

export default function OfferListing({ Offer }) {
    return (
        <div className="bg-white     rounded-lg  overflow-x-auto mt-3">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr className="text-xs font-medium tracking-wider text-gray-500 uppercase bg-gray-50">
                        <th className="px-6 py-3 text-left">Image</th>
                        <th className="px-6 py-3 text-left">Offer Title</th>
                        <th className="px-6 py-3 text-left">Offer Description</th>
                        <th className="px-6 py-3 text-left">Discount Type</th>
                        <th className="px-6 py-3 text-left">Min Bill Amount</th>
                        <th className="px-6 py-3 text-left">Max Discount</th>
                        <th className="px-6 py-3 text-left">Amount</th>
                        <th className="px-6 py-3 text-left">Expire </th>
                        <th className="px-6 py-3 text-left">Status</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {Offer?.map((item, index) => {
                        const record = item?.type === 'flat' ? item?.flat : item?.percentage;
                        return (
                            <tr key={item?.createdAt || index} className="text-sm">
                                {/* Offer Image */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {record?.offer_image ? (
                                        <img
                                            src={record.offer_image}
                                            alt={record.title}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    ) : (
                                        <span className="text-gray-400">No Image</span>
                                    )}
                                </td>

                                {/* Title */}
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                    {record?.title || 'No Title'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                    {record?.description || 'No description'}
                                </td>
                                {/* Discount Type */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {item?.type === 'flat' ? 'Flat' : 'Percentage'}
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
                                <td className="px-6 py-4 whitespace-nowrap">₹{record?.amount || 0}</td>
                                <td className="px-6 py-4 whitespace-nowrap"><DateFormate data={record.expiryDate} /></td>
                                {/* Status */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${record?.isExpired ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                            }`}
                                    >
                                        {record?.isExpired ? 'Expired' : record?.status || 'Active'}
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {!Offer || Offer.length === 0 && (
                <p className="text-gray-500 mt-4">No offers available.</p>
            )}
        </div>
    );
}
