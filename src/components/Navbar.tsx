import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Trigger storage event for other components
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <a href="/">Afterwards</a>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.navLinks}>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#faq">FAQ</a>
          <a href="/privacy">Privacy</a>
        </div>

        <div className={styles.authButton}>
          {isSignedIn ? (
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          ) : (
            <button onClick={handleSignInClick}>Sign In</button>
          )}
        </div>
      </div>
    </nav>
  );
}
