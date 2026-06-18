import PageShell from "../../components/layout/PageShell";
import FaqAccordion, { type FaqItem } from "../../components/community/FaqAccordion";
import GuideHero from "../../components/community/GuideHero";

const faqs: FaqItem[] = [
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

export default function GuidePage() {
  return (
    <PageShell title="Guides" showBackButton mainClassName="p-5 pb-24">
      <GuideHero />

      <section className="mt-6">
        <FaqAccordion items={faqs} />
      </section>
    </PageShell>
  );
}
