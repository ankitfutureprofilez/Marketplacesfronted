import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Listing from "../../Apis/Listing";

const StudentChangePassword = ({ listing }) => {
  const [Regs, setRegs] = useState({
    newPassword: "",
    confirmPassword: "",
    email: listing?.email,
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
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
      toast.error("Passwords do not match!");
      return;
    }
    setLoading(true);
    const main = new Listing();
    try {
      const response = await main.resetpassword({
        newPassword: Regs.newPassword,
        email: Regs?.email,
      });
      if (response?.data) {
        toast.success(response.data.message);
        setRegs({ newPassword: "", confirmPassword: "" });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("An error occurred while resetting the password.");
    }
    setLoading(false);
  }

  return (
    <div className="w-full">
      {/* Heading */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">
          Reset Password
        </h3>
        <p className="text-gray-500 text-sm">
          Manage your account security by updating your password.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleForms} className="space-y-5">
        {/* New Password */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            type={showPassword.new ? "text" : "password"}
            required
            name="newPassword"
            value={Regs?.newPassword}
            onChange={handleInputs}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                        outline-none pr-10"
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

        {/* Confirm Password */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type={showPassword.confirm ? "text" : "password"}
            required
            name="confirmPassword"
            value={Regs?.confirmPassword}
            onChange={handleInputs}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                        outline-none pr-10"
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
            className="bg-blue-600 text-white p-2 rounded-lg font-medium 
                       hover:bg-blue-700 transition duration-200 
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Reset Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentChangePassword;
