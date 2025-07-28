import "./App.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Router,
  RouterProvider,
} from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import LogIn from "./pages/LogIn/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import AddSong from "./pages/AddSong/AddSong";
import TrendingSongs from "./pages/TrendingSongs/TrendingSongs";
import PopularArtist from "./pages/PopularArtist/PopularArstist";
import PopularAlbum from "./pages/PopularAlbum/PopularAlbum";
import Playlist from "./pages/PlayList/PlayList";
import MainPlayListPage from "./pages/MainPlayListPage/MainPlayListPage";
import ArtistDetail from "./pages/ArtistDetail/ArtistDetail";
import UserProfile from "./pages/UserProfile/UserProfile";
import Payment from "./pages/Payment/Payment";
import Plans from "./pages/Plans/Plans";
import Support from "./pages/Support/Support";
import MainLayout from "./layouts/MainLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/AddSong" element={<AddSong />} />
        <Route path="/TredingSongs" element={<TrendingSongs />} />
        <Route path="/PopularArtist" element={<PopularArtist />} />
        <Route path="/PopularAlbum" element={<PopularAlbum />} />
        <Route path="/Playlist/:id" element={<Playlist />} />
        <Route path="/Playlist/" element={<MainPlayListPage />} />
        <Route path="/artist/:artistname" element={<ArtistDetail />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/Plans" element={<Plans />} />
        <Route path="/Support" element={<Support />} />
      </Route>
    </>
  )
);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
