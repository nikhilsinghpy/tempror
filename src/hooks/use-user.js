import { useState, useEffect, useCallback } from "react";
import { getHandler, postHandler } from "@/services/api.services";

export function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await getHandler("/user/me", {
        Authorization: `Bearer ${token}`,
      });
      setUser(response.data || null);
    } catch (error) {
      console.error("Fetch user error:", error.message);
      if (error.message === "TokenExpiredError") {
        try {
          await requestAccessToken();
        } catch (err) {
          console.error("Resend access token error:", err.message);
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const requestAccessToken = async () => {
    try {
      const response = await postHandler(
        "/auth/resend-access-token/web",
        {},
        {},
        { withCredentials: true }
      );
      const newToken = response?.data?.accessToken;
      localStorage.setItem("accessToken", newToken);
      await fetchUser();
    } catch (error) {
      console.error("Error requesting access token:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchUser();

    const handleStorageChange = (event) => {
      if (event.key === "accessToken") {
        fetchUser();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return { user, loading, refetch: fetchUser };
}
