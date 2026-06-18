import { Loader2, Sparkles } from "lucide-react";
import Chip from "../ui/Chip";
import ErrorAlert from "../ui/ErrorAlert";
import {
  formatPerformanceProfile,
  formatTireTerrain,
  formatTireUsage,
} from "../../lib/tire-labels";
import type { AiRecommendedTire } from "../../types/ai-tire";

const EXAMPLE_PROMPT =
  "Je fais du gravel 3 fois par semaine sur routes et chemins mixtes. Je roule environ 80 km par semaine, sans VAE. Je cherche un pneu durable avec un bon grip, en 700x40 tubeless ready.";

type AiAnalysisPanelProps = {
  prompt: string;
  isLoading: boolean;
  error: string | null;
  onPromptChange: (value: string) => void;
  onAnalyze: () => void;
};

export function AiAnalysisPanel({
  prompt,
  isLoading,
  error,
  onPromptChange,
  onAnalyze,
}: AiAnalysisPanelProps) {
  return (
    <section className="rounded-xl border border-neutral-300 p-5">
      <div className="flex items-center gap-2">
        <Sparkles className="text-[#27509B]" size={22} />
        <h1 className="text-2xl font-bold">Analyse IA</h1>
      </div>

      <p className="mt-3 text-sm text-neutral-700">
        Décrivez librement votre pratique : type de vélo, terrains, fréquence,
        priorités (grip, confort, durabilité…), dimensions de pneu, etc.
      </p>

      <textarea
        value={prompt}
        onChange={(event) => onPromptChange(event.target.value)}
        placeholder={EXAMPLE_PROMPT}
        rows={7}
        className="mt-4 w-full resize-none rounded-lg border border-neutral-300 bg-white px-3 py-3 text-sm leading-relaxed outline-none focus:border-[#27509B] focus:ring-2 focus:ring-[#27509B]/20"
      />

      <button
        type="button"
        onClick={onAnalyze}
        disabled={isLoading}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#27509B] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#1a3d7a] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Analyse en cours…
          </>
        ) : (
          <>
            <Sparkles size={16} />
            Analyser avec l&apos;IA
          </>
        )}
      </button>

      {error && <ErrorAlert message={error} className="mt-3" />}
    </section>
  );
}

type RecommendedTiresListProps = {
  recommendations: AiRecommendedTire[];
  onSelectTire: (tireId: number) => void;
};

export function RecommendedTiresList({
  recommendations,
  onSelectTire,
}: RecommendedTiresListProps) {
  return (
    <section className="rounded-xl border border-neutral-300 p-5">
      <h2 className="text-2xl font-bold">Pneus recommandés</h2>
      <p className="mt-2 text-sm text-neutral-600">
        Sélection personnalisée selon votre pratique.
      </p>

      <ul className="mt-4 space-y-3">
        {recommendations.map((tire, index) => (
          <li key={tire.id}>
            <button
              type="button"
              onClick={() => onSelectTire(tire.id)}
              className="w-full rounded-lg border border-[#27509B]/30 bg-white p-4 text-left transition hover:border-[#27509B] hover:bg-[#D4E7FA]/30"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#27509B] text-xs font-bold text-white">
                  {index + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[#27509B]">
                    {tire.familyName ?? tire.model}
                  </p>
                  {tire.familyName && tire.model !== tire.familyName && (
                    <p className="mt-0.5 text-xs text-neutral-500">
                      {tire.model}
                    </p>
                  )}
                  <p className="mt-2 text-sm text-neutral-700">{tire.reason}</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {tire.usageType && (
                      <Chip>{formatTireUsage(tire.usageType)}</Chip>
                    )}
                    {tire.terrainTypes.slice(0, 3).map((terrain) => (
                      <Chip key={terrain}>{formatTireTerrain(terrain)}</Chip>
                    ))}
                    {tire.performanceProfiles.slice(0, 2).map((profile) => (
                      <Chip key={profile}>
                        {formatPerformanceProfile(profile)}
                      </Chip>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
