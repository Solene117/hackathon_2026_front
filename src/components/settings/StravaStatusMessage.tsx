type StravaStatusMessageProps = {
  title: string;
  body: string;
  className?: string;
};

export default function StravaStatusMessage({
  title,
  body,
  className = "",
}: StravaStatusMessageProps) {
  return (
    <section className={`rounded-xl border border-neutral-300 p-5 ${className}`}>
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="mt-2 text-sm text-neutral-700">{body}</p>
    </section>
  );
}
