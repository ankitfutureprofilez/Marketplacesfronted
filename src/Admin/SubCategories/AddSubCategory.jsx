import React, { useState, useEffect } from "react";
import Listing from "../../Apis/Listing";
import toast from "react-hot-toast";
import { FiX } from "react-icons/fi";
import { CgSpinner } from "react-icons/cg";

export default function AddSubCategory({ isOpen, onClose, member, isEdit, fecthSalesList, categories }) {

  console.log("member" ,member)
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  console.log("categoryId" ,categoryId)
  const [loading, setLoading] = useState(false);
  

  // Load data while editing
  useEffect(() => {
    if (member) {
      setName(member?.name || "");
      setCategoryId(member?.category_id || "");
    }
  }, [member]);

  if (!isOpen) return null;

  // ADD SubCategory
  const handleAddSubCategory = async () => {
    const api = new Listing();
    const data = {
      name,
      category_id: categoryId,
    };

    const response = await api.addSubCategory(data);

    if (response?.data?.status) {
      toast.success("Subcategory Added Successfully");
    }
  };

  // EDIT SubCategory
  const handleEditSubCategory = async () => {
    const api = new Listing();
    const data = {
      name,
      category_id: categoryId,
    };

    const response = await api.updateSubCategory(member?._id, data);

    if (response?.data?.status) {
      toast.success("Subcategory Updated Successfully");
    }
  };

  // Final submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (member?.name) {
        await handleEditSubCategory();
      } else {
        await handleAddSubCategory();
      }

      fecthSalesList();
      onClose();

    } catch (error) {
      console.error("Error submitting subcategory:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex justify-center items-center p-4 z-50 transition-all">
      <div className="bg-white w-full max-w-[480px] rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
        
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 cursor-pointer text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
        >
          <FiX className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight font-[Poppins]">
            {member ? "Edit Subcategory Details" : "Add New Subcategory"}
          </h2>
          <p className="text-sm text-gray-500 mt-1 font-[Poppins]">
            Please fill in the subcategory details below
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 font-[Poppins]">
              Select Category <span className="text-rose-500">*</span>
            </label>
            <select
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all text-slate-800 text-sm font-[Poppins] capitalize bg-white"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories && categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 font-[Poppins]">
              Subcategory Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              placeholder="Enter subcategory name"
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400 text-slate-800 text-sm font-[Poppins]"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2.5 border border-slate-200 text-gray-700 rounded-xl font-semibold hover:bg-slate-50 transition text-sm cursor-pointer font-[Poppins]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-1/2 py-2.5 bg-blue-800 text-white rounded-xl font-medium hover:bg-blue-900 transition disabled:bg-slate-200 disabled:text-slate-400 text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow font-[Poppins]"
            >
              {loading ? (
                <>
                  <CgSpinner className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>{member ? "Update Details" : "Add Subcategory"}</span>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
);
}
