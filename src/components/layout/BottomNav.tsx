import { Home, Search, CircleGauge, ChartLine, Boxes } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function BottomNav() {
  const { isAuthenticated } = useAuth();
  const baseClass =
    "flex flex-col items-center gap-1 text-[11px]";
  const activeClass = "font-bold text-[#27509B]";

  return (
    <nav className="flex h-16 shrink-0 items-center justify-around border-t border-neutral-300 bg-white">
      <NavLink
        to={isAuthenticated ? "/dashboard" : "/"}
        className={({ isActive }) =>
          `${baseClass} ${isActive ? activeClass : ""}`
        }
      >
        <Home size={19} />
        <span>Accueil</span>
      </NavLink>

      <NavLink
        to="/trouver-pneu"
        className={({ isActive }) =>
          `${baseClass} ${isActive ? activeClass : ""}`
        }
      >
        <Search size={20} />
        <span>Trouver pneu</span>
      </NavLink>

      <NavLink
        to="/mes-pneus"
        className={({ isActive }) =>
          `${baseClass} ${isActive ? activeClass : ""}`
        }
      >
        <CircleGauge size={20} />
        <span>Mes pneus</span>
      </NavLink>

      <NavLink
        to="/activites"
        className={({ isActive }) =>
          `${baseClass} ${isActive ? activeClass : ""}`
        }
      >
        <ChartLine size={20} />
        <span>Activités</span>
      </NavLink>

      <NavLink
        to="/communaute"
        className={({ isActive }) =>
          `${baseClass} ${isActive ? activeClass : ""}`
        }
      >
        <Boxes size={20} />
        <span>Communauté</span>
      </NavLink>
    </nav>
  );
}
