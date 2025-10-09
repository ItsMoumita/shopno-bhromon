// src/pages/Checkout.jsx
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../components/ExtraComponents/Loading";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm({ clientSecret, item }) {
  console.log(item, clientSecret);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);

    const card = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: item.userName || item.userEmail,
          email: item.userEmail,
        },
      },
    });

    if (error) {
      console.error("Stripe error:", error);
      Swal.fire("Payment Failed", error.message || "Try again", "error");
      setProcessing(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      try {
        // Confirm booking on backend
        const resp = await axiosSecure.post("/api/bookings/confirm", {
          paymentIntentId: paymentIntent.id,
          itemType: item.itemType,
          itemId: item.itemId,
          nights: item.nights,
          guests: item.guests,
          startDate: item.startDate || null,
          note: item.note || "",
        });

        Swal.fire("Success", "Booking confirmed!", "success");
        navigate("/bookings");
      } catch (err) {
        console.error("Failed to record booking:", err);
        Swal.fire("Error", "Payment succeeded but booking failed", "error");
      } finally {
        setProcessing(false);
      }
    } else {
      Swal.fire("Payment not completed", "Try again", "error");
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <div className="p-4 border rounded bg-white dark:bg-[#1b1b2b]">
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      </div>

      <button disabled={!stripe || processing} className="w-full py-2 bg-[#4657F0] text-white rounded">
        {processing ? "Processing..." : `Pay ${item.currency ? item.currency.toUpperCase() : ""} ${ (item.amount/100).toFixed(2) }`}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState(null);
  const [item, setItem] = useState(null);

  // item details passed through location.state
  // e.g. { itemType: "package", itemId, nights, guests, startDate }
  const state = location.state || {};
  useEffect(() => {
    if (!state.itemType || !state.itemId) {
      // redirect back if missing
      console.error("Missing item in state");
      return;
    }

    async function createIntent() {
      try {
        const res = await axiosSecure.post("/api/create-payment-intent", {
          itemType: state.itemType,
          itemId: state.itemId,
          nights: state.nights,
          guests: state.guests,
          startDate: state.startDate,
           itemTitle: state.itemTitle,
        });
        setClientSecret(res.data.clientSecret);
        setItem({
          ...state,
          amount: res.data.amount,
          currency: res.data.currency || "usd",
         
        });
      } catch (err) {
        console.error("create payment intent failed:", err);
      }
    }
    createIntent();
  }, [axiosSecure, state]);

  if (!clientSecret || !item) {
    return <Loading></Loading>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#12121c] p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Checkout</h1>
        <p className="mb-4 text-gray-600">Pay for {item.itemType} {item.itemTitle || ""}</p>

        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm clientSecret={clientSecret} item={item} />
        </Elements>
      </div>
    </div>
  );
}