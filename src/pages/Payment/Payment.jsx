import styles from "./Payment.module.css";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "../Checkout/Checkout";

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {clientSecret && stripePromise && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <Checkout />
          </Elements>
        )}
      </main>
    </div>
  );
}

export default Payment;
