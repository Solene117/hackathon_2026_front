type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  return (
    <header className="flex h-12 items-center justify-between border-b border-neutral-300 px-5">
      <strong className="text-base font-bold">{title}</strong>
    </header>
  );
}