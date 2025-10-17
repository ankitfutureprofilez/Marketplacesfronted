import React, { useEffect } from "react";

const PaymentPage = () => {
  const RAZORPAY_KEY = "rzp_test_RQ3O3IWq0ayjsg";

  useEffect(() => {
    // Load Razorpay checkout script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    try {
      // 👇 Send payment data to backend
      const response = await fetch(
        "https://marketplacesbackend.onrender.com/api/customer/add_payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "amount": 50000,
            "currency": "INR",
            "receipt": "receipt#1",
            "offer_id": "68edff002c5753929286bfac",
            "vendor_id": "68edfeb22c5753929286bfa1",
            "payment_status": "PENDING"
          }),
        }
      );

      const orderData = await response.json();

      const options = {
        key: RAZORPAY_KEY, // ⚠️ Use test key for test mode
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.id,
        name: "My Test Store",
        description: "Test Payment",
        handler: function (response) {
          console.log("✅ Payment Success:", response);
          alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        },
        prefill: { name: "John Doe", email: "john@example.com" },
        theme: { color: "#000000" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("❌ Payment error:", err);
      alert("Payment failed! Check console.");
    }
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Razorpay Payment Page</h1>
      <button
        onClick={handlePayment}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Pay ₹500
      </button>
    </div>
  );
};

export default PaymentPage;
