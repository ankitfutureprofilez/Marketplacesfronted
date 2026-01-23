import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Listing from "../../Apis/Listing";
import { use } from "react";

export default function AddOffer() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    banner: null,
    title: "",
    description: "",
    offerType: "",
    discountPercent: "",
    minBillAmount: "",
    maxDiscount: "",
    validTill: "",
    inclusions: [],
    exclusions: [],
  });
  const navigate = useNavigate();
  const [bannerPreview, setBannerPreview] = useState(null);
  const [inclusionInput, setInclusionInput] = useState("");
  const [exclusionInput, setExclusionInput] = useState("");
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!record) return;

    const offer = record.type === "flat" ? record.flat : record.percentage;

    setFormData({
      banner: null,
      title: offer?.title || "",
      description: offer?.description || "",
      offerType: record.type || "",
      discountPercent: offer?.discountPercentage || "",
      minBillAmount: offer?.minBillAmount || "",
      maxDiscount: offer?.maxDiscountCap || "",
      validTill: offer?.expiryDate ? offer.expiryDate.split("T")[0] : "",
      inclusions: Array.isArray(record.inclusion) ? [...record.inclusion] : [],
      exclusions: Array.isArray(record.exclusion) ? [...record.exclusion] : [],
    });
    setBannerPreview(offer?.offer_image || null);
  }, [record]);

  const fetchData = async () => {
    try {
      const main = new Listing();
      const response = await main.OfferGetById(id);
      if (response?.data?.status) {
        setRecord(response.data.data);
      } else {
        setRecord(null);
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
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

  // console.log("formData", formData);
  // console.log("record", record);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "banner") {
      const file = files[0];

      if (file) {
        setFormData((prev) => ({ ...prev, banner: file }));
        setBannerPreview(URL.createObjectURL(file)); // 👈 instant preview
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addInclusion = () => {
    if (!inclusionInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      inclusions: [...prev.inclusions, inclusionInput.trim()],
    }));
    setInclusionInput("");
  };

  const addExclusion = () => {
    if (!exclusionInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      exclusions: [...prev.exclusions, exclusionInput.trim()],
    }));
    setExclusionInput("");
  };

  const removeItem = (type, index) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const main = new Listing();
      const data = new FormData();

      // 🔹 Text fields
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("expiryDate", formData.validTill);
      data.append("minBillAmount", formData.minBillAmount);

      // 🔹 Conditional discount fields
      // if (formData.offerType === "percentage") {
        data.append("discountPercentage", formData.discountPercent);
        data.append("maxDiscountCap", formData.maxDiscount);
      // }

      // if (formData.offerType === "flat") {
        data.append("maxDiscountCap", formData.maxDiscount);
      // }

      // 🔹 Arrays (backend uses safeJsonParse)
      data.append("inclusion", JSON.stringify(formData.inclusions || []));
      data.append("exclusion", JSON.stringify(formData.exclusions || []));

      // 🔹 Image (only if user changed it)
      if (formData.banner instanceof File) {
        data.append("image", formData.banner); // 👈 MUST match multer field name
      }

      const res = await main.OfferUpdate(id, data);

      if (res?.data?.status) {
        toast.success(res.data.message || "Offer updated successfully");
        navigate(-1);
      } else {
        toast.error(res?.data?.message || "Failed to update offer");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      console.error("Offer update error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="mx-auto">
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* OFFER BASIC INFO */}
          <div className="bg-white border rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-semibold text-indigo-700 mb-1">
              Offer Details
            </h3>
            <p className="text-gray-500 mb-6">
              Basic information about the offer
            </p>

            {/* Banner Upload */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Upload Offer Banner
              </label>

              <div className="border-2 border-dashed rounded-lg p-3 bg-gray-50 text-center">
                {bannerPreview ? (
                  <img
                    src={bannerPreview}
                    alt="Offer Banner"
                    className="w-32 h-32 object-cover rounded-full mx-auto mb-2"
                  />
                ) : (
                  <p className="text-xs text-gray-400 mb-2">
                    No banner uploaded
                  </p>
                )}

                <input
                  type="file"
                  name="banner"
                  accept="image/*"
                  onChange={handleChange}
                  className="text-xs"
                />
              </div>
            </div>

            {/* Title */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Offer Title
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter offer title"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Description (Optional)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your offer"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* DISCOUNT SETTINGS */}
          <div className="bg-white border rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-semibold text-indigo-700 mb-1">
              Discount Configuration
            </h3>
            <p className="text-gray-500 mb-6">Set discount type and limits</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Offer Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Offer Type
                </label>
                <select
                  name="offerType"
                  value={formData.offerType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select offer type</option>
                  <option value="percentage">Percentage</option>
                  <option value="flat">Flat</option>
                </select>
              </div>

              {/* Discount */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Discount %
                </label>
                <input
                  type="number"
                  name="discountPercent"
                  value={formData.discountPercent}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              {/* Max Discount */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Max Discount ₹
                </label>
                <input
                  type="number"
                  name="maxDiscount"
                  value={formData.maxDiscount}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>

            {/* Min Bill */}
            <div className="mt-5">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Minimum Bill Amount ₹
              </label>
              <input
                type="number"
                name="minBillAmount"
                value={formData.minBillAmount}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            {/* Valid Till */}
            <div className="mt-5">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Valid Till
              </label>
              <input
                type="date"
                name="validTill"
                value={formData.validTill}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* INCLUSIONS & EXCLUSIONS */}
          <div className="bg-white border rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-semibold text-indigo-700 mb-1">
              Terms & Conditions
            </h3>
            <p className="text-gray-500 mb-6">
              Define what is included and excluded
            </p>

            {/* Inclusion */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Add Inclusion (Optional)
              </label>
              <div className="flex gap-2">
                <input
                  value={inclusionInput}
                  onChange={(e) => setInclusionInput(e.target.value)}
                  className="flex-grow px-4 py-2 border rounded-lg"
                  placeholder="Add inclusion"
                />
                <button
                  type="button"
                  onClick={addInclusion}
                  className="px-4 rounded-lg bg-indigo-600 text-white"
                >
                  +
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {formData?.inclusions?.map((item, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm flex items-center gap-2"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => removeItem("inclusions", index)}
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Exclusion */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Add Exclusion (Optional)
              </label>
              <div className="flex gap-2">
                <input
                  value={exclusionInput}
                  onChange={(e) => setExclusionInput(e.target.value)}
                  className="flex-grow px-4 py-2 border rounded-lg"
                  placeholder="Add exclusion"
                />
                <button
                  type="button"
                  onClick={addExclusion}
                  className="px-4 rounded-lg bg-indigo-600 text-white"
                >
                  +
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {formData?.exclusions?.map((item, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm flex items-center gap-2"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => removeItem("exclusions", index)}
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* SUBMIT */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="py-2.5 px-6 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
