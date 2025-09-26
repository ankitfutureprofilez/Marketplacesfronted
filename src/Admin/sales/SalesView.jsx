import { useEffect, useState } from "react";
import Listing from "../../Apis/Listing";
import HeaderAdmin from "../../common/HeaderAdmin";
import LoadingSpinner from "../../common/LoadingSpinner";
import Nodata from "../../common/Nodata";
import AuthLayout from "../../component/AuthLayout";
import AddSales from "./AddSales";

function SalesView() {
    // const [Job, setJob] = useState([]);

    const Job = [
        { id: 1, profilePic: 'https://placehold.co/40x40/E5E7EB/4B5563?text=RV', salesName: 'Rahul Verma', email: 'Rahulsharma@gmail.com', phone: '9876543210', merchantsAdded: 12, sales: 'Select Sales', status: 'Active' },
        { id: 2, profilePic: 'https://placehold.co/40x40/E5E7EB/4B5563?text=NS', salesName: 'Neha Sharma', email: 'Rahulsharma@gmail.com', phone: '9876543210', merchantsAdded: 16, sales: 'Select Sales', status: 'Inactive' },
        { id: 3, profilePic: 'https://placehold.co/40x40/E5E7EB/4B5563?text=NS', salesName: 'Neha Sharma', email: 'Rahulsharma@gmail.com', phone: '9876543210', merchantsAdded: 36, sales: 'Select Sales', status: 'Inactive' },
        { id: 4, profilePic: 'https://placehold.co/40x40/E5E7EB/4B5563?text=NS', salesName: 'Neha Sharma', email: 'Rahulsharma@gmail.com', phone: '9876543210', merchantsAdded: 12, sales: 'Select Sales', status: 'Active' },
        { id: 5, profilePic: 'https://placehold.co/40x40/E5E7EB/4B5563?text=NS', salesName: 'Neha Sharma', email: 'Rahulsharma@gmail.com', phone: '9876543210', merchantsAdded: 36, sales: 'Select Sales', status: 'Active' },
        { id: 6, profilePic: 'https://placehold.co/40x40/E5E7EB/4B5563?text=NS', salesName: 'Neha Sharma', email: 'Rahulsharma@gmail.com', phone: '9876543210', merchantsAdded: 36, sales: 'Select Sales', status: 'Inactive' },
        { id: 7, profilePic: 'https://placehold.co/40x40/E5E7EB/4B5563?text=NS', salesName: 'Neha Sharma', email: 'Rahulsharma@gmail.com', phone: '9876543210', merchantsAdded: 16, sales: 'Select Sales', status: 'Active' },
        { id: 8, profilePic: 'https://placehold.co/40x40/E5E7EB/4B5563?text=NS', salesName: 'Neha Sharma', email: 'Rahulsharma@gmail.com', phone: '9876543210', merchantsAdded: 12, sales: 'Select Sales', status: 'Inactive' },
    ];

    const [loading, setLoading] = useState(false);


    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');

    const getStatusClasses = (status) => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-700';
            case 'Inactive':
                return 'bg-gray-200 text-gray-700';
            default:
                return '';
        }
    };

    // const fecthJobList = async () => {
    //     try {
    //         setLoading(true);
    //         const main = new Listing();
    //         const response = await main.CareeruserList();
    //         console.log("response", response);
    //         setJob(response?.data?.data?.contactget || []);
    //     } catch (error) {
    //         console.error("Error fetching team list:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    // useEffect(() => {
    //     fecthJobList();
    // }, []);

    return (
        <AuthLayout>
            <div className="w-full ">
                <HeaderAdmin title={"Sales Team"} />
                <div className="px-4 py-2 lg:px-10 lg:py-2.5">
                    <div className="bg-white rounded-[20px] mb-[30px] p-6">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
                            <h1 className="text-2xl font-semibold text-gray-800">Sales Team Listing</h1>
                            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
                                <div className="relative w-full md:w-auto">
                                    <input
                                        type="text"
                                        placeholder="Search by name..."
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
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                               <AddSales/>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            {loading ? (
                                <LoadingSpinner />
                            ) : Job.length === 0 ? (
                                <Nodata />
                            ) : (
                                <table className="min-w-full ">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider">SALES NAME</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider">EMAIL</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider">PHONE</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider">MERCHANTS ADDED</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider">STATUS</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {Job.map((member) => (
                                            <tr key={member.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <div className="flex items-center space-x-3">
                                                        <img className="h-10 w-10 rounded-full" src={member.profilePic} alt="" />
                                                        <span>{member.salesName}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#46494D]">{member.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#46494D]">{member.phone}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#46494D]">{member.merchantsAdded}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(member.status)}`}>
                                                        {member.status}
                                                    </span>
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

export default SalesView;
