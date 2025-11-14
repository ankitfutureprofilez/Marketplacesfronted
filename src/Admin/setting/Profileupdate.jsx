import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Listing from "../../Apis/Listing";

const Profileupdate = ({ fetchData, listing, setListing }) => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [Regs, setRegs] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "", // image file
    role: "",
    status: "",
    _id: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setRegs((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImageUrl(url);
      setRegs((prev) => ({ ...prev, avatar: file })); // avatar file
    }
  };

  async function handleForms(e) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const main = new Listing();

    try {
      const formData = new FormData();
      formData.append("_id", Regs._id);
      formData.append("name", Regs.name);
      formData.append("email", Regs.email);
      formData.append("phone", Regs.phone);
      formData.append("role", Regs.role || "");
      formData.append("status", Regs.status || "");

      // append avatar only if file uploaded
      if (Regs.avatar && Regs.avatar instanceof File) {
        formData.append("avatar", Regs.avatar);
      }

      let response = await main.ProfileUpdate(formData);

      if (response?.data) {
        toast.success(response.data.message);
        fetchData();
      } else {
        toast.error(response?.data?.message || "Unexpected error occurred.");
      }
    } catch (error) {
      console.error("error", error);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setRegs({
      name: listing?.name || "",
      email: listing?.email || "",
      phone: listing?.phone || "",
      avatar: listing?.avatar || "",
      role: listing?.role || "",
      status: listing?.status || "",
      _id: listing?._id || "",
    });

    setUploadedImageUrl(listing?.avatar || "");
  }, [listing]);

  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">Update Profile</h3>
        <p className="text-gray-500 text-sm">Manage your personal information</p>
      </div>

      <form onSubmit={handleForms} className="space-y-6">

        {/* Profile Image */}
        <div className="flex flex-col items-left space-y-3">
          <div className="relative w-28 h-28">
            <img
              src={uploadedImageUrl || "https://via.placeholder.com/150?text=Profile"}
              alt="Profile Preview"
              className="w-28 h-28 rounded-full object-cover border border-gray-300"
            />
            <label className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer shadow-md hover:bg-blue-700 transition">
              <input
                type="file"
                onChange={handleFileInput}
                className="hidden"
                accept="image/*"
              />
              <span className="text-xs">✎</span>
            </label>
          </div>
          <p className="text-sm text-gray-500">Upload Profile Picture</p>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            value={Regs.name}
            onChange={handleInputs}
            name="name"
            required
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter full name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={Regs.email}
            onChange={handleInputs}
            name="email"
            required
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter email"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="tel"
            value={Regs.phone}
            onChange={handleInputs}
            name="phone"
            maxLength="10"
            pattern="[0-9]{10}"
            required
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter phone number"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg disabled:opacity-60"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>

      </form>
    </div>
  );
};

export default Profileupdate;