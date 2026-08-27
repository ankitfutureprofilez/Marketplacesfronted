import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Listing from "../../Apis/Listing";
import { CgSpinner } from "react-icons/cg";

const StudentChangePassword = ({ listing }) => {
  const [Regs, setRegs] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    email: listing?.email,
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setRegs((prev) => ({ ...prev, [name]: value }));
  };

  async function handleForms(e) {
    e.preventDefault();
    if (loading) return;

    if (Regs.newPassword !== Regs.confirmPassword) {
      toast.error("New password and confirm password do not match!");
      return;
    }

    setLoading(true);
    const main = new Listing();

    try {
      const response = await main.resetpassword({
        oldPassword: Regs.oldPassword,
        newPassword: Regs.newPassword,
        email: Regs.email,
      });

      if (response?.data) {
        toast.success(response.data.message);
        setRegs({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
          email: Regs.email,
        });
      } else {
        toast.error(response?.data?.message || "Something went wrong");
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.message || "An error occurred while resetting the password.");
    }

    setLoading(false);
  }

  return (
    <div className="w-full space-y-6 pt-2">
      {/* Heading */}
      <div className="mb-6 font-[Poppins]">
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
          Change Password
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Update your password to keep your account secure.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleForms} className="space-y-5">
        {/* Old Password */}
        <div className="max-w-xl">
          <label className="block text-sm font-medium text-gray-700 mb-1.5 font-[Poppins]">
            Old Password <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword.old ? "text" : "password"}
              required
              name="oldPassword"
              value={Regs.oldPassword}
              onChange={handleInputs}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-800 text-sm font-[Poppins] pr-10"
              placeholder="Enter old password"
            />
            <div
              className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() =>
                setShowPassword((prev) => ({ ...prev, old: !prev.old }))
              }
            >
              {showPassword.old ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </div>
          </div>
        </div>

        {/* New Password */}
        <div className="max-w-xl">
          <label className="block text-sm font-medium text-gray-700 mb-1.5 font-[Poppins]">
            New Password <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword.new ? "text" : "password"}
              required
              name="newPassword"
              value={Regs.newPassword}
              onChange={handleInputs}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-800 text-sm font-[Poppins] pr-10"
              placeholder="Enter new password"
            />
            <div
              className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() =>
                setShowPassword((prev) => ({ ...prev, new: !prev.new }))
              }
            >
              {showPassword.new ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </div>
          </div>
        </div>

        {/* Confirm New Password */}
        <div className="max-w-xl">
          <label className="block text-sm font-medium text-gray-700 mb-1.5 font-[Poppins]">
            Confirm New Password <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword.confirm ? "text" : "password"}
              required
              name="confirmPassword"
              value={Regs.confirmPassword}
              onChange={handleInputs}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-800 text-sm font-[Poppins] pr-10"
              placeholder="Confirm new password"
            />
            <div
              className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() =>
                setShowPassword((prev) => ({
                  ...prev,
                  confirm: !prev.confirm,
                }))
              }
            >
              {showPassword.confirm ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full max-w-[180px] py-2.5 bg-blue-800 text-white rounded-xl font-medium hover:bg-blue-900 transition disabled:bg-slate-200 disabled:text-slate-400 text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow font-[Poppins]"
          >
            {loading ? (
              <>
                <CgSpinner className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <span>Update Password</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentChangePassword;