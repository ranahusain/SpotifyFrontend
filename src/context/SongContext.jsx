import { Children, createContext, useState } from "react";

//create context
export const SongContext = createContext();

//create provider
export const SongProvider = ({ children }) => {
  const [songDetails, setSongDetails] = useState({
    songURL: "",
    imageURL: "",
    artistName: "",
    songName: "",
  });

  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <SongContext.Provider
      value={{ songDetails, setSongDetails, isPlaying, setIsPlaying }}
    >
      {children}
    </SongContext.Provider>
  );
};
