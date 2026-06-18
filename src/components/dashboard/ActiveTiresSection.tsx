import TireCard from "../tires/TireCard";

export default function ActiveTiresSection() {
  return (
    <section className="rounded-xl border border-neutral-300 p-5">
      <h2 className="mb-4 text-2xl font-bold">Pneus actifs</h2>
      <p className="mb-4 text-sm text-neutral-600">
        La gestion des pneus sera disponible prochainement.
      </p>
      <div className="space-y-4">
        <TireCard name="Michelin Power Gravel" health={72} />
      </div>
    </section>
  );
}
