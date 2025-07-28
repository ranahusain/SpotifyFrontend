import { useState, useEffect } from "react";
import styles from "./TrendingSongs.module.css";
import axios from "axios";
import { FaPlay, FaPause } from "react-icons/fa";
import FooterUp from "../../components/FooterUp/FooterUp";
import Navbar from "../../components/NavBar/NavBar";
import LeftBar from "../../components/LeftBar/LeftBar";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { SongContext } from "../../context/SongContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TrendingSongs = () => {
  const navigate = useNavigate();

  const { songDetails, setSongDetails, isPlaying, setIsPlaying } =
    useContext(SongContext);

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

  const togglePlay = (song) => {
    if (songDetails.songURL === song.songURL) {
      setIsPlaying(!isPlaying); // toggle
    } else {
      setSongDetails({
        songURL: song.songURL,
        imageURL: song.imageURL,
        artistName: song.artist.name,
        songName: song.songname,
      });
      setIsPlaying(true);
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      console.log("log in true set hogya");
      console.log(isLoggedIn);
    } else {
      setIsLoggedIn(false);
      console.log("log in false set hogya");
      console.log(isLoggedIn);
    }
  }, []);

  // add song to playlist
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showPlaylistPopup, setShowPlaylistPopup] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const handleThreeDotClick = (songId) => {
    setOpenMenuId(openMenuId === songId ? null : songId);
  };

  const handleAddToPlaylistClick = async (song) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/getplaylists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); // Change this
      setPlaylists(res.data);
      setSelectedSong(song);
      setShowPlaylistPopup(true);
    } catch (error) {
      console.error("Error fetching playlists", error);
    }
  };

  const handlePlaylistSelect = async (playlistId) => {
    try {
      await axios.post("http://localhost:5000/api/playlists/add", {
        songId: selectedSong._id,
        playlistId,
      });
      setShowPlaylistPopup(false);
      setOpenMenuId(null);
      toast.success("Song added to playlist!");
    } catch (error) {
      console.error("Error adding song to playlist", error);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close 3-dot menu if clicked outside
      if (
        !event.target.closest(`.${styles.threedot}`) &&
        !event.target.closest(`.${styles.popupMenu}`)
      ) {
        setOpenMenuId(null);
      }
      // Close playlist popup if clicked outside
      if (!event.target.closest(`.${styles.playlistPopup}`)) {
        setShowPlaylistPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <Navbar showSearch={false} /> {/* Hide search bar here */}
      <section className={styles.main_section} style={{ marginBottom: "50px" }}>
        <LeftBar />

        <div className={styles.right_side}>
          <div className={styles.section_header}>
            <h2>Trending songs</h2>
            <Link to="/TredingSongs">Show all</Link>
          </div>

          <div className={styles.song_grid}>
            {songs.map((song) => (
              <div className={styles.song_card} key={song._id}>
                <div className={styles.image_wrapper}>
                  <img src={song.imageURL} alt={song.songname} />
                  <div
                    className={styles.play_icon}
                    onClick={() => togglePlay(song)}
                  >
                    {isLoggedIn ? (
                      songDetails.songURL === song.songURL && isPlaying ? (
                        <FaPause className={styles.audio_icon} />
                      ) : (
                        <FaPlay className={styles.audio_icon} />
                      )
                    ) : (
                      <Link to="/LogIn" className={styles.audio_icon_link}>
                        <FaPlay className={styles.audio_icon} />
                      </Link>
                    )}
                  </div>
                </div>
                <h3>{song.songname}</h3>
                <div className={styles.details}>
                  <span
                    className={styles.threedot}
                    onClick={() => handleThreeDotClick(song._id)}
                  >
                    <BsThreeDotsVertical />
                  </span>
                </div>
                {openMenuId === song._id && (
                  <div className={styles.popupMenu}>
                    <button
                      onClick={() => handleAddToPlaylistClick(song)}
                      className={styles.btn}
                    >
                      Add to Playlist
                    </button>
                  </div>
                )}
                <p>{song.artist.name}</p>
              </div>
            ))}
          </div>
          {showPlaylistPopup && (
            <div className={styles.playlistPopup}>
              <h4>Select a playlist</h4>
              <ul>
                {playlists.map((pl) => (
                  <li key={pl._id} onClick={() => handlePlaylistSelect(pl._id)}>
                    {pl.name}
                  </li>
                ))}
              </ul>
              <button
                className={styles.btn}
                onClick={() => setShowPlaylistPopup(false)}
              >
                Cancel
              </button>
            </div>
          )}
          <FooterUp />
        </div>
      </section>
      <MusicPlayer />
    </div>
  );
};

export default TrendingSongs;
