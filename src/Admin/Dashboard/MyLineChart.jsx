import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];

const MyLineChart = () => {
  return (
    <div className=" bg-[#ffffff]  rounded-[20px] mb-[30px]">
      <div className="py-3 lg:py-[18px] px-4 md:px-6 lg:px-[30px] flex flex-wrap justify-between items-center border-b border-black border-opacity-10">
        <h3 className="text-base lg:text-lg font-semibold text-[#1E1E1E] m-0">
          Revenue Trend
        </h3>
       
      </div>
      <div className="py-3 lg:py-[18px] px-4 md:px-6 lg:px-[30px]">
        <div className="w-full h-[400px]"> {/* you can adjust height */}
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MyLineChart;
