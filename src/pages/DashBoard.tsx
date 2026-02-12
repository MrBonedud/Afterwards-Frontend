import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { API_URL } from "../config/api";
import styles from "./DashBoard.module.css";
import axios from "axios";
import camera from "../assets/camera.svg";
import users from "../assets/account-group.svg";
import add from "../assets/plus.svg";
interface Album {
  id: string;
  name: string;
  createdAt: string;
  expiresAt: string;
  photoCount: number;
  participantCount: number;
  isCreator: boolean;
}

export default function DashBoard() {
  const { isSignedIn } = useAuth();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [editingAlbumId, setEditingAlbumId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editExpiryHours, setEditExpiryHours] = useState("");

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`${API_URL}/albums/my-albums`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAlbums(response.data.albums);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch");
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if user is logged in
    if (isSignedIn && token) {
      fetchAlbums();
    }
  }, [isSignedIn, token]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1>My Albums</h1>
        <button
          className={styles.createButton}
          type="button"
          onClick={() => navigate("/albums/new")}
        >
          <img src={add} alt="add album" className={styles.createIcon} />
        </button>
      </div>

      {actionError && <div className={styles.errorBanner}>{actionError}</div>}

      {albums.length === 0 ? (
        <p>No albums yet. Create one!</p>
      ) : (
        <div className={styles.albumsGrid}>
          {albums.map((album) => (
            <div key={album.id} className={styles.albumCard}>
              <h3>{album.name || "Untitled Album"}</h3>
              <p>
                <img src={camera} alt="camera" className={styles.icon} />{" "}
                {album.photoCount} photos
              </p>
              <p>
                <img src={users} alt="users" className={styles.icon} />{" "}
                {album.participantCount} participants
              </p>
              <p>Created: {new Date(album.createdAt).toLocaleDateString()}</p>
              <p>Expires: {new Date(album.expiresAt).toLocaleDateString()}</p>
              {album.isCreator && <span className={styles.badge}>Creator</span>}
              <a href={`/albums/${album.id}`}>View Album →</a>

              {album.isCreator && (
                <div className={styles.cardActions}>
                  {editingAlbumId === album.id ? (
                    <form
                      className={styles.editForm}
                      onSubmit={async (event) => {
                        event.preventDefault();
                        setActionError(null);
                        const token = localStorage.getItem("token");
                        if (!token) return;

                        try {
                          const payload: {
                            name?: string;
                            expiryHours?: number;
                          } = {};

                          payload.name = editName;
                          if (editExpiryHours) {
                            payload.expiryHours = Number(editExpiryHours);
                          }

                          const response = await axios.put(
                            `${API_URL}/albums/${album.id}`,
                            payload,
                            {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            },
                          );

                          setAlbums((prev) =>
                            prev.map((item) =>
                              item.id === album.id
                                ? {
                                    ...item,
                                    name: response.data.name,
                                    expiresAt: response.data.expiresAt,
                                  }
                                : item,
                            ),
                          );
                          setEditingAlbumId(null);
                          setEditExpiryHours("");
                        } catch (err) {
                          setActionError(
                            err instanceof Error
                              ? err.message
                              : "Failed to update album",
                          );
                        }
                      }}
                    >
                      <input
                        className={styles.editInput}
                        type="text"
                        value={editName}
                        onChange={(event) => setEditName(event.target.value)}
                        placeholder="Album name"
                      />
                      <select
                        className={styles.editSelect}
                        value={editExpiryHours}
                        onChange={(event) =>
                          setEditExpiryHours(event.target.value)
                        }
                      >
                        <option value="">Keep current expiry</option>
                        <option value="24">Extend by 1 day</option>
                        <option value="72">Extend by 3 days</option>
                        <option value="168">Extend by 7 days</option>
                      </select>
                      <div className={styles.actionRow}>
                        <button type="submit" className={styles.primaryAction}>
                          Save
                        </button>
                        <button
                          type="button"
                          className={styles.secondaryAction}
                          onClick={() => {
                            setEditingAlbumId(null);
                            setEditExpiryHours("");
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className={styles.actionRow}>
                      <button
                        type="button"
                        className={styles.secondaryAction}
                        onClick={() => {
                          setEditingAlbumId(album.id);
                          setEditName(album.name || "");
                          setEditExpiryHours("");
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className={styles.deleteAction}
                        onClick={async () => {
                          const token = localStorage.getItem("token");
                          if (!token) return;
                          const confirmed = window.confirm(
                            "Delete this album? This cannot be undone.",
                          );
                          if (!confirmed) return;

                          try {
                            await axios.delete(
                              `${API_URL}/albums/${album.id}`,
                              {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              },
                            );
                            setAlbums((prev) =>
                              prev.filter((item) => item.id !== album.id),
                            );
                          } catch (err) {
                            setActionError(
                              err instanceof Error
                                ? err.message
                                : "Failed to delete album",
                            );
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
