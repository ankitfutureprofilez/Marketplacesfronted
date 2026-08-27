import { useEffect, useState } from "react";
import defaultimage from "../../img/userdefault.webp";
import Listing from "../../Apis/Listing";
import toast from "react-hot-toast";
import Popup from "../../common/Popup";
import { useRole } from "../../context/RoleContext";
import { hasPermission } from "../../common/Permissions";

const AddSales = ({ isOpen, onClose, member, fetchSalesList, isEdit = false }) => {
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(defaultimage);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [originalPhone, setOriginalPhone] = useState("");
  const [isPhoneChanged, setIsPhoneChanged] = useState(false);
  const { user } = useRole();
  const canCreate = hasPermission(user, "create_customer");
  const canUpdate = hasPermission(user, "update_customer");

  useEffect(() => {
    if (isOpen) {
      if (!isEdit && !canCreate) {
        toast.error("You don't have permission to create customer");
        onClose();
      }

      if (isEdit && !canUpdate) {
        toast.error("You don't have permission to update customer");
        onClose();
      }
    }
  }, [isOpen]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    otp: "",
    email: "",
    area: "",
    avatar: null,
    role: "customer",
  });

  // Prefill data in edit mode
  useEffect(() => {
    const phone = member?.phone || "";
    setFormData({
      name: member?.name || "",
      phone: member?.phone || "",
      otp: member?.otp || "",
      email: member?.email || "",
      area: member?.area || "",
      avatar: member?.avatar || null,
      role: "customer",
    });
    setOriginalPhone(phone);
    setIsPhoneChanged(false);
    setIsPhoneVerified(false);
    setPreviewImage(
      member?.avatar ||
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyCbJoUCRscGfzySEtqoR5HtHnEOE0ux4r-A&s"
    );

  }, [member]);

  useEffect(() => {
    if (!isOpen) {
      setIsPhoneVerified(false);
      setIsPhoneChanged(false);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("value", value);
    console.log("originalPhone", originalPhone);
    if (name === "phone") {
      if (value != originalPhone && value.length === 10) {
        setIsPhoneVerified(false);
        setIsPhoneChanged(true);
      }
      else {
        setIsPhoneVerified(true);
        setIsPhoneChanged(false);
      }
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, avatar: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleAddSales = async () => {
    const main = new Listing();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("phone", formData.phone);
    data.append("otp", formData.otp);
    data.append("email", formData.email);
    data.append("role", formData.role);
    data.append("area", formData.area);
    if (formData.avatar && formData.avatar instanceof File) {
      data.append("avatar", formData.avatar);
    }

    const response = await main.SalesAdd(data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response?.data?.status) {
      toast.success(response.data.message);
    }
    else {
      toast.error(response?.data?.message || "Update failed");
      throw new Error(response?.data?.message || "Update failed");
    }
  };

  const handleEditSales = async () => {
    const main = new Listing();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("phone", formData.phone);
    data.append("otp", formData.otp);
    data.append("email", formData.email);
    data.append("role", formData.role);
    data.append("area", formData.area);
    if (formData.avatar && formData.avatar instanceof File) {
      data.append("avatar", formData.avatar);
    }

    const response = await main.AdminEditSales(member?._id, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response?.data?.status) {
      toast.success(response.data.message);
    }
    else {
      toast.error(response?.data?.message || "Update failed");
      throw new Error(response?.data?.message || "Update failed");
    }
  };

  // 🔹 Unified submit just picks which to call
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isPhoneChanged && !isPhoneVerified) {
      toast.error("Please verify the phone number before submitting.");
      setLoading(false);
      return;
    }

    try {
      if (isEdit) {
        await handleEditSales();
      } else {
        await handleAddSales();
      }

      onClose();
      fetchSalesList();
      setPreviewImage(defaultimage);
      setFormData({
        name: "",
        phone: "",
        otp: "",
        email: "",
        area: "",
        avatar: null,
        role: "customer",
      });
    } catch (error) {
      console.log("error", error);
      console.error("Error submitting sales:", error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSend = async () => {
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
    <Popup isOpen={isOpen} onClose={onClose} size={"max-w-[480px]"}>
      <div className="px-2 py-3">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            {isEdit ? "Edit Customer Details" : "Add New Customer"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Please fill in the profile details below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Image Uploader */}
          <div className="flex flex-col items-center mb-2">
            <label className="relative cursor-pointer group">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-100 ring-4 ring-slate-50 shadow-sm relative transition group-hover:opacity-90">
                <img
                  src={previewImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="text-[10px] text-white font-semibold uppercase tracking-wider">Change</span>
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
            <p className="text-[11px] text-slate-400 mt-2">
              Upload profile picture <span className="text-rose-500">*</span>
            </p>

            {previewImage !== defaultimage && (
              <button
                type="button"
                onClick={() => {
                  setPreviewImage(defaultimage);
                  setFormData((prev) => ({ ...prev, avatar: null }));
                }}
                className="text-rose-500 text-xs mt-1 hover:underline font-semibold"
              >
                Remove Picture
              </button>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Name <span className="text-rose-500">*</span>
            </label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-800 text-sm"
              placeholder="Enter full name"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                disabled={isPhoneChanged && isPhoneVerified}
                onChange={(e) => {
                  if (
                    e.target.value.length <= 10 &&
                    /^[0-9]*$/.test(e.target.value)
                  ) {
                    handleChange(e);
                  }
                }}
                maxLength="10"
                className="flex-grow px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-800 text-sm disabled:bg-slate-50 disabled:text-slate-500"
                placeholder="Enter phone number"
                required
              />
              {isPhoneChanged && (
                <button
                  type="button"
                  onClick={handleOtpSend}
                  disabled={isPhoneVerified || loading}
                  className={`text-xs font-semibold px-4 py-2.5 rounded-xl transition-all duration-150 shrink-0 ${
                    isPhoneVerified
                      ? "bg-emerald-50 text-emerald-600 cursor-not-allowed border border-emerald-100"
                      : "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-100"
                  }`}
                >
                  {isPhoneVerified ? "Verified" : "Verify"}
                </button>
              )}
            </div>
          </div>

          {/* OTP */}
          {isPhoneChanged && isPhoneVerified && (
            <div className="animate-fadeIn">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                OTP Verification <span className="text-rose-500">*</span>
              </label>
              <input
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-800 text-sm"
                placeholder="Enter 4-digit OTP"
                required={isPhoneChanged}
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-800 text-sm"
              placeholder="Enter email address"
            />
          </div>

          {/* Location / Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Location / Area
            </label>
            <input
              name="area"
              type="text"
              value={formData.area}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-800 text-sm"
              placeholder="Enter location or area"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2.5 border border-slate-200 text-gray-700 rounded-xl font-semibold hover:bg-slate-50 transition text-sm cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                loading ||
                (!isEdit && !canCreate) ||
                (isEdit && !canUpdate)
              }
              className="w-1/2 py-2.5 bg-blue-800 text-white rounded-xl font-medium hover:bg-blue-900 transition disabled:bg-slate-200 disabled:text-slate-400 text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Submitting...
                </>
              ) : isEdit ? (
                "Update Details"
              ) : (
                "Add Customer"
              )}
            </button>
          </div>
        </form>
      </div>
    </Popup>
  );
};

export default AddSales;