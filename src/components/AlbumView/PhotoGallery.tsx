import styles from "./PhotoGallery.module.css";
import download from "../../assets/download.svg";

interface Photo {
  id: string;
  filename: string;
  url: string;
  uploadedBy: string | null;
  uploadedAt: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  onDownload: (photo: Photo) => void;
}

export default function PhotoGallery({
  photos,
  onDownload,
}: PhotoGalleryProps) {
  return (
    <div className={styles.photosSection}>
      <h2>Photos ({photos.length})</h2>

      {photos.length === 0 ? (
        <p className={styles.emptyState}>
          No photos yet. Be the first to upload!
        </p>
      ) : (
        <div className={styles.photoTimeline}>
          {photos
            .sort(
              (a, b) =>
                new Date(a.uploadedAt).getTime() -
                new Date(b.uploadedAt).getTime(),
            )
            .map((photo) => (
              <div key={photo.id} className={styles.photoItem}>
                <img
                  src={photo.url}
                  alt={photo.filename}
                  className={styles.photo}
                />
                <div className={styles.photoMeta}>
                  <span className={styles.uploader}>
                    {photo.uploadedBy || "Anonymous"}
                  </span>
                  <span className={styles.uploadTime}>
                    {new Date(photo.uploadedAt).toLocaleString()}
                  </span>
                </div>
                <button
                  className={styles.downloadButton}
                  onClick={() => onDownload(photo)}
                  title="Download photo"
                >
                  <img src={download} alt="Download" />
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
