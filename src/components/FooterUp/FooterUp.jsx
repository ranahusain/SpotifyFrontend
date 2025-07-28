import styles from "./FooterUp.module.css";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
const FooterUp = () => {
  return (
    <>
      <hr
        style={{
          width: "90%",
          margin: "auto",
          height: "0.01em",
          backgroundColor: "#2c2c2cff",
          border: "none",
        }}
      />
      <div className={styles.main_img_cards}>
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
          height: "0.01em",
          backgroundColor: "#2c2c2cff",
          border: "none",
        }}
      />
      <p
        style={{
          color: "#b3b3b3",
          margin: "60px",
          fontSize: "14px",
        }}
      >
        &copy; 2025 Spotify AB
      </p>
    </>
  );
};

export default FooterUp;
