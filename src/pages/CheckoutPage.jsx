
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import Loading from "../components/ExtraComponents/Loading";
import useAxiosSecure from "../hooks/useAxiosSecure";
import CustomButton from "../components/ExtraComponents/CustomButton";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm({ clientSecret, item }) {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);


  useEffect(() => {
    const checkDark = () =>
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    const card = elements.getElement(CardElement);
    const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
          billing_details: {
            name: item.userName || item.userEmail,
            email: item.userEmail,
          },
        },
      }
    );

    if (paymentError) {
      console.error("Stripe error:", paymentError);
      setError(paymentError.message);
      Swal.fire("Payment Failed", paymentError.message, "error");
      setProcessing(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      try {
        await axiosSecure.post("/bookings/confirm", {
          paymentIntentId: paymentIntent.id,
          itemType: item.itemType,
          itemId: item.itemId,
          nights: item.nights,
          guests: item.guests,
          startDate: item.startDate,
        });
        Swal.fire("Success!", "Your booking is confirmed!", "success");
        navigate("/bookings");
      } catch (err) {
        console.error("Booking confirmation failed:", err);
        Swal.fire("Error", "Payment succeeded, but booking failed to save.", "error");
      } finally {
        setProcessing(false);
      }
    } else {
      Swal.fire("Payment Issue", "Payment was not successful. Please try again.", "warning");
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">
          Card Details
        </label>
        <div className="p-4 border rounded-lg bg-gray-50 dark:bg-[#1f1f2e] border-gray-300 dark:border-gray-700">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: isDarkMode ? "#ffffff" : "#32325d", 
                  iconColor: isDarkMode ? "#ffffff" : "#32325d",
                  "::placeholder": {
                    color: isDarkMode ? "#a3a3a3" : "#aab7c4", 
                  },
                },
                invalid: {
                  color: "#fa755a",
                  iconColor: "#fa755a",
                },
              },
            }}
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      

       <CustomButton  type="submit"
        disabled={!stripe || processing} label={processing ? "Processing..." : `Pay ${item.currency?.toUpperCase()} ${(item.amount / 100).toFixed(2)}`}></CustomButton>
    </form>
  );
}

export default function CheckoutPage() {
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState(null);
  const [item, setItem] = useState(null);
  const { state } = location;

  useEffect(() => {
    if (!state?.itemType || !state?.itemId) {
      console.error("Missing booking item details.");
      return;
    }

    const createIntent = async () => {
      try {
        const res = await axiosSecure.post("/create-payment-intent", {
          itemType: state.itemType,
          itemId: state.itemId,
          nights: state.nights,
          guests: state.guests,
          startDate: state.startDate,
        });
        setClientSecret(res.data.clientSecret);
        setItem({
          ...state,
          amount: res.data.amount,
          currency: res.data.currency || "usd",
        });
      } catch (err) {
        console.error("Failed to create payment intent:", err);
        Swal.fire("Error", "Could not initialize payment.", "error");
      }
    };
    createIntent();
  }, [axiosSecure, state]);

  if (!clientSecret || !item) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#12121c] py-10 px-4">
      <Helmet>
        <title>Checkout | সপ্নভ্রমণ</title>
      </Helmet>
      <div className="max-w-3xl mx-auto space-y-8 mt-8">
        {/* Order Summary */}
        <div className="bg-white dark:bg-[#1b1b2b] p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Item:</span>
              <span className="font-semibold">{item.itemTitle || item.itemType}</span>
            </div>
            {item.guests && (
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Guests:</span>
                <span className="font-semibold">{item.guests}</span>
              </div>
            )}
            {item.nights && (
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Nights:</span>
                <span className="font-semibold">{item.nights}</span>
              </div>
            )}
            <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>{item.currency?.toUpperCase()} {(item.amount / 100).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white dark:bg-[#1b1b2b] p-8 rounded-lg shadow-lg ">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Payment Details</h2>
          <Elements  stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm clientSecret={clientSecret} item={item} />
          </Elements>
        </div>
      </div>
    </div>
  );
}