import { useState, useEffect, useCallback } from "react";
import { postHandler } from "@/services/api.services";

export function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setUser(null);
        return;
      }
      const response = await postHandler(
        "/user/me",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setUser(response.data?.user || null);
    } catch (error) {
      console.error("Fetch user error:", error);
      if (error?.response?.data?.message === "TokenExpiredError") {
        try {
          const response = await postHandler(
            "/resend-access-token/web",
            {},
            { withCredentials: true }
          );
          const newToken = response.data?.accessToken;
          if (newToken) {
            localStorage.setItem("accessToken", newToken);
            const retry = await postHandler(
              "/user/me",
              {},
              {
                headers: {
                  Authorization: `Bearer ${newToken}`,
                },
                withCredentials: true,
              }
            );
            setUser(retry.data?.user || null);
            return;
          }
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          localStorage.removeItem("accessToken");
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // --- 4️⃣ Run on mount + react to token changes
  useEffect(() => {
    fetchUser();

    // Listen for token changes (e.g. logout or login from another tab)
    const handleStorageChange = (event) => {
      if (event.key === "accessToken") {
        fetchUser();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [fetchUser]);

  return { user, loading, refetch: fetchUser };
}
