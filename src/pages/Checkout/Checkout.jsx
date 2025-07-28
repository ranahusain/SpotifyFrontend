import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import styles from "./Checkout.module.css";
import { toast } from "react-toastify";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/`, // will redirect on success
      },
    });

    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error.message);
      toast.error(error.message);
    } else if (error) {
      setMessage("An unexpected error occurred.");
      toast.error("An unexpected error occurred.");
    } else {
      toast.success("Payment successful!");
    }
    setIsProcessing(false);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        className={styles.button}
        disabled={isProcessing || !stripe || !elements}
      >
        <span>{isProcessing ? "Processing ..." : "Pay now"}</span>
      </button>
      {message && <div className={styles.message}>{message}</div>}
    </form>
  );
}
