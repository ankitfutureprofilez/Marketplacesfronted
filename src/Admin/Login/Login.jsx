import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Listing from "../../Apis/Listing";
import { useRole } from "../../context/RoleContext";
import logo from "../../img/market.png";

import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiShield } from "react-icons/fi";
import { CgSpinner } from "react-icons/cg";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useRole();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const main = new Listing();
    try {
      const res = await main.adminlogin({
        email: formData.email,
        password: formData.password,
        role: "admin",
      });

      if (res?.data?.status) {
        toast.success(res.data.message);
        localStorage.setItem("token", res.data.data.token);
        setUser(res.data.data.user);
        navigate("/");
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      console.log("Login error:", error);
    } finally {
      setLoading(false);
      setFormData({ email: "", password: "" });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Top Identity Header */}
      <div className="text-center mb-8 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3 border border-slate-200/60">
          <FiShield className="w-3.5 h-3.5 text-slate-900" />
          <span>Admin Portal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight uppercase">
          Market Place
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
          Centralized management platform for vendors, orders, and customer operations
        </p>
      </div>

      {/* Main Form Container Card */}
      <div className="w-full max-w-lg bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-900/5">
        {/* Card Header with Logo */}
        <div className="flex items-center gap-4 mb-8 pb-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/80 p-2 flex items-center justify-center shrink-0 shadow-xs">
            <img
              src={logo}
              alt="Market Place Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Sign In to Console
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Please enter your authorized credentials to continue
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative group">
              <FiMail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-slate-900 transition-colors" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@marketplace.com"
                className="w-full pl-11 pr-4 py-3 bg-slate-50/70 border border-slate-200/90 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all font-medium"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative group">
              <FiLock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-slate-900 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-12 py-3 bg-slate-50/70 border border-slate-200/90 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all font-medium"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3.5 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-700 transition-colors focus:outline-none"
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-blue-800 hover:bg-blue-900 active:scale-[0.99] text-white font-semibold text-xs sm:text-sm rounded-2xl shadow-sm hover:shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <>
                  <CgSpinner className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Security Footer Notice */}
        <div className="mt-8 pt-5 flex items-center justify-center gap-2 text-slate-400 text-xs text-center">
          <FiShield className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>Restricted to authorized administrator personnel</span>
        </div>
      </div>
    </div>
  );
}

export default Login;