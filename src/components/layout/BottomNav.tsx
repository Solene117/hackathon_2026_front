import { Home, Users2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import bicycleWheelIcon from "../../assets/bicycle_wheel.svg";
import choseRightTireIcon from "../../assets/chose_right_tire.svg";
import tireLifeIcon from "../../assets/tire_life.svg";

type NavItemDef = {
  id: string;
  label: string;
  to: string;
  kind: "lucide-home" | "lucide-community" | "svg-find" | "svg-tires" | "svg-activities";
};

export default function BottomNav() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading || !isAuthenticated) return null;

  const items: NavItemDef[] = [
    { id: "home", label: "Accueil", to: "/dashboard", kind: "lucide-home" },
    { id: "find", label: "Trouver", to: "/trouver-pneu", kind: "svg-find" },
    { id: "tires", label: "Mes pneus", to: "/mes-pneus", kind: "svg-tires" },
    { id: "activities", label: "Activités", to: "/activites", kind: "svg-activities" },
    { id: "community", label: "Communauté", to: "/communaute", kind: "lucide-community" },
  ];

  return (
    <nav
      className="fixed bottom-4 left-1/2 z-50 flex h-[62px] w-[calc(100%-32px)] max-w-[400px] -translate-x-1/2 items-end justify-around rounded-full border border-white/60 bg-white/92 px-3 pb-1 backdrop-blur-xl"
      style={{
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06), 0 0 0 1px rgba(255,255,255,0.5) inset",
      }}
    >
      {items.map(({ id, label, to, kind }) => (
        <NavLink key={id} to={to} className="flex h-full flex-col items-center justify-end gap-1.5 pb-1">
          {({ isActive }) => (
            <>
              {/* Bulle icône — sort du haut de la nav quand active */}
              <div
                className={`flex items-center justify-center rounded-full transition-all duration-[380ms] ${
                  isActive
                    ? "-translate-y-3 bg-michelin-green p-[10px] shadow-[0_6px_18px_rgba(132,189,0,0.45)]"
                    : ""
                }`}
                style={
                  isActive
                    ? { transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }
                    : { transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", transitionDuration: "280ms" }
                }
              >
                {/* Icônes Lucide pour Accueil et Communauté */}
                {kind === "lucide-home" && (
                  <Home
                    size={20}
                    className={`transition-colors duration-200 ${isActive ? "text-white" : "text-neutral-400"}`}
                    strokeWidth={isActive ? 2.5 : 1.8}
                  />
                )}
                {kind === "lucide-community" && (
                  <Users2
                    size={20}
                    className={`transition-colors duration-200 ${isActive ? "text-white" : "text-neutral-400"}`}
                    strokeWidth={isActive ? 2.5 : 1.8}
                  />
                )}

                {/* Icônes SVG Michelin */}
                {kind === "svg-find" && (
                  <img
                    src={choseRightTireIcon}
                    alt=""
                    aria-hidden="true"
                    className={`h-5 w-5 transition-all duration-200 ${isActive ? "icon-active" : "icon-inactive"}`}
                  />
                )}
                {kind === "svg-tires" && (
                  <img
                    src={bicycleWheelIcon}
                    alt=""
                    aria-hidden="true"
                    className={`h-5 w-5 transition-all duration-200 ${isActive ? "icon-active" : "icon-inactive"}`}
                  />
                )}
                {kind === "svg-activities" && (
                  <img
                    src={tireLifeIcon}
                    alt=""
                    aria-hidden="true"
                    className={`h-5 w-5 transition-all duration-200 ${isActive ? "icon-active" : "icon-inactive"}`}
                  />
                )}
              </div>

              {/* Label */}
              <span
                className={`leading-none transition-all duration-200 ${
                  isActive
                    ? "-translate-y-0.5 text-[10px] font-extrabold tracking-tight text-michelin-green"
                    : "text-[9.5px] font-medium text-neutral-400"
                }`}
              >
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
