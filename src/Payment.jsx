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
      // 👇 Send payment data to backend - CORRECT ENDPOINT
      const response = await fetch(
        "https://30eb4bad8ff4.ngrok-free.app/api/customer/add_payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "amount": 500, // ✅ ₹500 (backend *100 karega)
            "currency": "INR",
            "offer_id": "68edff002c5753929286bfac",
            "vendor_id": "68edfeb22c5753929286bfa1"
          }),
        }
      );

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Failed to create order");
      }

      const orderData = result.data; // ✅ Backend se order data
      console.log("✅ Order created:", orderData);

      const options = {
        key: RAZORPAY_KEY,
        amount: orderData.amount, // ✅ Order ka amount use karen
        currency: orderData.currency,
        order_id: orderData.id, // ✅ Order ID use karen
        name: "My Test Store",
        description: "Test Payment",
        handler: function (response) {
          console.log("✅ Payment Success:", response);
          alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
          
          // ✅ Payment verify karne ke liye backend call karen
          // verifyPayment(response);
        },
        prefill: { 
          name: "John Doe", 
          email: "john@example.com",
          contact: "+918306615173" 
        },
        notes: orderData.notes, // ✅ Order notes pass karen
        theme: { color: "#000000" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("❌ Payment error:", err);
      alert("Payment failed! " + err.message);
    }
  };

  // ✅ Payment verify function
  const verifyPayment = async (paymentResponse) => {
    try {
      const verifyResponse = await fetch(
        "https://30eb4bad8ff4.ngrok-free.app/api/verify-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            razorpay_payment_id: paymentResponse.razorpay_payment_id,
            razorpay_order_id: paymentResponse.razorpay_order_id,
            razorpay_signature: paymentResponse.razorpay_signature
          }),
        }
      );
      
      const result = await verifyResponse.json();
      if (result.success) {
        console.log("✅ Payment verified successfully");
      } else {
        console.log("❌ Payment verification failed");
      }
    } catch (error) {
      console.error("❌ Verification error:", error);
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