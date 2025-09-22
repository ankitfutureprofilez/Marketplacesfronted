import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import image from "../../img/login.png";
import Login_page from "../../img/login-page.png";

import Listing from "../../Apis/Listing";
import { IoEye, IoEyeOff } from "react-icons/io5";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard")
    // setLoading(true);
    // const main = new Listing();
    // const response = main.adminlogin({
    //   email: formData?.email,
    //   password: formData.password,
    // });
    // response
    //   .then((res) => {
    //     if (res && res?.data && res?.data?.status) {
    //       toast.success(res.data.message);
    //       localStorage && localStorage.setItem("token", res?.data?.token);
    //       setLoading(false);
    //     } else {
    //       toast.error(res.data.message);
    //       setLoading(false);
    //     }
    //     setFormData({
    //       email: "",
    //       password: "",
    //     });
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     toast.error(error?.response?.data?.message);
    //     console.log("error", error);
    //     setLoading(false);
    //   });
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="hidden md:flex md:w-1/2 items-center justify-center ">
          <img
            src={image}
            alt="Market Places Illustration"
            className="object-cover rounded-lg"
          />
        </div>

        <div className="flex flex-col justify-center w-full md:w-1/2 py-8 px-6 md:px-12 lg:px-[76px] bg-white">
            <img
              src={Login_page}
              alt="Market Places Illustration"
              className="object-cover w-[300px] md:w-[450px] h-[85px] rounded-lg object-center mb-[25px]"
            />
          <h2 className="text-[25px] lg:text-[30px] tracking-[-0.03em] text-left font-semibold text-[#262626] font-poppins mb-[50px] md:mb-[90px] lg:mb-[100px]  ">Login to Your Account</h2>
          <form onSubmit={handleSubmit} className="">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm lg:text-base font-[500] font-poppins text-[#7A7A7A] tracking-[-0.06em] mb-2"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full h-12 lg:h-[65px] px-3 py-3 !bg-white text-[#727272] border border-[#0000001A] rounded-lg lg:rounded-[15px] sm:text-sm"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block text-sm lg:text-base font-[500] font-poppins text-[#7A7A7A] tracking-[-0.06em] mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full h-12 lg:h-[65px] px-3 py-3 !bg-white text-[#727272] border border-[#0000001A] rounded-lg lg:rounded-[15px] sm:text-sm"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute top-6 right-5"
                >
                  {showNewPassword ? (
                    <IoEyeOff size={24} className="text-gray-600" />
                  ) : (
                    <IoEye size={24} className="text-gray-600" />
                  )}
                </button>
              </div>

            </div>
            {/* <div className="mb-4 text-right">
            <ForgetPassword />
          </div> */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-[#004AAD] text-white font-medium rounded-full"
            >
              {loading ? "Signing In..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
