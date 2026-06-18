import { Link } from "react-router-dom";

export default function HomeHero() {
  return (
    <section className="rounded-xl border border-neutral-300 p-5">
      <h1 className="text-2xl font-bold leading-tight">
        Le bon pneu,
        <br />
        au bon moment.
      </h1>

      <p className="mt-4 text-sm leading-relaxed text-neutral-700">
        Trouvez le pneu Michelin adapté à votre pratique, suivez son utilisation
        et anticipez son remplacement.
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
  );
}
