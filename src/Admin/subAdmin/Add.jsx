import React, { useEffect, useState } from "react";
import Popup from "../../common/Popup";
import defaultimage from "../../img/userdefault.webp";
import Listing from "../../Apis/Listing";
import toast from "react-hot-toast";

export default function Add({ isOpen, onClose, member, fetchData, isEdit = false }) {
  const PERMISSIONS = [
    { label: "Manage Customers", value: "manage_customers" },
    // Customer Actions
    { label: "Create Customer", value: "create_customer" },
    { label: "Update Customer", value: "update_customer" },
    { label: "Delete Customer", value: "delete_customer" },

    { label: "Manage Sales", value: "manage_sales" },
    // Sales Actions
    { label: "Create Sales", value: "create_sales" },
    { label: "Update Sales", value: "update_sales" },
    { label: "Delete Sales", value: "delete_sales" },

    { label: "Manage Vendors", value: "manage_vendors" },
    // Vendor Actions
    { label: "Create Vendor", value: "create_vendor" },
    { label: "Update Vendor", value: "update_vendor" },
    { label: "Delete Vendor", value: "delete_vendor" },
    
    { label: "Manage Categories", value: "manage_categories" },
    { label: "Manage website", value: "manage_website" },
    { label: "View Purchase", value: "view_purchase" },
  ];

  console.log("member", member);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    permissions: [],
    avatar: null,
  });

  const [previewImage, setPreviewImage] = useState(defaultimage);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // if (!member) return;
    setFormData((prev) => ({
      ...prev,
      name: member?.name || "",
      phone: member?.phone || "",
      email: member?.email || "",
      permissions: member?.permissions || [],
      password: "",
      avatar: null, // keep file null, not URL
    }));
    setPreviewImage(
      member?.avatar ||
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyCbJoUCRscGfzySEtqoR5HtHnEOE0ux4r-A&s"
    );
  }, [member]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({ ...prev, avatar: file }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const handlePermissionToggle = (permission) => {
    setFormData((prev) => {
      const currentPermissions = prev.permissions || [];

      const exists = currentPermissions.includes(permission);

      return {
        ...prev,
        permissions: exists
          ? currentPermissions.filter((p) => p !== permission)
          : [...currentPermissions, permission],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.permissions.length) {
      toast.error("Please select at least one permission");
      return;
    }
    if (loading) return;
    try {
      setLoading(true);
      const main = new Listing();
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("password", formData.password);
      payload.append("permissions", JSON.stringify(formData.permissions));

      if (formData.avatar && formData.avatar instanceof File) {
        payload.append("avatar", formData.avatar);
      }
      const response = await main.addSubAdmin(payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response?.data?.status) {
        toast.success(response.data.message);
        onClose();
        fetchData();
      }
      else {
        toast.error(response?.data?.message || "Update failed");
        throw new Error(response?.data?.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formData.permissions.length) {
      toast.error("Please select at least one permission");
      return;
    }
    if (loading) return;
    try {
      setLoading(true);
      const main = new Listing();
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("password", formData.password);
      payload.append("permissions", JSON.stringify(formData.permissions));

      if (formData.avatar && formData.avatar instanceof File) {
        payload.append("avatar", formData.avatar);
      }
      const response = await main.updateSubAdmin(member?._id, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response?.data?.status) {
        toast.success(response.data.message);
        onClose();
        fetchData();
      }
      else {
        toast.error(response?.data?.message || "Update failed");
        throw new Error(response?.data?.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose} size={"max-w-[480px]"}>
      <div className="px-2 py-3">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight font-[Poppins]">
            {isEdit ? "Edit Sub-Admin Details" : "Add New Sub-Admin"}
          </h2>
          <p className="text-sm text-gray-500 mt-1 font-[Poppins]">
            Please fill in the profile details below
          </p>
        </div>

        <div className="relative">
          <button
            onClick={onClose}
            className="hidden"
          >
            &times;
          </button>

          <form onSubmit={isEdit ? handleUpdate : handleSubmit} className="space-y-4">
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
              <p className="text-[11px] text-slate-400 mt-2 font-[Poppins]">
                Upload profile picture <span className="text-rose-500">*</span>
              </p>

              {previewImage !== defaultimage && (
                <button
                  type="button"
                  onClick={() => {
                    setPreviewImage(defaultimage);
                    setFormData((prev) => ({ ...prev, avatar: null }));
                  }}
                  className="text-rose-500 text-xs mt-1 hover:underline font-semibold font-[Poppins]"
                >
                  Remove Picture
                </button>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 font-[Poppins]">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-800 text-sm font-[Poppins]"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 font-[Poppins]">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                maxLength={10}
                required
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-800 text-sm font-[Poppins]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 font-[Poppins]">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                required
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-800 text-sm font-[Poppins]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 font-[Poppins]">
                Password {!isEdit && <span className="text-rose-500">*</span>}
              </label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required={!isEdit}
                autoComplete="new-password"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-800 text-sm font-[Poppins]"
              />
            </div>

            {/* Permissions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 font-[Poppins]">
                Permissions <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3 bg-slate-50 border border-slate-200/60 rounded-2xl max-h-48 overflow-y-auto scrollbar-thin">
                {PERMISSIONS.map((perm) => (
                  <label key={perm.value} className="flex items-center gap-2.5 p-2 bg-white rounded-xl border border-slate-200/80 hover:bg-blue-50/20 hover:border-blue-200 transition-all cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.permissions.includes(perm.value)}
                      onChange={() => handlePermissionToggle(perm.value)}
                      className="rounded border-slate-300 text-blue-800 focus:ring-blue-600/20 h-4 w-4 transition-colors"
                    />
                    <span className="text-xs font-medium text-slate-700 select-none font-[Poppins]">{perm.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 py-2.5 border border-slate-200 text-gray-700 rounded-xl font-semibold hover:bg-slate-50 transition text-sm cursor-pointer font-[Poppins]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-1/2 py-2.5 bg-blue-800 text-white rounded-xl font-medium hover:bg-blue-900 transition disabled:bg-slate-200 disabled:text-slate-400 text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow font-[Poppins]"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Submitting...
                  </>
                ) : isEdit ? (
                  "Update Details"
                ) : (
                  "Add Sub-Admin"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Popup>
  );
}
