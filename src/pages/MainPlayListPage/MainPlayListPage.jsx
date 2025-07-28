import React from "react";
import PlayListLeftBar from "../../components/PlayListLeftBar/PlayListBar";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./MainPlayList.module.css";
import { SlMusicToneAlt } from "react-icons/sl";

const MainPlayListPage = () => {
  return (
    <>
      <Navbar />
      <section className={styles.main_section}>
        <PlayListLeftBar />
        <div className={styles.playlist_container}>
          <div className={styles.playlist_header}>
            <div className={styles.playlist_cover}>
              <SlMusicToneAlt className={styles.playlist_cover_icon} />
            </div>
            <div>
              <p className={styles.playlist_label}>Playlist</p>
              <h1 className={styles.playlist_title}></h1>
              <p className={styles.playlist_info}>- songs</p>
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
          </table>
        </div>
      </section>
    </>
  );
};

export default MainPlayListPage;
