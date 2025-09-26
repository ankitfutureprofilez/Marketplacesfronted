import React, { useState } from 'react';
import AuthLayout from '../../component/AuthLayout';
import HeaderAdmin from '../../common/HeaderAdmin';

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
  const initialState = {
    business_name: '',
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
    category: '', // Placeholder for ObjectId
    subcategory: '', // Placeholder for ObjectId
    opening_hours: '',
    weekly_off_day: '',
    // Files are usually handled separately, but we include placeholders for file names/data
    adhar_front: null,
    adhar_back: null,
    pan_card_image: null,
    gst_certificate: null,
    shop_license: null,
    business_logo: null,
  };

  const [formData, setFormData] = useState(initialState);
  const [isPanRequired, setIsPanRequired] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'pan_card') {
      setIsPanRequired(checked);
    }
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.files[0] // Store the actual file object
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Vendor Data:", formData);
    // Add API call logic here to send data to the backend
    // For files, you typically use FormData to handle multi-part form data.
  };
  return (
    <AuthLayout>
      <HeaderAdmin title={"Add New Vendor"} back={1} />
      <div className="px-4 py-6 lg:px-10 lg:py-8 bg-gray-50 min-h-[calc(100vh-64px)]">
        <div className="max-w-7xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Left Panel: Business Details */}
              <div className="lg:col-span-1 p-6 bg-white rounded-xl shadow-lg border border-gray-100 h-full">
                <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b pb-2">Business Info 🏢</h3>
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
                <div className="mb-4">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <input
                      type="checkbox"
                      name="pan_card"
                      checked={formData.pan_card}
                      onChange={handleChange}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mr-2"
                    />
                    Does the business have a PAN Card?
                  </label>
                </div>
                {isPanRequired && (
                  <InputField
                    label="GST Number"
                    id="GST_no"
                    value={formData.GST_no}
                    onChange={handleChange}
                    placeholder="Enter GST number (optional)"
                  />
                )}
                <InputField
                  label="Opening Hours"
                  id="opening_hours"
                  value={formData.opening_hours}
                  onChange={handleChange}
                  placeholder="e.g., 9:00 AM - 9:00 PM"
                />
                <InputField
                  label="Weekly Off Day"
                  id="weekly_off_day"
                  value={formData.weekly_off_day}
                  onChange={handleChange}
                  placeholder="e.g., Sunday"
                />
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
                <div className="grid grid-cols-2 gap-4">
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
                <div className="grid grid-cols-2 gap-4">
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
                </div>
                <InputField
                  label="Pincode"
                  id="pincode"
                  type="number"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="e.g., 302001"
                  isRequired
                />
                <InputField
                  label="Category ID (for demo)"
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Select Category"
                  isRequired
                />
                <InputField
                  label="SubCategory ID (for demo)"
                  id="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  placeholder="Select Subcategory"
                  isRequired
                />
                <h3 className="text-xl font-bold text-indigo-700 mb-4 border-b pb-2">Documents & Files 📂</h3>
                <FileUploadField
                  label="Aadhar Card (Front)"
                  id="adhar_front"
                  onChange={handleFileChange}
                  isRequired
                />
                <FileUploadField
                  label="Aadhar Card (Back)"
                  id="adhar_back"
                  onChange={handleFileChange}
                  isRequired
                />
                {isPanRequired && (
                  <>
                    <FileUploadField
                      label="PAN Card Image"
                      id="pan_card_image"
                      onChange={handleFileChange}
                      isRequired
                    />
                    <FileUploadField
                      label="GST Certificate"
                      id="gst_certificate"
                      onChange={handleFileChange}
                    />
                  </>
                )}
                <FileUploadField
                  label="Shop License"
                  id="shop_license"
                  onChange={handleFileChange}
                />
                <FileUploadField
                  label="Business Logo"
                  id="business_logo"
                  onChange={handleFileChange}
                />
              </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-lg font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
              >
                Add New Vendor 🎉
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}
