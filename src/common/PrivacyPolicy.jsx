import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-16">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-10">Privacy Policy</h1>

        <section className="space-y-10 text-gray-700 leading-relaxed">
          {/* Section 1 */}
          <div>
            <h2 className="text-xl font-bold mb-4">1. Introduction</h2>
            <p>
              At <strong>Marketplace</strong>, your privacy is our top priority.
              This Privacy Policy explains how we collect, use, share, and
              protect your personal information when you use our platform to buy
              and redeem discount coupons at partner offline stores. By
              accessing or using our services, you consent to the practices
              described in this policy.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              2. Information We Collect
            </h2>
            <p>
              We collect both personal and non-personal information to operate
              effectively and provide a better user experience. This includes:
            </p>
            <ul className="list-disc ml-6 mt-3 space-y-2">
              <li>
                <strong>Account Details:</strong> Name, email address, and
                contact number when you register or log in.
              </li>
              <li>
                <strong>Payment Information:</strong> Processed securely through
                Razorpay — we do not store your card or UPI details.
              </li>
              <li>
                <strong>Usage Data:</strong> Pages visited, search history, and
                actions taken on the platform to improve functionality.
              </li>
              <li>
                <strong>Device & Location Data:</strong> Collected automatically
                to detect fraud and provide relevant offers.
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              3. How We Use Your Information
            </h2>
            <p>We use your data to:</p>
            <ul className="list-disc ml-6 mt-3 space-y-2">
              <li>Process payments and deliver your coupons securely.</li>
              <li>
                Notify you about offers, updates, or promotions from partner
                stores.
              </li>
              <li>
                Improve our services and personalize your browsing experience.
              </li>
              <li>
                Detect and prevent fraudulent or unauthorized transactions.
              </li>
              <li>Comply with legal obligations and resolve user disputes.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              4. Sharing of Information
            </h2>
            <p>
              We value your trust and only share information when necessary:
            </p>
            <ul className="list-disc ml-6 mt-3 space-y-2">
              <li>
                <strong>With Merchants:</strong> Limited details (such as coupon
                code) are shared with partner stores for validation.
              </li>
              <li>
                <strong>With Payment Gateway:</strong> Razorpay handles your
                payment data using secure encryption protocols.
              </li>
              <li>
                <strong>With Legal Authorities:</strong> If required by law,
                court order, or to enforce our Terms & Conditions.
              </li>
            </ul>
            <p className="mt-4">
              We never sell or rent your personal information to third parties
              for marketing purposes.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-xl font-bold mb-4">5. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your
              data, including SSL encryption, secure storage, and access
              controls. However, please understand that no digital transmission
              method is 100% secure, and we cannot guarantee absolute protection
              against all potential threats.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              6. Cookies and Tracking
            </h2>
            <p>
              Marketplace uses cookies and similar tracking technologies to
              remember user preferences, analyze traffic, and enhance your
              experience. You can modify your browser settings to refuse
              cookies, but some features of the site may not function properly
              as a result.
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              7. Your Rights and Choices
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc ml-6 mt-3 space-y-2">
              <li>Access and update your account information at any time.</li>
              <li>Opt out of promotional emails by clicking “Unsubscribe.”</li>
              <li>
                Request deletion of your data by contacting our support team.
              </li>
              <li>Withdraw consent for specific data processing activities.</li>
            </ul>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="text-xl font-bold mb-4">8. Data Retention</h2>
            <p>
              We retain your information as long as your account is active or as
              required to comply with legal, regulatory, or business
              obligations. Once deleted, your data will be removed from our
              active systems within a reasonable period.
            </p>
          </div>

          {/* Section 9 */}
          <div>
            <h2 className="text-xl font-bold mb-4">9. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites, such as
              partner stores or social media pages. We are not responsible for
              the privacy practices or content of these sites, and we encourage
              you to read their respective privacy policies.
            </p>
          </div>

          {/* Section 10 */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              10. Updates to This Policy
            </h2>
            <p>
              We may revise this Privacy Policy from time to time. Any changes
              will be reflected on this page with an updated “Last Updated”
              date. Continued use of our services indicates your acceptance of
              those changes.
            </p>
          </div>

          {/* Section 11 */}
          <div>
            <h2 className="text-xl font-bold mb-4">11. Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding your
              personal data, please reach out to us at{" "}
              <a
                href="mailto:support@marketplace.com"
                className="text-blue-600 underline"
              >
                support@marketplace.com
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}