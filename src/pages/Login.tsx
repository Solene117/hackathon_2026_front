import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Login() {
  const navigate = useNavigate();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem("isConnected", "true");
    navigate("/dashboard");
  }

  return (
    <div>
      <Header title="Connexion" />

      <main className="p-5">
        <section className="rounded-xl border border-neutral-300 p-5">
          <h1 className="text-2xl font-bold">Nous sommes ravis de vous revoir !</h1>
          <p className="mt-2 text-sm text-neutral-600">
            Connectez-vous pour suivre vos pneus Michelin.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-lg border border-neutral-300 bg-[#D4E7FA] px-3 py-3 text-sm"
            />

            <input
              type="password"
              placeholder="Mot de passe"
              className="w-full rounded-lg border border-neutral-300 bg-[#D4E7FA] px-3 py-3 text-sm"
            />

            <button className="w-full rounded-lg bg-[#27509B] px-4 py-3 text-sm font-bold text-white">
              Se connecter
            </button>
          </form>

          <p className="mt-5 text-center text-sm">
            Pas encore de compte ?{" "}
            <Link to="/register" className="font-bold underline">
              S’inscrire
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}