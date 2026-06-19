import { ChevronRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import guideImg from "../../assets/guide.jpg";

const ARTICLES = [
  { label: "Quand changer son pneu ?", tag: "Entretien" },
  { label: "Quelle pression choisir ?", tag: "Technique" },
  { label: "Tubeless ou chambre à air ?", tag: "Équipement" },
];

export default function HomeGuidePreview() {
  return (
    <section>
      {/* Header section */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-michelin-blue/10">
            <BookOpen size={16} className="text-michelin-blue" />
          </div>
          <h2 className="text-xl font-bold text-neutral-900">Guide Michelin</h2>
        </div>
        <Link
          to="/login"
          className="flex items-center gap-0.5 text-sm font-semibold text-michelin-blue"
        >
          Voir tout <ChevronRight size={16} />
        </Link>
      </div>

      {/* Image mise en avant */}
      <div className="relative mb-3 overflow-hidden rounded-2xl">
        <img
          src={guideImg}
          alt="Guide Michelin"
          className="h-36 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00205b]/70 via-transparent to-transparent" />
        <p className="absolute bottom-3 left-4 text-sm font-bold text-white drop-shadow">
          Conseils pneus Michelin
        </p>
      </div>

      {/* Liste d'articles */}
      <div className="divide-y divide-neutral-100 rounded-2xl border border-neutral-100 bg-white">
        {ARTICLES.map((article, i) => (
          <Link
            key={i}
            to="/login"
            className="flex items-center justify-between px-4 py-3.5 transition hover:bg-neutral-50 first:rounded-t-2xl last:rounded-b-2xl"
          >
            <div className="min-w-0">
              <span className="mb-0.5 inline-block rounded-full bg-michelin-blue/8 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-michelin-blue">
                {article.tag}
              </span>
              <p className="text-sm font-semibold text-neutral-800">{article.label}</p>
            </div>
            <ChevronRight size={16} className="ml-3 shrink-0 text-neutral-300" />
          </Link>
        ))}
      </div>
    </section>
  );
}
