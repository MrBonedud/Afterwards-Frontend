import type { ChangeEvent, RefObject } from "react";
import styles from "./ActionButtons.module.css";
import upload from "../../assets/upload.svg";
import link from "../../assets/link.svg";

interface ActionButtonsProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  onFileSelect: (event: ChangeEvent<HTMLInputElement>) => void;
  onUploadClick: () => void;
  onShareClick: () => void;
}

export default function ActionButtons({
  fileInputRef,
  onFileSelect,
  onUploadClick,
  onShareClick,
}: ActionButtonsProps) {
  return (
    <div className={styles.actions}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={onFileSelect}
        style={{ display: "none" }}
      />
      <button
        className={styles.uploadButton}
        onClick={onUploadClick}
        title="Upload photos"
      >
        <img src={upload} alt="Upload" />
      </button>
      <button
        className={styles.shareButton}
        onClick={onShareClick}
        title="Copy link"
      >
        <img src={link} alt="Share link" />
      </button>
    </div>
  );
}
