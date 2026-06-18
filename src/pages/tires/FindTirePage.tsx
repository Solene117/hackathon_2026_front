import { useState } from "react";
import PageShell from "../../components/layout/PageShell";
import TireDetailModal from "../../components/tires/TireDetailModal";
import {
  AiAnalysisPanel,
  RecommendedTiresList,
} from "../../components/find-tire/AiTireRecommendation";
import EmptyState from "../../components/ui/EmptyState";
import { recommendTiresWithAi } from "../../api/ai";
import { getApiErrorMessage } from "../../lib/errors";
import type { AiRecommendedTire } from "../../types/ai-tire";

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

      <PageShell title="Trouver mon pneu" mainClassName="space-y-5 p-5 pb-24">
        <AiAnalysisPanel
          prompt={prompt}
          isLoading={isLoading}
          error={error}
          onPromptChange={setPrompt}
          onAnalyze={() => void handleAnalyze()}
        />

        {hasSearched && !isLoading && !error && recommendations.length === 0 && (
          <section className="rounded-xl border border-neutral-300 p-5">
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
