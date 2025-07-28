import { useState, useEffect } from "react";
import styles from "./PopularArtist.module.css";

import axios from "axios";
import FooterUp from "../../components/FooterUp/FooterUp";
import Navbar from "../../components/Navbar/Navbar";
import LeftBar from "../../components/LeftBar/LeftBar";
import Footer from "../../components/Footer/Footer";

const PopularArtist = () => {
  const [songs, setSong] = useState([]);

  useEffect(() => {
    const fetchsongs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/getsong/");
        setSong(res.data);
      } catch (error) {
        console.log("error in fetching songs");
      }
    };
    fetchsongs();
  }, []);

  return (
    <>
      <>
        <Navbar />
        <section
          className={styles.main_section}
          style={{ marginBottom: "50px" }}
        >
          <LeftBar />
          <div className={styles.right_side}>
            <div className={styles.section_header}>
              <h2>Popular artists</h2>
            </div>
            <div className={styles.song_grid}>
              {songs.map((song) => (
                <div className={styles.song_card} key={song._id}>
                  <div className={styles.image_wrapper_1}>
                    <img src={song.artist.imageURL} alt={song.songname} />
                  </div>
                  <h3>{song.artist.name}</h3>
                  <p>Artist</p>
                </div>
              ))}
            </div>
            <FooterUp />
          </div>
        </section>
        <Footer />
      </>
    </>
  );
};

export default PopularArtist;
