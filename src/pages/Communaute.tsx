import Header from "../components/Header";
import CommunityCard from "../components/CommunityCard";

export default function Communaute() {
  return (
    <div>
      <Header title="Communauté" />

      <main className="space-y-5 p-5 pb-24">
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
          to="/guides"
          title="Guides"
          subtitle="Conseils pneus, entretien et bonnes pratiques"
          image="src/assets/guide.jpg"
        />
      </main>
    </div>
  );
}