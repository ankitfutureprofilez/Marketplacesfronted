import { useEffect, useRef, useState } from "react"
import HeaderAdmin from "../../common/HeaderAdmin";
import LoadingSpinner from "../../common/LoadingSpinner";
import Nodata from "../../common/Nodata";
import Listing from "../../Apis/Listing";
import { AiOutlineSync } from "react-icons/ai";
import { FiSearch, FiX, FiMail, FiPhone, FiMessageSquare } from "react-icons/fi";

function Enquiries() {
    const [loading, setLoading] = useState(false);
    const [enquiries, setEnquiries] = useState([]);
    const [searchQuery, setSearchQuery] = useState("")
    const timeRef = useRef(null);
    const [expandedIds, setExpandedIds] = useState({});

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

    const clearSearch = () => {
        setSearchQuery("");
        if (timeRef.current) clearTimeout(timeRef.current);
        fetchEnquiries("");
    };

    const toggleExpand = (id) => {
        setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const initials = (first = "", last = "") =>
        `${first?.[0] || ""}${last?.[0] || ""}`.toUpperCase() || "?";

    const avatarPalette = [
        "bg-indigo-50 text-indigo-600",
        "bg-emerald-50 text-emerald-600",
        "bg-orange-50 text-orange-600",
        "bg-purple-50 text-purple-600",
        "bg-rose-50 text-rose-600",
        "bg-sky-50 text-sky-600",
    ];
    const avatarColor = (name = "") => {
        let hash = 0;
        for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
        return avatarPalette[Math.abs(hash) % avatarPalette.length];
    };

    return (
        <div className=" w-full min-h-full">
            <style>{`
                @keyframes enquiryCardIn {
                    from { opacity: 0; transform: translateY(6px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .enquiry-card {
                    animation: enquiryCardIn 0.35s ease both;
                }
                .enquiry-message-clamp {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>

            <HeaderAdmin title={"Enquries"} />
            <div className="">
                <div className="mb-4 overflow-hidden">
                    {/* Header */}
                    <div className="px-5 py-4 flex flex-wrap justify-between items-center bg-white gap-3 border-b border-gray-100 rounded-2xl mb-4">
                        <div className="flex items-baseline gap-2">
                            <h2 className="text-[15px] lg:text-base font-semibold font-[Poppins] text-[#14161A] tracking-tight m-0">
                                Enquiries Listing
                            </h2>
                            {!loading && (
                                <span className="font-[Poppins] text-[12px] text-[#8C9199]">
                                    {enquiries.length} {enquiries.length === 1 ? "enquiry" : "enquiries"}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto">
                            {/* Search */}
                            <div className="relative w-full md:w-64">
                                <FiSearch className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C9199]" />
                                <input
                                    type="text"
                                    aria-label="Search enquiries by name"
                                    placeholder="Search by name"
                                    className="w-full pl-10 pr-9 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 text-[13px] font-[Poppins] text-[#14161A] placeholder:text-[#8C9199] transition-colors"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={clearSearch}
                                        aria-label="Clear search"
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-md text-[#8C9199] hover:text-[#14161A] hover:bg-[#ECEDF2] transition-colors"
                                    >
                                        <FiX size={14} />
                                    </button>
                                )}
                            </div>
                            <button
                                onClick={() => fetchEnquiries(searchQuery)}
                                title="Refresh"
                                aria-label="Refresh enquiries"
                                disabled={loading}
                                className="flex items-center justify-center gap-2 px-3.5 py-2.5 bg-[#FAFAFB] border border-[#ECEDF2] rounded-xl hover:bg-[#F0F0F3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 transition-colors text-[13px] font-medium font-[Poppins] text-[#14161A] disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                            >
                                <AiOutlineSync size={16} className={loading ? "animate-spin" : ""} />
                                <span className="hidden sm:inline">Refresh</span>
                            </button>
                        </div>
                    </div>

                    <div className="">
                        {loading ? (
                            <div className="py-16 flex justify-center">
                                <LoadingSpinner />
                            </div>
                        ) : enquiries && enquiries?.length === 0 ? (
                            <div className="text-center">
                                <Nodata />
                                <p className="font-[Poppins] text-[13px] text-[#8C9199] -mt-2">
                                    {searchQuery
                                        ? `No enquiries match "${searchQuery}".`
                                        : "Enquiries submitted by visitors will show up here."}
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {enquiries &&
                                    enquiries?.map((data, index) => {
                                        const fullName = `${data?.firstName || ""} ${data?.lastName || ""}`.trim();
                                        const isExpanded = !!expandedIds[data._id];
                                        return (
                                            <div
                                                key={data._id}
                                                style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
                                                className="enquiry-card relative bg-white border border-[#ECEDF2] rounded-2xl p-4 transition-all duration-200 hover:shadow-[0_4px_20px_rgba(20,22,26,0.06)]"
                                            >
                                                <div className="flex items-start justify-between gap-2 mb-3">
                                                    <div className="flex items-center gap-3 min-w-0">
                                                        <span
                                                            className={`flex items-center justify-center w-11 h-11 rounded-full text-[14px] font-semibold shrink-0 ${avatarColor(
                                                                fullName
                                                            )}`}
                                                        >
                                                            {initials(data?.firstName, data?.lastName)}
                                                        </span>
                                                        <div className="min-w-0">
                                                            <h3 className="font-[Poppins] font-semibold text-[14px] text-[#14161A] capitalize truncate">
                                                                {fullName || "—"}
                                                            </h3>
                                                            <p className="font-[Poppins] text-[12px] text-[#8C9199]">
                                                                #{String(index + 1).padStart(2, "0")}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {data?.role && (
                                                        <span className="px-2.5 py-1 shrink-0 inline-flex text-[11px] leading-4 font-medium rounded-full font-[Poppins] bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20 capitalize">
                                                            {data.role}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-3 font-[Poppins]">
                                                    <div className="flex items-center gap-1.5 text-[13px] text-[#6B7280] min-w-0">
                                                        <FiMail className="text-[#8C9199] shrink-0" size={13} />
                                                        <span className="truncate max-w-[200px]">{data?.email || "--"}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-[13px] text-[#6B7280]">
                                                        <FiPhone className="text-[#8C9199] shrink-0" size={13} />
                                                        <span>{data?.phone || "--"}</span>
                                                    </div>
                                                </div>

                                                <div className="pt-3 border-t border-[#F0F0F3]">
                                                    <div className="flex items-start gap-2 font-[Poppins]">
                                                        <FiMessageSquare className="text-[#8C9199] shrink-0 mt-0.5" size={14} />
                                                        <div className="min-w-0">
                                                            <p
                                                                className={`text-[13px] text-[#46494D] leading-relaxed ${
                                                                    isExpanded ? "" : "enquiry-message-clamp"
                                                                }`}
                                                            >
                                                                {data?.message || "--"}
                                                            </p>
                                                            {data?.message && data.message.length > 110 && (
                                                                <button
                                                                    onClick={() => toggleExpand(data._id)}
                                                                    className="mt-1 text-[12px] font-medium text-blue-600 hover:text-blue-700"
                                                                >
                                                                    {isExpanded ? "Show less" : "Read more"}
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Enquiries