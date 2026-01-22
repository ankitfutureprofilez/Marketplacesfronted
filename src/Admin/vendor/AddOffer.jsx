import React, { useState } from "react";
import Popup from "../../common/Popup";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";

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

  const [inclusionInput, setInclusionInput] = useState("");
  const [exclusionInput, setExclusionInput] = useState("");

  const toggleModal = () => setIsOpen(!isOpen);
  const onClose = () => setIsOpen(false);

  /* -------------------- Handlers -------------------- */

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "banner") {
      setFormData((prev) => ({ ...prev, banner: files[0] }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    toast.success("Offer added successfully");
    onClose();
  };

  /* -------------------- UI -------------------- */

  return (
    <>
      <button onClick={toggleModal}>
        <CiEdit size={20} className="text-green-600" />
      </button>

      {isOpen && (
        <Popup isOpen={isOpen} onClose={onClose} size="max-w-[720px]">
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-[fadeIn_0.2s_ease-in-out]">
              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
              >
                &times;
              </button>

              <h2 className="text-2xl font-semibold text-gray-800 text-center mb-1">
                Add New Offer
              </h2>
              <p className="text-sm text-gray-500 text-center mb-6">
                Please fill in the details below.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Banner Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Upload Offer Banner
                  </label>
                  <div className="border-2 border-dashed rounded-xl p-4 text-center">
                    <input
                      type="file"
                      name="banner"
                      accept="image/*"
                      onChange={handleChange}
                      className="text-sm"
                    />
                  </div>
                </div>

                {/* Offer Title */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Offer Title
                  </label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter offer title"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description (Optional)
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your offer"
                  />
                </div>

                {/* Discount */}
                <div className="grid grid-cols-3 gap-4">
                  {/* Offer Type */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Offer Type
                  </label>
                  <select
                    name="offerType"
                    value={formData.offerType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select offer type</option>
                    <option value="percentage">Percentage</option>
                    <option value="flat">Flat</option>
                  </select>
                </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
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

                  <div>
                    <label className="block text-sm font-medium mb-1">
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
                <div>
                  <label className="block text-sm font-medium mb-1">
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
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Valid Till
                  </label>
                  <input
                    type="date"
                    name="validTill"
                    value={formData.validTill}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>

                {/* Inclusion */}
                <div>
                  <label className="block text-sm font-medium mb-1">
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
                      className="px-4 bg-blue-600 text-white rounded-lg"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.inclusions.map((item, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2"
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
                  <label className="block text-sm font-medium mb-1">
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
                      className="px-4 bg-blue-600 text-white rounded-lg"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.exclusions.map((item, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm flex items-center gap-2"
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

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </Popup>
      )}
    </>
  );
}