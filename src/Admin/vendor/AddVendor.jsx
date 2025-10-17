import React, { useEffect, useState } from 'react';
import AuthLayout from '../../component/AuthLayout';
import HeaderAdmin from '../../common/HeaderAdmin';
import BusinessHoursAndHolidays from './BusinessHoursAndHolidays';
import Listing from '../../Apis/Listing';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const InputField = ({ label, id, type = 'text', value, onChange, placeholder, isRequired = false }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label} {isRequired && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={isRequired}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
    />
  </div>
);

const FileUploadField = ({ label, id, onChange, isRequired = false }) => (
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
  </div>
);


export default function AddVendor() {
  const initialHours = {
    Mon: { open: '09:00', close: '22:00', active: true },
    Tue: { open: '09:00', close: '22:00', active: true },
    Wed: { open: '09:00', close: '22:00', active: true },
    Thu: { open: '09:00', close: '22:00', active: true },
    Fri: { open: '09:00', close: '22:00', active: true },
    Sat: { open: '09:00', close: '22:00', active: true },
    Sun: { open: '', close: '', active: false }, // Closed day
  };

  const [hours, setHours] = useState(initialHours);
  const [extraHoliday, setExtraHoliday] = useState('09-09-2025');
  const initialState = {
    business_name: '',
    name: '',
    phone: "",
    email: "",
    business_register: '',
    pan_card: false,
    GST_no: '',
    address: '',
    lat: '',
    long: '',
    landmark: '',
    city: '',
    area: '',
    pincode: '',
    categroy: '',
    subcategory: '',
    adhar_front: null,
    adhar_back: null,
    pan_card_image: null,
    gst_certificate: null,
    shop_license: null,
    business_logo: null,
    weekly_off_day: extraHoliday,
    opening_hours: hours,
    state: "rajasthan"
  };
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(initialState);

  console.log("formData" ,formData)
  const [subcategories, setSubcategories] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));


  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.files[0] // Store the actual file object
    }));
  };
  const navigate =  useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.VendorAdds(formData); // Send FormData
      if (response) 
        navigate("/vendor")
        toast.success(response.data.message);

      setLoading(false);
    } catch (error) {
      console.error("Error submitting sales:", error);
      setLoading(false);
    }
  };
  const [categroies, setcategroy] = useState([])

  useEffect(() => {
    const main = new Listing();
    const response = main.category();
    response.then((res) => {
      setcategroy(res.data.data)
    }).catch((error) => {
      console.log("eror", error)
    })
  }, [])



  const fetchSubcategories = async (id) => {
    try {
      const main = new Listing();
      const response = await main.subcategory(id);
      setSubcategories(response.data.data);
    } catch (err) {
      console.log("Error fetching subcategories:", err);
    }
  };
  useEffect(() => {
    if (formData.categroy) {
      fetchSubcategories(formData.categroy);
    }
  }, [formData.categroy]);
  return (
    <AuthLayout>
      <HeaderAdmin title={"Add New Vendor"} back={1} />
      <div className="px-4 py-6 lg:px-10 lg:py-8 bg-gray-50 min-h-[calc(100vh-64px)]">
        <form onSubmit={handleSubmit} className="space-y-6">

          <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b pb-2">Business Info 🏢</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 ">
            <InputField
              label="Owner Name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Ravi "
              isRequired
            />
            <InputField
              label="Phone Number"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g., 9841203670 "
              isRequired
            />

            <InputField
              label="Email "
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g., example.com "
              isRequired
            />
            <InputField
              label="Business Name"
              id="business_name"
              value={formData.business_name}
              onChange={handleChange}
              placeholder="e.g., Star Kirana Store"
              isRequired
            />

            <InputField
              label="Business Registration No."
              id="business_register"
              value={formData.business_register}
              onChange={handleChange}
              placeholder="Enter registration number"
              isRequired
            />
            <InputField
              label="GST Number"
              id="GST_no"
              value={formData.GST_no}
              onChange={handleChange}
              placeholder="Enter GST number (optional)"
            />
            <div className="flex flex-col">
              <label htmlFor="category" className="mb-1 font-semibold text-gray-700">Category</label>
              <select
                id="categroy"
                value={formData.categroy}
                name='categroy'
                onChange={handleChange}
                required
                className="border rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              >
                <option value="">Select Category</option>
                {categroies?.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="category" className="mb-1 font-semibold text-gray-700">Sub Category</label>
              <select
                id="subcategory"
                value={formData.subcategory}
                name='subcategory'
                onChange={handleChange}
                required
                className="border rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              >
                <option value="">Select Sub Category</option>
                {subcategories?.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

          </div>



          {/* Middle Panel: Location and Categories */}
          <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b pb-2">Location & Type 📍</h3>
          <InputField
            label="Address"
            id="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Street, Building Name"
            isRequired
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              label="State"
              id="state"
              type="text"
              value={formData.state}
              onChange={handleChange}
              placeholder="rajasthan"
              readonly
            />
            <InputField
              label="Latitude"
              id="lat"
              type="number"
              value={formData.lat}
              onChange={handleChange}
              placeholder="e.g., 26.9124"
            />
            <InputField
              label="Longitude"
              id="long"
              type="number"
              value={formData.long}
              onChange={handleChange}
              placeholder="e.g., 75.7873"
            />
          </div>
          <InputField
            label="Landmark"
            id="landmark"
            value={formData.landmark}
            onChange={handleChange}
            placeholder="e.g., Near City Hospital"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              label="City"
              id="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City name"
              isRequired
            />
            <InputField
              label="Area"
              id="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="Area name"
              isRequired
            />
            <InputField
              label="Pincode"
              id="pincode"
              type="number"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="e.g., 302001"
              isRequired
            />
          </div>

          <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b pb-2">Documents & Files 📂</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Aadhaar Front */}
            <div className="flex flex-col items-start">
              <FileUploadField
                label="Aadhar Card (Front)"
                id="adhar_front"
                onChange={handleFileChange}
              />
              {formData?.adhar_front && (
                <img
                  src={formData.adhar_front}
                  alt="adhar_front"
                  className="mt-2 w-40 rounded-lg border border-gray-300 shadow-sm"
                />
              )}
            </div>

            {/* Aadhaar Back */}
            <div className="flex flex-col items-start">
              <FileUploadField
                label="Aadhar Card (Back)"
                id="adhar_back"
                onChange={handleFileChange}
              />
              {formData?.adhar_back && (
                <img
                  src={formData.adhar_back}
                  alt="adhar_back"
                  className="mt-2 w-40 rounded-lg border border-gray-300 shadow-sm"
                />
              )}
            </div>

            {/* PAN Card */}
            <div className="flex flex-col items-start">
              <FileUploadField
                label="PAN Card Image"
                id="pan_card_image"
                onChange={handleFileChange}
              />
              {formData?.pan_card_image && (
                <img
                  src={formData.pan_card_image}
                  alt="pan_card_image"
                  className="mt-2 w-40 rounded-lg border border-gray-300 shadow-sm"
                />
              )}
            </div>

            {/* GST Certificate */}
            <div className="flex flex-col items-start">
              <FileUploadField
                label="GST Certificate"
                id="gst_certificate"
                onChange={handleFileChange}
              />
              {formData?.gst_certificate && (
                <img
                  src={formData.gst_certificate}
                  alt="gst_certificate"
                  className="mt-2 w-40 rounded-lg border border-gray-300 shadow-sm"
                />
              )}
            </div>

            {/* Shop License */}
            <div className="flex flex-col items-start">
              <FileUploadField
                label="Shop License"
                id="shop_license"
                onChange={handleFileChange}
              />
              {formData?.shop_license && (
                <img
                  src={formData.shop_license}
                  alt="shop_license"
                  className="mt-2 w-40 rounded-lg border border-gray-300 shadow-sm"
                />
              )}
            </div>

            {/* Business Logo */}
            <div className="flex flex-col items-start">
              <FileUploadField
                label="Business Logo"
                id="business_logo"
                onChange={handleFileChange}
              />
              {formData?.business_logo && (
                <img
                  src={formData.business_logo}
                  alt="business_logo"
                  className="mt-2 w-40 rounded-lg border border-gray-300 shadow-sm"
                />
              )}
            </div>
          </div>



          <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b pb-2">Business Hours & Holidays 🏢</h3>

          <BusinessHoursAndHolidays setHours={setHours} hours={hours} setExtraHoliday={setExtraHoliday} extraHoliday={extraHoliday} />
          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-lg font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              {loading ? "Sending.." : " Add New Vendor"}
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}
