import type { FormEvent } from "react";
import styles from "./JoinModal.module.css";

interface JoinModalProps {
  show: boolean;
  guestDisplayName: string | null;
  joinName: string;
  joinError: string | null;
  joinLoading: boolean;
  onJoinNameChange: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
  onCancel: () => void;
}

export default function JoinModal({
  show,
  guestDisplayName,
  joinName,
  joinError,
  joinLoading,
  onJoinNameChange,
  onSubmit,
  onCancel,
}: JoinModalProps) {
  if (!show) return null;

  return (
    <div className={styles.joinOverlay}>
      <div className={styles.joinModal}>
        <h2>{guestDisplayName ? "Update your name" : "Join this album"}</h2>
        <p>
          Enter a display name so others can recognize your uploads and
          downloads.
        </p>

        {joinError && <div className={styles.joinError}>{joinError}</div>}

        <form onSubmit={onSubmit} className={styles.joinForm}>
          <input
            type="text"
            value={joinName}
            onChange={(event) => onJoinNameChange(event.target.value)}
            placeholder="Your name"
            className={styles.joinInput}
            autoFocus
          />
          <div className={styles.joinActions}>
            <button
              type="submit"
              className={styles.joinSubmit}
              disabled={joinLoading}
            >
              {joinLoading
                ? "Saving..."
                : guestDisplayName
                  ? "Update name"
                  : "Join as guest"}
            </button>
            {guestDisplayName && (
              <button
                type="button"
                className={styles.joinCancel}
                onClick={onCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
