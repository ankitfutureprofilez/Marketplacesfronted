import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactQuillEditor from "./ReactQuillEditor";
import Listing from "../../Apis/Listing";

export default function Terms() {
  const [processing, setProcessing] = useState(false);

  const [data, setData] = useState({
    term_condition: "",
  });

  const handleQuillChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const HomeLists = async () => {
    try {
      setProcessing(true);
      const main = new Listing();
      const response = await main.getHome();
      const res = response?.data?.data;
      // console.log("res", res);
      setData({
        term_condition: res.term_condition || "",
      });
    } catch (error) {
      console.log("error", error);
      setData([]);
    }
    setProcessing(false);
  };

  useEffect(() => {
    HomeLists();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (processing) return;

    setProcessing(true);
    try {
      const main = new Listing();
      const response = await main.updateHome({
        term_condition: data.term_condition,
      });
      if (response) {
        HomeLists();
        toast.success("Terms & Conditions successfully updated");
      }
    } catch (error) {
      const status = error?.response?.status;
      const message = error?.response?.data?.message || "Something went wrong.";
      toast.error(
        {
          401: "Unauthorized",
          403: "Access denied.",
          404: message,
          500: "Server error. Please try again later.",
        }[status] || message
      );
    }
    setProcessing(false);
  };

  return (
    <div className="mx-auto pt-2">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Terms & Conditions */}

        <ReactQuillEditor
          label={"Terms & Conditions"}
          handleBioChange={(val) => handleQuillChange("term_condition", val)}
          desc={data.term_condition}
        />

        {/* Submit Button */}
        <div className="text-center md:text-left">
          <button
            disabled={processing}
            type="submit"
            className="w-full max-w-[180px] py-2.5 bg-blue-800 text-white rounded-xl font-medium hover:bg-blue-900 transition disabled:bg-slate-200 disabled:text-slate-400 text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow font-[Poppins]"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
