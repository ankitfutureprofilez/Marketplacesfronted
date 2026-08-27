import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Listing from "../../Apis/Listing";
import { FiUser } from "react-icons/fi";
import { CgSpinner } from "react-icons/cg";

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
    <div className="w-full space-y-6 pt-2">
      <div className="mb-6 font-[Poppins]">
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">Update Profile</h3>
        <p className="text-xs text-slate-500 mt-1">Manage your personal information</p>
      </div>

      <form onSubmit={handleForms} className="space-y-5">

        {/* Profile Image */}
        <div className="flex flex-col items-start pt-2">
          <div className="relative group w-24 h-24 rounded-full overflow-hidden border-2 border-slate-100 shadow-sm transition-all hover:border-blue-500">
            {uploadedImageUrl ? (
              <img
                src={uploadedImageUrl}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-300">
                <FiUser className="w-10 h-10" />
              </div>
            )}
            <label className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <input
                type="file"
                onChange={handleFileInput}
                className="hidden"
                accept="image/*"
              />
              <span className="text-white text-xs font-semibold font-[Poppins]">Change</span>
            </label>
          </div>
          <p className="text-xs text-slate-500 mt-2 font-[Poppins]">Upload Profile Picture</p>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5 font-[Poppins]">Full Name <span className="text-rose-500">*</span></label>
          <input
            type="text"
            value={Regs.name}
            onChange={handleInputs}
            name="name"
            required
            className="w-full max-w-xl px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-800 text-sm font-[Poppins]"
            placeholder="Enter full name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5 font-[Poppins]">Email <span className="text-rose-500">*</span></label>
          <input
            type="email"
            value={Regs.email}
            onChange={handleInputs}
            name="email"
            required
            className="w-full max-w-xl px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-800 text-sm font-[Poppins]"
            placeholder="Enter email"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5 font-[Poppins]">Phone <span className="text-rose-500">*</span></label>
          <input
            type="tel"
            value={Regs.phone}
            onChange={handleInputs}
            name="phone"
            maxLength="10"
            pattern="[0-9]{10}"
            required
            className="w-full max-w-xl px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-800 text-sm font-[Poppins]"
            placeholder="Enter phone number"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full max-w-[180px] py-2.5 bg-blue-800 text-white rounded-xl font-medium hover:bg-blue-900 transition disabled:bg-slate-200 disabled:text-slate-400 text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow font-[Poppins]"
          >
            {loading ? (
              <>
                <CgSpinner className="w-4 h-4 animate-spin" />
                <span>Updating...</span>
              </>
            ) : (
              <span>Update Profile</span>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default Profileupdate;