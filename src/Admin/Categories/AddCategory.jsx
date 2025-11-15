import { useEffect, useState } from "react";
import defaultimage from "../../img/userdefault.webp";
import Listing from "../../Apis/Listing";
import toast from "react-hot-toast";
import Popup from "../../common/Popup";

const AddCategory = ({
  isOpen,
  onClose,
  member,
  fetchList,
  isEdit = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(defaultimage);

  const [formData, setFormData] = useState({
    name: "",
    image: null,
  });

  // Prefill edit mode
  useEffect(() => {
    if (member) {
      setFormData({
        name: member?.name || "",
        image: member?.image || null,
      });
      setPreviewImage(member?.image || defaultimage);
    }
  }, [member]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // ADD
  const handleAdd = async () => {
    const main = new Listing();
    const data = new FormData();
    data.append("name", formData.name);
    if (formData.image && formData.image instanceof File) {
      data.append("image", formData.image);
    }

    const response = await main.CategoryAdd(data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response?.data?.message) toast.success(response.data.message);
  };

  // EDIT
  const handleEdit = async () => {
    const main = new Listing();
    const data = new FormData();
    data.append("name", formData.name);
    if (formData.image && formData.image instanceof File) {
      data.append("image", formData.image);
    }

    const response = await main.CategoryEdit(member?._id, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response?.data?.message) toast.success(response.data.message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit) await handleEdit();
      else await handleAdd();

      onClose();
      fetchList();
      setPreviewImage(defaultimage);
      setFormData({ name: "", image: null });
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose} size={"max-w-[400px]"}>
      <h2 className="text-xl font-semibold text-gray-800 text-center mb-1">
        {isEdit ? "Edit Category" : "Add Category"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5 mt-4">
        {/* Image */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border shadow">
            <img src={previewImage} className="w-full h-full object-cover" />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 text-sm"
          />
          {previewImage !== defaultimage && (
            <button
              type="button"
              onClick={() => {
                setPreviewImage(defaultimage);
                setFormData((prev) => ({ ...prev, image: null }));
              }}
              className="text-red-500 text-sm mt-1 hover:underline"
            >
              Remove
            </button>
          )}
        </div>

        {/* Name */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Name
          </label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter category name"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="w-fit py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Saving..." : isEdit ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </Popup>
  );
};

export default AddCategory;
