import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import image from "../../img/login.avif";
import Listing from "../../Apis/Listing";

function Login() {
    const navigate = useNavigate();
    const [Regs, setRegs] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setRegs((prev) => ({ ...prev, [name]: value }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleForms = async (e) => {
        navigate("/dashboard");
        // e.preventDefault();
        // if (loading) return;
        // setLoading(true);

        // const main = new Listing();
        // try {
        //     const response = await main.adminlogin(Regs);
        //     if (response?.data?.status === true) {
        //         localStorage.setItem("token", response.data.token);
        //         navigate("/dashboard");
        //         toast.success(response.data.message);
        //     } else {
        //         toast.error("Invalid email/password");
        //     }
        // } catch (err) {
        //     console.error("Login Error:", err);
        //     toast.error("Invalid Email/Password");
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <>
            <div className="flex flex-col md:flex-row h-screen">
                {/* Left Image */}
                <div className="hidden md:block w-full md:w-1/2">
                    <img
                        src={image}
                        alt="Login"
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Login Form */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-6 ">
                    <div className="w-full ">
                        <h1 className="text-3xl font-bold text-center text-white-600 mb-4">
                           Market Places 
                        </h1>
                        <h3 className="text-xl font-semibold text-center mb-6">
                            Login to your Account
                        </h3>

                        {/* Email */}
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={Regs.email}
                                onChange={handleInputs}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-white-500 focus:border-white-500"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    value={Regs.password}
                                    onChange={handleInputs}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-white-500 focus:border-white-500"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-2.5 text-white-500"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password */}
                        <div className="text-right mb-4">
                            <Link
                                to="/forget"
                                className="text-sm text-white-600 hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Login Button */}
                        <div className="text-center">
                            <button
                                disabled={loading}
                                onClick={handleForms}
                                className="w-full py-2 px-4 bg-[#94A393] hover:bg-[#94A393] text-white font-semibold rounded-lg transition duration-200"
                            >
                                {loading ? "Please wait..." : "Login"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
