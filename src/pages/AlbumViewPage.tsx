import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { AxiosResponse } from "axios";
import { API_URL } from "../config/api";
import { useAuth } from "../hooks/useAuth";
import styles from "./AlbumViewPage.module.css";
import AlbumHeader from "../components/AlbumView/AlbumHeader";
import AlbumEditPanel from "../components/AlbumView/AlbumEditPanel";
import ParticipantsList from "../components/AlbumView/ParticipantsList";
import PhotoGallery from "../components/AlbumView/PhotoGallery";
import UploadSection from "../components/AlbumView/UploadSection";
import ActionButtons from "../components/AlbumView/ActionButtons";
import JoinModal from "../components/AlbumView/JoinModal";
import Toast from "../components/AlbumView/Toast";

interface Photo {
  id: string;
  filename: string;
  url: string;
  uploadedBy: string | null;
  uploadedAt: string;
}

interface Participant {
  displayName: string;
  joinedAt: string;
}

interface AlbumData {
  albumId: string;
  name: string | null;
  createdAt: string;
  expiresAt: string;
  isCreator: boolean;
  participants: Participant[];
  photos: Photo[];
}

export default function AlbumViewPage() {
  const { albumId } = useParams<{ albumId: string }>();
  const { isSignedIn } = useAuth();
  const [album, setAlbum] = useState<AlbumData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    tone: "success" | "error";
  } | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [guestDisplayName, setGuestDisplayName] = useState<string | null>(null);
  const [showJoinPrompt, setShowJoinPrompt] = useState(false);
  const [joinName, setJoinName] = useState("");
  const [joinLoading, setJoinLoading] = useState(false);
  const [joinError, setJoinError] = useState<string | null>(null);
  const [isEditingAlbum, setIsEditingAlbum] = useState(false);
  const [editAlbumName, setEditAlbumName] = useState("");
  const [editExpiryHours, setEditExpiryHours] = useState("");
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const hasAttemptedJoin = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const normalizedApiUrl = API_URL.replace(/\/+$/, "");
  const apiBaseCandidates = useMemo(
    () => Array.from(new Set([normalizedApiUrl, `${normalizedApiUrl}/api`])),
    [normalizedApiUrl],
  );

  const buildApiCandidates = useCallback(
    (paths: string[]) =>
      Array.from(
        new Set(
          apiBaseCandidates.flatMap((base) =>
            paths.map(
              (path) => `${base}${path.startsWith("/") ? path : `/${path}`}`,
            ),
          ),
        ),
      ),
    [apiBaseCandidates],
  );

  useEffect(() => {
    hasAttemptedJoin.current = false;
  }, [albumId]);

  const refreshAlbum = useCallback(async () => {
    if (!albumId) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const albumCandidates = buildApiCandidates([`/albums/${albumId}`]);

      let resolvedAlbum: AlbumData | null = null;
      let lastError: unknown = null;

      for (const endpoint of albumCandidates) {
        try {
          const response = await axios.get(endpoint, {
            withCredentials: true,
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          });
          resolvedAlbum = response.data as AlbumData;
          break;
        } catch (err) {
          lastError = err;
          if (axios.isAxiosError(err) && err.response?.status === 404) {
            continue;
          }
          throw err;
        }
      }

      if (!resolvedAlbum) {
        throw lastError instanceof Error
          ? lastError
          : new Error("Album endpoint not found");
      }

      setAlbum(resolvedAlbum);
      setError(null);
    } catch (err) {
      setAlbum(null);
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        setError("Album not found or expired.");
      } else {
        setError(err instanceof Error ? err.message : "Failed to load album");
      }
    } finally {
      setLoading(false);
    }
  }, [albumId, buildApiCandidates]);

  useEffect(() => {
    refreshAlbum();
  }, [refreshAlbum]);

  useEffect(() => {
    if (isSignedIn) {
      setShowJoinPrompt(false);
    }
  }, [isSignedIn]);

  const getStoredUserDisplayName = () => {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) return "";
      const user = JSON.parse(userStr) as {
        displayName?: string;
        email?: string;
      };
      return user.displayName || user.email || "";
    } catch {
      return "";
    }
  };

  const showToastMessage = useCallback(
    (message: string, tone: "success" | "error") => {
      setToast({ message, tone });
      setTimeout(() => setToast(null), 3000);
    },
    [],
  );

  useEffect(() => {
    if (!albumId || !isSignedIn || hasAttemptedJoin.current || !album) return;

    const token = localStorage.getItem("token");
    const displayName = getStoredUserDisplayName();

    hasAttemptedJoin.current = true;

    if (!token || !displayName) return;

    const joinAsUser = async () => {
      try {
        const joinCandidates = buildApiCandidates([`/albums/${albumId}/join`]);

        let joined = false;
        let lastError: unknown = null;

        for (const endpoint of joinCandidates) {
          try {
            await axios.post(
              endpoint,
              { displayName },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
              },
            );
            joined = true;
            break;
          } catch (err) {
            lastError = err;
            if (axios.isAxiosError(err) && err.response?.status === 404) {
              continue;
            }
            throw err;
          }
        }

        if (!joined) {
          throw lastError instanceof Error
            ? lastError
            : new Error("Join endpoint not found");
        }

        await refreshAlbum();
      } catch (err) {
        console.error("Failed to join album as user:", err);
      }
    };

    joinAsUser();
  }, [albumId, isSignedIn, refreshAlbum, buildApiCandidates, album]);

  useEffect(() => {
    if (!albumId || isSignedIn || !album || guestDisplayName) return;

    const checkGuestSession = async () => {
      try {
        const guestSessionCandidates = buildApiCandidates([
          `/albums/${albumId}/guest-session`,
          `/album/${albumId}/guest-session`,
        ]);

        let response: AxiosResponse | null = null;
        let lastError: unknown = null;

        for (const endpoint of guestSessionCandidates) {
          try {
            response = await axios.get(endpoint, {
              withCredentials: true,
              validateStatus: (status) => status < 500,
            });
            break;
          } catch (err) {
            lastError = err;
            if (axios.isAxiosError(err) && err.response?.status === 404) {
              continue;
            }
            throw err;
          }
        }

        if (!response) {
          throw lastError instanceof Error
            ? lastError
            : new Error("Guest session endpoint not found");
        }

        if (response.status === 200) {
          const name = response.data.displayName as string;
          setGuestDisplayName(name);
          setJoinName(name);
          setShowJoinPrompt(false);
        } else if (response.status === 204) {
          setShowJoinPrompt(true);
        } else if (response.status === 404 || response.status === 410) {
          setShowJoinPrompt(false);
        } else {
          setShowJoinPrompt(true);
        }
      } catch (err) {
        console.error("Failed to check guest session:", err);
        setShowJoinPrompt(true);
      }
    };

    checkGuestSession();
  }, [albumId, isSignedIn, album, guestDisplayName, buildApiCandidates]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFiles(Array.from(files));
    }
  };

  const handleUploadFiles = async () => {
    if (selectedFiles.length === 0 || !albumId) return;

    setUploading(true);
    try {
      const token = localStorage.getItem("token");
      const uploadedBy = isSignedIn
        ? getStoredUserDisplayName() || "Guest"
        : guestDisplayName || "Guest";

      const uniqueCandidates = buildApiCandidates([
        `/albums/${albumId}/photos`,
        `/albums/${albumId}/upload`,
        `/albums/${albumId}/photos/upload`,
        "/photos/upload",
      ]);

      const createFormData = (includeAlbumId: boolean) => {
        const formData = new FormData();
        selectedFiles.forEach((file) => {
          formData.append("photos", file);
        });
        formData.append("uploadedBy", uploadedBy);
        if (includeAlbumId) {
          formData.append("albumId", albumId);
        }
        return formData;
      };

      let uploadSucceeded = false;
      let lastError: unknown = null;

      for (const endpoint of uniqueCandidates) {
        try {
          const includeAlbumId = endpoint.includes("/photos/upload");
          await axios.post(endpoint, createFormData(includeAlbumId), {
            headers: {
              "Content-Type": "multipart/form-data",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            withCredentials: true,
          });
          uploadSucceeded = true;
          break;
        } catch (err) {
          lastError = err;
          if (axios.isAxiosError(err) && err.response?.status === 404) {
            continue;
          }
          throw err;
        }
      }

      if (!uploadSucceeded) {
        throw lastError instanceof Error
          ? lastError
          : new Error("Upload endpoint not found");
      }

      // Refresh album data
      await refreshAlbum();
      setSelectedFiles([]);
    } catch (err) {
      console.error("Upload failed:", err);
      showToastMessage("Failed to upload photos", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveSelectedFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleShareClick = async () => {
    const shareUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(shareUrl);
      showToastMessage("Link copied to clipboard!", "success");
    } catch (err) {
      console.error("Failed to copy link:", err);
      showToastMessage("Failed to copy link", "error");
    }
  };

  const handleDownloadPhoto = async (photo: Photo) => {
    try {
      // Get displayName from localStorage if available
      const displayName = isSignedIn
        ? getStoredUserDisplayName() || "Guest"
        : guestDisplayName || "Guest";

      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API_URL}/photos/${photo.id}/download?displayName=${encodeURIComponent(
          displayName,
        )}`,
        {
          responseType: "blob",
          withCredentials: true,
          headers:
            isSignedIn && token ? { Authorization: `Bearer ${token}` } : {},
        },
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", photo.filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download photo:", err);
      showToastMessage("Failed to download photo", "error");
    }
  };

  if (loading) return <div>Loading album...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!album) return <div>Album not found</div>;

  const handleJoinSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!albumId) return;

    const trimmedName = joinName.trim();
    if (!trimmedName) {
      setJoinError("Please enter a display name.");
      return;
    }

    setJoinLoading(true);
    setJoinError(null);

    try {
      const joinCandidates = buildApiCandidates([`/albums/${albumId}/join`]);

      let response: AxiosResponse | null = null;
      let lastError: unknown = null;

      for (const endpoint of joinCandidates) {
        try {
          response = await axios.post(
            endpoint,
            { displayName: trimmedName },
            { withCredentials: true },
          );
          break;
        } catch (err) {
          lastError = err;
          if (axios.isAxiosError(err) && err.response?.status === 404) {
            continue;
          }
          throw err;
        }
      }

      if (!response) {
        throw lastError instanceof Error
          ? lastError
          : new Error("Join endpoint not found");
      }

      setGuestDisplayName(response.data.displayName || trimmedName);
      setShowJoinPrompt(false);
      await refreshAlbum();
    } catch (err) {
      console.error("Join failed:", err);
      setJoinError("Failed to join album. Try again.");
    } finally {
      setJoinLoading(false);
    }
  };

  const handleOpenJoinPrompt = () => {
    setJoinError(null);
    setJoinName(guestDisplayName || "");
    setShowJoinPrompt(true);
  };

  const handleStartEdit = () => {
    setIsEditingAlbum(true);
    setEditAlbumName(album.name || "");
    setEditExpiryHours("");
    setEditError(null);
  };

  const handleSaveEdit = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (!token || !albumId) return;

    setEditSaving(true);
    setEditError(null);

    try {
      const payload: { name?: string; expiryHours?: number } = {};
      if (editAlbumName.trim().length > 0 || editAlbumName === "") {
        payload.name = editAlbumName;
      }
      if (editExpiryHours) {
        payload.expiryHours = Number(editExpiryHours);
      }

      const response = await axios.put(
        `${API_URL}/albums/${albumId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setAlbum((prev) =>
        prev
          ? {
              ...prev,
              name: response.data.name,
              expiresAt: response.data.expiresAt,
            }
          : prev,
      );
      setIsEditingAlbum(false);
      setEditExpiryHours("");
      showToastMessage("Album updated", "success");
    } catch (err) {
      console.error("Failed to update album:", err);
      setEditError("Failed to update album");
    } finally {
      setEditSaving(false);
    }
  };

  return (
    <div className={styles.container}>
      <AlbumHeader
        albumName={album.name}
        expiresAt={album.expiresAt}
        isSignedIn={isSignedIn}
        isCreator={album.isCreator}
        guestDisplayName={guestDisplayName}
        onJoinClick={handleOpenJoinPrompt}
        onEditClick={handleStartEdit}
      />

      {album.isCreator && isEditingAlbum && (
        <AlbumEditPanel
          albumName={editAlbumName}
          expiryHours={editExpiryHours}
          error={editError}
          saving={editSaving}
          onAlbumNameChange={setEditAlbumName}
          onExpiryHoursChange={setEditExpiryHours}
          onSave={handleSaveEdit}
          onCancel={() => setIsEditingAlbum(false)}
        />
      )}

      {!isSignedIn && guestDisplayName && (
        <div className={styles.guestBadge}>Joined as {guestDisplayName}</div>
      )}

      <ParticipantsList participants={album.participants} />

      <PhotoGallery photos={album.photos} onDownload={handleDownloadPhoto} />

      <UploadSection
        selectedFiles={selectedFiles}
        uploading={uploading}
        onUpload={handleUploadFiles}
        onRemoveFile={handleRemoveSelectedFile}
      />

      <ActionButtons
        fileInputRef={fileInputRef}
        onFileSelect={handleFileSelect}
        onUploadClick={handleUploadClick}
        onShareClick={handleShareClick}
      />

      {toast && <Toast message={toast.message} tone={toast.tone} />}

      <JoinModal
        show={showJoinPrompt && !isSignedIn}
        guestDisplayName={guestDisplayName}
        joinName={joinName}
        joinError={joinError}
        joinLoading={joinLoading}
        onJoinNameChange={setJoinName}
        onSubmit={handleJoinSubmit}
        onCancel={() => setShowJoinPrompt(false)}
      />
    </div>
  );
}
