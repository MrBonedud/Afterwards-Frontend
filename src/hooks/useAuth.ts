import { useState, useEffect } from "react";

export function useAuth() {
  const [isSignedIn, setIsSignedIn] = useState(() => {
    return !!localStorage.getItem("token");
  });

  useEffect(() => {
    // Check auth status on component mount
    const checkAuth = () => {
      setIsSignedIn(!!localStorage.getItem("token"));
    };

    // Listen for storage changes (works across tabs/windows)
    window.addEventListener("storage", checkAuth);

    // Check auth status immediately when component mounts
    checkAuth();

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  // Also provide a way to manually trigger auth check
  const updateAuth = () => {
    setIsSignedIn(!!localStorage.getItem("token"));
  };

  return { isSignedIn, updateAuth };
}
