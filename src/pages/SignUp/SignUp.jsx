import styles from "./SignUp.module.css";
import { BsSpotify } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { supabase } from "../../supabaseClient";
import { toast } from "react-toastify";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationStep, setIsVerificationStep] = useState(false);

  const hasSynced = useRef(false); // prevent multiple syncs
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      submitForm(e);
    }
  };

  // const submitForm = async (e) => {
  //   if (!isVerificationStep) {
  //     try {
  //       const res = await axios.post("https://spotifybackend-4.onrender.com/api/signup/", {
  //         name,
  //         email,
  //         password,
  //       });

  //       if (res.data.success) {
  //         toast.success("Verification code sent to your email!");
  //         setIsVerificationStep(true); // enable verification UI
  //         return; // ⛔️ Don't go further yet
  //       } else {
  //         toast.error("Signup failed. Try again.");
  //         return;
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       toast.error("Something went wrong during sign-up.");
  //       return;
  //     }
  //   }

  //   e.preventDefault();
  //   const newUser = { name, email, password };
  //   try {
  //     const res = await axios.post(
  //       "https://spotifybackend-4.onrender.com/api/signup/",
  //       newUser
  //     );

  //     if (res.data.success) {
  //       if (isVerificationStep) {
  //         try {
  //           const res = await axios.post(
  //             "https://spotifybackend-4.onrender.com/api/verify-email",
  //             {
  //               email,
  //               code: verificationCode,
  //             }
  //           );

  //           if (res.status === 200) {
  //             toast.success("Email verified! Welcome email sent.");
  //           } else {
  //             toast.error("Invalid verification code.");
  //             return;
  //           }
  //         } catch (err) {
  //           toast.error("Verification failed. Try again.");
  //           return;
  //         }
  //       }

  //       if (res.data.token) {
  //         const loggedInUser = res.data.user;
  //         localStorage.setItem("user", JSON.stringify(loggedInUser));
  //         localStorage.setItem("token", res.data.token);
  //         toast.success("Account created successfully!");
  //         return navigate("/");
  //       }
  //     } else {
  //       toast.error("Sign up failed. Please try again.");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something went wrong during sign-up.");
  //   }
  // };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!isVerificationStep) {
      try {
        const res = await axios.post(
          "https://spotifybackend-4.onrender.com/api/signup/",
          {
            name,
            email,
            password,
          }
        );

        if (res.data.success) {
          toast.success("Verification code sent to your email!");
          setIsVerificationStep(true);
        } else {
          toast.error("Signup failed. Try again.");
        }
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong during sign-up.");
      }
    } else {
      try {
        const res = await axios.post(
          "https://spotifybackend-4.onrender.com/api/verify-code",
          {
            email,
            code: verificationCode,
          }
        );

        if (res.status === 200) {
          toast.success("Email verified! Welcome email sent.");

          const user = res.data.user;
          const token = res.data.token;

          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", token);

          navigate("/");
        } else {
          toast.error("Invalid verification code.");
        }
      } catch (err) {
        toast.error("Verification failed. Try again.");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/SignUp`,
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
    if (hasSynced.current) return;
    hasSynced.current = true;

    try {
      const response = await axios.post(
        "https://spotifybackend-4.onrender.com/api/google-login",
        {
          name:
            user.user_metadata?.name ||
            user.email?.split("@")[0] ||
            "Google User",
          email: user.email,
          role: "user",
        }
      );

      if (response.data.success) {
        const { user: backendUser, token } = response.data;
        localStorage.setItem("user", JSON.stringify(backendUser));
        localStorage.setItem("token", token);
        toast.success("Signed up with Google!");
        navigate("/");
      }
    } catch (error) {
      console.error("Google login failed:", error);
      toast.error("Google sign-up failed.");
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
        <div className={styles.container}>
          <BsSpotify className={styles.logo} />
          <h1>
            Sign up to <br />
            start listening
          </h1>

          <form
            className={styles.form}
            onSubmit={isVerificationStep ? submitForm : handleNext}
          >
            {step >= 1 && (
              <>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </>
            )}

            {step >= 2 && (
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

            {step >= 3 && (
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
            {isVerificationStep && (
              <>
                <label>Verification Code</label>
                <input
                  type="text"
                  name="verificationCode"
                  placeholder="Enter code from email"
                  required
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
              </>
            )}

            {!isVerificationStep ? (
              <button type="submit" className={styles.next_btn}>
                {step < 3 ? "Next" : "Sign Up"}
              </button>
            ) : (
              <button type="submit" className={styles.next_btn}>
                Verify Email
              </button>
            )}
          </form>

          <div className={styles.divider}>
            <hr />
            <span>or</span>
            <hr />
          </div>

          <div className={styles.social_buttons}>
            <button className={styles.google_btn} onClick={handleGoogleSignIn}>
              <img
                src="https://img.icons8.com/color/16/000000/google-logo.png"
                alt="Google logo"
              />
              Sign up with Google
            </button>
            <button>
              <FaGithub className={styles.git_btn} />
              Sign up with Github
            </button>
          </div>

          <p className={styles.login_link}>
            Already have an account? <Link to="/LogIn">Log in here</Link>
          </p>

          <footer>
            <p>
              This site is protected by reCAPTCHA and the Google
              <br />
              <Link to="#">Privacy Policy</Link> and
              <Link to="#">Terms of Service</Link> apply.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
