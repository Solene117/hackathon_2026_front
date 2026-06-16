import logo from "../assets/logo.svg";

type HeaderProps = {
  title?: string;
};

export default function Header({ title }: HeaderProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-neutral-200 bg-[#27509B] px-4">
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="Michelin"
          className="h-8 object-contain"
        />

        {title && (
          <span className="font-semibold text-white">
            {title}
          </span>
        )}
      </div>
    </header>
  );
}