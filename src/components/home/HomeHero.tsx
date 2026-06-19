import { Link } from "react-router-dom";
import heroImg from "../../assets/hero.png";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#00205b] via-michelin-blue to-[#3a61a6]">
      {/* Image arrière-plan */}
      <img
        src={heroImg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-15 mix-blend-luminosity"
      />

      {/* Dégradé bas pour lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#00205b]/70 via-transparent to-transparent" />

      {/* Contenu */}
      <div className="relative px-6 pb-8 pt-10">
        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-michelin-yellow/20 px-3 py-1 text-xs font-bold tracking-wider text-michelin-yellow uppercase">
          Michelin Ride
        </span>

        <h1 className="mt-4 text-3xl font-black leading-tight text-white">
          Le bon pneu,
          <br />
          <span className="text-michelin-yellow">au bon moment.</span>
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-white/75">
          Suivez votre pratique, anticipez le remplacement de vos pneus et
          profitez de recommandations personnalisées.
        </p>

        <div className="mt-7 flex flex-col gap-3">
          <Link to="/login">
            <button className="w-full rounded-2xl bg-michelin-yellow px-5 py-3.5 text-sm font-black text-[#00205b] shadow-lg shadow-black/20 transition active:scale-[0.97]">
              Commencer gratuitement
            </button>
          </Link>

          <Link to="/login">
            <button className="w-full rounded-2xl border border-white/25 bg-white/10 px-5 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition active:scale-[0.97]">
              Se connecter
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
