export function RetailerCard({
  name,
  description,
  detail,
  button,
  secondary = false,
}: {
  name: string;
  description: string;
  detail: string;
  button: string;
  secondary?: boolean;
}) {
  return (
    <section className="rounded-xl border border-neutral-300 p-5">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="mt-3 text-sm text-neutral-700">{description}</p>
      <p className="mt-1 text-sm text-neutral-700">{detail}</p>

      <button
        className={`mt-5 w-full rounded-lg px-4 py-3 text-sm font-bold ${
          secondary
            ? "border border-neutral-800 bg-white text-neutral-800 hover:bg-neutral-100"
            : "bg-neutral-800 text-white hover:bg-neutral-600"
        }`}
      >
        {button}
      </button>
    </section>
  );
}