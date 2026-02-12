import styles from "./UploadSection.module.css";
import image from "../../assets/image.svg";
import close from "../../assets/close.svg";

interface UploadSectionProps {
  selectedFiles: File[];
  uploading: boolean;
  onUpload: () => void;
  onRemoveFile: (index: number) => void;
}

export default function UploadSection({
  selectedFiles,
  uploading,
  onUpload,
  onRemoveFile,
}: UploadSectionProps) {
  if (selectedFiles.length === 0) return null;

  return (
    <div className={styles.selectedFilesSection}>
      <h3>Selected Files ({selectedFiles.length})</h3>
      <div className={styles.filesList}>
        {selectedFiles.map((file, index) => (
          <div key={index} className={styles.fileItem}>
            <div className={styles.fileMeta}>
              <img src={image} alt="Image" />
              <span>{file.name}</span>
            </div>
            <button
              type="button"
              className={styles.removeButton}
              onClick={() => onRemoveFile(index)}
              disabled={uploading}
              aria-label={`Remove ${file.name}`}
            >
              <img src={close} alt="" />
            </button>
          </div>
        ))}
      </div>
      <button
        className={styles.sendButton}
        onClick={onUpload}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Send Photos"}
      </button>
    </div>
  );
}
