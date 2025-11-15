import React, { useState, useEffect } from "react";
import Listing from "../../Apis/Listing";
import toast from "react-hot-toast";

export default function AddSubCategory({ isOpen, onClose, member, isEdit, fecthSalesList }) {

  console.log("member" ,member)
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  console.log("categoryId" ,categoryId)
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  // Fetch all categories for dropdown
  const fetchCategories = async () => {
    try {
      const api = new Listing();
      const response = await api.category();

      if (response?.data?.status) {
        setCategories(response.data.data);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Load data while editing
  useEffect(() => {
    if (member) {
      setName(member?.name || "");
      setCategoryId(member?.category_id?._id || "");
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
      if (member) {
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">

        <h2 className="text-xl font-bold mb-4">
          {member ? "Edit Subcategory" : "Add Subcategory"}
        </h2>

        {/* Category Dropdown */}
        <label className="block mb-2 text-sm font-medium">Select Category</label>
        <select
          className="w-full border px-3 py-2 rounded-md mb-4"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories && categories?.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Subcategory Name */}
        <label className="block mb-2 text-sm font-medium">Subcategory Name</label>
        <input
          type="text"
          value={name}
          placeholder="Enter subcategory name"
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded-md mb-4"
        />

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
