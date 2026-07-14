import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSession } from "@/hooks/use-session";

export default function ProtectedRoute() {
  const location = useLocation();
  const { loading, user } = useSession();

  if (loading) {
    return <div className="min-h-screen bg-background" />;
  }

  if (!user) {
    return <Navigate to="/auth/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
