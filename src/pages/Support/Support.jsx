import React from "react";
import styles from "./Support.module.css";
import Navbar from "../../components/Navbar/Navbar";
import PlanPageFooter from "../../components/PlanPageFooter/PlanPageFooter";

const categories = [
  { icon: "💳", title: "Payments & billing" },
  { icon: "👤", title: "Manage your account" },
  { icon: "🎵", title: "Premium plans" },
  { icon: "📱", title: "In-app features" },
  { icon: "🛠️", title: "Devices & troubleshooting" },
  { icon: "🔒", title: "Safety & privacy" },
];

const Support = () => {
  return (
    <>
      <Navbar showSearch={false} />

      <div className={styles.container}>
        <p className={styles.supportHeader}>Spotify Support</p>
        <h1 className={styles.title}>How can we help you?</h1>
        <p className={styles.loginText}>
          <a href="#" className={styles.loginLink}>
            Log in
          </a>{" "}
          for faster help
        </p>

        <input type="text" placeholder="Search" className={styles.searchBar} />

        <div className={styles.categories}>
          {categories.map((cat, idx) => (
            <div className={styles.card} key={idx}>
              <div className={styles.cardContent}>
                <span className={styles.icon}>{cat.icon}</span>
                <span className={styles.cardText}>{cat.title}</span>
              </div>
              <span className={styles.dropdown}>⌄</span>
            </div>
          ))}
        </div>
      </div>
      <PlanPageFooter />
    </>
  );
};

export default Support;
