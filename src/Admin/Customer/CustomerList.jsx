import { useEffect, useState } from "react";
import AuthLayout from "../../component/AuthLayout";
import Listing from "../../Apis/Listing";
import HeaderAdmin from "../../common/HeaderAdmin";
import Nodata from "../../common/Nodata";
import LoadingSpinner from "../../common/LoadingSpinner";

function CustomerList() {
    // const [team, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');


    const team = [
        { id: 1, profilePic: 'https://placehold.co/40x40/E5E7EB/4B5563?text=RV', salesName: 'Rahul Verma', email: 'Rahulsharma@gmail.com', phone: '9876543210', merchantsAdded: 12, sales: 'Select Sales', status: 'Active' },
        { id: 2, profilePic: 'https://placehold.co/40x40/E5E7EB/4B5563?text=NS', salesName: 'Neha Sharma', email: 'Rahulsharma@gmail.com', phone: '9876543210', merchantsAdded: 16, sales: 'Select Sales', status: 'Inactive' },
        { id: 3, profilePic: 'https://placehold.co/40x40/E5E7EB/4B5563?text=NS', salesName: 'Neha Sharma', email: 'Rahulsharma@gmail.com', phone: '9876543210', merchantsAdded: 36, sales: 'Select Sales', status: 'Inactive' },
        { id: 4, profilePic: 'https://placehold.co/40x40/E5E7EB/4B5563?text=NS', salesName: 'Neha Sharma', email: 'Rahulsharma@gmail.com', phone: '9876543210', merchantsAdded: 12, sales: 'Select Sales', status: 'Active' },
        { id: 5, profilePic: 'https://placehold.co/40x40/E5E7EB/4B5563?text=NS', salesName: 'Neha Sharma', email: 'Rahulsharma@gmail.com', phone: '9876543210', merchantsAdded: 36, sales: 'Select Sales', status: 'Active' },
        { id: 6, profilePic: 'https://placehold.co/40x40/E5E7EB/4B5563?text=NS', salesName: 'Neha Sharma', email: 'Rahulsharma@gmail.com', phone: '9876543210', merchantsAdded: 36, sales: 'Select Sales', status: 'Inactive' },
        { id: 7, profilePic: 'https://placehold.co/40x40/E5E7EB/4B5563?text=NS', salesName: 'Neha Sharma', email: 'Rahulsharma@gmail.com', phone: '9876543210', merchantsAdded: 16, sales: 'Select Sales', status: 'Active' },
        { id: 8, profilePic: 'https://placehold.co/40x40/E5E7EB/4B5563?text=NS', salesName: 'Neha Sharma', email: 'Rahulsharma@gmail.com', phone: '9876543210', merchantsAdded: 12, sales: 'Select Sales', status: 'Inactive' },
    ];

    // const fetchTeamList = async () => {
    //     setLoading(true)
    //     try {
    //         const main = new Listing();
    //         const response = await main.teamlist();
    //         console.log("response", response)
    //         setTeams(response?.data?.data || []);
    //     setLoading(false)

    //     } catch (error) {
    //         console.error("Error fetching team list:", error);
    //     setLoading(false)

    //     }
    // };
    // useEffect(() => {

    //     fetchTeamList();
    // }, []);

    return (
        <AuthLayout>
            <div className="w-full ">
                <HeaderAdmin title={"Customer "} />
                <div className="px-4 py-2 lg:px-10 lg:py-2.5">
                    <div className="bg-white rounded-[20px] mb-[30px] p-6">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
                            <h1 className="text-2xl font-semibold text-gray-800">Customer Listing</h1>
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
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider">SALES NAME</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider">EMAIL</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider">PHONE</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider">Total coupons</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {team.map((member) => (
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

export default CustomerList;
