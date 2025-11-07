import React from "react";

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-10 px-5 md:px-20">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Terms and Conditions
        </h1>

        <p className="mb-4">
          Welcome to <strong>YourCompanyName</strong>! These terms and conditions outline
          the rules and regulations for the use of our website.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing this website, we assume you accept these terms and
          conditions. Do not continue to use this website if you do not agree to
          all of the terms stated on this page.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Cookies</h2>
        <p className="mb-4">
          We employ the use of cookies. By accessing this website, you agree to
          use cookies in agreement with our Privacy Policy.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. License</h2>
        <p className="mb-4">
          Unless otherwise stated, we own the intellectual property rights for
          all material on this website. You may view and/or print pages for your
          own personal use subject to restrictions set in these terms.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Restrictions</h2>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Reproducing or redistributing website material</li>
          <li>Selling or sub-licensing material from this website</li>
          <li>Using the website in a way that may damage it</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Limitation of Liability</h2>
        <p className="mb-4">
          We shall not be held responsible for any damages arising from the use
          of our website or services.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Changes to Terms</h2>
        <p className="mb-4">
          We may revise these terms at any time without prior notice. By using
          this website, you agree to be bound by the current version of these
          terms.
        </p>

        <p className="mt-10 text-center text-gray-500 text-sm">
          Last updated on: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
