import { useEffect, useState } from "react";
import defaultimage from "../../img/userdefault.webp";
import Listing from "../../Apis/Listing";
import toast from "react-hot-toast";
import Popup from "../../common/Popup";

const AddSales = ({ isOpen, onClose, member, fecthSalesList, isEdit = false }) => {
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(defaultimage);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    otp: "",
    email: "",
    avatar: null,
    role: "sales",
  });

  // Prefill data in edit mode
  useEffect(() => {
    if (member) {
      setFormData({
        name: member?.name || "",
        phone: member?.phone || "",
        otp: member?.otp || "",
        email: member?.email || "",
        avatar: member?.avatar || null,
        role: "sales",
      });
      setPreviewImage(
        member?.avatar ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyCbJoUCRscGfzySEtqoR5HtHnEOE0ux4r-A&s"
      );
    }
  }, [member]);

  useEffect(() => {
    if (!isOpen) {
      // reset phone verification whenever modal closes
      setIsPhoneVerified(false);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, avatar: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // 🔹 Separate function for ADD
  const handleAddSales = async () => {
    const main = new Listing();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("phone", formData.phone);
    data.append("otp", formData.otp);
    data.append("email", formData.email);
    data.append("role", formData.role);
    if (formData.avatar && formData.avatar instanceof File) {
      data.append("avatar", formData.avatar);
    }

    const response = await main.SalesAdd(data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response?.data?.message) toast.success(response.data.message);
  };

  // 🔹 Separate function for EDIT
  const handleEditSales = async () => {
    const main = new Listing();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("phone", formData.phone);
    data.append("otp", formData.otp);
    data.append("email", formData.email);
    data.append("role", formData.role);
    if (formData.avatar && formData.avatar instanceof File) {
      data.append("avatar", formData.avatar);
    }

    const response = await main.AdminEditSales(member?._id, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response?.data?.message) toast.success(response.data.message);
  };

  // 🔹 Unified submit just picks which to call
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit) {
        await handleEditSales();
      } else {
        await handleAddSales();
      }

      onClose();
      fecthSalesList();
      setPreviewImage(defaultimage);
      setFormData({
        name: "",
        phone: "",
        otp: "",
        email: "",
        avatar: null,
        role: "sales",
      });
    } catch (error) {
      console.error("Error submitting sales:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const main = new Listing();
      const response = await main.salephoneverify({ phone: formData.phone });
      if (response) toast.success(response.data.message);
      setIsPhoneVerified(true);
    } catch (error) {
      console.error("Error verifying phone:", error);
      toast.error("Verification failed");
    }
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose} size={"max-w-[540px]"}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-[fadeIn_0.2s_ease-in-out]">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
          >
            &times;
          </button>

          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
            {isEdit ? "Edit Salesperson" : "Add Salesperson"}
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Please fill in the details below.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Profile Image */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 shadow-md">
                <img
                  src={previewImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="mt-2 text-sm"
              />
              {previewImage !== defaultimage && (
                <button
                  type="button"
                  onClick={() => {
                    setPreviewImage(defaultimage);
                    setFormData((prev) => ({ ...prev, avatar: null }));
                  }}
                  className="text-red-500 text-sm mt-1 hover:underline"
                >
                  Remove
                </button>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter full name"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <div className="flex gap-2">
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isPhoneVerified}
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter phone number"
                  required
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={isPhoneVerified || loading}
                  className={`text-sm font-semibold px-3 py-2 rounded-lg transition ${
                    isPhoneVerified
                      ? "bg-green-100 text-green-600 cursor-not-allowed"
                      : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  }`}
                >
                  {isPhoneVerified ? "Verified" : "Verify"}
                </button>
              </div>
            </div>

            {/* OTP */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                OTP
              </label>
              <input
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter OTP"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter email address"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {loading ? "Submitting..." : isEdit ? "Update" : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </Popup>
  );
};

export default AddSales;