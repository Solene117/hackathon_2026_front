import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function Home() {
  return (
    <div>
      <Header title="MICHELIN Ride Companion" />

      <main className="space-y-5 p-5 pb-24">
        <section className="rounded-xl border border-neutral-300 p-5">
          <h1 className="text-2xl font-bold leading-tight">
            Le bon pneu,
            <br />
            au bon moment.
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-neutral-700">
            Trouvez le pneu Michelin adapté à votre pratique, suivez son
            utilisation et anticipez son remplacement.
          </p>

          <div className="mt-5 h-32 rounded-lg border border-neutral-300 bg-neutral-100" />

          <div className="mt-6 flex flex-col gap-3">
            <Link to="/login">
              <button className="w-full rounded-lg bg-[#27509B] px-4 py-3 text-sm font-bold text-white">
                Commencer
              </button>
            </Link>

            <Link to="/login">
              <button className="w-full rounded-lg border border-[#27509B] bg-white px-4 py-3 text-sm font-bold text-[#27509B]">
                Connecter Strava
              </button>
            </Link>
          </div>
        </section>

        <section className="rounded-xl border border-neutral-300 p-5">
          <h2 className="text-xl font-bold">Comment ça marche ?</h2>
          <div className="mt-3 space-y-1 text-sm text-neutral-700">
            <p>1. Analysez votre pratique</p>
            <p>2. Recevez une recommandation</p>
            <p>3. Trouvez un revendeur partenaire</p>
          </div>
        </section>

        <section className="rounded-xl border border-neutral-300 p-5">
          <h2 className="text-xl font-bold">Vos bénéfices</h2>
          <div className="mt-4 grid grid-cols-2 gap-y-3 text-sm text-neutral-700">
            <span>Sécurité</span>
            <span>Performance</span>
            <span>Durabilité</span>
            <span>Entretien</span>
          </div>
        </section>

        <section className="rounded-xl border border-neutral-300 p-5">
          <h2 className="text-xl font-bold">Guide Michelin</h2>
          <div className="mt-3 space-y-1 text-sm text-neutral-700">
            <p>Quand changer son pneu ? &gt;</p>
            <p>Quelle pression choisir ? &gt;</p>
            <p>Tubeless ou chambre à air ? &gt;</p>
          </div>
        </section>
      </main>
    </div>
  );
}
