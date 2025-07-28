import styles from "./NavBar.module.css";
import { GoHomeFill } from "react-icons/go";
import { FaSpotify } from "react-icons/fa";
import { IoFolderOpenOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { MdOutlineDownloading } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { toast } from "react-toastify";

const Navbar = ({ showSearch = true }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = JSON.parse(localStorage.getItem("user"));
    if (token && name) {
      setIsLoggedIn(true);
      setUsername(name.name);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("avatar");

    setIsLoggedIn(false);
    setUsername("");
    toast.success("Logged out successfully!");
    navigate("/");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const location = useLocation();
  const [search, setSearch] = useState("");

  // Keep input in sync with query param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearch(params.get("q") || "");
  }, [location.search]);

  //updates the URL when User types
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    const params = new URLSearchParams(location.search);
    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    navigate({ search: params.toString() });
  };

  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.nav_left}>
          <Link to="/">
            <FaSpotify className={styles.nav_img} />
          </Link>

          <Link to="/">
            <GoHomeFill className={styles.nav_img_1} />
          </Link>

          {showSearch && (
            <div className={styles.search_bar}>
              <IoSearch className={styles.icon} />
              <input
                type="text"
                placeholder="What do you want to play?"
                value={search}
                onChange={handleSearchChange}
              />
              <span className={styles.separator}>|</span>
              <IoFolderOpenOutline className={styles.icon} />
            </div>
          )}
        </div>

        <ul className={styles.nav_right}>
          <li>
            <Link to="/plans">Premium</Link>
          </li>
          <li>
            <Link to="/support">Support</Link>
          </li>

          {isLoggedIn ? (
            <li>
              <Link to="/Playlist/">Playlist</Link>
            </li>
          ) : (
            <li>
              <Link to="#">Download</Link>
            </li>
          )}

          <li>
            <span className={styles.separator}>|</span>
          </li>
          <MdOutlineDownloading className={styles.download_icon} />

          <li>
            <Link to="#">Install App</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/UserProfile">
                  <h3 style={{ marginBottom: "20px" }}>Welcome, {username}</h3>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <button
                    type="button"
                    className={styles.nav_btn}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/SignUp">Signup</Link>
              </li>
              <li>
                <Link to="/LogIn">
                  <button type="button" className={styles.nav_btn}>
                    Login
                  </button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
