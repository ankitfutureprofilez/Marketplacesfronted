import { useEffect, useState } from "react";
import Listing from "../../Apis/Listing";
import LoadingSpinner from "../../common/LoadingSpinner";
import Nodata from "../../common/Nodata";
import SideBarAdmin from "../../common/SideBarAdmin";
import HeaderAdmin from "../../common/HeaderAdmin";
import AuthLayout from "../../component/AuthLayout";
// import AddTeam from "./AddTeam"

function List() {
    const [team, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTeamList = async () => {
        try {
            setLoading(true);
            const main = new Listing();
            const response = await main.teamlist();
            console.log("response", response);
            setTeams(response?.data?.data || []);
        } catch (error) {
            console.error("Error fetching team list:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeamList();
    }, []);

    console.log("team", team)
    return (
    <AuthLayout>
            <div className="w-full ">
                <HeaderAdmin title={"Vendor Listing"} />
                <div className="px-4 py-2 lg:px-10 lg:py-2.5">
                    <div className="bg-white rounded-[20px] mb-[30px]">
                        <div className="py-4 px-4 md:px-6 lg:px-10 flex justify-between items-center border-b border-black border-opacity-10">
                            <h3 className="text-base lg:text-lg font-semibold text-[#1E1E1E] tracking-[-0.03em]">
                                Vendor List
                            </h3>
                        </div>

                        <div className="overflow-x-auto">
                            {loading ? (
                                <LoadingSpinner />
                            ) : team.length === 0 ? (
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
                                        {team && team.map((item, index) => (
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
        </AuthLayout>
    );
}

export default List;