import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import logo from "../../img/login.png";
import loginbanner from "../../img/login-page.png";
import Listing from "../../Apis/Listing";
import { IoEye, IoEyeOff } from "react-icons/io5";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
        navigate("/access-admin");
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
    <div className="bg-white min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl flex flex-col-reverse lg:flex-row items-center justify-center bg-white overflow-hidden">
        {/* Left Image Section */}
        <div className="w-full lg:w-1/2">
          <img
            src={logo}
            alt="Login Illustration"
            className="w-full h-64 sm:h-80 md:h-[500px] lg:h-full object-cover"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col items-center text-center">
          <img
            src={loginbanner}
            alt="Logo"
            className="w-24 sm:w-28 md:w-32 mb-6"
          />

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-2">
            Login to your account
          </h2>
          <p className="text-gray-500 mb-6 text-sm sm:text-base">
            Welcome back! Please enter your details.
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5">
            {/* Email Input */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-5 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? (
                  <IoEyeOff size={22} />
                ) : (
                  <IoEye size={22} />
                )}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          {/* Optional Forgot Password */}
          {/* <div className="mt-4 text-sm text-gray-500">
            <a href="/forget-password" className="text-blue-600 hover:underline">
              Forgot your password?
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
