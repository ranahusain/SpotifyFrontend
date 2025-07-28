import Navbar from "../../components/Navbar/Navbar";
import LeftBar from "../../components/LeftBar/LeftBar";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./ArtistDetail.module.css";
import { SlMusicToneAlt } from "react-icons/sl";
import axios from "axios";

const ArtistDetail = () => {
  const { artistname } = useParams();
  const [artistData, setArtistData] = useState({ artist: {}, songs: [] });

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/artist/${encodeURIComponent(artistname)}`
        );
        setArtistData(res.data);
      } catch (error) {
        console.log("error in fetching songs");
      }
    };
    fetchSongs();
  }, [artistname]);

  return (
    <>
      <Navbar />
      <section className={styles.main_section}>
        <LeftBar />

        <div className={styles.right_side}>
          <div className={styles.playlist_container}>
            <div className={styles.playlist_header}>
              <div className={styles.playlist_cover}>
                {artistData.artist.imageURL ? (
                  <img
                    src={artistData.artist.imageURL}
                    alt={artistData.artist.name}
                    className={styles.playlist_image}
                  />
                ) : (
                  <SlMusicToneAlt className={styles.playlist_cover_icon} />
                )}
              </div>
              <div>
                <p className={styles.playlist_label}>Artist</p>
                <h1 className={styles.playlist_title}>
                  {artistData.artist.name}
                </h1>
                <p className={styles.playlist_info}>
                  {artistData.songs.length} song
                  {artistData.songs.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <table className={styles.song_table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Album</th>
                  <th>Date Added</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {artistData.songs.map((song, index) => (
                  <tr key={song._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className={styles.song_title}>
                        <img src={song.imageURL} alt={song.songname} />
                        <div>
                          <p className={styles.song_name}>{song.songname}</p>
                          <p className={styles.artist_name}>
                            {song.artist.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>{song.album.name}</td>
                    <td>{new Date(song.createdAt).toLocaleDateString()}</td>
                    <td>{song.duration || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ArtistDetail;
