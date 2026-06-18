import { Share2, Users, UserCheck, Clock } from "lucide-react";
import CopyField from "../ui/CopyField";
import type {
  ReferralFilleul,
  ReferralItem,
  ReferralOverview,
} from "../../types/loyalty";

type ReferralPanelProps = {
  overview: ReferralOverview;
};

function buildShareLink(code: string): string {
  return `${window.location.origin}/register?ref=${encodeURIComponent(code)}`;
}

function getFilleulName(filleul: ReferralFilleul): string {
  if (filleul.firstName) return filleul.firstName;
  return filleul.mail.split("@")[0];
}

function FilleulRow({ item }: { item: ReferralItem }) {
  const completed = item.status === "COMPLETED";
  return (
    <li className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-full ${
            completed
              ? "bg-green-100 text-green-700"
              : "bg-neutral-100 text-neutral-500"
          }`}
          aria-hidden
        >
          {completed ? <UserCheck size={18} /> : <Clock size={18} />}
        </span>
        <span className="text-sm font-semibold text-neutral-800">
          {getFilleulName(item.filleul)}
        </span>
      </div>
      <span
        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
          completed
            ? "bg-green-100 text-green-700"
            : "bg-amber-100 text-amber-700"
        }`}
      >
        {completed ? "Validé" : "En attente"}
      </span>
    </li>
  );
}

export default function ReferralPanel({ overview }: ReferralPanelProps) {
  const shareLink = buildShareLink(overview.referralCode);

  async function handleShare() {
    const shareData = {
      title: "Michelin Ride Companion",
      text: "Rejoins-moi sur Michelin Ride Companion et profite de récompenses !",
      url: shareLink,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareLink);
      }
    } catch {
      /* partage annulé ou indisponible */
    }
  }

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-neutral-300 bg-white p-5">
        <h2 className="text-lg font-bold">Mon code de parrainage</h2>
        <p className="mt-1 text-sm text-neutral-600">
          Partagez votre lien : votre filleul et vous gagnez des points dès sa
          première sortie.
        </p>

        <div className="mt-4 space-y-3">
          <CopyField label="Code" value={overview.referralCode} />
          <CopyField label="Lien d'invitation" value={shareLink} />
          <button
            type="button"
            onClick={() => void handleShare()}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#27509B] bg-white px-4 py-3 font-bold text-[#27509B] hover:bg-[#D4E7FA]"
          >
            <Share2 size={18} /> Partager mon lien
          </button>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-neutral-300 bg-[#D4E7FA] p-4">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600">
            <Users size={14} /> Invités
          </span>
          <strong className="mt-1 block text-2xl">
            {overview.totalReferrals}
          </strong>
        </div>
        <div className="rounded-xl border border-neutral-300 bg-[#D4E7FA] p-4">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600">
            <UserCheck size={14} /> Validés
          </span>
          <strong className="mt-1 block text-2xl">
            {overview.completedReferrals}
          </strong>
        </div>
      </div>

      <section className="rounded-2xl border border-neutral-300 bg-white p-5">
        <h2 className="text-lg font-bold">Mes filleuls</h2>
        {overview.referrals.length === 0 ? (
          <p className="mt-2 text-sm text-neutral-600">
            Aucun filleul pour le moment. Partagez votre lien pour commencer !
          </p>
        ) : (
          <ul className="mt-2 divide-y divide-neutral-200">
            {overview.referrals.map((item) => (
              <FilleulRow key={item.id} item={item} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
