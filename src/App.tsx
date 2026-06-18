import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import RequireAuth from "./components/layout/RequireAuth";
import RecommendationModal from "./components/tires/RecommendationModal";
import { useAuth } from "./contexts/AuthContext";

import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import FindTirePage from "./pages/tires/FindTirePage";
import MyTiresPage from "./pages/tires/MyTiresPage";
import TireTrackingPage from "./pages/tires/TireTrackingPage";
import ActivitiesPage from "./pages/activities/ActivitiesPage";
import ActivityPage from "./pages/activities/ActivityPage";
import RetailersPage from "./pages/retailers/RetailersPage";
import SettingsPage from "./pages/settings/SettingsPage";
import CommunautePage from "./pages/community/CommunautePage";
import RecompensesPage from "./pages/rewards/RecompensesPage";
import ParrainagePage from "./pages/community/ParrainagePage";
import EvenementsPage from "./pages/community/EvenementsPage";
import GuidePage from "./pages/community/GuidePage";

function HomeRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-neutral-600">
        Chargement...
      </div>
    );
  }

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <HomePage />;
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

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/trouver-pneu"
          element={
            <RequireAuth>
              <FindTirePage />
            </RequireAuth>
          }
        />

        <Route
          path="/retailers"
          element={
            <RequireAuth>
              <RetailersPage />
            </RequireAuth>
          }
        />

        <Route
          path="/settings"
          element={
            <RequireAuth>
              <SettingsPage />
            </RequireAuth>
          }
        />

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashboardPage />
            </RequireAuth>
          }
        />

        <Route
          path="/mes-pneus"
          element={
            <RequireAuth>
              <MyTiresPage />
            </RequireAuth>
          }
        />

        <Route
          path="/activites"
          element={
            <RequireAuth>
              <ActivitiesPage />
            </RequireAuth>
          }
        />

        <Route
          path="/suivi-pneu/:tireId"
          element={
            <RequireAuth>
              <TireTrackingPage />
            </RequireAuth>
          }
        />

        <Route
          path="/communaute"
          element={
            <RequireAuth>
              <CommunautePage />
            </RequireAuth>
          }
        />

        <Route
          path="/recompenses"
          element={
            <RequireAuth>
              <RecompensesPage />
            </RequireAuth>
          }
        />

        <Route
          path="/parrainage"
          element={
            <RequireAuth>
              <ParrainagePage />
            </RequireAuth>
          }
        />

        <Route
          path="/evenements"
          element={
            <RequireAuth>
              <EvenementsPage />
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

        <Route
          path="/guide"
          element={
            <RequireAuth>
              <GuidePage />
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
