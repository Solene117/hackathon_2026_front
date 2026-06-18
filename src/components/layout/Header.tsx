import { UserCircle, X, Settings, Gift, LogOut, Award, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useAuth } from "../../contexts/AuthContext";

type HeaderProps = {
  title?: string;
  showBackButton?: boolean;
};

export default function Header({ title, showBackButton = false }: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {/* Header fusionné — même couleur que le fond de l'app */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between bg-app-bg/80 px-5 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          {showBackButton && (
            <button
              onClick={() => navigate(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-700 shadow-sm transition hover:bg-neutral-100"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          {!showBackButton && (
            <img src={logo} alt="Michelin" className="h-8 object-contain" />
          )}
          {title && (
            <span className="text-base font-semibold text-neutral-900">{title}</span>
          )}
        </div>

        <button
          onClick={() => setIsProfileOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-700 shadow-sm transition hover:bg-neutral-100"
        >
          <UserCircle size={22} />
        </button>
      </header>

      {/* Drawer profil */}
      {isProfileOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-end bg-black/30 backdrop-blur-[2px]"
          onClick={() => setIsProfileOpen(false)}
        >
          <section
            className="m-3 mt-16 w-72 rounded-3xl bg-white p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-neutral-900">
                {isAuthenticated ? "Mon profil" : "Connexion"}
              </h2>
              <button
                onClick={() => setIsProfileOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
              >
                <X size={16} />
              </button>
            </div>

            {!isAuthenticated ? (
              <div className="mt-5 flex flex-col gap-3">
                <Link to="/login" onClick={() => setIsProfileOpen(false)}>
                  <button className="w-full rounded-2xl bg-michelin-green px-4 py-3 font-bold text-white shadow-sm shadow-green-200 transition hover:opacity-90">
                    Se connecter
                  </button>
                </Link>
                <Link to="/register" onClick={() => setIsProfileOpen(false)}>
                  <button className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 font-semibold text-neutral-700 transition hover:bg-neutral-50">
                    Créer un compte
                  </button>
                </Link>
              </div>
            ) : (
              <div className="mt-5 flex flex-col gap-2">
                <Link
                  to="/recompenses"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 rounded-2xl bg-neutral-50 px-4 py-3 font-semibold text-neutral-800 transition hover:bg-neutral-100"
                >
                  <Award size={18} className="text-michelin-green" />
                  Récompenses
                </Link>

                <Link
                  to="/parrainage"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 rounded-2xl bg-neutral-50 px-4 py-3 font-semibold text-neutral-800 transition hover:bg-neutral-100"
                >
                  <Gift size={18} className="text-michelin-blue" />
                  Parrainage
                </Link>

                <Link
                  to="/settings"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 rounded-2xl bg-neutral-50 px-4 py-3 font-semibold text-neutral-800 transition hover:bg-neutral-100"
                >
                  <Settings size={18} className="text-neutral-500" />
                  Paramètres
                </Link>

                <button
                  onClick={logout}
                  className="mt-1 flex w-full items-center gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 font-semibold text-red-500 transition hover:bg-red-100"
                >
                  <LogOut size={18} />
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
