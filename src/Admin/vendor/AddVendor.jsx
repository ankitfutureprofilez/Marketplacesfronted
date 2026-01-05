import React, { useEffect, useState } from "react";
import AuthLayout from "../../component/AuthLayout";
import HeaderAdmin from "../../common/HeaderAdmin";
import BusinessHoursAndHolidays from "./BusinessHoursAndHolidays";
import Listing from "../../Apis/Listing";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

// 🔹 Reusable Input Field
const InputField = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  isRequired = false,
  readOnly = false,
}) => (
  <div className="mb-4">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
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
const FileUploadField = ({
  label,
  id,
  onChange,
  isRequired = false,
  preview,
}) => (
  <div className="mb-4">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
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
        console.log("records", records);

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
          state: records?.state || "",
          _id: records?.user?._id || "",
        });

        setExtraHoliday(formatDate(records?.weekly_off_day) || "");
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
      setSubcategories([]);
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
    const file = e.target.files[0];
    const { name } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: file,
      [`${name}Preview`]: URL.createObjectURL(file) // preview url
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("email", formData.email);
    fd.append("phone", formData.phone);
    fd.append("address", formData.address);
    fd.append("business_name", formData.business_name);
    fd.append("business_register", formData.business_register);
    fd.append("gst_number", formData.gst_number);
    fd.append("city", formData.city);
    fd.append("state", formData.state);
    fd.append("area", formData.area);
    fd.append("pincode", formData.pincode);
    fd.append("lat", formData.lat);
    fd.append("long", formData.long);
    fd.append("categroy", formData.category);
    fd.append("subcategory", formData.subcategory);
    fd.append("opening_hours", JSON.stringify(hours));
    if (formData.aadhaar_front instanceof File)
      fd.append("aadhaar_front", formData.aadhaar_front);
    if (formData.aadhaar_back instanceof File)
      fd.append("aadhaar_back", formData.aadhaar_back);
    if (formData.pan_card_image instanceof File)
      fd.append("pan_card_image", formData.pan_card_image);
    if (formData.gst_certificate instanceof File)
      fd.append("gst_certificate", formData.gst_certificate);
    if (formData.business_logo instanceof File)
      fd.append("business_logo", formData.business_logo);
    const main = new Listing();
    const res = await main.AdminVendorAdd(fd);
    if(res?.data?.status){
      toast.success(res.data.message);
      navigate("/vendor");
    }else{
      toast.error(res.data.message);
    }
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
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("email", formData.email);
      fd.append("phone", formData.phone);
      fd.append("address", formData.address);
      fd.append("business_name", formData.business_name);
      fd.append("business_register", formData.business_register);
      fd.append("gst_number", formData.gst_number);
      fd.append("city", formData.city);
      fd.append("state", formData.state);
      fd.append("area", formData.area);
      fd.append("pincode", formData.pincode);
      fd.append("lat", formData.lat);
      fd.append("long", formData.long);
      fd.append("categroy", formData.category);
      fd.append("subcategory", formData.subcategory);
      fd.append("opening_hours", JSON.stringify(hours));
      if (formData.aadhaar_front instanceof File)
        fd.append("aadhaar_front", formData.aadhaar_front);
      if (formData.aadhaar_back instanceof File)
        fd.append("aadhaar_back", formData.aadhaar_back);
      if (formData.pan_card_image instanceof File)
        fd.append("pan_card_image", formData.pan_card_image);
      if (formData.gst_certificate instanceof File)
        fd.append("gst_certificate", formData.gst_certificate);
      if (formData.business_logo instanceof File)
        fd.append("business_logo", formData.business_logo);
      const main = new Listing();
      const res = await main.VendorEdit(id, fd);
      if(res?.data?.status){
        toast.success(res.data.message);
        navigate("/vendor");
      }else{
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Error adding vendor");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full px-4">
        <HeaderAdmin title={id ? "Edit Vendor" : "Add New Vendor"} back={1} />

        <div className="bg-gray-100 pb-8">
          <form
            onSubmit={id ? handleEdit : handleSubmit}
            className="space-y-10"
          >
            {/* BUSINESS INFO */}
            <div className="bg-white shadow-sm rounded-xl p-6 border">
              <h3 className="text-2xl font-semibold text-indigo-700 mb-1">
                Business Info
              </h3>
              <p className="text-gray-500 mb-6">
                Provide the business owner details and basic business
                information.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <InputField
                  label="Owner Name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  isRequired
                />
                <InputField
                  label="Phone Number"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => {
                  if (
                    e.target.value.length <= 10 &&
                    /^[0-9]*$/.test(e.target.value)
                  ) {
                    handleChange(e);
                  }
                 }}
                 maxLength="10"
                  isRequired
                />
                <InputField
                  label="Email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  isRequired
                />

                <InputField
                  label="Business Name"
                  id="business_name"
                  value={formData.business_name}
                  onChange={handleChange}
                  isRequired
                />
                <InputField
                  label="Business Registration No."
                  id="business_register"
                  value={formData.business_register}
                  onChange={handleChange}
                  isRequired
                />
                <InputField
                  label="GST Number"
                  id="gst_number"
                  value={formData.gst_number}
                  onChange={handleChange}
                />

                {/* Category */}
                <div className="flex flex-col">
                  <label className="mb-1 font-semibold text-gray-700">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subcategory */}
                <div className="flex flex-col">
                  <label className="mb-1 font-semibold text-gray-700">
                    Sub Category
                  </label>
                  <select
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Sub Category</option>
                    {subcategories.map((sub) => (
                      <option key={sub._id} value={sub._id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* LOCATION */}
            <div className="bg-white shadow-sm rounded-xl p-6 border">
              <h3 className="text-2xl font-semibold text-indigo-700 mb-1">
                Location & Type
              </h3>
              <p className="text-gray-500 mb-6">
                Add the vendor’s location and geographical information.
              </p>

              <InputField
                label="Address"
                id="address"
                value={formData.address}
                onChange={handleChange}
                isRequired
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <InputField
                  label="State"
                  id="state"
                  value={formData.state}
                  onChange={handleChange}
                />
                <InputField
                  label="Latitude"
                  id="lat"
                  type="number"
                  value={formData.lat}
                  onChange={handleChange}
                />
                <InputField
                  label="Longitude"
                  id="long"
                  type="number"
                  value={formData.long}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <InputField
                  label="City"
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                  isRequired
                />
                <InputField
                  label="Area"
                  id="area"
                  value={formData.area}
                  onChange={handleChange}
                  isRequired
                />
                <InputField
                  label="Pincode"
                  id="pincode"
                  type="number"
                  value={formData.pincode}
                  onChange={handleChange}
                  isRequired
                />
              </div>
            </div>

            {/* DOCUMENTS */}
            <div className="bg-white shadow-sm rounded-xl p-6 border">
              <h3 className="text-2xl font-semibold text-indigo-700 mb-1">
                Documents & Files
              </h3>
              <p className="text-gray-500 mb-6">
                Upload required documents for verification and listing.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FileUploadField
                  label="Aadhaar Card (Front)"
                  id="aadhaar_front"
                  onChange={handleFileChange}
                  preview={formData.aadhaar_frontPreview || formData.aadhaar_front || ""}
                />
                <FileUploadField
                  label="Aadhaar Card (Back)"
                  id="aadhaar_back"
                  onChange={handleFileChange}
                  preview={ formData.aadhaar_backPreview || formData.aadhaar_back || ""}
                />
                <FileUploadField
                  label="PAN Card Image"
                  id="pan_card_image"
                  onChange={handleFileChange}
                  preview={formData.pan_card_imagePreview || formData.pan_card_image || ""}
                />
                <FileUploadField
                  label="GST Certificate"
                  id="gst_certificate"
                  onChange={handleFileChange}
                  preview={formData.gst_certificatePreview ||formData.gst_certificate ||""}
                />
                <FileUploadField
                  label="Business Logo"
                  id="business_logo"
                  onChange={handleFileChange}
                  preview={formData.business_logoPreview || formData.business_logo || ""}
                />
              </div>
            </div>

            {/* BUSINESS HOURS */}
            <div className="bg-white shadow-sm rounded-xl p-6 border">
              <h3 className="text-2xl font-semibold text-indigo-700 mb-1">
                Business Hours & Holidays
              </h3>
              <p className="text-gray-500 mb-6">
                Set weekly hours and holidays for the vendor.
              </p>

              <BusinessHoursAndHolidays
                setHours={setHours}
                hours={hours}
                setExtraHoliday={setExtraHoliday}
                extraHoliday={extraHoliday}
              />
            </div>

           {/* SUBMIT BUTTON */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="py-2.5 px-6 text-base font-semibold rounded-lg bg-indigo-600 text-white shadow hover:bg-indigo-700 transition-all"
              >
                {loading
                  ? "Saving..."
                  : id
                  ? "Update Vendor"
                  : "Add New Vendor"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
