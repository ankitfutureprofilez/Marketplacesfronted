import React, { useEffect, useState } from "react";
import Popup from "../../common/Popup";
import defaultimage from "../../img/userdefault.webp";
import Listing from "../../Apis/Listing";
import toast from "react-hot-toast";

export default function Add({ isOpen, onClose, member, fetchData, isEdit = false }) {
  const PERMISSIONS = [
    { label: "Manage Customers", value: "manage_customers" },
    { label: "Manage Sales", value: "manage_sales" },
    { label: "Manage Vendors", value: "manage_vendors" },
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
    if(loading) return;
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
    if(loading) return;
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
    <Popup isOpen={isOpen} onClose={onClose} size={"max-w-[540px]"}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
          >
            &times;
          </button>

          <h2 className="text-2xl font-semibold text-center mb-2">
            {isEdit ? "Edit " : "Add "}Sub-Admin
          </h2>

          <form onSubmit={isEdit? handleUpdate : handleSubmit} className="space-y-5">
            {/* Avatar */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden border">
                <img
                  src={previewImage}
                  className="w-full h-full object-cover"
                />
              </div>
              <input
                type="file"
                onChange={handleAvatarChange}
                className="mt-2 text-sm"
              />
            </div>

            {/* Name */}
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full px-4 py-2 border rounded-lg"
            />

            {/* Phone */}
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              maxLength={10}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />

            {/* Email */}
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full px-4 py-2 border rounded-lg"
            />

            {/* Password */}
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required={!isEdit}
              autoComplete="new-password"
              className="w-full px-4 py-2 border rounded-lg"
            />

            {/* Permissions */}
            <div>
              <p className="text-sm font-medium mb-2">Permissions</p>
              <div className="grid grid-cols-2 gap-2">
                {PERMISSIONS.map((perm) => (
                  <label key={perm.value} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.permissions.includes(perm.value)}
                      onChange={() => handlePermissionToggle(perm.value)}
                    />
                    <span className="text-sm">{perm.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold"
            >
              {loading ? "Submitting..." :
              isEdit ? "Update Sub-Admin"
              : 
              "Create Sub-Admin"}
            </button>
          </form>
        </div>
      </div>
    </Popup>
  );
}
