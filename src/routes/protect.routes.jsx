import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@/hooks/use-user";

export default function ProtectRoutes({ requiredRole, children }) {
  const { user, loading } = useUser();

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/auth/login" replace />;

  // ✅ If route requires a specific role
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? children : <Outlet />;
}
