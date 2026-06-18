import Header from "./Header";

type PageShellProps = {
  title?: string;
  showBackButton?: boolean;
  children: React.ReactNode;
  mainClassName?: string;
};

export default function PageShell({
  title,
  showBackButton = false,
  children,
  mainClassName = "p-5 pb-24",
}: PageShellProps) {
  return (
    <div>
      <Header title={title} showBackButton={showBackButton} />
      <main className={mainClassName}>{children}</main>
    </div>
  );
}
