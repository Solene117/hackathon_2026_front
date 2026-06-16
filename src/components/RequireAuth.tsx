import { Navigate } from "react-router-dom";

type RequireAuthProps = {
  children: React.ReactNode;
};

export default function RequireAuth({
  children,
}: RequireAuthProps) {
  const isConnected = "true";

  if (!isConnected) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}