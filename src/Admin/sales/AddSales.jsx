import  { useState } from "react";
import { HiOutlineUserAdd } from "react-icons/hi";
import defaultimage from "../../img/userdefault.webp";
import Listing from "../../Apis/Listing";
import toast from "react-hot-toast";

const AddSales = ({ item, fecthSalesList, step = 1 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        otp: '',
        email: '',
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyCbJoUCRscGfzySEtqoR5HtHnEOE0ux4r-A&s", // File object
        role: "sales"
    });

    const [previewImage, setPreviewImage] = useState(defaultimage);
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => {
        setIsOpen(false);
        setLoading(false);
        setFormData({ name: '', phone: '', otp: '', email: '', avatar: null, role: "sales" });
        setPreviewImage(defaultimage);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle file input change
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, avatar: file }));
            setPreviewImage(URL.createObjectURL(file)); // preview
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const main = new Listing();
            const response = await main.SalesAdd(formData); // Send FormData
            if (response) toast.success(response.data.message);

            setLoading(false);
            closeModal();
            fecthSalesList();
        } catch (error) {
            console.error("Error submitting sales:", error);
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const main = new Listing();
            const response = await main.salephoneverify({ phone: formData.phone });
            if (response) toast.success(response.data.message);
        } catch (error) {
            console.error("Error verifying phone:", error);
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
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md relative">

                        {/* Header */}
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-xl font-semibold text-gray-800">Add Sales Person</h2>
                            <button onClick={closeModal} className="text-gray-500 hover:text-black text-2xl">&times;</button>
                        </div>

                        {/* Form */}
                        <form className="p-6 space-y-5" onSubmit={handleSubmit}>
                            {/* Avatar Upload */}
                            <div className="flex flex-col items-center mb-4">
                                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300">
                                    <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="mt-2"
                                />
                                {previewImage !== defaultimage && (
                                    <button
                                        type="button"
                                        onClick={() => { setPreviewImage(defaultimage); setFormData(prev => ({ ...prev, avatar: null })); }}
                                        className="text-red-500 text-sm mt-1 hover:underline"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>

                            {/* Name */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter full name"
                                    required
                                />
                            </div>

                            {/* Phone + OTP Verification */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Phone</label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        disabled={isPhoneVerified}
                                        className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter phone number"
                                        required
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

                            {/* OTP */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">OTP</label>
                                <input
                                    name="otp"
                                    value={formData.otp}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter OTP"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter email address"
                                    required
                                />
                            </div>

                            {/* Submit */}
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
