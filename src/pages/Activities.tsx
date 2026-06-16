import Header from "../components/Header";
import { Flame, Plus } from "lucide-react";

const activities = [
  { city: "Annecy", distance: "80 km", type: "Route", date: "15/06/26" },
  { city: "Annecy", distance: "80 km", type: "Gravel", date: "15/06/26" },
  { city: "Annecy", distance: "80 km", type: "VTT", date: "15/06/26" },
  { city: "Annecy", distance: "80 km", type: "VTT", date: "15/06/26" },
];

export default function Activities() {
  return (
    <div>
      <Header title="MICHELIN Ride Companion" />

      <main className="p-5 pb-24">
        <h1 className="mb-5 text-2xl font-bold">Mes activités</h1>

        <button className="mb-5 flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-800 px-4 py-3 font-semibold text-white shadow-sm hover:bg-neutral-600">
          <Plus size={18} />
          Ajouter une activité
        </button>

        <section className="space-y-4 rounded-xl border border-neutral-300 p-5">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-xl border border-neutral-300 p-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-white">
                    <Flame size={13} />
                  </span>
                  <strong className="text-xl">{activity.city}</strong>
                </div>

                <p className="mt-4 text-sm">{activity.distance}</p>
              </div>

              <div className="text-right">
                <span className="rounded-full bg-neutral-100 px-3 py-2 text-xs">
                  {activity.type}
                </span>
                <p className="mt-4 text-sm">{activity.date}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
