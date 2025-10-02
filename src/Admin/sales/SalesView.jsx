import { useEffect, useState } from "react";
import Listing from "../../Apis/Listing";
import HeaderAdmin from "../../common/HeaderAdmin";
import LoadingSpinner from "../../common/LoadingSpinner";
import Nodata from "../../common/Nodata";
import AuthLayout from "../../component/AuthLayout";
import AddSales from "./AddSales";

function SalesView() {
    const [Sales, setSales] = useState([]);



    const [loading, setLoading] = useState(false);


    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');

    const getStatusClasses = (status) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-700 uppercase';
            case 'inactive':
                return 'bg-red-200 text-gray-700 uppercase';
            default:
                return '';
        }
    };

    const fecthSalesList = async () => {
        try {
            setLoading(true);
            const main = new Listing();
            const response = await main.showsales();
            setSales(response?.data?.data?.userData || []);
        } catch (error) {
            console.error("Error fetching team list:", error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fecthSalesList();
    }, []);


    const handlestatus = async (id, status) => {
        const Statusdata = status === "active" ? "inactive" : "active"
        try {
            setLoading(true);
            const main = new Listing();
            const response = await main.StatusSales(id, Statusdata);
            if (response) {
                fecthSalesList();
            }
        } catch (error) {
            console.error("Error fetching team list:", error);
        } finally {
            setLoading(false);
        }
    };



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
                                <AddSales fecthSalesList={fecthSalesList} />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            {loading ? (
                                <LoadingSpinner />
                            ) : Sales.length === 0 ? (
                                <Nodata />
                            ) : (
                                <table className="min-w-full ">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider">S. No.</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider">SALES NAME</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider">EMAIL</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider">PHONE</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider">MERCHANTS ADDED</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider">STATUS</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {Sales.map((member, index) => (
                                            <tr key={member.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#46494D]">{index + 1}</td>

                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <div className="flex items-center space-x-3">
                                                        <img className="h-10 w-10 rounded-full" src={member.avatar} alt="" />
                                                        <span>{member.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#46494D]">{member.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#46494D]">{member.phone}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#46494D]">{member.merchantsAdded}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span
                                                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(member.status)} cursor-pointer`}
                                                        onClick={() => handlestatus(member._id, member.status)}
                                                    >
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
