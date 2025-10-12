import { useState, useEffect } from "react";
import { postHandler } from "@/services/api.services";

export function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }
        const response = await postHandler("/api/auth/me", {
          Authorization: `Bearer ${token}`,
        });
        setUser(response.data?.user || null);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    // Watch for changes in localStorage (e.g., logout in another tab)
    const handleStorageChange = (event) => {
      if (event.key === "accessToken") {
        fetchUser();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return { user, loading };
}
