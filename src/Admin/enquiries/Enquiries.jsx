import { useEffect, useRef, useState } from "react"
import HeaderAdmin from "../../common/HeaderAdmin";
import LoadingSpinner from "../../common/LoadingSpinner";
import Nodata from "../../common/Nodata";
import Listing from "../../Apis/Listing";
import { AiOutlineSync } from "react-icons/ai";

function Enquiries() {
    const [loading, setLoading] = useState(false);
    const [enquiries, setEnquiries] = useState([]);
    const [searchQuery, setSearchQuery] = useState("")
    const timeRef = useRef(null);

    const fetchEnquiries = async (search = "") => {
        try {
            setLoading(true);
            const main = new Listing();
            const response = await main.getEnquiries(search)
            if (response?.data?.status) {
                setEnquiries(response?.data?.data || []);
            }else{
                setEnquiries([]);
            }
        } catch (error) {
            console.log("Error fetching enquries", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchEnquiries()
    }, []);

    const handleSearchChange = (e) => {
        const val = e.target.value;
        setSearchQuery(val);

        if (timeRef.current) clearTimeout(timeRef.current)

        timeRef.current = setTimeout(() => {
            fetchEnquiries(val || "")
        }, 600);
    };

    return (
        <div className=" w-full">
            <HeaderAdmin title={"Enquries"} />
            <div className="py-2 md:py-2.5">
                <div className="bg-white rounded-[20px] mb-[10px] p-2">
                    {/* Header */}
                    <div className="px-4 py-4 flex flex-wrap justify-between items-center border-b border-black  border-opacity-10">
                        <h2 className=" text-[16px] lg:text-[18px] font-bold font-[Poppins] font-[400] text-[#1E1E1E] m-0 tracking-[-0.03em]">
                            {" "}
                            Enquiries Listing
                        </h2>
                        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
                            {/* Search */}
                            <div className="relative w-full md:w-auto">
                                <input
                                    type="text"
                                    placeholder="Search by name and email"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-auto">
                        {loading ? (
                            <LoadingSpinner />
                        ) : enquiries && enquiries?.length === 0 ? (
                            <Nodata />
                        ) : (
                            <table className="w-full table-auto whitespace-nowrap">
                                <thead className="mb-[15px] border-b border-[#000000] border-opacity-10">
                                    <tr>
                                        <th className=" font-[Poppins] text-[14px] text-[#8C9199] font-[600] uppercase text-left p-[10px] mb-[10px]">
                                            S. No.
                                        </th>
                                        <th className=" font-[Poppins] text-[14px] text-[#8C9199] font-[600] uppercase text-left p-[10px] mb-[10px]">
                                            NAME
                                        </th>
                                        <th className=" font-[Poppins] text-[14px] text-[#8C9199] font-[600] uppercase text-left p-[10px] mb-[10px]">
                                            EMAIL
                                        </th>
                                        <th className=" font-[Poppins] text-[14px] text-[#8C9199] font-[600] uppercase text-left p-[10px] mb-[10px]">
                                            ROLE
                                        </th>
                                        <th className=" font-[Poppins] text-[14px] text-[#8C9199] font-[600] uppercase text-left p-[10px] mb-[10px]">
                                            PHONE
                                        </th>
                                        <th className=" font-[Poppins] text-[14px] text-[#8C9199] font-[600] uppercase text-left p-[10px] mb-[10px]">
                                            Message
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-200">
                                    {enquiries &&
                                        enquiries?.map((data, index) => {
                                            return (
                                                <tr
                                                    key={data._id}
                                                >
                                                    <td className="font-[Poppins]  text-black text-[16px] text-left px-[10px] py-[16px]  ">
                                                        {index + 1}
                                                    </td>

                                                    <td className="font-[Poppins]  text-black text-[16px] text-left px-[10px] py-[16px] capitalize">
                                                        {data?.firstName} {" "} {data?.lastName}
                                                    </td>

                                                    <td className="font-[Poppins]  text-black text-[16px] text-left px-[10px] py-[16px]  ">
                                                        {data?.email || "--"}
                                                    </td>
                                                    <td className="font-[Poppins]  text-black text-[16px] text-left px-[10px] py-[16px]  ">
                                                        {data?.role || "--"}
                                                    </td>
                                                    <td className="font-[Poppins]  text-black text-[16px] text-left px-[10px] py-[16px]  ">
                                                        {data?.phone || "--"}
                                                    </td>
                                                    <td className="font-[Poppins]  text-black text-[16px] text-left px-[10px] py-[16px]  ">
                                                        {data?.message || "--"}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Enquiries