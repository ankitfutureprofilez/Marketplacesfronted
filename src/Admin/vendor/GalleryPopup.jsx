import React, { useState } from "react";
import Popup from "../../common/Popup";
import Listing from "../../Apis/Listing";
import toast from "react-hot-toast";

export default function GalleryPopup({ data = [], id }) {
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [images, setImages] = useState(data);
  const [selected, setSelected] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const handleClose = () => {
    setShowPopup(false);
    setSelected([]);
    setNewImages([]);
  };

  const toggleSelect = (img) => {
    setSelected((prev) =>
      prev.includes(img)
        ? prev.filter((i) => i !== img)
        : [...prev, img]
    );
  };

  const deleteSelected = () => {
    setImages((prev) => prev.filter((img) => !selected.includes(img)));
    setSelected([]);

  };

  const handleUploadChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);
  };

  const uploadImages = async() => {
    console.log("Uploading files:", newImages);
    setLoading(true);
    const main = new Listing();
    const formData = new FormData();
    newImages.forEach((file) => {
    formData.append("files", file);
    });
    try {
      const res = await main.VendorGalleryAdd(id, formData);
      if (res?.data?.status) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      console.log("Login error:", error);
    } finally {
      setLoading(false);
      setNewImages([]);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => setShowPopup(true)}
        >
          Edit Images
        </button>
      </div>

      {showPopup && (
        <Popup isOpen={showPopup} onClose={handleClose} size="max-w-[900px]">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Edit Gallery</h2>
            </div>

            {/* Existing Images */}
            <div>
              <h3 className="font-medium mb-3">Existing Images</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images && images?.map((img) => (
                  <div
                    key={img}
                    onClick={() => toggleSelect(img)}
                    className="relative border rounded-lg overflow-hidden cursor-pointer"
                  >
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={selected.includes(img)}
                      className="absolute top-2 left-2 z-10 w-4 h-4"
                    />

                    <img
                      src={img}
                      alt=""
                      className="h-32 w-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {selected && selected?.length > 0 && (
                <button
                  onClick={deleteSelected}
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete Selected ({selected.length})
                </button>
              )}
            </div>

            {/* Upload New Images */}
            <div>
              <h3 className="font-medium mb-2">Upload New Images</h3>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleUploadChange}
              />

              {newImages && newImages?.length > 0 && (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {newImages && newImages?.map((file, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt=""
                        className="h-32 w-full object-cover rounded border"
                      />
                    ))}
                  </div>

                  <button
                    onClick={uploadImages}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Upload Images ({newImages?.length})
                  </button>
                </>
              )}
            </div>
          </div>
        </Popup>
      )}
    </>
  );
}
