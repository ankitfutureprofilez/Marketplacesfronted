import React from "react";
import { MdSignalCellularNodata } from "react-icons/md";

const NoDataPage = ({ message = "No data available" }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4 text-gray-500">
      <MdSignalCellularNodata className="w-12 h-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-semibold">{message}</h3>
      <p className="text-sm text-gray-400 mt-2">
        Try adjusting your filters or check back later.
      </p>
    </div>
  );
};

export default NoDataPage;
