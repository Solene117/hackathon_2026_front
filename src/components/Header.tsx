import { UserCircle, X, Settings, Gift, LogOut, Award } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useAuth } from "../contexts/AuthContext";

type HeaderProps = {
  title?: string;
};

export default function Header({ title }: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  return (
    <>
      <header className="flex h-14 items-center justify-between border-b border-neutral-200 bg-[#27509B] px-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Michelin" className="h-8 object-contain" />

          {title && <span className="font-semibold text-white">{title}</span>}
        </div>

        <button
          onClick={() => {
            setIsProfileOpen(true);
          }}
          className="text-white"
        >
          <UserCircle size={28} />
        </button>
      </header>

      {isProfileOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/40">
          <section className="absolute right-140 top-10 w-75 rounded-2xl bg-white p-5 shadow-xl">
            <div className="flex items-start justify-between">
              <h2 className="text-2xl font-bold">
                {isAuthenticated ? "Mon profil" : "Connexion"}
              </h2>

              <button onClick={() => setIsProfileOpen(false)}>
                <X size={26} />
              </button>
            </div>

            {!isAuthenticated ? (
              <div className="mt-6 flex flex-col gap-3">
                <Link to="/login" onClick={() => setIsProfileOpen(false)}>
                  <button className="flex w-full rounded-lg bg-[#27509B] px-4 py-3 font-bold text-white hover:bg-[#1a3d7a]">
                    Se connecter
                  </button>
                </Link>

                <Link to="/register" onClick={() => setIsProfileOpen(false)}>
                  <button className="flex w-full rounded-lg border border-[#27509B] bg-white px-4 py-3 font-bold text-[#27509B] hover:bg-[#D4E7FA]">
                    Créer un compte
                  </button>
                </Link>
              </div>
            ) : (
              <div className="mt-6 space-y-3">
                <Link
                  to="/recompenses"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex w-full items-center gap-3 rounded-lg bg-neutral-100 px-4 py-3 text-left font-semibold hover:bg-[#D4E7FA]"
                >
                  <Award size={20} />
                  Récompenses
                </Link>

                <Link
                  to="/parrainage"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex w-full items-center gap-3 rounded-lg bg-neutral-100 px-4 py-3 text-left font-semibold hover:bg-[#D4E7FA]"
                >
                  <Gift size={20} />
                  Parrainage
                </Link>

                <Link
                  to="/settings"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex w-full items-center gap-3 rounded-lg bg-neutral-100 px-4 py-3 text-left font-semibold hover:bg-[#D4E7FA]"
                >
                  <Settings size={20} />
                  Paramètres
                </Link>

                <button
                  onClick={logout}
                  className="flex w-full items-center gap-3 rounded-lg border border-red-600 px-4 py-3 font-bold text-red-600 hover:bg-red-100 "
                >
                  <LogOut size={20} />
                  Se déconnecter
                </button>
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
}
