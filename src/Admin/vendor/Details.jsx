import  { useEffect, useState } from 'react'
import AuthLayout from '../../component/AuthLayout'
import HeaderAdmin from '../../common/HeaderAdmin'
import { useParams } from 'react-router-dom'
import Listing from '../../Apis/Listing';
import OfferLisitng from './OfferLisitng';
export default function Details() {
    const { id } = useParams();

    console.log("id", id)
    const [record, setRecord] = useState("")

    useEffect(() => {
        const main = new Listing();
        const response = main.vendor_details(id);
        response.then((res) => {
            console.log("res", res)

            setRecord(res?.data?.data)

        }).catch((error) => {
            console.log("erorr", error)
        })
    }, [id])

    console.log("record", record)
    return (
        <AuthLayout>
            <HeaderAdmin title={"Vendor Details"} back={1} />
            <div className="px-4 py-2 lg:px-10 lg:py-2.5">
                <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-white rounded-lg shadow mb-6">
                    <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <div>
                            <p className="text-lg font-semibold flex items-center">
                                {record?.record?.vendor?.name}
                                <span className="ml-2 w-2 h-2 bg-green-500 rounded-full"></span>
                            </p>
                            <p className="text-sm text-gray-500">{record?.record?.vendor?.role}</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center sm:justify-end items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            <span>{record?.record?.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            <span>{record?.record?.vendor?.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            <span>{record?.record?.address}</span>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 rounded-lg shadow-lg text-white bg-gradient-to-r from-blue-700 to-blue-500">
                        <p className="text-sm opacity-80">TOTAL COUPONS</p>
                        <p className="text-4xl font-bold">{record?.coupon}</p>
                    </div>
                    <div className="p-4 rounded-lg shadow-lg text-gray-800 bg-white border border-gray-200">
                        <p className="text-sm font-medium text-gray-500">TOTAL REDEEM</p>
                        <p className="text-4xl font-bold">{record?.redeem}</p>
                    </div>
                    <div className="p-4 rounded-lg shadow-lg text-gray-800 bg-green-100">
                        <p className="text-sm font-medium text-green-700">TOTAL PURCHASE</p>
                        <p className="text-4xl font-bold text-green-600">{record?.purchased}</p>
                    </div>
                    <div className="p-4 rounded-lg shadow-lg text-gray-800 bg-yellow-100">
                        <p className="text-sm font-medium text-yellow-700">PENDING</p>
                        <p className="text-4xl font-bold text-yellow-600">{record?.pending}</p>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Business Information</h2>
                        <div className="grid grid-cols-3 gap-y-4 text-sm">
                            <div><p className="text-gray-500">Business Name</p><p className="font-medium">{record?.record?.business_name}</p></div>

                            <div><p className="text-gray-500">Categories</p><p className="font-medium">{record?.record?.category?.name}</p></div>
                            <div><p className="text-gray-500">Subcategory</p><p className="font-medium">{record?.record?.subcategory?.name}</p></div>
                            <div><p className="text-gray-500">Landmark</p><p className="font-medium">{record?.record?.area}</p></div>
                            <div><p className="text-gray-500">State</p><p className="font-medium">{record?.record?.state}</p></div>
                            <div><p className="text-gray-500">City</p><p className="font-medium">{record?.record?.city}</p></div>
                            <div><p className="text-gray-500">Pincode</p><p className="font-medium">{record?.record?.pincode}</p></div>
                            <div><p className="text-gray-500">Business Reg. No.</p><p className="font-medium">{record?.record?.business_register}</p></div>

                            <div><p className="text-gray-500">Business Gst Number</p><p className="font-medium">{record?.record?.gst_number}</p></div>

                            <div className="col-span-3 mt-4">
                                <p className="text-gray-500">Full Address</p>
                                <p className="font-medium">{record?.record?.address}</p>
                            </div>
                        </div>
                    </div>
                    <div className=" bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Business Opening Hours
                        </h2>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            {Object.entries(record?.record?.opening_hours || {}).map(([day, { open, close, active }]) => (
                                <div key={day} className="grid grid-cols-1 ">
                                    <p className="text-gray-500">{day}</p>
                                    {active ? (
                                        <p className="font-medium">
                                            {open} - {close}
                                        </p>
                                    ) : (
                                        <p className="font-medium text-red-500">Closed</p>
                                    )}

                                </div>
                            ))}
                            <div>
                                <p className="text-gray-500">Weekly Off Day </p>
                                <p className="font-medium">
                                    {record?.record?.weekly_off_day}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow mt-2">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Business Documents</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 text-sm">
                        {/* PAN Card */}
                        <div>
                            <p className="font-medium">PAN Card</p>
                            {record?.record?.pan_card_image ? (
                                <img
                                    src={record.record.pan_card_image}
                                    alt="Pan Card"
                                    className="w-24 h-24 object-cover rounded border mt-1"
                                />
                            ) : (
                                <p className="text-xs text-red-500">Not uploaded</p>
                            )}
                        </div>

                        {/* Aadhaar */}
                        <div>
                            <p className="font-medium">Aadhaar Front</p>
                            {record?.record?.adhar_front ? (
                                <img
                                    src={record.adhar_front}
                                    alt="Aadhaar Front"
                                    className="w-24 h-24 object-cover rounded border mt-1"
                                />
                            ) : (
                                <p className="text-xs text-red-500">Not uploaded</p>
                            )}
                        </div>
                        <div>
                            <p className="font-medium">Aadhaar Back</p>
                            {record?.record?.adhar_back ? (
                                <img
                                    src={record.adhar_back}
                                    alt="Aadhaar Back"
                                    className="w-24 h-24 object-cover rounded border mt-1"
                                />
                            ) : (
                                <p className="text-xs text-red-500">Not uploaded</p>
                            )}
                        </div>

                        {/* GST Certificate */}
                        <div>
                            <p className="font-medium">GST Certificate</p>
                            {record?.record?.gst_certificate ? (
                                <img
                                    src={record.record.gst_certificate}
                                    alt="GST Certificate"
                                    className="w-24 h-24 object-cover rounded border mt-1"
                                />
                            ) : (
                                <p className="text-xs text-red-500">Not uploaded</p>
                            )}
                        </div>

                        {/* Business Logo */}
                        <div>
                            <p className="font-medium">Business Logo</p>
                            {record?.record?.business_logo ? (
                                <img
                                    src={record.record.business_logo}
                                    alt="Business Logo"
                                    className="w-24 h-24 object-cover rounded-full border mt-1"
                                />
                            ) : (
                                <p className="text-xs text-red-500">Not uploaded</p>
                            )}
                        </div>
                    </div>
                </div>
                <OfferLisitng Offer={record?.offer} />
            </div>
        </AuthLayout>
    )
}
