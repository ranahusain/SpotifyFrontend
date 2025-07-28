import Navbar from "../../components/Navbar/Navbar";
import LeftBar from "../../components/LeftBar/LeftBar";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./UserProfile.module.css";
import { CiUser } from "react-icons/ci";
import FooterUp from "../../components/FooterUp/FooterUp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SongContext } from "../../context/SongContext";
import { Link } from "react-router-dom";
import { FaPlay, FaPause } from "react-icons/fa";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";
import AvatarUpload from "../../components/AvatarUpload/AvatarUpload";
import { LuPencil } from "react-icons/lu";

const UserProfile = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const avatar = localStorage.getItem("avatar");
  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = JSON.parse(localStorage.getItem("user"));

    if (token) {
      setIsLoggedIn(true);
      setUsername(name.name);

      console.log("log in true set hogya");
      console.log(isLoggedIn);
    } else {
      setIsLoggedIn(false);
      console.log("log in false set hogya");
      console.log(isLoggedIn);
    }
  }, []);

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

  // get the playlist info
  const [playlists, setPlaylists] = useState([]);

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
  return (
    <>
      <Navbar />
      <section className={styles.main_section}>
        <LeftBar />
        <div className={styles.right_side}>
          <div className={styles.playlist_container}>
            <div className={styles.playlist_header}>
              <div
                className={styles.playlist_cover}
                onClick={() => setShowAvatarModal(true)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {avatar ? (
                  <img
                    src={avatar}
                    alt="User avatar"
                    className={styles.playlist_image}
                  />
                ) : (
                  <CiUser className={styles.playlist_cover_icon} />
                )}

                {isHovering && (
                  <div className={styles.overlay}>
                    <span
                      className={`${styles.overlay_text} ${styles.playlist_cover_icon}`}
                    >
                      <LuPencil />
                    </span>
                  </div>
                )}
              </div>

              <div>
                <p className={styles.playlist_label}>Profile</p>
                <h1 className={styles.playlist_title}>{username}</h1>
              </div>
            </div>
          </div>

          {showAvatarModal && (
            <div
              className={styles.modal_overlay}
              onClick={() => setShowAvatarModal(false)}
            >
              <div
                className={styles.modal_content}
                onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside content
              >
                <button
                  onClick={() => setShowAvatarModal(false)}
                  className={styles.closeButton}
                >
                  &times;
                </button>
                <AvatarUpload onClose={() => setShowAvatarModal(false)} />
              </div>
            </div>
          )}

          {/* //popular artist */}

          <div className={styles.section_header}>
            <h2>Top artists this month</h2>
            <Link to="PopularArtist">Show all</Link>
          </div>
          <p
            style={{
              margin: "-10px 0px 6px 35px",
              color: "gray",
              fontSize: "14px",
            }}
          >
            Only visible to you
          </p>
          <div className={styles.song_grid}>
            {songs.slice(2, 8).map((song) => (
              <div
                className={styles.song_card}
                key={song._id}
                onClick={() => navigate(`/Artist/${song.artist.name}`)}
              >
                <div className={styles.image_wrapper_1}>
                  <img src={song.artist.imageURL} alt={song.songname} />
                </div>
                <h3>{song.artist.name}</h3>
                <p>Artist</p>
              </div>
            ))}
          </div>

          {/* song here  */}

          <div className={styles.section_header}>
            <h2>Top tracks this month</h2>
            <Link to="/TredingSongs">Show all</Link>
          </div>

          <div className={styles.track_list}>
            {songs.slice(0, 3).map((song, index) => (
              <div className={styles.track_row} key={song._id}>
                <span className={styles.track_index}>{index + 1}</span>
                <div className={styles.track_image_wrapper}>
                  <img src={song.imageURL} alt={song.songname} />
                  <div
                    className={styles.track_play_icon}
                    onClick={() => togglePlay(song)}
                  >
                    {isLoggedIn ? (
                      <>
                        {songDetails.songURL === song.songURL && isPlaying ? (
                          <FaPause />
                        ) : (
                          <FaPlay />
                        )}
                      </>
                    ) : (
                      <Link to="/LogIn" className={styles.audio_icon_link}>
                        <FaPlay />
                      </Link>
                    )}
                  </div>
                </div>
                <div className={styles.track_info}>
                  <h4>{song.songname}</h4>
                  <p>{song.artist.name}</p>
                </div>
                <div className={styles.track_duration}>2:22</div>
              </div>
            ))}
          </div>

          <div className={styles.section_header}>
            <h2>Your playlist</h2>
            <Link to="/PopularAlbum">Show all</Link>
          </div>
          <div className={styles.song_grid}>
            {playlists.map((playlist) => (
              <div className={styles.song_card} key={playlist._id}>
                <div className={styles.image_wrapper}>
                  <img
                    src={playlist.imageURL}
                    className={styles.playlistImage}
                  />
                </div>
                <h3 className={styles.playlistName}>{playlist.name}</h3>
                <p className={styles.ownerName}>Spotify</p>
              </div>
            ))}
          </div>
          <FooterUp />
        </div>
      </section>
      <MusicPlayer />
    </>
  );
};

export default UserProfile;
