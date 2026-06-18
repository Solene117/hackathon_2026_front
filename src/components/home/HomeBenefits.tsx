export default function HomeBenefits() {
  return (
    <section className="rounded-xl border border-neutral-300 p-5">
      <h2 className="text-xl font-bold">Vos bénéfices</h2>
      <div className="mt-4 grid grid-cols-2 gap-y-3 text-sm text-neutral-700">
        <span>Sécurité</span>
        <span>Performance</span>
        <span>Durabilité</span>
        <span>Entretien</span>
      </div>
    </section>
  );
}
