import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-10 px-5 md:px-20">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Privacy Policy
        </h1>

        <p className="mb-4">
          At <strong>YourCompanyName</strong>, we value your privacy and are
          committed to protecting your personal data. This Privacy Policy
          explains how we collect, use, and safeguard your information.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
        <p className="mb-4">
          We may collect personal information such as your name, email address,
          contact details, and payment information when you interact with our
          website or services.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>To provide and improve our services</li>
          <li>To send important updates or promotional offers</li>
          <li>To respond to customer service requests</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Protection</h2>
        <p className="mb-4">
          We implement appropriate technical and organizational security
          measures to protect your data from unauthorized access, loss, or
          misuse.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Sharing of Information</h2>
        <p className="mb-4">
          We do not sell or trade your personal information. We may share it
          only with trusted partners who assist in operating our website or
          conducting our business, provided they agree to keep it confidential.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Cookies</h2>
        <p className="mb-4">
          Our website uses cookies to enhance user experience and analyze site
          traffic. You can choose to disable cookies through your browser
          settings.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Third-Party Links</h2>
        <p className="mb-4">
          Our website may contain links to third-party sites. We are not
          responsible for their privacy practices or content.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">7. Changes to This Policy</h2>
        <p className="mb-4">
          We may update this policy from time to time. Please review it
          periodically to stay informed about how we protect your information.
        </p>

        <p className="mt-10 text-center text-gray-500 text-sm">
          Last updated on: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
