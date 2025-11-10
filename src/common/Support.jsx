import React from 'react'

export default function Support() {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Marketplace Support</h1>

        <p className="text-gray-700 mb-6 leading-relaxed">
          Welcome to the official support page for the <strong>Marketplace</strong> app. 
          We’re here to help you with any issues related to coupon purchases, Razorpay 
          payments, or redemption at partner stores.
        </p>

        <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          For any questions, technical problems, payment issues, or refund inquiries, 
          please reach out to us using the contact details below.
        </p>

        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <p className="mb-3">
            📧 <strong>Email:</strong>{" "}
            <a
              href="mailto:support@marketplace.com"
              className="text-blue-600 underline"
            >
              support@marketplace.com
            </a>
          </p>
          <p className="mb-3">
            🌐 <strong>Website:</strong>{" "}
            <a
              href="https://marketplace.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              https://marketplace.com
            </a>
          </p>
          <p>
            🕒 <strong>Support Hours:</strong> Monday – Saturday, 10 AM – 7 PM IST
          </p>
        </div>

        <h2 className="text-xl font-semibold mb-4">Response Time</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          We usually respond to all queries within <strong>24 to 48 hours</strong>. 
          Complex cases such as Razorpay payment reviews may take up to 5 business days.
        </p>

        {/* <h2 className="text-xl font-semibold mb-4">Additional Help</h2>
        <p className="text-gray-700 leading-relaxed">
          You can also visit our <a href="https://marketplace.com/faq" className="text-blue-600 underline">FAQ page</a> 
          or use the in-app chat option for quick answers to common questions.
        </p> */}
      </div>
    </div>
  )
}