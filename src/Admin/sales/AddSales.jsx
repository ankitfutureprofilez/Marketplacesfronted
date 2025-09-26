import React, { useState } from "react";
// import Listing from "../Apis/Listing"; 
// import toast from "react-hot-toast"; 
import { MdDelete } from "react-icons/md";
import { HiOutlineUserAdd } from "react-icons/hi"; 
import defaultimage from "../../img/userdefault.webp"

const AddSales = ({ item, fetchTeamList, step = 1 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    
    // State to hold form data
    const [formData, setFormData] = useState({
        name: 'Rahul Verma', 
        phone: '9876543210', 
        otp: '',
        email: 'Rahulsharma@gmail.com', 
    });

    const [isPhoneVerified, setIsPhoneVerified] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    // Close the modal
    const closeModal = () => {
        setIsOpen(false);
        setLoading(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        // fetchTeamList(); 
        closeModal();
    };

    const handleVerifyOtp = () => {
        if (formData.otp.length === 6) { 
            setIsPhoneVerified(true);
        } else {
        }
    };


    return (
        <div className="inline-block">
            <button
                onClick={openModal}
                className="bg-blue-600 text-white px-3 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-700 transition duration-150"
            >
                <HiOutlineUserAdd className="w-5 h-5" />
                <span>Add Sales Person</span>
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm relative">
                        
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-xl font-semibold text-gray-800">Add Sales Person</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-black text-2xl"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Modal Body (Form) */}
                        <form className="p-6 space-y-5" onSubmit={handleSubmit}>
                            
                            <div className="flex flex-col items-center mb-4">
                                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300">
                                    <img 
                                        src={defaultimage}
                                        alt="Profile" 
                                        className="w-full h-full object-cover" 
                                    />
                                </div>
                                <a href="#" className="text-red-500 text-sm mt-1 hover:underline">
                                    Remove
                                </a>
                            </div>

                            {/* Name Input */}
                            <div className="space-y-1">
                                <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                                    placeholder="Enter full name"
                                    required
                                />
                            </div>

                            {/* Phone Input */}
                            <div className="space-y-1">
                                <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                                    placeholder="Enter phone number"
                                    required
                                />
                            </div>

                            {/* OTP Input with Verify Button */}
                            <div className="space-y-1">
                                <label htmlFor="otp" className="text-sm font-medium text-gray-700">Enter OTP</label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        id="otp"
                                        name="otp"
                                        type="text"
                                        value={formData.otp}
                                        onChange={handleChange}
                                        className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter 6-digit OTP"
                                        disabled={isPhoneVerified}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleVerifyOtp}
                                        disabled={isPhoneVerified || loading}
                                        className={`font-semibold text-blue-600 text-sm whitespace-nowrap ${isPhoneVerified ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-800'}`}
                                    >
                                        {isPhoneVerified ? 'Verified' : 'Verify Now'}
                                    </button>
                                </div>
                            </div>
                            
                            {/* Email Input */}
                            <div className="space-y-1">
                                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                                    placeholder="Enter email address"
                                    required
                                />
                            </div>
                            
                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-[#7A7A7A] text-white rounded-full font-semibold hover:bg-gray-700 transition duration-150 disabled:bg-gray-400"
                            >
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddSales;