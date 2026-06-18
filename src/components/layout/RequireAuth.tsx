import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

type RequireAuthProps = {
  children: React.ReactNode;
};

export default function RequireAuth({ children }: RequireAuthProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-neutral-600">
        Chargement...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
