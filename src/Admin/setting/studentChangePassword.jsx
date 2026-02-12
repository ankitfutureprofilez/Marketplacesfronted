import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Listing from "../../Apis/Listing";

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
    <div className="w-full">
      {/* Heading */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">
          Change Password
        </h3>
        <p className="text-gray-500 text-sm">
          Update your password to keep your account secure.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleForms} className="space-y-5">
        {/* Old Password */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Old Password
          </label>
          <input
            type={showPassword.old ? "text" : "password"}
            required
            name="oldPassword"
            value={Regs.oldPassword}
            onChange={handleInputs}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-10 outline-none"
            placeholder="Enter old password"
          />
          <div
            className="absolute right-3 top-9 cursor-pointer text-gray-500"
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

        {/* New Password */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            type={showPassword.new ? "text" : "password"}
            required
            name="newPassword"
            value={Regs.newPassword}
            onChange={handleInputs}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-10 outline-none"
            placeholder="Enter new password"
          />
          <div
            className="absolute right-3 top-9 cursor-pointer text-gray-500"
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

        {/* Confirm New Password */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm New Password
          </label>
          <input
            type={showPassword.confirm ? "text" : "password"}
            required
            name="confirmPassword"
            value={Regs.confirmPassword}
            onChange={handleInputs}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-10 outline-none"
            placeholder="Confirm new password"
          />
          <div
            className="absolute right-3 top-9 cursor-pointer text-gray-500"
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

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium 
                       hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Processing..." : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentChangePassword;