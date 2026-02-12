import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/api";
import styles from "./CreateAlbumPage.module.css";

export default function CreateAlbumPage() {
  const storedDisplayName = (() => {
    try {
      const rawUser = localStorage.getItem("user");
      if (!rawUser) return "";
      const parsed = JSON.parse(rawUser) as {
        displayName?: string;
        email?: string;
      };
      return parsed.displayName || parsed.email || "";
    } catch {
      return "";
    }
  })();

  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState(storedDisplayName);
  const [expiryHours, setExpiryHours] = useState(24);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const finalDisplayName = displayName.trim() || storedDisplayName.trim();

      if (!finalDisplayName) {
        setError("Please enter a display name.");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${API_URL}/albums`,
        { name, displayName: finalDisplayName, expiryHours },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const albumId = response.data.albumId as string;
      navigate(`/albums/${albumId}`);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create album");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Create Album</h1>
        <p className={styles.subtitle}>Set up a shareable album in seconds.</p>

        <form onSubmit={handleCreate} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <label className={styles.label} htmlFor="name">
            Album name (optional)
          </label>
          <input
            id="name"
            className={styles.input}
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Weekend Trip"
          />

          <label className={styles.label} htmlFor="displayName">
            Your display name (optional)
          </label>
          <input
            id="displayName"
            className={styles.input}
            type="text"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            placeholder={storedDisplayName || "Alex"}
          />
          {storedDisplayName && (
            <p className={styles.helper}>
              Using your account name: {storedDisplayName}
            </p>
          )}

          <label className={styles.label} htmlFor="expiryHours">
            Album duration
          </label>
          <select
            id="expiryHours"
            className={styles.select}
            value={expiryHours}
            onChange={(event) => setExpiryHours(Number(event.target.value))}
          >
            <option value={24}>1 day</option>
            <option value={72}>3 days</option>
            <option value={168}>7 days</option>
          </select>

          <button className={styles.button} type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Album"}
          </button>
        </form>
      </div>
    </div>
  );
}
