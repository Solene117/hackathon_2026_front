import PageShell from "../../components/layout/PageShell";
import SectionHeader from "../../components/ui/SectionHeader";
import CommunityCard from "../../components/community/CommunityCard";
import { Users2 } from "lucide-react";

export default function CommunautePage() {
  return (
    <PageShell mainClassName="space-y-5 p-5 pb-28">
      <SectionHeader
        title="Communauté"
        subtitle="Événements, parrainage et guides pratiques"
        icon={<Users2 size={20} className="text-michelin-blue" />}
      />

      <CommunityCard
        to="/evenements"
        title="Événements"
        subtitle="Sorties, challenges et ateliers partenaires"
        image="src/assets/event.jpeg"
      />

      <CommunityCard
        to="/parrainage"
        title="Parrainage"
        subtitle="Invitez vos amis et gagnez des points"
        image="src/assets/parrainage.jpg"
      />

      <CommunityCard
        to="/guide"
        title="Guide"
        subtitle="Conseils pneus, entretien et bonnes pratiques"
        image="src/assets/guide.jpg"
      />
    </PageShell>
  );
}
