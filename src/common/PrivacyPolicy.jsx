import React, { useEffect, useState } from "react";
import Listing from "../Apis/Listing";

export default function PrivacyPolicy() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const main = new Listing();
      const response = await main.getHome();
      if (response.data) {
        setData(response.data.data);
      } else {
        setData([]);
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="pt-10 bg-gray-50">
      {/* Page Header */}
      <div className="max-w-[1100px] mx-auto px-4 mb-10">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
          Terms & Conditions
        </h1>
        <p className="mt-2 text-gray-600 max-w-[700px]">
          Please read these terms carefully before using our platform.
        </p>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-[1100px] px-4">
        <div className="policy-page break-words">
          <div dangerouslySetInnerHTML={{ __html: data?.privacy_policy }} />
        </div>
      </div>
    </div>
  );
}
