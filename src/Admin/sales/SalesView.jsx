import { useEffect, useState } from "react";
import Listing from "../../Apis/Listing";
import SideBarAdmin from "../../common/SideBarAdmin";
import HeaderAdmin from "../../common/HeaderAdmin";
import LoadingSpinner from "../../common/LoadingSpinner";
import Nodata from "../../common/Nodata";

function SalesView() {
    const [Job, setJob] = useState([]);

    const [loading, setLoading] = useState(true);

    const fecthJobList = async () => {
        try {
            setLoading(true);
            const main = new Listing();
            const response = await main.CareeruserList();
            console.log("response", response);
            setJob(response?.data?.data?.contactget || []);
        } catch (error) {
            console.error("Error fetching team list:", error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {

        fecthJobList();
    }, []);

    return (
        <div className="md:flex flex-wrap bg-[#F5F6FB]">
            <SideBarAdmin />
            <div className="w-full lg:w-[calc(100%-304px)]">
                <HeaderAdmin title={"Sales Listing"} />

                <div className="px-4 py-2 lg:px-10 lg:py-2.5">
                    <div className="bg-white rounded-[20px] mb-[30px]">
                        <div className="py-4 px-4 md:px-6 lg:px-10 flex justify-between items-center border-b border-black border-opacity-10">
                            <h3 className="text-base lg:text-lg font-semibold text-[#1E1E1E] tracking-[-0.03em]">
                                Sales List
                            </h3>
                        </div>

                        <div className="overflow-x-auto">
                            {loading ? (
                                <LoadingSpinner />
                            ) : Job.length === 0 ? (
                                <Nodata />
                            ) : (
                                <table className="min-w-full">
                                    <thead>
                                        <tr>
                                            <th className="px-3 py-3 text-sm font-medium text-[#8D929A] text-left uppercase">#</th>
                                            <th className="px-3 py-3 text-sm font-medium text-[#8D929A] text-left uppercase">Name</th>
                                            <th className="px-3 py-3 text-sm font-medium text-[#8D929A] text-left uppercase">Email</th>
                                            <th className="px-3 py-3 text-sm font-medium text-[#8D929A] text-left uppercase">Phone</th>
                                            <th className="px-3 py-3 text-sm font-medium text-[#8D929A] text-left uppercase">Services</th>
                                            <th className="px-3 py-3 text-sm font-medium text-[#8D929A] text-left uppercase">Resume</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Job && Job.map((item, index) => (
                                            <tr
                                                key={item.id || index}
                                                className="bg-white border-t hover:bg-gray-100"
                                            >
                                                <td className="px-3 py-4 text-[15px] font-medium text-[#46494D]">
                                                    {index + 1}
                                                </td>
                                                <td className="px-3 py-4 text-[15px] font-medium text-[#46494D]">
                                                    {item.name}
                                                </td>

                                                <td className="px-3 py-4 text-[15px] font-medium text-[#46494D]">
                                                    {item.email}
                                                </td>  <td className="px-3 py-4 text-[15px] font-medium text-[#46494D]">
                                                    {item.phone_number}
                                                </td>  <td className="px-3 py-4 text-[15px] font-medium text-[#46494D]">
                                                    {item.position}
                                                </td>  <td className="px-3 py-4 text-[15px] font-medium text-[#46494D]">
                                                    {item.resume}
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
        </div>
    );
}

export default SalesView;
