import React, { useState, useEffect, useRef } from "react";
import NavBar from "../../components/Navbar/Navbar";
import MainContainer from "../../components/MainContainer/MainContainer";
import Footer from "../../components/Footer/Footer";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const hasHandledPayment = useRef(false); // 🛡️ Prevent duplicate call

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // cleaner version
  }, []);

  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const status = query.get("redirect_status");

    if (
      (status === "succeeded" || status === "failed") &&
      !hasHandledPayment.current
    ) {
      hasHandledPayment.current = true; // mark as handled

      const handlePayment = async () => {
        if (status === "succeeded") {
          try {
            const user = JSON.parse(localStorage.getItem("user"));
            const userId = user._id;

            await axios.put(`http://localhost:5000/api/isPremium/${userId}`, {
              isPremium: true,
            });
            toast.success("Payment successful!");
            const { data } = await axios.get(
              `http://localhost:5000/api/user/${userId}`
            );
            localStorage.setItem("user", JSON.stringify(data.user));
          } catch (error) {
            console.error("Error updating premium status:", error);
            toast.error("Something went wrong while upgrading.");
          }
        } else if (status === "failed") {
          toast.error("Payment failed. Please try again.");
        }
      };

      handlePayment();
    }
  }, [location]);

  return (
    <>
      <NavBar />
      <MainContainer />
      {isLoggedIn ? <MusicPlayer /> : <Footer />}
    </>
  );
};

export default HomePage;
