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
            {member ? "Edit Category Details" : "Add New Category"}
          </h2>
          <p className="text-sm text-gray-500 mt-1 font-[Poppins]">
            Please fill in the category details below
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Profile Image Uploader */}
          <div className="flex flex-col items-center mb-2">
            <label className="relative cursor-pointer group">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-100 ring-4 ring-slate-50 shadow-sm relative transition group-hover:opacity-90 bg-white">
                <img
                  src={preview || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyCbJoUCRscGfzySEtqoR5HtHnEOE0ux4r-A&s"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="text-[10px] text-white font-semibold uppercase tracking-wider">Change</span>
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <p className="text-[11px] text-slate-400 mt-2 font-[Poppins]">
              Upload category image
            </p>

            {preview && (
              <button
                type="button"
                onClick={() => {
                  setPreview("");
                  setImageFile(null);
                }}
                className="text-rose-500 text-xs mt-1 hover:underline font-semibold font-[Poppins]"
              >
                Remove Image
              </button>
            )}
          </div>

          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 font-[Poppins]">
              Category Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              placeholder="e.g. Food & Beverages"
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
                <span>{member ? "Update Category" : "Add Category"}</span>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}