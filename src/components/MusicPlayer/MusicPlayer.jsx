import { useRef, useState, useEffect } from "react";
import styles from "./MusicPlayer.module.css";
import { FaPlay, FaPause } from "react-icons/fa";
import { ImNext2, ImPrevious2 } from "react-icons/im";
import { TiArrowShuffle } from "react-icons/ti";
import { RxLoop, RxSpeakerLoud } from "react-icons/rx";
import { HiOutlineQueueList } from "react-icons/hi2";
import { TbMicrophone2 } from "react-icons/tb";
import { IoHeadsetOutline } from "react-icons/io5";
import { BsMusicPlayer } from "react-icons/bs";
import { RiFullscreenLine } from "react-icons/ri";
import { PiScreencast } from "react-icons/pi";
import { toast } from "react-toastify";

import { useContext } from "react";
import { SongContext } from "../../context/SongContext";

function MusicPlayer() {
  const { songDetails, isPlaying, setIsPlaying } = useContext(SongContext);

  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
      if (!isNaN(audio.duration)) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener("timeupdate", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  const togglePlay = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.warning("Please log in to play music");
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  //when any of play pause change
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    if (isPlaying) {
      audio.play().catch((err) => console.log("Playback error:", err));
    } else {
      audio.pause();
    }
  }, [isPlaying, songDetails]);

  const handleSeek = (e) => {
    const bar = progressRef.current;
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = clickX / rect.width;
    const audio = audioRef.current;

    if (!isNaN(audio.duration)) {
      audio.currentTime = ratio * audio.duration;
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className={styles.main_container}>
      <audio ref={audioRef} src={songDetails.songURL} />

      {/* song div */}
      <div className={styles.song_info}>
        <img
          src={
            songDetails && songDetails.imageURL
              ? songDetails.imageURL
              : "https://bkbfkacpgdxbbunehdgi.supabase.co/storage/v1/object/public/songs/0.9786012616069567.png"
          }
        />
        <div>
          <p className={styles.song_title}>{songDetails.songName}</p>
          <p className={styles.song_artist}>{songDetails.artistName}</p>
        </div>
      </div>

      {/* control div */}
      <div className={styles.center_controls}>
        <div className={styles.buttons}>
          <button>
            <TiArrowShuffle />
          </button>
          <button>
            <ImPrevious2 />
          </button>
          <button onClick={togglePlay} className={styles.play_button}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button>
            <ImNext2 />
          </button>
          <button>
            <RxLoop />
          </button>
        </div>

        <div className={styles.progress_wrapper}>
          <span>{formatTime(currentTime)}</span>
          <div
            ref={progressRef}
            className={styles.progressBar}
            onClick={handleSeek}
          >
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* right Icons */}
      <div className={styles.side_controls}>
        <BsMusicPlayer />
        <TbMicrophone2 />
        <HiOutlineQueueList />
        <IoHeadsetOutline />
        <RxSpeakerLoud />
        <PiScreencast />
        <RiFullscreenLine />
      </div>
    </div>
  );
}

export default MusicPlayer;
