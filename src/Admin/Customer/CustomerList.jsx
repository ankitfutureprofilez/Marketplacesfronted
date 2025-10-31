import { useEffect, useRef, useState } from "react";
import AuthLayout from "../../component/AuthLayout";
import Listing from "../../Apis/Listing";
import HeaderAdmin from "../../common/HeaderAdmin";
import Nodata from "../../common/Nodata";
import LoadingSpinner from "../../common/LoadingSpinner";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

function CustomerList() {
    const [team, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const timerRef = useRef(null);

    const handleSearchChange = (e) => {
        const val = e.target.value;
        setSearchQuery(val);

        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            fetchCustomerList(val);
        }, 600);
    };

    const fetchCustomerList = async (search = "") => {
        setLoading(true)
        try {
            const main = new Listing();
            const response = await main.customer(search);
            console.log("response", response)
            setTeams(response?.data?.data || []);
            setLoading(false)

        } catch (error) {
            console.error("Error fetching team list:", error);
            setLoading(false)

        }
    };
    useEffect(() => {

        fetchCustomerList();
    }, []);
    console.log("teams", team)


    const handleDeletestatus = async (id) => {
        try {
            const main = new Listing();
            const response = await main.AdminDeleteSales(id);
            if (response) {
                toast.success("person deleted successfully");
                await fetchCustomerList();
            }
        } catch (error) {
            console.error("Error deleting person:", error);
            toast.error("Delete failed!");
        }
    };

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
                                        placeholder="Search by name and email"
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
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
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider"> NAME</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider">EMAIL</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider">PHONE</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider">Total coupons</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">

                                        {team && team?.map((member, index) => {
                                            const isDeleted = !!member.deleted_at;
                                            return (
                                                <tr key={index}
                                                    className={`${isDeleted ? "bg-gray-200 opacity-60 pointer-events-none" : "bg-white"}`}

                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        <div className="flex items-center space-x-3">
                                                            {/* <img className="h-10 w-10 rounded-full" src={member.profilePic} alt="" /> */}
                                                            <span>{member.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#46494D]">{member.email}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#46494D]">{member.phone}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#46494D]">{member.merchantsAdded}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#46494D]">
                                                        <button
                                                            onClick={() => handleDeletestatus(member._id)}
                                                            className="bg-red-600 text-white px-3 py-2 rounded-lg flex items-center hover:bg-red-700 transition duration-150"
                                                        >
                                                            <MdDelete size={20} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
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
