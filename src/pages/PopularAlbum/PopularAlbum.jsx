import { useState, useEffect } from "react";
import axios from "axios";
import FooterUp from "../../components/FooterUp/FooterUp";
import Navbar from "../../components/Navbar/Navbar";
import LeftBar from "../../components/LeftBar/LeftBar";
import Footer from "../../components/Footer/Footer";
import styles from "./PopularAlbum.module.css";
const PopularAlbum = () => {
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
      {" "}
      <Navbar />
      <section className={styles.main_section} style={{ marginBottom: "50px" }}>
        <LeftBar />
        <div className={styles.right_side}>
          <div className={styles.section_header}>
            <h2>Popular albums and singles</h2>
          </div>
          <div className={styles.song_grid}>
            {songs.map((song) => (
              <div className={styles.song_card} key={song._id}>
                <div className={styles.image_wrapper}>
                  <img src={song.album.imageURL} alt={song.songname} />
                </div>
                <h3>{song.album.name}</h3>
                <p>{song.artist.name}</p>
              </div>
            ))}
          </div>
          <FooterUp />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default PopularAlbum;
