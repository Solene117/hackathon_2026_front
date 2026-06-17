import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import { useAuth } from "./contexts/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import FindTire from "./pages/FindTire";
import MyTires from "./pages/MyTires";
import TireTracking from "./pages/TireTracking";
import RecommendationModal from "./pages/RecommendationModal";
import Activities from "./pages/Activities";
import ActivityPage from "./pages/ActivityPage";
import Retailers from "./pages/Retailers";
import Settings from "./pages/Settings";
import Communaute from "./pages/Communaute";

function HomeRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-neutral-600">
        Chargement...
      </div>
    );
  }

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Home />;
}

function RecommendationPage() {
  const navigate = useNavigate();
  return <RecommendationModal onClose={() => navigate("/dashboard")} />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomeRoute />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/trouver-pneu" element={<FindTire />} />

        <Route
          path="/retailers"
          element={
            <RequireAuth>
              <Retailers />
            </RequireAuth>
          }
        />

        <Route
          path="/settings"
          element={
            <RequireAuth>
              <Settings />
            </RequireAuth>
          }
        />

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />

        <Route
          path="/mes-pneus"
          element={
            <RequireAuth>
              <MyTires />
            </RequireAuth>
          }
        />

        <Route
          path="/activites"
          element={
            <RequireAuth>
              <Activities />
            </RequireAuth>
          }
        />

        <Route
          path="/suivi-pneu/:tireId"
          element={
            <RequireAuth>
              <TireTracking />
            </RequireAuth>
          }
        />

        <Route
          path="/communaute"
          element={
            <RequireAuth>
              <Communaute />
            </RequireAuth>
          }
        />
      </Route>

      <Route
        path="/remplacement"
        element={
          <RequireAuth>
            <RecommendationPage />
          </RequireAuth>
        }
      />

      <Route
        path="/activites/:id"
        element={
          <RequireAuth>
            <ActivityPage />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
