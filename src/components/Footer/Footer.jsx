import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Footer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <div className={styles.spotify_footer}>
          <div className={styles.footer_content}>
            <div className={styles.text_container}>
              <p className={styles.footer_heading}>Preview of Spotify</p>
              <p className={styles.footer_text}>
                Welcome! Enjoy unlimited songs and podcasts with just a few
                clicks — no credit card required. Sit back and start listening!
              </p>
            </div>
            <Link className={styles.signup_btn} to="/">
              Start listening
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.spotify_footer}>
          <div className={styles.footer_content}>
            <div className={styles.text_container}>
              <p className={styles.footer_heading}>Preview of Spotify</p>
              <p className={styles.footer_text}>
                Sign up to get unlimited songs and podcasts with occasional ads.
                No credit card needed.
              </p>
            </div>
            <Link className={styles.signup_btn} to="/SignUp">
              Sign up free
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
