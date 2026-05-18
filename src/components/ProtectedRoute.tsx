import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // belum login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // role tidak sesuai
  if (!allowedRoles.includes(user?.role?.name)) {
    return <Navigate to="/login" />;
  }

  return children;
}
