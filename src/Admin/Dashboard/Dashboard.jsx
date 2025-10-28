import { IoMdEye } from "react-icons/io";
import HeaderAdmin from "../../common/HeaderAdmin";
import AuthLayout from "../../component/AuthLayout";
import { useState } from "react";
import LoadingSpinner from "../../common/LoadingSpinner";
import Nodata from "../../common/Nodata";
import MyLineChart from "./MyLineChart";

function Dashboard() {

    const team = [
        { id: 1, businessName: 'Glamour Salon', ownerName: 'Rahul Verma', mobile: '9876543210', category: 'Salon', city: 'Jaipur', sales: 'Select Sales', status: 'Pending' },
        { id: 2, businessName: 'Glamour Salon', ownerName: 'Neha Sharma', mobile: '9876543210', category: 'Salon', city: 'Jaipur', sales: 'Select Sales', status: 'Approved' },
        { id: 3, businessName: 'Glamour Salon', ownerName: 'Neha Sharma', mobile: '9876543210', category: 'Salon', city: 'Jaipur', sales: 'Select Sales', status: 'Approved' },
    ];
    const [loading, setLoading] = useState(false);


    const getStatusClasses = (status) => {
        switch (status) {
            case 'Approved':
                return 'bg-green-100 text-green-700';
            case 'Pending':
                return 'bg-yellow-100 text-yellow-700';
            case 'Rejected':
                return 'bg-red-100 text-red-700';
            default:
                return '';
        }
    }
    return (

        <AuthLayout>
            <div className="w-full ">
                <HeaderAdmin title={"Admin Dashboard"} />
                <div className="px-4 py-2 lg:px-10 lg:py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                        <div className="bg-white rounded-xl p-6 shadow-lg flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-[#8C9199]">TOTAL MERCHANTS</h3>
                                <p className="text-4xl font-bold mt-1">540</p>
                                <p className="text-xs mt-2 text-[#06A77D]">+5% <span className="text-[#8C9199] "> From Last month</span> </p>
                            </div>
                            <div className="bg-blue-600 p-3 rounded-full">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            </div>
                        </div>


                        <div className="bg-white rounded-xl p-6 shadow-lg flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-[#8C9199]">TOTAL COUPONS CREATED</h3>
                                <p className="text-4xl font-bold mt-1">1,200</p>
                                <p className="text-xs mt-2 text-[#06A77D]">+5% <span className="text-[#8C9199] "> From Last month</span> </p>
                            </div>
                            <div className="bg-blue-600 p-3 rounded-full">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292m0 0a4 4 0 100 5.292m0-5.292a4 4 0 110-5.292M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg flex items-center justify-between">

                            <div>
                                <h3 className="text-sm font-medium text-[#8C9199]">COUPONS REDEEMED</h3>
                                <p className="text-4xl font-bold mt-1">4,320</p>
                                <p className="text-xs mt-2 text-[#06A77D]">+5% <span className="text-[#8C9199] "> From Last month</span> </p>
                            </div>
                            <div className="bg-blue-600 p-3 rounded-full">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292m0 0a4 4 0 100 5.292m0-5.292a4 4 0 110-5.292M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            </div>

                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium text-[#8C9199]">TOTAL SALES MAN</h3>
                                <p className="text-4xl font-bold mt-1">95</p>
                                <p className="text-xs mt-2 text-[#06A77D]">+5% <span className="text-[#8C9199] "> From Last month</span> </p>

                            </div>
                            <div className="bg-blue-600 p-3 rounded-full">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292m0 0a4 4 0 100 5.292m0-5.292a4 4 0 110-5.292M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            </div>
                        </div>

                    </div>
                    <div>
                        <MyLineChart />
                    </div>
                    <div className="bg-white rounded-[20px] mb-[30px] p-6">
                        <div className="overflow-x-auto">
                            {loading ? (
                                <LoadingSpinner />
                            ) : team.length === 0 ? (
                                <Nodata />
                            ) : (
                                <table className="min-w-full ">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider">BUSINESS NAME</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider">OWNER NAME</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider">MOBILE</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider">CATEGORY</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider">CITY</th>
                                            {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider">SALES</th> */}
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider">STATUS</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider">ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {team?.map((vendor) => (
                                            <tr key={vendor.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{vendor.businessName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#46494D]">{vendor.ownerName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#46494D]">{vendor.mobile}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#46494D]">{vendor.category}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#46494D]">{vendor.city}</td>
                                                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-[#46494D]">
                                                    <select className="py-1 px-2 border border-gray-300 rounded-lg bg-white text-[#46494D] text-sm focus:outline-none">
                                                        <option>Select Sales</option>
                                                        <option>100</option>
                                                        <option>200</option>
                                                    </select>
                                                </td> */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(vendor.status)}`}>
                                                        {vendor.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm ">
                                                    <IoMdEye size={24} className="text-blue-600 hover:text-blue-900 focus:outline-none" />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}

export default Dashboard;
