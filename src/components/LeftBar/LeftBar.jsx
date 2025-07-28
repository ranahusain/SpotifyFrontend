import { useState, useEffect } from "react";
import styles from "./LeftBar.module.css";
import { FiPlus } from "react-icons/fi";
import { CiGlobe } from "react-icons/ci";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LeftBar = () => {
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");

  const [isPremium, setisPremium] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user._id) {
      setOwner(user._id || user.id || "");
      setisPremium(user.isPremium);
    }
  }, []);

  const handlePlusClick = () => {
    setShowCreatePopup(!showCreatePopup);
  };
  const submitForm = async (e) => {
    e.preventDefault();

    if (!isPremium) {
      toast.error("You need to buy Premium to create a playlist.");
      return;
    }
    console.log(isPremium);
    try {
      const res = await axios.post("http://localhost:5000/api/playlists", {
        name,
        owner,
      });
      console.log(res.data);
      toast.success("Playlist created successfully!");
      setName("");
      setShowCreatePopup(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create playlist.");
    }
  };

  return (
    <>
      <div className={styles.left_side}>
        <div className={styles.left_heading}>
          <h3>Your Library</h3>
          <FiPlus className={styles.library_icon} onClick={handlePlusClick} />
        </div>

        {showCreatePopup && (
          <div className={styles.create_popup}>
            <h4>Create a New Playlist</h4>
            <form onSubmit={submitForm}>
              <div>
                <input
                  type="text"
                  placeholder="Enter playlist name"
                  className={styles.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button className={styles.nav_btn}>Create Playlist</button>
              </div>
            </form>
          </div>
        )}

        {!showCreatePopup && (
          <div className={styles.card}>
            <h3>Create Your first Playlist</h3>
            <p>It's easy, we'll help you</p>
            <button className={styles.nav_btn} onClick={handlePlusClick}>
              Create Playlist
            </button>
          </div>
        )}

        <div className={styles.card}>
          <h3>Let's find some podcasts to follow</h3>
          <p>We'll keep you updated on new episodes</p>
          <button className={styles.nav_btn}>Browse Podcasts</button>
        </div>

        <div className={styles.left_footer}>
          <a href="#">Legal</a>
          <a href="#">Safety & Privacy Center</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookies</a>
          <a href="#">About Ads</a>
          <a href="#">Accessibility</a>
        </div>
        <a href="#" className={styles.cookie}>
          Cookies
        </a>

        <div className={styles.search_bar}>
          <CiGlobe className={styles.icon} />
          <button className={styles.language_btn}>English</button>
        </div>
      </div>
    </>
  );
};

export default LeftBar;
