import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import PageShell from "../../components/layout/PageShell";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { getAuthErrorMessage, useAuth } from "../../contexts/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading } = useAuth();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login(mail, password);
      navigate("/dashboard");
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PageShell title="Connexion" mainClassName="p-5">
      <section className="rounded-xl border border-neutral-300 p-5">
        <h1 className="text-2xl font-bold">Nous sommes ravis de vous revoir !</h1>
        <p className="mt-2 text-sm text-neutral-600">
          Connectez-vous pour suivre vos pneus Michelin.
        </p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
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
            autoComplete="current-password"
            className="w-full rounded-lg border border-neutral-300 bg-[#D4E7FA] px-3 py-3 text-sm"
          />

          {error && <ErrorAlert message={error} />}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-[#27509B] px-4 py-3 text-sm font-bold text-white disabled:opacity-60"
          >
            {isSubmitting ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm">
          Pas encore de compte ?{" "}
          <Link to="/register" className="font-bold underline">
            S'inscrire
          </Link>
        </p>
      </section>
    </PageShell>
  );
}
