import styles from "./LogIn.module.css";
import { BsSpotify } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { supabase } from "../../supabaseClient";
import { toast } from "react-toastify";

const LogIn = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const hasSynced = useRef(false); // google login was causing three success messages

  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
    } else {
      submitForm(e);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login/", {
        email,
        password,
      });

      if (res.data.success) {
        const loggedInUser = res.data.user;
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        localStorage.setItem("token", res.data.token);
        toast.success("Logged in successfully!");
        navigate("/");
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during login.");
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/LogIn`,
        queryParams: {
          prompt: "select_account",
        },
      },
    });
    if (error) {
      toast.error("Google sign-in error: " + error.message);
    }
  };

  const syncGoogleUser = async (user, session) => {
    if (hasSynced.current) return; //  Skip if already synced
    hasSynced.current = true; //  Lock it

    try {
      const response = await axios.post(
        "http://localhost:5000/api/google-login",
        {
          name:
            user.user_metadata?.name ||
            user.email?.split("@")[0] ||
            "Google User",
          email: user.email,
          role: "user",
        }
      );
      const avatarURL = user.user_metadata.avatar_url;
      localStorage.setItem("avatar", avatarURL);

      if (response.data.success) {
        const { user: backendUser, token } = response.data;
        localStorage.setItem("user", JSON.stringify(backendUser));
        localStorage.setItem("token", token);
        const name = JSON.parse(localStorage.getItem("user"));
        localStorage.setItem("avatar", name.avatarURL);
        toast.success("Google login successful!");
        navigate("/");
      }
    } catch (error) {
      console.error("Google login failed:", error);
      toast.error("Google login failed.");
    }
  };

  useEffect(() => {
    const isAlreadyLoggedIn =
      localStorage.getItem("user") && localStorage.getItem("token");
    if (isAlreadyLoggedIn) return;

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          await syncGoogleUser(session.user, session);
        }
      }
    );

    const syncIfSessionExists = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session && session.user) {
        await syncGoogleUser(session.user, session);
      }
    };

    syncIfSessionExists();

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="maha_container">
      <div className={styles.main_container}>
        <div className={styles.container_bg}>
          <div className={styles.container}>
            <BsSpotify className={styles.logo} />
            <h1 className={styles.heading}>Log in to Spotify</h1>

            <form className={styles.form} onSubmit={handleNext}>
              {step >= 1 && (
                <>
                  <label>Email address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@domain.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </>
              )}

              {step >= 2 && (
                <>
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Example5%"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              )}

              <button type="submit" className={styles.next_btn}>
                {step < 2 ? "Continue" : "Log In"}
              </button>
            </form>

            <div className={styles.divider}>
              <hr />
              <span>or</span>
              <hr />
            </div>

            <div className={styles.social_buttons}>
              <button
                className={styles.google_btn}
                onClick={handleGoogleSignIn}
              >
                <img
                  src="https://img.icons8.com/color/16/000000/google-logo.png"
                  alt="Google logo"
                />
                Continue with Google
              </button>
              <button>
                <FaGithub className={styles.git_btn} />
                Continue with GitHub
              </button>
            </div>

            <p className={styles.login_link}>
              Don't have an Account? <Link to="/SignUp">SignUp here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
