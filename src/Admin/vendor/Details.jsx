import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AuthLayout from '../../component/AuthLayout';
import HeaderAdmin from '../../common/HeaderAdmin';
import Listing from '../../Apis/Listing'; // Assuming this path is correct
import OfferLisitng from './OfferLisitng'; // Assuming this component exists
import BusinessImageGallery from './BusinessImageGallery'; // Assuming this component exists

export default function Details() {
    const { id } = useParams();
    console.log("id" ,id)
    const [record, setRecord] = useState(null); // Initialize as null for proper loading state
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        const main = new Listing();
        main.vendor_details(id)
            .then((res) => {
                // console.log("res", res);
                if (res?.data?.data) {
                    setRecord(res.data.data);
                } else {
                    // Handle case where data is empty but request succeeded
                    setRecord(null); 
                }
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching vendor details:", err);
                setError("Failed to load vendor details.");
                setIsLoading(false);
            });
    }, [id]);

    // Destructure for cleaner template access, adding default empty objects for safety
    const vendorRecord = record?.record || {};
    const userInfo = vendorRecord.user || {};
    const openingHours = vendorRecord.opening_hours || {};
    const stats = {
        coupon: record?.coupon || 0,
        redeem: record?.redeem || 0,
        purchased: record?.purchased || 0,
        pending: record?.pending || 0,
    };
    const offers = record?.offer || [];

    if (isLoading) {
        return (
            <AuthLayout>
                <HeaderAdmin title={"Vendor Details"} back={1} />
                <div className="p-4 text-center text-lg">Loading vendor details...</div>
            </AuthLayout>
        );
    }

    if (error) {
         return (
            <AuthLayout>
                <HeaderAdmin title={"Vendor Details"} back={1} />
                <div className="p-4 text-center text-red-600 font-medium">{error}</div>
            </AuthLayout>
        );
    }
    
    // If data is loaded but the main record is missing
    if (!record || Object.keys(vendorRecord).length === 0) {
        return (
            <AuthLayout>
                <HeaderAdmin title={"Vendor Details"} back={1} />
                <div className="p-4 text-center text-gray-500">No vendor details found for ID: {id}.</div>
            </AuthLayout>
        );
    }


    return (
        <AuthLayout>
            {/* <HeaderAdmin title={"Vendor Details"} back={1} /> */}
            <div className="px-4 py-2 lg:px-4 lg:py-2.5 w-full">
                <div className="bg-white rounded-[20px] mb-[10px] p-2">
                    {/* User & Contact Information */}
                    <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-white rounded-lg shadow mb-6 border border-gray-100">
                        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <div>
                                <p className="text-xl font-bold flex items-center text-gray-800">
                                    {userInfo.name || 'N/A'}
                                    <span className="ml-2 w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span> {/* Enhanced status dot */}
                                </p>
                                <p className="text-sm text-gray-500">{userInfo.role || 'Vendor'}</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center sm:justify-end items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                <span className='font-medium'>{vendorRecord.email || 'N/A'}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                <span className='font-medium'>{userInfo.phone || 'N/A'}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                <span className='font-medium'>{vendorRecord.address || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Stats/Metrics Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="p-4 rounded-xl shadow-lg text-white bg-gradient-to-br from-blue-600 to-blue-400">
                            <p className="text-sm opacity-80">TOTAL COUPONS</p>
                            <p className="text-4xl font-extrabold mt-1">{stats.coupon}</p>
                        </div>
                        <div className="p-4 rounded-xl shadow-lg text-gray-800 bg-white border border-gray-200">
                            <p className="text-sm font-medium text-gray-500">TOTAL REDEEM</p>
                            <p className="text-4xl font-extrabold mt-1">{stats.redeem}</p>
                        </div>
                        <div className="p-4 rounded-xl shadow-lg text-gray-800 bg-green-50 border border-green-200">
                            <p className="text-sm font-medium text-green-700">TOTAL PURCHASE</p>
                            <p className="text-4xl font-extrabold text-green-600 mt-1">{stats.purchased}</p>
                        </div>
                        <div className="p-4 rounded-xl shadow-lg text-gray-800 bg-yellow-50 border border-yellow-200">
                            <p className="text-sm font-medium text-yellow-700">PENDING</p>
                            <p className="text-4xl font-extrabold text-yellow-600 mt-1">{stats.pending}</p>
                        </div>
                    </div>
                    
                    {/* Business Info & Opening Hours */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Business Information</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 text-sm">
                                <div><p className="text-gray-500">Business Name</p><p className="font-medium text-base">{vendorRecord.business_name || 'N/A'}</p></div>
                                <div><p className="text-gray-500">Categories</p><p className="font-medium text-base">{vendorRecord.category?.name || 'N/A'}</p></div>
                                <div><p className="text-gray-500">Subcategory</p><p className="font-medium text-base">{vendorRecord.subcategory?.name || 'N/A'}</p></div>
                                <div><p className="text-gray-500">Landmark</p><p className="font-medium text-base">{vendorRecord.area || 'N/A'}</p></div>
                                <div><p className="text-gray-500">State</p><p className="font-medium text-base">{vendorRecord.state || 'N/A'}</p></div>
                                <div><p className="text-gray-500">City</p><p className="font-medium text-base">{vendorRecord.city || 'N/A'}</p></div>
                                <div><p className="text-gray-500">Pincode</p><p className="font-medium text-base">{vendorRecord.pincode || 'N/A'}</p></div>
                                <div><p className="text-gray-500">Business Reg. No.</p><p className="font-medium text-base">{vendorRecord.business_register || 'N/A'}</p></div>
                                <div><p className="text-gray-500">Business Gst Number</p><p className="font-medium text-base">{vendorRecord.gst_number || 'N/A'}</p></div>

                                <div className="col-span-2 sm:col-span-3 mt-4">
                                    <p className="text-gray-500">Full Address</p>
                                    <p className="font-medium text-base">{vendorRecord.address || 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        <div className=" bg-white p-6 rounded-xl shadow border border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Business Opening Hours</h2>
                            <div className="grid grid-cols-2 gap-y-3 text-sm">
                                {Object.entries(openingHours).map(([day, { open, close, active }]) => (
                                    <div key={day} className="flex justify-between">
                                        <p className="text-gray-500 capitalize">{day}</p>
                                        {active ? (
                                            <p className="font-medium text-gray-800">
                                                {open} - {close}
                                            </p>
                                        ) : (
                                            <p className="font-medium text-red-500">Closed</p>
                                        )}
                                    </div>
                                ))}
                                {vendorRecord.weekly_off_day && (
                                    <div className='col-span-2 mt-2'>
                                        <p className="text-gray-500">Weekly Off Day </p>
                                        <p className="font-medium text-base text-blue-600">
                                            {vendorRecord.weekly_off_day}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Business Documents */}
                    <div className="bg-white p-6 rounded-xl shadow mt-4 border border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Business Documents</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-sm">
                            {/* Document Helper Function/Component could clean this up, but keeping it inline */}
                            {[{ title: "PAN Card", src: vendorRecord.pan_card_image },
                             { title: "Aadhaar Front", src: vendorRecord.adhar_front },
                             { title: "Aadhaar Back", src: vendorRecord.adhar_back },
                             { title: "GST Certificate", src: vendorRecord.gst_certificate },
                             { title: "Business Logo", src: vendorRecord.business_logo, isLogo: true }
                            ].map((doc, index) => (
                                <div key={index}>
                                    <p className="font-medium text-gray-700 mb-1">{doc.title}</p>
                                    {doc.src ? (
                                        <a href={doc.src} target="_blank" rel="noopener noreferrer">
                                            <img
                                                src={doc.src}
                                                alt={doc.title}
                                                className={`w-24 h-24 object-cover rounded${doc.isLogo ? '-full' : ''} border-2 border-gray-200 hover:border-blue-500 transition-colors cursor-pointer`}
                                            />
                                        </a>
                                    ) : (
                                        <p className="text-xs text-red-500">Not uploaded</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Business Images Gallery */}
                    <div className="bg-white p-6 rounded-xl shadow mt-4 border border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Business Images Gallery</h2>
                        {/* Assuming BusinessImageGallery handles the display of an array of images */}
                        <BusinessImageGallery images={vendorRecord.business_image || []} />
                    </div>

                    {/* Vendor Offers Listing */}
                    <div className="bg-white p-6 rounded-xl shadow mt-4 border border-gray-100">
                         <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Vendor Offers</h2>
                         {/* Assuming OfferLisitng handles the display of an array of offers */}
                         <OfferLisitng Offer={offers} />
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}