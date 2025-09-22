import HeaderAdmin from "../../common/HeaderAdmin";
import SideBarAdmin from "../../common/SideBarAdmin";
import { useState } from "react";

function Dashboard() {

    const stats = [
        { title: "Users", count: 120,  },
        { title: "Team Members", count: 15,},
        { title: "Jobs", count: 42,},
        { title: "Job Ads", count: 18,  },
        { title: "Projects", count: 25,  },
        { title: "Blogs", count: 30, },
        { title: "Contacts", count: 50,},
    ];
    const [openSection, setOpenSection] = useState(null);



    return (
        <div className="md:flex flex-wrap bg-[#F5F6FB] min-h-screen">
            <SideBarAdmin />
            <div className="w-full lg:w-[calc(100%-304px)]">
                <HeaderAdmin title={"Admin Dashboard"} />
                <div className="px-4 py-2 lg:px-10 lg:py-4">

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((item, idx) => (
                            <div
                                key={idx}
                                className={`p-6 rounded-2xl shadow-md text-black flex flex-col items-center justify-center bg-white font-medium`}
                            >
                                <h2 className="text-3xl font-bold">{item.count}</h2>
                                <p className="mt-2 text-lg">{item.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
