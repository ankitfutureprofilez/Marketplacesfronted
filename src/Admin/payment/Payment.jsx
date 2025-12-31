import { useEffect, useState } from "react";
import AuthLayout from "../../component/AuthLayout";
import Listing from "../../Apis/Listing";
import HeaderAdmin from "../../common/HeaderAdmin";
import Nodata from "../../common/Nodata";
import LoadingSpinner from "../../common/LoadingSpinner";

function Payment() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchTeamList = async () => {
        setLoading(true)
        try {
            const main = new Listing();
            const response = await main.PaymentGet();
            console.log("response", response)
            setPayments(response?.data?.data || []);
            setLoading(false)

        } catch (error) {
            console.error("Error fetching team list:", error);
            setLoading(false)

        }
    };

    useEffect(() => {

        fetchTeamList();
    }, []);

    // console.log("teams", payments)
    return (
        <AuthLayout>
            <div className="w-full ">
                <HeaderAdmin title={"Payment "} />
                <div className="px-4 py-2 lg:px-4 lg:py-2.5">
                 <div className="bg-white rounded-[20px] mb-[10px] p-2">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
                            <h1 className="text-2xl font-semibold text-gray-800">Payment Listing</h1>
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
                            ) : payments.length === 0 ? (
                                <Nodata />
                            ) : (
                                <table className="min-w-full ">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider"> Payment Id</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider">Order_id</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider">payment_date</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider"> amount</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider"> currency</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#8C9199] uppercase tracking-wider"> Status</th>


                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {payments.map((member) => (
                                            <tr key={member.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {member.payment_id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#46494D]">{member.order_id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#46494D]">{member.payment_date}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#46494D]">{member.amount}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#46494D]">{member.currency}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#46494D]">{member.payment_status}</td>

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

export default Payment;
