// import { useState } from "react";
// import { supabase } from "../../supabaseClient";
// import styles from "./ImageUpload.module.css";
// import { toast } from "react-toastify";

// const ImageUpload = ({ OnUpload }) => {
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [fileURL, setFileURL] = useState("");
//   const [isUploaded, setIsUploaded] = useState(false);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]); //here we set the file
//   };

//   const handleUpload = async () => {
//     try {
//       setUploading(true);

//       if (!file) {
//         toast.error("Please select a file to upload");
//         return;
//       }

//       const fileExt = file.name.split(".").pop();
//       const fileName = `${Math.random()}.${fileExt}`;
//       const filePath = `${fileName}`;

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
//       toast.success("File uploaded successfully");
//       setIsUploaded(true);
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to upload file");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <>
//       <div className={styles.uploadContainer}>
//         {/* <label className={styles.uploadLabel}>Image Upload</label> */}
//         <input
//           type="file"
//           onChange={handleFileChange}
//           className={styles.uploadInput}
//           accept=".png, .jpeg, .jpg"
//         />
//         {!isUploaded && (
//           <button
//             onClick={handleUpload}
//             disabled={uploading}
//             className={styles.uploadButton}
//           >
//             {uploading ? "Uploading..." : "Upload"}
//           </button>
//         )}
//         {/* {fileURL && <p className={styles.uploadURL}>File URL: {fileURL}</p>} */}
//       </div>
//     </>
//   );
// };

// export default ImageUpload;

import { useState } from "react";
import { supabase } from "../../supabaseClient";
import styles from "./ImageUpload.module.css";
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
        accept=".png, .jpeg, .jpg"
        disabled={uploading || isUploaded}
      />
    </div>
  );
};

export default SongUpload;
