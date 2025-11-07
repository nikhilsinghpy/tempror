import { useState, useEffect, useCallback } from "react";
import { getHandler, postHandler } from "@/services/api.services";

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
      const response = await getHandler("/user/me", {
        Authorization: `Bearer ${token}`,
      });
      setUser(response.data || null);
    } catch (error) {
      console.error("Fetch user error:", error.message);
      if (error.message === "TokenExpiredError") {
        try {
          const response = await postHandler(
            "/resend-access-token/web",
            {},
            {},
            { withCredentials: true }
          );
          const newToken = response.data?.accessToken;
          if (newToken) {
            localStorage.setItem("accessToken", newToken);
            const retry = await getHandler(
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
