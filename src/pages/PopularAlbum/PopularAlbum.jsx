import { useState, useEffect } from "react";
import axios from "axios";
import FooterUp from "../../components/FooterUp/FooterUp";
import Navbar from "../../components/NavBar/NavBar";
import LeftBar from "../../components/LeftBar/LeftBar";
import Footer from "../../components/Footer/Footer";
import styles from "./PopularAlbum.module.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PopularAlbum = () => {
  const [songs, setSong] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchsongs = async () => {
      try {
        const res = await axios.get(
          "https://spotifybackend-4.onrender.com/api/getsong/"
        );
        setSong(res.data);
      } catch (error) {
        console.log("error in fetching songs");
      } finally {
        setLoading(false);
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
            {loading ? (
              <SkeletonTheme baseColor="#2a2a2a" highlightColor="#3e3e3e">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div className={styles.song_card} key={i}>
                    <div className={styles.image_wrapper}>
                      <Skeleton height={150} />
                    </div>
                    <h3>
                      <Skeleton width={100} />
                    </h3>
                    <p>
                      <Skeleton width={60} />
                    </p>
                  </div>
                ))}
              </SkeletonTheme>
            ) : (
              songs.map((song) => (
                <div className={styles.song_card} key={song._id}>
                  <div className={styles.image_wrapper}>
                    <img src={song.album.imageURL} alt={song.songname} />
                  </div>
                  <h3>{song.album.name}</h3>
                  <p>{song.artist.name}</p>
                </div>
              ))
            )}
          </div>
          <FooterUp />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default PopularAlbum;
