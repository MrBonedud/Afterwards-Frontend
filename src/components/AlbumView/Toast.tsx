import styles from "./Toast.module.css";

interface ToastProps {
  message: string;
  tone: "success" | "error";
}

export default function Toast({ message, tone }: ToastProps) {
  return (
    <div
      className={`${styles.toast} ${tone === "error" ? styles.toastError : ""}`}
    >
      {message}
    </div>
  );
}
