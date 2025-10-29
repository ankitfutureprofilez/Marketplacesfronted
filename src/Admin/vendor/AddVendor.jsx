import React, { useEffect, useState } from "react";
import AuthLayout from "../../component/AuthLayout";
import HeaderAdmin from "../../common/HeaderAdmin";
import BusinessHoursAndHolidays from "./BusinessHoursAndHolidays";
import Listing from "../../Apis/Listing";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

// 🔹 Reusable Input Field
const InputField = ({ label, id, type = "text", value, onChange, placeholder, isRequired = false, readOnly = false }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label} {isRequired && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      required={isRequired}
      readOnly={readOnly}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
    />
  </div>
);

// 🔹 Reusable File Upload
const FileUploadField = ({ label, id, onChange, isRequired = false, preview }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label} {isRequired && <span className="text-red-500">*</span>}
    </label>
    <input
      type="file"
      id={id}
      name={id}
      onChange={onChange}
      required={isRequired}
      className="block w-full text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-indigo-50 file:text-indigo-700
        hover:file:bg-indigo-100 cursor-pointer"
    />
    {preview && (
      <img
        src={preview}
        alt={id}
        className="mt-2 w-40 rounded-lg border border-gray-300 shadow-sm"
      />
    )}
  </div>
);

export default function AddVendor() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [extraHoliday, setExtraHoliday] = useState("");

  const initialHours = {
    Mon: { open: "09:00", close: "22:00", active: true },
    Tue: { open: "09:00", close: "22:00", active: true },
    Wed: { open: "09:00", close: "22:00", active: true },
    Thu: { open: "09:00", close: "22:00", active: true },
    Fri: { open: "09:00", close: "22:00", active: true },
    Sat: { open: "09:00", close: "22:00", active: true },
    Sun: { open: null, close: null, active: false },
  };

  const [hours, setHours] = useState(initialHours);

  const initialState = {
    business_name: "",
    name: "",
    phone: "",
    email: "",
    business_register: "",
    gst_number: "",
    address: "",
    lat: "",
    long: "",
    city: "",
    area: "",
    pincode: "",
    category: "",
    subcategory: "",
    aadhaar_front: null,
    aadhaar_back: null,
    pan_card_image: null,
    gst_certificate: null,
    business_logo: null,
    weekly_off_day: extraHoliday,
    opening_hours: hours,
    state: "Rajasthan",
    _id: "",
  };

  const [formData, setFormData] = useState(initialState);

  // 🔹 Format date helper
  const formatDate = (dateValue) => {
    if (!dateValue) return "";
    const date = new Date(dateValue);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // 🔹 Fetch all categories first
  useEffect(() => {
    const main = new Listing();
    main
      .category()
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.log("Error fetching categories:", err));
  }, []);

  // 🔹 Fetch vendor details only after categories are loaded
  useEffect(() => {
    if (!id || !categories.length) return;

    const main = new Listing();
    main
      .vendor_details(id)
      .then((res) => {
        const records = res?.data?.data?.record;

        setFormData({
          business_name: records?.business_name || "",
          name: records?.user?.name || "",
          phone: records?.user?.phone || "",
          email: records?.user?.email || "",
          business_register: records?.business_register || "",
          city: records?.city || "",
          gst_number: records?.gst_number || "",
          category: records?.category?._id || "",
          subcategory: records?.subcategory?._id || "",
          address: records?.address || "",
          lat: records?.lat || "",
          long: records?.long || "",
          area: records?.area || "",
          pincode: records?.pincode || "",
          aadhaar_front: records?.aadhaar_front || "",
          aadhaar_back: records?.aadhaar_back || "",
          pan_card_image: records?.pan_card_image || "",
          gst_certificate: records?.gst_certificate || "",
          business_logo: records?.business_logo || "",
          _id: records?.user?._id || "",
        });

        setExtraHoliday(formatDate(records?.weekly_off_day) || "09-09-2025");
        setHours(records?.opening_hours || initialHours);

        if (records?.category?._id) fetchSubcategories(records.category._id);
      })
      .catch((error) => console.log("Error fetching vendor:", error));
  }, [categories, id]);

  // 🔹 Fetch subcategories
  const fetchSubcategories = async (catId) => {
    try {
      const main = new Listing();
      const res = await main.subcategory(catId);
      setSubcategories(res.data.data);
    } catch (err) {
      console.log("Error fetching subcategories:", err);
    }
  };
  useEffect(() => {
    if (formData.category) fetchSubcategories(formData.category);
  }, [formData.category]);

  // 🔹 Handle text input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 Handle file input
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.files[0],
    }));
  };

  // 🔹 Submit New Vendor
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const main = new Listing();
      const res = await main.VendorAdds(formData);
      toast.success(res.data.message);
      navigate("/vendor");
    } catch (err) {
      toast.error("Error adding vendor");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Update Existing Vendor
  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const main = new Listing();
      const res = await main.VendorEdit(formData);
      toast.success(res.data.message);
      navigate("/vendor");
    } catch (err) {
      toast.error("Error updating vendor");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <HeaderAdmin title={id ? "Edit Vendor" : "Add New Vendor"} back={1} />
      <div className="px-4 py-6 lg:px-10 lg:py-8 bg-gray-50 min-h-[calc(100vh-64px)]">
        <form onSubmit={id ? handleEdit : handleSubmit} className="space-y-6">

          {/* Business Info */}
          <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b pb-2">Business Info 🏢</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <InputField label="Owner Name" id="name" value={formData.name} onChange={handleChange} isRequired />
            <InputField label="Phone Number" id="phone" value={formData.phone} onChange={handleChange} isRequired />
            <InputField label="Email" id="email" value={formData.email} onChange={handleChange} isRequired />
            <InputField label="Business Name" id="business_name" value={formData.business_name} onChange={handleChange} isRequired />
            <InputField label="Business Registration No." id="business_register" value={formData.business_register} onChange={handleChange} isRequired />
            <InputField label="GST Number" id="gst_number" value={formData.gst_number} onChange={handleChange} />

            {/* Category */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-gray-700">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="border rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Subcategory */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-gray-700">Sub Category</label>
              <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                required
                className="border rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              >
                <option value="">Select Sub Category</option>
                {subcategories.map((sub) => (
                  <option key={sub._id} value={sub._id}>{sub.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Location Section */}
          <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b pb-2">Location & Type 📍</h3>
          <InputField label="Address" id="address" value={formData.address} onChange={handleChange} isRequired />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField label="State" id="state" value={formData.state} onChange={handleChange} readOnly />
            <InputField label="Latitude" id="lat" type="number" value={formData.lat} onChange={handleChange} />
            <InputField label="Longitude" id="long" type="number" value={formData.long} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField label="City" id="city" value={formData.city} onChange={handleChange} isRequired />
            <InputField label="Area" id="area" value={formData.area} onChange={handleChange} isRequired />
            <InputField label="Pincode" id="pincode" type="number" value={formData.pincode} onChange={handleChange} isRequired />
          </div>

          {/* Documents Section */}
          <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b pb-2">Documents & Files 📂</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FileUploadField label="Aadhaar Card (Front)" id="aadhaar_front" onChange={handleFileChange} preview={formData.aadhaar_front} />
            <FileUploadField label="Aadhaar Card (Back)" id="aadhaar_back" onChange={handleFileChange} preview={formData.aadhaar_back} />
            <FileUploadField label="PAN Card Image" id="pan_card_image" onChange={handleFileChange} preview={formData.pan_card_image} />
            <FileUploadField label="GST Certificate" id="gst_certificate" onChange={handleFileChange} preview={formData.gst_certificate} />
            <FileUploadField label="Business Logo" id="business_logo" onChange={handleFileChange} preview={formData.business_logo} />
          </div>

          {/* Business Hours */}
          <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b pb-2">Business Hours & Holidays 🏢</h3>
          <BusinessHoursAndHolidays
            setHours={setHours}
            hours={hours}
            setExtraHoliday={setExtraHoliday}
            extraHoliday={extraHoliday}
          />

          {/* Submit */}
          <div className="pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-lg font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              {loading ? "Saving..." : id ? "Update Vendor" : "Add New Vendor"}
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
