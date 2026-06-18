import PageShell from "../../components/layout/PageShell";
import CommunityCard from "../../components/community/CommunityCard";

export default function CommunautePage() {
  return (
    <PageShell title="Communauté" mainClassName="space-y-5 p-5 pb-24">
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
