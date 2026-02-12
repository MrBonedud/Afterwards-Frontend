import type { FormEvent } from "react";
import styles from "./AlbumEditPanel.module.css";

interface AlbumEditPanelProps {
  albumName: string;
  expiryHours: string;
  error: string | null;
  saving: boolean;
  onAlbumNameChange: (value: string) => void;
  onExpiryHoursChange: (value: string) => void;
  onSave: (event: FormEvent) => void;
  onCancel: () => void;
}

export default function AlbumEditPanel({
  albumName,
  expiryHours,
  error,
  saving,
  onAlbumNameChange,
  onExpiryHoursChange,
  onSave,
  onCancel,
}: AlbumEditPanelProps) {
  return (
    <form className={styles.editPanel} onSubmit={onSave}>
      <div className={styles.editFields}>
        <input
          className={styles.editInput}
          type="text"
          value={albumName}
          onChange={(event) => onAlbumNameChange(event.target.value)}
          placeholder="Album name"
        />
        <select
          className={styles.editSelect}
          value={expiryHours}
          onChange={(event) => onExpiryHoursChange(event.target.value)}
        >
          <option value="">Keep current expiry</option>
          <option value="24">Extend by 1 day</option>
          <option value="72">Extend by 3 days</option>
          <option value="168">Extend by 7 days</option>
        </select>
      </div>
      {error && <div className={styles.editError}>{error}</div>}
      <div className={styles.editActions}>
        <button type="submit" className={styles.editSave} disabled={saving}>
          {saving ? "Saving..." : "Save changes"}
        </button>
        <button type="button" className={styles.editCancel} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
