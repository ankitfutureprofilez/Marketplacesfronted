import React, { useEffect } from "react";

const PaymentPage = () => {
  const RAZORPAY_KEY = "rzp_test_Rxncr3PhssgP4K";

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

  // const handlePayment = async () => {
  //   try {
  //     // 👇 Send payment data to backend - CORRECT ENDPOINT
  //     const response = await fetch(
  //       "https://30eb4bad8ff4.ngrok-free.app/api/customer/add_payment",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           "amount": 500, // ✅ ₹500 (backend *100 karega)
  //           "currency": "INR",
  //           "offer_id": "68edff002c5753929286bfac",
  //           "vendor_id": "68edfeb22c5753929286bfa1"
  //         }),
  //       }
  //     );

  //     const result = await response.json();
      
  //     if (!response.ok) {
  //       throw new Error(result.message || "Failed to create order");
  //     }

  //     const orderData = result.data; // ✅ Backend se order data
  //     console.log("✅ Order created:", orderData);

  //     const options = {
  //       key: RAZORPAY_KEY,
  //       amount: orderData.amount, // ✅ Order ka amount use karen
  //       currency: orderData.currency,
  //       order_id: orderData.id, // ✅ Order ID use karen
  //       name: "My Test Store",
  //       description: "Test Payment",
  //       handler: function (response) {
  //         console.log("✅ Payment Success:", response);
  //         alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
          
  //         // ✅ Payment verify karne ke liye backend call karen
  //         // verifyPayment(response);
  //       },
  //       prefill: { 
  //         name: "John Doe", 
  //         email: "john@example.com",
  //         contact: "+918306615173" 
  //       },
  //       notes: orderData.notes, // ✅ Order notes pass karen
  //       theme: { color: "#000000" },
  //     };

  //     const rzp = new window.Razorpay(options);
  //     rzp.open();
  //   } catch (err) {
  //     console.error("❌ Payment error:", err);
  //     alert("Payment failed! " + err.message);
  //   }
  // };

  const handlePayment = async () => {
    try {
      const response = await fetch(
        "https://mktplace.fpdemo.com/api/customer/offer/upgrade",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: 500, // ₹500 (backend *100 karega)
            currency: "INR",
            old_offer_buy_id: "6953b96d3b77ade6b40819e7",
            new_offer_id: "6909c693db0db0c97b4584c5",
            userId: "68fc57a9761dd0cf738b88dc",
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create order");
      }

      // ✅ IMPORTANT FIX — destructure order correctly
      const { order } = result.data;

      // 🛡️ Safety guard (prevents silent Razorpay bugs)
      if (!order?.id) {
        throw new Error("Order ID missing from backend response");
      }

      console.log("✅ Razorpay Order:", order);

      const options = {
        key: RAZORPAY_KEY,

        // ✅ MUST come from order object
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,

        name: "My Test Store",
        description: "Offer Upgrade",

        handler: function (response) {
          console.log("✅ Payment Success:", response);
          alert(
            "Payment Successful! Payment ID: " +
              response.razorpay_payment_id
          );
        },

        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "+918306615173",
        },

        // ✅ Notes must also come from order
        notes: order.notes,

        theme: { color: "#000000" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("❌ Payment error:", err);
      alert("Payment failed! " + err.message);
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