import React from "react";
import styles from "./PlanPageFooter.module.css";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

const PlanPageFooter = () => {
  return (
    <>
      <hr
        style={{
          width: "90%",
          margin: "auto",
          backgroundColor: "#2c2c2c",
          border: "none",
          height: "1px",
        }}
      />
      <div className={styles.main_img_cards}>
        {/* Footer Cards */}
        <div className={styles.img_cards}>
          <h3>Company</h3>
          <p>About</p>
          <p>Jobs</p>
          <p>For the Record</p>
        </div>
        <div className={styles.img_cards}>
          <h3>Communities</h3>
          <p>For Artist</p>
          <p>Developers</p>
          <p>Advertising</p>
          <p>Investors</p>
          <p>Vendors</p>
        </div>
        <div className={styles.img_cards}>
          <h3>Spotify Plan</h3>
          <p>Premium Individual</p>
          <p>Premium Duo</p>
          <p>Premium Family</p>
          <p>Premium Student</p>
          <p>Free</p>
        </div>
        <div className={styles.img_cards}>
          <h3>Useful Link</h3>
          <p>Support</p>
          <p>Free Mobile App</p>
          <p>Popular by country</p>
        </div>
        <div className={styles.img_cards_icons}>
          <FaInstagram className={styles.icon_footer} />
          <FaTwitter className={styles.icon_footer} />
          <FaFacebook className={styles.icon_footer} />
        </div>
      </div>

      <hr
        style={{
          width: "90%",
          margin: "auto",
          backgroundColor: "#2c2c2c",
          border: "none",
          height: "1px",
        }}
      />
      <p
        style={{
          color: "#b3b3b3",
          margin: "60px 0 60px 300px",
          fontSize: "14px",
        }}
      >
        &copy; 2025 Spotify AB
      </p>
    </>
  );
};

export default PlanPageFooter;
