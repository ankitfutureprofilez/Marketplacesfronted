import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const ReactQuillEditor = ({ label, desc, handleBioChange }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <div className="mb-6">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5 font-[Poppins]">
          {label}
        </label>
      )}

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <ReactQuill
          value={desc}
          onChange={handleBioChange}
          modules={modules}
          formats={formats}
          theme="snow"
        />
      </div>
    </div>
  );
};

export default ReactQuillEditor;