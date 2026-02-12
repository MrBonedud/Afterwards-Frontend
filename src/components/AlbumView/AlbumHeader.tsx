import styles from "./AlbumHeader.module.css";

interface AlbumHeaderProps {
  albumName: string | null;
  expiresAt: string | undefined;
  isSignedIn: boolean;
  isCreator: boolean;
  guestDisplayName: string | null;
  onJoinClick: () => void;
  onEditClick: () => void;
}

export default function AlbumHeader({
  albumName,
  expiresAt,
  isSignedIn,
  isCreator,
  guestDisplayName,
  onJoinClick,
  onEditClick,
}: AlbumHeaderProps) {
  const formatExpiryDate = () => {
    if (!expiresAt) return "N/A";
    try {
      const date = new Date(expiresAt);
      if (isNaN(date.getTime())) return "N/A";
      return date.toLocaleDateString();
    } catch {
      return "N/A";
    }
  };

  return (
    <div className={styles.headerRow}>
      <div>
        <h1>{albumName || "Untitled Album"}</h1>
        <p>Expires: {formatExpiryDate()}</p>
      </div>
      <div className={styles.guestActions}>
        {!isSignedIn && (
          <button
            type="button"
            className={styles.joinButton}
            onClick={onJoinClick}
          >
            {guestDisplayName ? "Edit name" : "Join as guest"}
          </button>
        )}
        {isCreator && (
          <button
            type="button"
            className={styles.editButton}
            onClick={onEditClick}
          >
            Edit album
          </button>
        )}
      </div>
    </div>
  );
}
