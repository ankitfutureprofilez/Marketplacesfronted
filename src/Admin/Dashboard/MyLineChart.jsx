import React, { useState } from "react";
import moment from "moment";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MyLineChart = ({ data, startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <div className="bg-[#ffffff] rounded-[20px] mb-[30px]">
      <div className="py-3 lg:py-[18px] px-4 md:px-6 lg:px-[30px] flex flex-wrap justify-between items-center border-b border-black border-opacity-10">
        <h3 className="text-base lg:text-lg font-semibold text-[#1E1E1E] m-0">
          Offers Sold
        </h3>
        <div className="flex gap-2 items-center mt-2 lg:mt-0">
          <label>
            Start Date:
            <input
              type="date"
              className="ml-1 border rounded p-1"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              className="ml-1 border rounded p-1"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
        </div>
      </div>

      {/* Chart */}
      <div className="py-3 lg:py-[18px] px-4 md:px-6 lg:px-[30px]">
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => value.slice(5)} // shows only MM-DD
              />
              <YAxis />
              <Tooltip
                labelFormatter={(value) =>
                  `Date: ${moment(value).format("DD MMM YYYY")}` // e.g., 15 Dec 2025
                }
                formatter={(value) => [`${value}`, "Offers Sold"]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="offers_sold"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MyLineChart;