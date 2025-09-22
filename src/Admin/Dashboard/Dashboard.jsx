import HeaderAdmin from "../../common/HeaderAdmin";
import { useState } from "react";
import AuthLayout from "../../component/AuthLayout";

function Dashboard() {

    const stats = [
        { title: "Vendor", count: 120, offer : "+12% From Last month" },
        { title: "Sales Members", count: 15,offer : "+12% From Last month"  },
        { title: "Customer", count: 42,offer : "+12% From Last month"  },
        {title : "Total sales man" ,count :88 , offer : "+12% From Last month" }
    ];



    return (

        <AuthLayout>
            <div className="w-full ">
                <HeaderAdmin title={"Admin Dashboard"} />
                <div className="px-4 py-2 lg:px-10 lg:py-4">

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((item, idx) => (
                            <div
                                key={idx}
                                className={`p-6 rounded-2xl shadow-md text-black flex flex-col  justify-center bg-[#004AAD1A] font-medium`}
                            >
                                <p className="mt-2 text-lg">{item.title}</p>
                                <h2 className="text-3xl font-bold ">{item.count}</h2>
                                <p className="text-xl font-bold">{item.offer}</p>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}

export default Dashboard;
