import React, { useState, useEffect } from "react";
import Listing from "../../Apis/Listing";
import toast from "react-hot-toast";

export default function AddCategory({ isOpen, onClose, member, isEdit, fecthSalesList }) {
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
      onClose();

    } catch (error) {
      console.error("Error submitting category:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">

        <h2 className="text-xl font-bold mb-4">
          {member ? "Edit Category" : "Add Category"}
        </h2>

        {/* Category Name */}
        <label className="block mb-2 text-sm font-medium">Category Name</label>
        <input
          type="text"
          value={name}
          placeholder="Enter category name"
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded-md mb-4"
        />

        {/* Image Upload */}
        <label className="block mb-2 text-sm font-medium">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border px-3 py-2 rounded-md mb-4"
        />

        {/* Image Preview */}
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-24 h-24 rounded-md object-cover mb-4"
          />
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          <button className="px-4 py-2 bg-gray-300 rounded-lg" onClick={onClose}>
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : member ? "Update" : "Add"}
          </button>
        </div>

      </div>
    </div>
  );
}
