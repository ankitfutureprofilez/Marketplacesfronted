import React from 'react'
import AuthLayout from '../../component/AuthLayout'
import HeaderAdmin from '../../common/HeaderAdmin'

export default function Details() {
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
                                Balraj Verma
                                <span className="ml-2 w-2 h-2 bg-green-500 rounded-full"></span>
                            </p>
                            <p className="text-sm text-gray-500">@himontsalon</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center sm:justify-end items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            <span>alonbanjaj@gmail.com</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            <span>+91 8548187355</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            <span>1658 Madison Ave, New York...</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 rounded-lg shadow-lg text-white bg-gradient-to-r from-blue-700 to-blue-500">
                        <p className="text-sm opacity-80">TOTAL COUPONS</p>
                        <p className="text-4xl font-bold">50</p>
                    </div>
                    <div className="p-4 rounded-lg shadow-lg text-gray-800 bg-white border border-gray-200">
                        <p className="text-sm font-medium text-gray-500">TOTAL REDEEM</p>
                        <p className="text-4xl font-bold">123</p>
                    </div>
                    <div className="p-4 rounded-lg shadow-lg text-gray-800 bg-green-100">
                        <p className="text-sm font-medium text-green-700">TOTAL PURCHASE</p>
                        <p className="text-4xl font-bold text-green-600">15</p>
                    </div>
                    <div className="p-4 rounded-lg shadow-lg text-gray-800 bg-yellow-100">
                        <p className="text-sm font-medium text-yellow-700">PENDING</p>
                        <p className="text-4xl font-bold text-yellow-600">80</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

                    <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Business Information</h2>
                        <div className="grid grid-cols-3 gap-y-4 text-sm">
                            <div><p className="text-gray-500">Categories</p><p className="font-medium">Salon/Grooming</p></div>
                            <div><p className="text-gray-500">Subcategory</p><p className="font-medium">Men's look</p></div>
                            <div><p className="text-gray-500">Landmark</p><p className="font-medium">Near Metro Gate</p></div>
                            <div><p className="text-gray-500">Area/Locality</p><p className="font-medium">Cantreight Place</p></div>
                            <div><p className="text-gray-500">City</p><p className="font-medium">New Delhi</p></div>
                            <div><p className="text-gray-500">Pincode</p><p className="font-medium">110001</p></div>
                            <div className="col-span-3 mt-4">
                                <p className="text-gray-500">Full Address</p>
                                <p className="font-medium">D-12/B, Krishnarpalan Palh, Basant Marg, Surat Road, Jaipur, Rajasthan 302019, India</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Business Documents</h2>
                            <div className="grid grid-cols-2 gap-y-3 text-sm">
                                <div className="flex items-center space-x-2">
                                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                    <span>Business Reg. No. <span className="text-gray-500 text-xs">12345</span></span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                    <span>Pan card <span className="text-xs font-semibold text-green-600">uploaded</span></span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                    <span>GST/Tax/ID <span className="text-gray-500 text-xs">GSTIN9334587</span></span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                    <span>Aadhaar card <span className="text-xs font-semibold text-green-600">uploaded</span></span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                    <span>Shop Licence <span className="text-xs font-semibold text-green-600">uploaded</span></span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                    <span>Business logo <span className="text-xs font-semibold text-green-600">uploaded</span></span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Business Opening Hours</h2>
                            <div className="grid grid-cols-2 gap-y-3 text-sm">
                                <div><p className="text-gray-500">Opening Hours</p><p className="font-medium">Mon - 10:00 Am - 9:00 pm</p></div>
                                <div><p className="text-gray-500">Special Days</p><p className="font-medium">24 Sep</p></div>
                                <div><p className="text-gray-500">Weekly Off Day</p><p className="font-medium">Sunday</p></div>
                            </div>
                        </div>

                    </div>

                </div>

                <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Coupon Listing</h2>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr className="text-xs font-medium tracking-wider text-gray-500 uppercase bg-gray-50">
                                <th className="px-6 py-3 text-left">COUPON TITLE</th>
                                <th className="px-6 py-3 text-left">DISCOUNT TYPE</th>
                                <th className="px-6 py-3 text-left">MIN BILL AMOUNT</th>
                                <th className="px-6 py-3 text-left">MAX DISCOUNT</th>
                                <th className="px-6 py-3 text-left">TOTAL REDEEMED</th>
                                <th className="px-6 py-3 text-left">STATUS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr className="text-sm">
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Flat 25% off</td>
                                <td className="px-6 py-4 whitespace-nowrap">25% OFF</td>
                                <td className="px-6 py-4 whitespace-nowrap">₹500</td>
                                <td className="px-6 py-4 whitespace-nowrap">₹500</td>
                                <td className="px-6 py-4 whitespace-nowrap">45</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>
                                </td>
                            </tr>
                            <tr className="text-sm">
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Flat 20% off</td>
                                <td className="px-6 py-4 whitespace-nowrap">20% OFF</td>
                                <td className="px-6 py-4 whitespace-nowrap">₹800</td>
                                <td className="px-6 py-4 whitespace-nowrap">₹500</td>
                                <td className="px-6 py-4 whitespace-nowrap">45</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>
                                </td>
                            </tr>
                            <tr className="text-sm">
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Flat 25% off</td>
                                <td className="px-6 py-4 whitespace-nowrap">25% OFF</td>
                                <td className="px-6 py-4 whitespace-nowrap">₹800</td>
                                <td className="px-6 py-4 whitespace-nowrap">₹500</td>
                                <td className="px-6 py-4 whitespace-nowrap">45</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Inactive</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthLayout>
    )
}
