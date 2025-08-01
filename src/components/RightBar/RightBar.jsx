import React, { useState, useEffect } from "react";
import styles from "./RightBar.module.css";
import axios from "axios";
import { FaPlay, FaPause } from "react-icons/fa";
import FooterUp from "../FooterUp/FooterUp";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useContext } from "react";
import { SongContext } from "../../context/SongContext";

import { useNavigate, useLocation } from "react-router-dom";

const RightBar = () => {
  const navigate = useNavigate();

  const { songDetails, setSongDetails, isPlaying, setIsPlaying } =
    useContext(SongContext);
  const [loading, setLoading] = useState(true);

  const [songs, setSong] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchsongs = async () => {
      try {
        const res = await axios.get(
          "https://spotifybackend-4.onrender.com/api/getsong"
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

  // Get search query from URL
  const params = new URLSearchParams(location.search);
  const q = params.get("q") || "";

  // Filter only for trending songs section
  const filteredSongs = q
    ? songs.filter(
        (song) =>
          song.songname?.toLowerCase().includes(q.toLowerCase()) ||
          song.artist?.name?.toLowerCase().includes(q.toLowerCase())
      )
    : songs;

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

  return (
    <div className={styles.right_side}>
      <div className={styles.section_header}>
        <h2>Trending songs</h2>
        <Link to="/TredingSongs">Show all</Link>
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
          filteredSongs.map((song) => (
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
              <p>{song.artist.name}</p>
            </div>
          ))
        )}
      </div>

      {/* //popular artist */}
      <div className={styles.section_header}>
        <h2>Popular artists</h2>
        <Link to="PopularArtist">Show all</Link>
      </div>
      <div className={styles.song_grid}>
        {loading ? (
          <SkeletonTheme baseColor="#2a2a2a" highlightColor="#3e3e3e">
            {Array.from({ length: 7 }).map((_, i) => (
              <div className={styles.song_card} key={i}>
                <div className={styles.image_wrapper_1}>
                  <Skeleton circle={true} height={150} width={150} />
                </div>
                <h3>
                  <Skeleton width={80} />
                </h3>
                <p>
                  <Skeleton width={40} />
                </p>
              </div>
            ))}
          </SkeletonTheme>
        ) : (
          songs.map((song) => (
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
          ))
        )}
      </div>

      <div className={styles.section_header}>
        <h2>Popular albums and singles</h2>
        <Link to="/PopularAlbum">Show all</Link>
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
  );
};

export default RightBar;
