import { useEffect, useState } from "react";
import { HiOutlineUserAdd } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
import defaultimage from "../../img/userdefault.webp";
import Listing from "../../Apis/Listing";
import toast from "react-hot-toast";

const AddSales = ({ member, fecthSalesList, isEdit = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(defaultimage);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    otp: "",
    email: "",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyCbJoUCRscGfzySEtqoR5HtHnEOE0ux4r-A&s",
    role: "sales",
  });

  useEffect(() => {
    if (member) {
      setFormData({
        name: member?.name || "",
        phone: member?.phone || "",
        otp: member?.otp || "",
        email: member?.email || "",
        avatar:
          member?.avatar ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyCbJoUCRscGfzySEtqoR5HtHnEOE0ux4r-A&s",
        role: "sales",
      });
      setPreviewImage(member?.avatar || defaultimage);
    }
  }, [member]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setLoading(false);
    setPreviewImage(defaultimage);
    setFormData({
      name: "",
      phone: "",
      otp: "",
      email: "",
      avatar: null,
      role: "sales",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, avatar: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const main = new Listing();
      const response = isEdit
        ? await main.AdminEditSales(member?._id, formData)
        : await main.SalesAdd(formData);

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
      setIsPhoneVerified(true);
    } catch (error) {
      console.error("Error verifying phone:", error);
    }
  };

  return (
    <div className="inline-block">
      <button
        onClick={openModal}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-150"
      >
        {isEdit ? (
          <>
            <MdEdit className="w-5 h-5" />
          </>
        ) : (
          <>
            <HiOutlineUserAdd className="w-5 h-5" />
            <span>Add Salesperson</span>
          </>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative animate-fadeIn">
            <div className="flex justify-between items-center p-5 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                {isEdit ? "Edit Salesperson" : "Add Salesperson"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800 text-2xl"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Profile Image */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 shadow-sm">
                  <img
                    src={previewImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="mt-2 text-sm"
                />
                {previewImage !== defaultimage && (
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewImage(defaultimage);
                      setFormData((prev) => ({ ...prev, avatar: null }));
                    }}
                    className="text-red-500 text-sm mt-1 hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* Name */}
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">Name</label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
                  placeholder="Enter full name"
                  required
                />
              </div>

              {/* Phone + OTP */}
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <div className="flex space-x-2">
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isPhoneVerified}
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
                    placeholder="Enter phone number"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={isPhoneVerified || loading}
                    className={`text-sm font-semibold px-3 py-2 rounded-lg ${
                      isPhoneVerified
                        ? "bg-green-100 text-green-600 cursor-not-allowed"
                        : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                    }`}
                  >
                    {isPhoneVerified ? "Verified" : "Verify"}
                  </button>
                </div>
              </div>

              {/* OTP */}
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">OTP</label>
                <input
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
                  placeholder="Enter OTP"
                  required
                />
              </div>

              {/* Email */}
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
                  placeholder="Enter email address"
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-150 disabled:bg-gray-400"
              >
                {loading ? "Submitting..." : isEdit ? "Update" : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSales;
