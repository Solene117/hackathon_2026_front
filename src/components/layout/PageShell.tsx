import Header from "./Header";
import { useAuth } from "../../contexts/AuthContext";

type PageShellProps = {
  title?: string;
  showBackButton?: boolean;
  children: React.ReactNode;
  /* pb-28 = 112px pour dégager la bottom nav flottante (62px + bottom-4 + marge) */
  mainClassName?: string;
};

export default function PageShell({
  title,
  showBackButton = false,
  children,
  mainClassName = "p-5 pb-28",
}: PageShellProps) {
  const { isAuthenticated } = useAuth();
  const resolvedMainClassName = isAuthenticated
    ? mainClassName
    : mainClassName.replace(/\bpb-28\b/g, "pb-5");

  return (
    <div>
      <Header title={title} showBackButton={showBackButton} />
      <main className={resolvedMainClassName}>{children}</main>
    </div>
  );
}
