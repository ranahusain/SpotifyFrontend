import { useEffect, useState } from "react";
import styles from "./PlayListBar.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
const PlaylistSidebar = () => {
  const [playlists, setPlaylists] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/getplaylists", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); // adjust endpoint
        setPlaylists(res.data);
      } catch (err) {
        console.error("Failed to fetch playlists:", err);
      }
    };

    fetchPlaylists();
  }, []);

  const handlePlaylistClick = (id) => {
    navigate(`/playlist/${id}`);
  };

  return (
    <>
      <div className={styles.sidebar}>
        <h3>Your Library</h3>
        <div className={styles.playlistList}>
          {playlists.map((playlist) => (
            <div
              className={styles.playlistItem}
              key={playlist._id}
              onClick={() => handlePlaylistClick(playlist._id)}
            >
              <img src={playlist.imageURL} className={styles.playlistImage} />
              <div className={styles.playlistInfo}>
                <p className={styles.playlistName}>{playlist.name}</p>
                <p className={styles.ownerName}>Spotify</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PlaylistSidebar;
