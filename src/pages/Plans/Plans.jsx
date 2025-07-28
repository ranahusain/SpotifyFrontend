import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Plans.module.css";
import Payment from "../../pages/Payment/Payment";
import PlanPageFooter from "../../components/PlanPageFooter/PlanPageFooter";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Plans = () => {
  const [showPayment, setShowPayment] = useState(false);

  const handleOpenPayment = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to purchase a premium plan");
      return;
    }
    setShowPayment(true);
  };

  const handleClosePayment = () => {
    setShowPayment(false);
  };

  useEffect(() => {
    if (showPayment) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showPayment]);

  return (
    <>
      <Navbar showSearch={false} />

      <div className={styles.heading}>
        <h1>Experience the difference</h1>
        <p>
          Go Premium and enjoy full control of your listening. Cancel anytime.
        </p>
        <div className={styles.cards}>
          <img
            src="https://img.icons8.com/color/48/000000/visa.png"
            alt="Visa"
          />
          <img
            src="https://img.icons8.com/color/48/000000/mastercard-logo.png"
            alt="MasterCard"
          />
          <img
            src="https://img.icons8.com/color/48/000000/amex.png"
            alt="American Express"
          />
          <img
            src="https://img.icons8.com/color/48/000000/discover.png"
            alt="Discover"
          />
        </div>
      </div>

      <div className={styles.container}>
        {/* Individual Plan */}
        <div className={`${styles.card} ${styles.individual}`}>
          <h2>Individual</h2>
          <p className={styles.price}>Rs 349 / month</p>
          <ul className={styles.features}>
            <li>1 Premium account</li>
            <li>Subscription remains</li>
            <li>Cancel anytime</li>
            <li>Subscribe or one-time payment</li>
          </ul>
          <button className={styles.primary} onClick={handleOpenPayment}>
            Try 1 month for Rs 0
          </button>
          <button className={styles.secondary} onClick={handleOpenPayment}>
            One-time payment
          </button>
          <p className={styles.note}>
            Rs 0 for 1 month, then Rs 349 per month after.{" "}
            <a href="#">Terms apply</a>.
          </p>
        </div>

        {/* Other Plans (repeat button logic) */}
        <div className={`${styles.card} ${styles.student}`}>
          <h2>Student</h2>
          <p className={styles.price}>Rs 175 / month</p>
          <ul className={styles.features}>
            <li>1 verified Premium account</li>
            <li>Discount for eligible students</li>
            <li>Cancel anytime</li>
            <li>Subscribe or one-time payment</li>
          </ul>
          <button className={styles.primary} onClick={handleOpenPayment}>
            Try 1 month for Rs 0
          </button>
          <button className={styles.secondary} onClick={handleOpenPayment}>
            One-time payment
          </button>
        </div>

        <div className={`${styles.card} ${styles.duo}`}>
          <h2>Duo</h2>
          <p className={styles.price}>Rs 449 / month</p>
          <ul className={styles.features}>
            <li>2 Premium accounts</li>
            <li>Cancel anytime</li>
            <li>Subscribe or one-time payment</li>
          </ul>
          <button className={styles.primaryYellow} onClick={handleOpenPayment}>
            Get Premium Duo
          </button>
          <button className={styles.secondary} onClick={handleOpenPayment}>
            One-time payment
          </button>
        </div>

        <div className={`${styles.card} ${styles.family}`}>
          <h2>Family</h2>
          <p className={styles.price}>Rs 579 / month</p>
          <ul className={styles.features}>
            <li>Up to 6 Premium accounts</li>
            <li>Control explicit content</li>
            <li>Cancel anytime</li>
            <li>Subscribe or one-time payment</li>
          </ul>
          <button className={styles.primaryBlue} onClick={handleOpenPayment}>
            Get Premium Family
          </button>
          <button className={styles.secondary} onClick={handleOpenPayment}>
            One-time payment
          </button>
          {/* <p className={styles.note}>
            agni dolore consequatur repellat modi. Repellendus, saepe quisquam!
            <a href="#">Terms apply</a>.
          </p> */}
        </div>
      </div>

      {/* Footer */}
      <PlanPageFooter />
      {/* Modal Overlay */}
      {showPayment && (
        <div className={styles.modalOverlay} onClick={handleClosePayment}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
            style={{
              overflow: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <Payment />
            {/* <button onClick={handleClosePayment} className={styles.closeBtn}>
              Close
            </button> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Plans;
