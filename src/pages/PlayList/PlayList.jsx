import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PlayListBar from "../../components/PlayListLeftBar/PlayListBar";
import styles from "./PlayList.module.css";
import { SlMusicToneAlt } from "react-icons/sl";
import Navbar from "../../components/Navbar/Navbar";

const PlaylistPage = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/playlist/${id}`);
        setPlaylist(res.data);
      } catch (error) {
        console.error("Error fetching playlist", error);
      }
    };

    fetchPlaylist();
  }, [id]);

  if (!playlist)
    return <div style={{ color: "white", padding: "20px" }}>Loading...</div>;

  return (
    <>
      <Navbar />

      <section className={styles.main_section}>
        <PlayListBar />
        <div className={styles.playlist_container}>
          <div className={styles.playlist_header}>
            <div className={styles.playlist_cover}>
              <SlMusicToneAlt className={styles.playlist_cover_icon} />
            </div>
            <div>
              <p className={styles.playlist_label}>Playlist</p>
              <h1 className={styles.playlist_title}>{playlist.name}</h1>
              <p className={styles.playlist_info}>
                {playlist.songs.length} songs
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
              {playlist.songs.map((song, index) => (
                <tr key={song._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className={styles.song_title}>
                      <img src={song.imageURL} />
                      <div>
                        <p className={styles.song_name}>{song.songname}</p>
                        <p className={styles.artist_name}>{song.artist.name}</p>
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
      </section>
    </>
  );
};

export default PlaylistPage;
