import React from "react";

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-16">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-10">Terms and Conditions</h1>

        <section className="space-y-10 text-gray-700 leading-relaxed">
          {/* Section 1 */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              1. Introduction
            </h2>
            <p>
              Welcome to <strong>Marketplace</strong> ("we", "our", "us").
              These Terms and Conditions ("Terms") govern your access to and use of
              our website and app, including the purchase of discount coupons
              through Razorpay and their redemption at partner offline stores.
              By accessing or using our platform, you agree to comply with these Terms.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              2. Our Services
            </h2>
            <p>
              We operate as a digital marketplace that connects users with verified
              local shops and brands offering exclusive offline discounts. Users
              can browse listings, purchase discount coupons securely using
              <strong> Razorpay</strong>, and redeem them physically at partner stores.
              We act solely as an intermediary and are not the seller of any goods
              or services redeemed using the coupons.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              3. Account and Eligibility
            </h2>
            <p>
              To access certain features, you may need to create an account with
              accurate personal details. You must be at least 18 years of age
              to use our services. You are responsible for maintaining the
              confidentiality of your login credentials and for all activities
              that occur under your account.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              4. Purchasing Coupons
            </h2>
            <p>
              Coupon purchases are processed securely via Razorpay. Once payment
              is successful, a digital coupon will be issued and available under
              your user dashboard. Coupons are non-transferable, non-refundable,
              and valid only until their specified expiry date.
            </p>
            <p className="mt-4">
              We reserve the right to cancel or revoke a coupon in case of
              fraudulent activity, payment issues, or technical errors.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              5. Using Coupons Offline
            </h2>
            <p>
              Coupons purchased on our platform can be redeemed only at
              participating partner shops. You must present the valid coupon
              code or QR code to the merchant before billing. Discounts and
              offers are applied as per the merchant’s terms.
            </p>
            <p className="mt-4">
              We are not responsible for merchant behavior, product quality,
              or service experience at the partner store. Any disputes should be
              resolved directly with the merchant.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              6. Payments and Refunds
            </h2>
            <p>
              All payments are handled securely via Razorpay. Refunds are not
              available once a coupon has been issued. In cases where a payment
              fails but the amount is deducted, Razorpay will automatically
              initiate a reversal within 5–7 business days.
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              7. User Responsibilities
            </h2>
            <p>
              You agree to use our services lawfully and refrain from misusing
              coupons, creating fake accounts, or engaging in fraudulent activity.
              We reserve the right to suspend or terminate your account if any
              suspicious or unauthorized actions are detected.
            </p>
          </div>

          {/* Section 8 */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              8. Limitation of Liability
            </h2>
            <p>
              We do not guarantee the continuous availability of our services or
              the accuracy of partner listings. Under no circumstances shall we
              be liable for any direct, indirect, or incidental losses resulting
              from coupon purchases, payment failures, or merchant interactions.
            </p>
          </div>

          {/* Section 9 */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              9. Privacy Policy
            </h2>
            <p>
              Your personal data, including payment and contact details, are
              handled according to our Privacy Policy. We use industry-standard
              encryption and Razorpay’s secure payment gateway for all
              transactions.
            </p>
          </div>

          {/* Section 10 */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              10. Changes to Terms
            </h2>
            <p>
              We may update these Terms from time to time to reflect operational,
              legal, or regulatory changes. Any updates will be posted on this
              page with a revised “Last Updated” date. Continued use of the
              platform constitutes acceptance of the updated Terms.
            </p>
          </div>

          {/* Section 11 */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              11. Contact Us
            </h2>
            <p>
              For questions, feedback, or support, please contact our help team
              at <a href="mailto:support@marketplace.com" className="text-blue-600 underline">
                support@marketplace.com
              </a>.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
