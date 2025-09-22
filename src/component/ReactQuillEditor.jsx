import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';


const ReactQuillEditor = ({ desc, handleBioChange }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2,3,4,5,6 , false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false, // Allows Shift+Enter to work properly
    },
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
    "indent",
    "link",
    "image",
  ];

  return (
    <div className="mt-2 mb-5">
      <label className="form-label">Description</label>
      <ReactQuill
        value={desc}
        onChange={handleBioChange}
        className="rich-text-editor"
        required
        modules={modules}
        formats={formats}
      />

    </div>
  );
};

export default ReactQuillEditor;