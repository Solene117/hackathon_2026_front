import { useState } from "react";
import PageShell from "../../components/layout/PageShell";
import SectionHeader from "../../components/ui/SectionHeader";
import TireDetailModal from "../../components/tires/TireDetailModal";
import {
  AiAnalysisPanel,
  RecommendedTiresList,
} from "../../components/find-tire/AiTireRecommendation";
import EmptyState from "../../components/ui/EmptyState";
import { recommendTiresWithAi } from "../../api/ai";
import { getApiErrorMessage } from "../../lib/errors";
import type { AiRecommendedTire } from "../../types/ai-tire";
import choseRightTireIcon from "../../assets/chose_right_tire.svg";

export default function FindTirePage() {
  const [prompt, setPrompt] = useState("");
  const [recommendations, setRecommendations] = useState<AiRecommendedTire[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedTireId, setSelectedTireId] = useState<number | null>(null);

  async function handleAnalyze() {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt) {
      setError("Décrivez votre pratique avant de lancer l'analyse.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await recommendTiresWithAi(trimmedPrompt);
      setRecommendations(response.recommendations);
    } catch (err) {
      setRecommendations([]);
      setError(getApiErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {selectedTireId !== null && (
        <TireDetailModal
          tireId={selectedTireId}
          onClose={() => setSelectedTireId(null)}
        />
      )}

      <PageShell mainClassName="space-y-5 p-5 pb-28">
        <SectionHeader
          title="Trouver mon pneu"
          subtitle="Recommandation personnalisée par IA"
          icon={<img src={choseRightTireIcon} alt="" aria-hidden className="h-5 w-5" style={{ filter: "brightness(0) saturate(100%) invert(54%) sepia(97%) saturate(401%) hue-rotate(47deg)" }} />}
        />
        <AiAnalysisPanel
          prompt={prompt}
          isLoading={isLoading}
          error={error}
          onPromptChange={setPrompt}
          onAnalyze={() => void handleAnalyze()}
        />

        {hasSearched && !isLoading && !error && recommendations.length === 0 && (
          <section className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
            <EmptyState message="Aucune recommandation trouvée. Essayez d'enrichir votre description." />
          </section>
        )}

        {recommendations.length > 0 && (
          <RecommendedTiresList
            recommendations={recommendations}
            onSelectTire={setSelectedTireId}
          />
        )}
      </PageShell>
    </>
  );
}
