import { useState } from "react";
import Header from "../components/Header";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Quand changer son pneu vélo ?",
    answer:
      "Il faut changer son pneu lorsque la bande de roulement est lisse, que des craquelures apparaissent, ou après plusieurs crevaisons rapprochées. L’application Michelin vous aide à anticiper ce remplacement grâce au kilométrage et à vos données d’usage.",
  },
  {
    question: "Quelle pression choisir ?",
    answer:
      "La pression dépend du type de vélo, du terrain, du poids du cycliste et du confort recherché. Un pneu route demande généralement plus de pression qu’un pneu gravel ou VTT.",
  },
  {
    question: "Comment savoir si mon pneu est usé ?",
    answer:
      "Surveillez la perte d’adhérence, les coupures visibles, les flancs abîmés et la diminution du relief sur la bande de roulement.",
  },
  {
    question: "Quelle différence entre route, gravel et VTT ?",
    answer:
      "Un pneu route privilégie le rendement et la vitesse. Un pneu gravel cherche l’équilibre entre rendement, grip et résistance. Un pneu VTT favorise l’adhérence et le contrôle sur terrains techniques.",
  },
  {
    question: "Pourquoi connecter Strava ?",
    answer:
      "La connexion permet d’analyser vos distances, vos terrains et votre fréquence de pratique afin de recommander un pneu plus adapté à votre usage réel.",
  },
];

export default function Guide() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      <Header title="Guides" showBackButton />

      <main className="p-5 pb-24">
        <section className="rounded-2xl bg-[#27509B] p-6 text-white">
          <h1 className="text-3xl font-bold">Guide du pneu</h1>
          <p className="mt-3 text-sm text-blue-100">
            Conseils Michelin pour choisir, entretenir et remplacer vos pneus.
          </p>
        </section>

        <section className="mt-6 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="rounded-xl border border-neutral-300 bg-white"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 p-4 text-left"
                >
                  <span className="font-bold">{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-[#27509B] transition ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-neutral-200 px-4 pb-4 pt-3">
                    <p className="text-sm leading-relaxed text-neutral-600">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
}