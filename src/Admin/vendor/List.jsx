import { useEffect, useState } from "react";
import Listing from "../../Apis/Listing";
import LoadingSpinner from "../../common/LoadingSpinner";
import Nodata from "../../common/Nodata";
import SideBarAdmin from "../../common/SideBarAdmin";
import HeaderAdmin from "../../common/HeaderAdmin";
import AuthLayout from "../../component/AuthLayout";
import { IoMdEye } from "react-icons/io";
import { Link } from "react-router-dom";
// import AddTeam from "./AddTeam"

function List() {
    // const [team, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [categoryFilter, setCategoryFilter] = useState('All Categories');

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
    };
    // const fetchTeamList = async () => {
    //     try {
    //         setLoading(true);
    //         const main = new Listing();
    //         const response = await main.teamlist();
    //         console.log("response", response);
    //         setTeams(response?.data?.data || []);
    //     } catch (error) {
    //         console.error("Error fetching team list:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchTeamList();
    // }, []);

    // console.log("team", team)

    const team = [
        { id: 1, businessName: 'Glamour Salon', ownerName: 'Rahul Verma', mobile: '9876543210', category: 'Salon', city: 'Jaipur', sales: 'Select Sales', status: 'Pending' },
        { id: 2, businessName: 'Glamour Salon', ownerName: 'Neha Sharma', mobile: '9876543210', category: 'Salon', city: 'Jaipur', sales: 'Select Sales', status: 'Approved' },
        { id: 3, businessName: 'Glamour Salon', ownerName: 'Neha Sharma', mobile: '9876543210', category: 'Salon', city: 'Jaipur', sales: 'Select Sales', status: 'Approved' },
        { id: 4, businessName: 'Glamour Salon', ownerName: 'Neha Sharma', mobile: '9876543210', category: 'Salon', city: 'Jaipur', sales: 'Select Sales', status: 'Rejected' },
        { id: 5, businessName: 'Glamour Salon', ownerName: 'Neha Sharma', mobile: '9876543210', category: 'Salon', city: 'Jaipur', sales: 'Select Sales', status: 'Rejected' },
        { id: 6, businessName: 'Glamour Salon', ownerName: 'Neha Sharma', mobile: '9876543210', category: 'Salon', city: 'Jaipur', sales: 'Select Sales', status: 'Approved' },
        { id: 7, businessName: 'Glamour Salon', ownerName: 'Neha Sharma', mobile: '9876543210', category: 'Salon', city: 'Jaipur', sales: 'Select Sales', status: 'Pending' },
        { id: 8, businessName: 'Glamour Salon', ownerName: 'Neha Sharma', mobile: '9876543210', category: 'Salon', city: 'Jaipur', sales: 'Select Sales', status: 'Approved' },
    ];


    return (
        <AuthLayout>
            <div className="w-full ">
                <HeaderAdmin title={"Vendor Listing"} />
                <div className="px-4 py-2 lg:px-10 lg:py-2.5">
                    <div className="bg-white rounded-[20px] mb-[30px] p-6">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
                            <h1 className="text-2xl font-semibold text-gray-800">Vendors Listing</h1>
                            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
                                <div className="relative w-full md:w-auto">
                                    <input
                                        type="text"
                                        placeholder="Search by owner name & business name"
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <select
                                    className="w-full md:w-40 py-2 px-3 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option>All Status</option>
                                    <option>Approved</option>
                                    <option>Pending</option>
                                    <option>Rejected</option>
                                </select>
                                <select
                                    className="w-full md:w-40 py-2 px-3 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                >
                                    <option>All Categories</option>
                                    <option>Salon</option>
                                    <option>Restaurant</option>
                                    <option>Retail</option>
                                </select>
                                <Link to="/vendor/add" className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                    <span>Add Vendor</span>
                                </Link>
                            </div>
                        </div>
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
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider">SALES</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider">STATUS</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider">ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {team.map((vendor) => (
                                            <tr key={vendor.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{vendor.businessName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#46494D]">{vendor.ownerName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#46494D]">{vendor.mobile}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#46494D]">{vendor.category}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#46494D]">{vendor.city}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#46494D]">
                                                    <select className="py-1 px-2 border border-gray-300 rounded-lg bg-white text-[#46494D] text-sm focus:outline-none">
                                                        <option>Select Sales</option>
                                                        <option>100</option>
                                                        <option>200</option>
                                                    </select>
                                                </td>
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

export default List;