import React, { useEffect, useState } from "react";
import Listing from "../../Apis/Listing";
import toast from "react-hot-toast";

export default function OfferPrice() {
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [offersPrice, setOffersPrice] = useState([]);

  const HomeLists = async () => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.getHome();
      const res = response?.data?.data;
      // console.log("res", res);
      setOffersPrice(res.offers_price || []);
    } catch (error) {
      console.log("error", error);
      setOffersPrice([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    HomeLists();
  }, []);

  const validateSlabPrices = (slabs) => {
    for (let i = 0; i < slabs.length; i++) {
        const currentPrice = slabs[i].price;

        // check against previous slabs
        for (let j = 0; j < i; j++) {
        if (currentPrice < slabs[j].price) {
            return {
            valid: false,
            message: `Price for ${slabs[i].minDiscount}–${slabs[i].maxDiscount}% cannot be less than ${slabs[j].minDiscount}–${slabs[j].maxDiscount}%`,
            };
        }
        }

        // check against next slabs
        for (let j = i + 1; j < slabs.length; j++) {
        if (currentPrice > slabs[j].price) {
            return {
            valid: false,
            message: `Price for ${slabs[i].minDiscount}–${slabs[i].maxDiscount}% cannot be greater than ${slabs[j].minDiscount}–${slabs[j].maxDiscount}%`,
            };
        }
        }
    }

    return { valid: true };
    };

  const handlePriceChange = (index, value) => {
    const updated = [...offersPrice];
    updated[index].price = Number(value);

    const validation = validateSlabPrices(updated);
    if (!validation.valid) {
        toast.error(validation.message);
        return;
    }

    setOffersPrice(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (processing) return;

    setProcessing(true);
    try {
      const main = new Listing();
      const response = await main.updateHome({
        offers_price: offersPrice,
      });
      if (response) {
        HomeLists();
        toast.success("Terms & Conditions successfully updated");
      }
    } catch (error) {
      const status = error?.response?.status;
      const message = error?.response?.data?.message || "Something went wrong.";
      toast.error(
        {
          401: "Unauthorized",
          403: "Access denied.",
          404: message,
          500: "Server error. Please try again later.",
        }[status] || message
      );
    }
    setProcessing(false);
  };

  return (
    <div className="px-2 md:px-6 py-6">
      <h1 className="text-xl md:text-2xl font-semibold mb-6">
        Offer Pricing Configuration
      </h1>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4 border">Discount Range</th>
              <th className="text-left p-4 border">Price (₹)</th>
              {/* <th className="text-left p-4 border">Status</th> */}
            </tr>
          </thead>
          <tbody>
            {offersPrice && offersPrice.map((item, index) => (
              <tr key={index} className="border-t">
                {/* Discount Range (READ ONLY) */}
                <td className="p-4 font-medium text-gray-700">
                  {item?.minDiscount}% – {item?.maxDiscount}%
                </td>

                {/* Editable Price */}
                <td className="p-4">
                  <input
                    type="number"
                    min="0"
                    value={item?.price}
                    onChange={(e) => handlePriceChange(index, e.target.value)}
                    className="w-32 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>

                {/* Status */}
                {/* <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.active ? "Active" : "Inactive"}
                  </span>
                </td> */}
              </tr>
            ))}

            {offersPrice?.length === 0 && !loading && (
              <tr>
                <td colSpan="3" className="p-6 text-center text-gray-500">
                  No pricing slabs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
