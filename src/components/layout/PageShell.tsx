import Header from "./Header";

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
  return (
    <div>
      <Header title={title} showBackButton={showBackButton} />
      <main className={mainClassName}>{children}</main>
    </div>
  );
}
