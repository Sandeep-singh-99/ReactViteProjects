// import React, { useState } from "react";
// import { load } from "@cashfreepayments/cashfree-js";
// import axios from "axios";

// export default function App() {
//   let cashfree;

//   let insitialzeSDK = async function () {
//     cashfree = await load({
//       mode: "sandbox",
//     });
//   };

//   insitialzeSDK();

//   const [orderId, setOrderId] = useState("");

//   const getSessionId = async () => {
//     try {
//       let res = await axios.get("http://localhost:5000/payment");
//       if (res.data && res.data.payment_session_id) {
//         setOrderId(res.data.order_id);
//         return res.data.payment_session_id;
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const verifyPayment = async () => {
//     try {
//       let res = await axios.post("http://localhost:5000/verify", {
//         orderId: orderId,
//       });

//       if (res && res.data) {
//         alert("payment verified");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleClick = async (e) => {
//     e.preventDefault();
//     try {
//       let sessionId = await getSessionId();
//       let checkoutOptions = {
//         paymentSessionId: sessionId,
//         redirectTarget: "_modal",
//       };

//       cashfree.checkout(checkoutOptions).then((res) => {
//         console.log("payment initialized");

//         verifyPayment(orderId);
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <h1>Cashfree payment getway</h1>
//       <div className="card">
//         <button onClick={handleClick}>Pay now</button>
//       </div>
//     </>
//   );
// }



import React, { useState, useEffect, useCallback } from "react";
import { load } from "@cashfreepayments/cashfree-js";
import axios from "axios";

export default function App() {
  const [cashfree, setCashfree] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const initializeSDK = async () => {
    try {
      const sdk = await load({ mode: "sandbox" });
      setCashfree(sdk);
      console.log("Cashfree SDK initialized");
    } catch (err) {
      setError("Failed to initialize payment SDK");
      console.error("SDK Initialization error:", err);
    }
  };

  const fetchPaymentHistory = useCallback(async () => {
    setHistoryLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/payments");
      console.log("Payment history fetched:", response.data);
      setPaymentHistory(response.data);
    } catch (err) {
      console.error("Fetch payment history error:", err.response?.data || err);
      setError("Failed to load payment history");
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeSDK();
    fetchPaymentHistory();
    return () => setCashfree(null);
  }, [fetchPaymentHistory]);

  const getSessionId = async () => {
    try {
      const res = await axios.get("http://localhost:5000/payment");
      console.log("Payment session response:", res.data);
      if (!res.data?.payment_session_id) {
        throw new Error("Invalid payment session response");
      }
      const newOrderId = res.data.order_id;
      setOrderId(newOrderId);
      console.log("Order ID set:", newOrderId);
      return { sessionId: res.data.payment_session_id, orderId: newOrderId };
    } catch (err) {
      console.error("Get session error:", err);
      throw err;
    }
  };

  const verifyPayment = async (orderIdToVerify) => {
    try {
      if (!orderIdToVerify) {
        throw new Error("No order ID provided for verification");
      }
      console.log("Verifying payment for orderId:", orderIdToVerify);
      const res = await axios.post(
        "http://localhost:5000/verify",
        { orderId: orderIdToVerify },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Verification response:", res.data);

      const status = res.data.status || "PENDING";
      console.log("Verified payment status:", status);
      return status;
    } catch (err) {
      console.error("Verification error:", err);
      throw new Error(err.response?.data?.error || "Verification failed");
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!cashfree) {
      setError("Payment system not initialized");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { sessionId, orderId: localOrderId } = await getSessionId();
      console.log("Using orderId for checkout:", localOrderId);

      const checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: "_modal",
        returnUrl: window.location.origin,
      };

      await cashfree.checkout(checkoutOptions).then(async () => {
        console.log("Checkout completed, verifying payment with orderId:", localOrderId);
        const paymentStatus = await verifyPayment(localOrderId);

        console.log("Final payment status:", paymentStatus);
        await fetchPaymentHistory(); // Refresh history after verification

        if (paymentStatus === "SUCCESS") {
          setOrderId(""); // Clear only on success
          alert("Payment verified successfully");
        } else if (paymentStatus === "FAILED") {
          setError("Payment failed. Please try again.");
        } else {
          setError("Payment is still pending. Please check again later.");
        }
      });
    } catch (err) {
      setError(err.message || "Payment process failed");
      console.error("Payment error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "20px", color: "#333" }}>
        Cashfree Payment Gateway
      </h1>

      <div
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          marginBottom: "20px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <button
          onClick={handleClick}
          disabled={isLoading || !cashfree}
          style={{
            padding: "10px 20px",
            backgroundColor: isLoading || !cashfree ? "#cccccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: isLoading || !cashfree ? "not-allowed" : "pointer",
            fontSize: "16px",
          }}
        >
          {isLoading ? "Processing..." : "Pay Now"}
        </button>
        {error && (
          <p style={{ color: "red", marginTop: "10px", fontSize: "14px" }}>
            {error}
          </p>
        )}
        {orderId && (
          <p style={{ marginTop: "10px", color: "#666" }}>
            Current Order ID: <strong>{orderId}</strong>
          </p>
        )}
      </div>

      <div style={{ marginTop: "20px" }}>
        <h2 style={{ marginBottom: "10px", color: "#333" }}>
          Payment History
        </h2>
        {historyLoading ? (
          <p style={{ color: "#666" }}>Loading payment history...</p>
        ) : paymentHistory.length === 0 ? (
          <p style={{ color: "#666" }}>No payments yet</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, border: "1px solid #ddd" }}>
            {paymentHistory.map((payment) => (
              <li
                key={payment.orderId}
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #eee",
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "10px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>
                  Order: {payment.orderId || "N/A"}
                </span>
                <span>
                  Amount: {payment.orderAmount || 0} {payment.orderCurrency || "N/A"}
                </span>
                <span
                  style={{
                    color:
                      payment.paymentStatus === "SUCCESS"
                        ? "green"
                        : payment.paymentStatus === "FAILED"
                        ? "red"
                        : "orange",
                    fontWeight: "bold",
                  }}
                >
                  Status: {payment.paymentStatus || "PENDING"}
                </span>
                <span>
                  Date: {payment.createdAt ? new Date(payment.createdAt).toLocaleString() : "N/A"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}