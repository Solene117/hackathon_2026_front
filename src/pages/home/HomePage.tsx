import PageShell from "../../components/layout/PageShell";
import HomeBenefits from "../../components/home/HomeBenefits";
import HomeGuidePreview from "../../components/home/HomeGuidePreview";
import HomeHero from "../../components/home/HomeHero";
import HomeHowItWorks from "../../components/home/HomeHowItWorks";

export default function HomePage() {
  return (
    <PageShell mainClassName="space-y-5 p-5 pb-28">
      <HomeHero />
      <HomeHowItWorks />
      <HomeBenefits />
      <HomeGuidePreview />
    </PageShell>
  );
}
