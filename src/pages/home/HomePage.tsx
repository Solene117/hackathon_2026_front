import PageShell from "../../components/layout/PageShell";
import HomeBenefits from "../../components/home/HomeBenefits";
import HomeGuidePreview from "../../components/home/HomeGuidePreview";
import HomeHero from "../../components/home/HomeHero";
import HomeHowItWorks from "../../components/home/HomeHowItWorks";

export default function HomePage() {
  return (
    <PageShell mainClassName="pb-8">
      {/* Hero edge-to-edge avec padding interne */}
      <div className="px-4 pt-3">
        <HomeHero />
      </div>

      <div className="mt-8 space-y-8 px-4">
        <HomeHowItWorks />
        <HomeBenefits />
        <HomeGuidePreview />
      </div>
    </PageShell>
  );
}
