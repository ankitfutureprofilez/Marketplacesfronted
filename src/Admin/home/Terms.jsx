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
    <div className=" mx-auto p-6 bg-white ">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Terms & Conditions */}

        <ReactQuillEditor
          label={"Terms & Conditions"}
          handleBioChange={(val) => handleQuillChange("term_condition", val)}
          desc={data.term_condition}
        />

        {/* Submit Button */}
        <div className="text-center">
          <button
            disabled={processing}
            type="submit"
            className="w-full max-w-[183px] bg-blue-600 hover:bg-blue-700 transition duration-150  text-white py-2.5 lg:py-3.5 cursor-pointer rounded-[10px] font-normal text-base xl:text-xl tracking-[-0.04em]"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
