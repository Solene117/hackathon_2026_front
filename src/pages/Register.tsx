import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Register() {
  const navigate = useNavigate();

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem("isConnected", "true");
    navigate("/dashboard");
  }

  return (
    <div>
      <Header title="Inscription" />

      <main className="p-5">
        <section className="rounded-xl border border-neutral-300 p-5">
          <h1 className="text-2xl font-bold">Créer mon compte</h1>
          <p className="mt-2 text-sm text-neutral-600">
            Suivez vos pneus, vos activités et vos recommandations Michelin.
          </p>

          <form onSubmit={handleRegister} className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Prénom"
              className="w-full rounded-lg border border-neutral-300 bg-[#D4E7FA] px-3 py-3 text-sm"
            />

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
              Créer mon compte
            </button>
          </form>

          <p className="mt-5 text-center text-sm">
            Déjà un compte ?{" "}
            <Link to="/login" className="font-bold underline">
              Se connecter
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}