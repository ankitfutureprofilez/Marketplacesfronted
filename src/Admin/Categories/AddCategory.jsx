import React, { useState, useEffect } from "react";
import Listing from "../../Apis/Listing";
import toast from "react-hot-toast";
import { FiUploadCloud, FiX, FiImage, FiCheck } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { CgSpinner } from "react-icons/cg";

export default function AddCategory({ isOpen, onClose, member, isEdit, fecthSalesList, fetchCategories }) {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // Load data when editing
  useEffect(() => {
    if (member) {
      setName(member?.name || "");
      setPreview(member?.image || "");
    }
  }, [member]);

  if (!isOpen) return null;

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // ADD Category API
  const handleAddCategory = async () => {
    const api = new Listing();
    const data = new FormData();

    data.append("name", name);

    if (imageFile instanceof File) {
      data.append("image", imageFile);
    }

    const response = await api.addCategory(data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response?.data?.status) {
      toast.success("Category Added Successfully");
    }
  };

  // EDIT Category API
  const handleEditCategory = async () => {
    const api = new Listing();
    const data = new FormData();

    data.append("name", name);

    if (imageFile instanceof File) {
      data.append("image", imageFile);
    }

    const response = await api.updateCategory(member?._id, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response?.data?.status) {
      toast.success("Category Updated Successfully");
    }
  };

  // MAIN submit button handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (member) {
        await handleEditCategory();
      } else {
        await handleAddCategory();
      }

      fecthSalesList();
      fetchCategories();
      onClose();

    } catch (error) {
      console.error("Error submitting category:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex justify-center items-center p-4 z-50 transition-all">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">

        {/* Modal Top Header with Icon & Close Action */}
        <div className="flex items-center justify-between pb-5 mb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg shrink-0">
              <BiCategory />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                {member ? "Edit Category" : "Add New Category"}
              </h2>
              <p className="text-xs text-slate-400">
                {member ? "Update category information" : "Create a new catalog category"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Category Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Category Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              placeholder="e.g. Food & Beverages"
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/90 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium"
              required
            />
          </div>

          {/* Image Upload Area */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Category Icon / Image
            </label>
            
            <div className="relative border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-4 bg-slate-50/50 hover:bg-blue-50/20 transition-all text-center group cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />

              <div className="flex flex-col items-center justify-center gap-1.5">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-blue-600 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <FiUploadCloud className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-700">
                  Click to upload category image
                </span>
                <span className="text-[11px] text-slate-400">
                  PNG, JPG, or SVG up to 2MB
                </span>
              </div>
            </div>
          </div>

          {/* Image Preview Card */}
          {preview && (
            <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200/80 rounded-2xl">
              <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                  <FiImage className="text-slate-400" />
                  <span className="truncate">{imageFile?.name || "Selected Image"}</span>
                </div>
                <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
                  <FiCheck className="w-3 h-3" /> Ready for upload
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-3">
            <button
              type="button"
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 active:scale-[0.99] text-slate-700 font-semibold text-xs sm:text-sm rounded-xl transition-all"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-blue-800 hover:bg-blue-900 active:scale-[0.99] text-white font-medium text-xs sm:text-sm rounded-xl shadow-md shadow-blue-600/20 transition-all disabled:opacity-50 flex items-center justify-center gap-1.5"
              disabled={loading}
            >
              {loading ? (
                <>
                  <CgSpinner className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>{member ? "Update Category" : "Add Category"}</span>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}