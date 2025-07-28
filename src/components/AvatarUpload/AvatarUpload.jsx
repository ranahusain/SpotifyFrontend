import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./cropUtils";
import { supabase } from "../../supabaseClient";
import styles from "./AvatarUpload.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AvatarUpload = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    const imageDataUrl = await readFile(selectedFile);
    setImageSrc(imageDataUrl);
  };

  const readFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result));
      reader.readAsDataURL(file);
    });
  };

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleUpload = async () => {
    try {
      setUploading(true);
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { data, error } = await supabase.storage
        .from("songs")
        .upload(filePath, croppedBlob);

      if (error) throw error;

      const { data: url } = await supabase.storage
        .from("songs")
        .getPublicUrl(filePath);

      const avatarUrl = url.publicUrl;
      localStorage.setItem("avatar", avatarUrl);

      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user._id;

      await axios.put(`http://localhost:5000/api/update-avatar/${userId}`, {
        avatarURL: avatarUrl,
      });

      setTimeout(() => {
        if (onClose) onClose();
      }, 1500);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.uploadContainer}>
      <ToastContainer position="top-center" autoClose={3000} />
      <label className={styles.uploadLabel}>Image Upload</label>
      <input
        type="file"
        accept="image/*"
        className={styles.uploadInput}
        onChange={handleFileChange}
      />

      {imageSrc && (
        <div className={styles.cropContainer}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
      )}

      {imageSrc && (
        <button
          onClick={handleUpload}
          disabled={uploading}
          className={styles.uploadButton}
        >
          {uploading ? "Uploading..." : "Upload Cropped Image"}
        </button>
      )}
    </div>
  );
};

export default AvatarUpload;
