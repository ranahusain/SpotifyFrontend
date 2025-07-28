import styles from "./AddSong.module.css";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import SongUpload from "../../components/SongUpload/SongUpload";
import { BsSpotify } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const AddSong = () => {
  const [songname, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [artistImageURL, setArtistImageURL] = useState("");
  const [albumName, setAlbumName] = useState("");
  const [albumImageURL, setAlbumImageURL] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [songURL, setSongURL] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/addsong/", {
        songname,
        artistName,
        artistImageURL,
        imageURL,
        songURL,
        albumName,
        albumImageURL,
      });
      console.log(res.data);

      // Clear form
      setSongName("");
      setArtistName("");
      setArtistImageURL("");
      setAlbumName("");
      setAlbumImageURL("");
      setImageURL("");
      setSongURL("");
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!userData || userData.email !== "admin@gmail.com") {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.container}>
          <h1 className={styles.heading}>
            Add a Song
            <span>
              <BsSpotify className={styles.logo} />
            </span>
          </h1>

          <form className={styles.form} onSubmit={submitForm}>
            <label>Song Name</label>
            <input
              type="text"
              placeholder="Blinding Lights"
              required
              value={songname}
              onChange={(e) => setSongName(e.target.value)}
            />

            <label>Artist Name</label>
            <input
              type="text"
              placeholder="The Weeknd"
              required
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
            />

            <label>Artist Image URL</label>
            <input
              type="text"
              placeholder="https://..."
              required
              value={artistImageURL}
              onChange={(e) => setArtistImageURL(e.target.value)}
            />
            <ImageUpload OnUpload={setArtistImageURL} />

            <label>Album Name (optional)</label>
            <input
              type="text"
              placeholder="After Hours"
              value={albumName}
              onChange={(e) => setAlbumName(e.target.value)}
            />

            <label>Album Image URL (optional)</label>
            <input
              type="text"
              placeholder="https://..."
              value={albumImageURL}
              onChange={(e) => setAlbumImageURL(e.target.value)}
            />
            <ImageUpload OnUpload={setAlbumImageURL} />

            <label>Song Cover Image URL</label>
            <input
              type="text"
              placeholder="https://..."
              required
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
            <ImageUpload OnUpload={setImageURL} />

            <label>Song URL</label>
            <input
              type="text"
              placeholder="https://..."
              required
              value={songURL}
              onChange={(e) => setSongURL(e.target.value)}
            />
            <SongUpload OnUpload={setSongURL} />

            <button type="submit" className={styles.next_btn}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddSong;
