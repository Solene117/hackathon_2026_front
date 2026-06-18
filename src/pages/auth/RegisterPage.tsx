import { useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import PageShell from "../../components/layout/PageShell";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { getAuthErrorMessage, useAuth } from "../../contexts/AuthContext";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { register, isAuthenticated, isLoading } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState(params.get("ref") ?? "");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await register({
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        mail,
        password,
        referralCode: referralCode.trim() || undefined,
      });
      localStorage.setItem("isConnected", "true");
      navigate("/dashboard");
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PageShell title="Inscription" mainClassName="p-5">
      <section className="rounded-xl border border-neutral-300 p-5">
        <h1 className="text-2xl font-bold">Créer mon compte</h1>
        <p className="mt-2 text-sm text-neutral-600">
          Suivez vos pneus, vos activités et vos recommandations Michelin.
        </p>

        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="given-name"
            className="w-full rounded-lg border border-neutral-300 bg-[#D4E7FA] px-3 py-3 text-sm"
          />

          <input
            type="text"
            placeholder="Nom"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            autoComplete="family-name"
            className="w-full rounded-lg border border-neutral-300 bg-[#D4E7FA] px-3 py-3 text-sm"
          />

          <input
            type="email"
            placeholder="Email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            required
            autoComplete="email"
            className="w-full rounded-lg border border-neutral-300 bg-[#D4E7FA] px-3 py-3 text-sm"
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            autoComplete="new-password"
            className="w-full rounded-lg border border-neutral-300 bg-[#D4E7FA] px-3 py-3 text-sm"
          />

          <div>
            <input
              type="text"
              placeholder="Code de parrainage (optionnel)"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 bg-[#D4E7FA] px-3 py-3 text-sm"
            />
            <p className="mt-1 text-xs text-neutral-500">
              Un ami vous a invité ? Saisissez son code pour démarrer avec des
              avantages.
            </p>
          </div>

          {error && <ErrorAlert message={error} />}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-[#27509B] px-4 py-3 text-sm font-bold text-white disabled:opacity-60"
          >
            {isSubmitting ? "Création..." : "Créer mon compte"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm">
          Déjà un compte ?{" "}
          <Link to="/login" className="font-bold underline">
            Se connecter
          </Link>
        </p>
      </section>
    </PageShell>
  );
}
