import Header from "../components/Header";
import { RetailerCard } from "../components/RetailerCard";

export default function Retailers() {
  return (
    <div>
      <Header title="Voir les revendeurs" />

      <main className="space-y-5 p-5 pb-24">
        <h1 className="text-2xl font-bold">Revendeurs proches</h1>

        <RetailerCard
          name="Alltricks"
          description="Disponible en ligne"
          detail="Livraison sous 48h"
          button="Acheter"
        />

        <RetailerCard
          name="Decathlon Annecy"
          description="À 2,4 km"
          detail="Stock disponible"
          button="Voir l’itinéraire"
        />

        <RetailerCard
          name="Atelier Vélo Services"
          description="Réparation et montage"
          detail="À 3,1 km"
          button="Prendre rendez-vous"
          secondary
        />
      </main>
    </div>
  );
}


