//----------------- if you ever wanted image upload -------------------------- //

// import { useState } from "react";
// import { supabase } from "../../supabaseClient";
// import styles from "./SongUpload.module.css";
// const SongUpload = ({ OnUpload }) => {
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [fileURL, setFileURL] = useState("");

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]); //here we set the file
//   };

//   const handleUpload = async () => {
//     try {
//       setUploading(true);

//       if (!file) {
//         alert("Please select a file to upload");
//         return;
//       }

//       const fileExt = file.name.split(".").pop(); //get the file extension mp3,png,jpeg
//       console.log(fileExt);
//       const fileName = `${Math.random()}.${fileExt}`; //generate random math number to avoid duplication with . attach the extension 3084096438.png
//       console.log(fileName);
//       const filePath = `${fileName}`; //file path with math number generated and  extension all at one place clean
//       console.log(filePath);

//       let { data, error } = await supabase.storage
//         .from("songs")
//         .upload(filePath, file);

//       if (error) {
//         throw error;
//       }

//       const { data: url } = await supabase.storage
//         .from("songs")
//         .getPublicUrl(filePath);

//       setFileURL(url.publicUrl);
//       OnUpload(url.publicUrl);
//       alert("File Uploaded Successfully");
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setUploading(false);
//     }
//   };
//   return (
//     <>
//       <div className={styles.uploadContainer}>
//         <label className={styles.uploadLabel}>Song Upload</label>
//         <input
//           type="file"
//           onChange={handleFileChange}
//           className={styles.uploadInput}
//           accept=".mp3"
//         />
//         <button
//           onClick={handleUpload}
//           disabled={uploading}
//           className={styles.uploadButton}
//         >
//           {uploading ? "Uploading..." : "Upload"}
//         </button>
//         {fileURL && <p className={styles.uploadURL}>File URL: {fileURL}</p>}
//       </div>
//     </>
//   );
// };

// export default SongUpload;

import { useState } from "react";
import { supabase } from "../../supabaseClient";
import styles from "./SongUpload.module.css";
import { toast } from "react-toastify";

const SongUpload = ({ OnUpload }) => {
  const [uploading, setUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
    await handleUpload(selectedFile); // Auto-upload when selected
  };

  const handleUpload = async (file) => {
    try {
      setUploading(true);

      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error } = await supabase.storage
        .from("songs")
        .upload(filePath, file);

      if (error) throw error;

      const { data: url } = await supabase.storage
        .from("songs")
        .getPublicUrl(filePath);

      OnUpload(url.publicUrl);
      toast.success("File uploaded successfully");
      setIsUploaded(true);
    } catch (error) {
      console.error(error);
      toast.error("File upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.uploadContainer}>
      <input
        type="file"
        onChange={handleFileChange}
        className={styles.uploadInput}
        accept=".mp3"
        disabled={uploading || isUploaded}
      />
    </div>
  );
};

export default SongUpload;
