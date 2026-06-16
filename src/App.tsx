import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import FindTire from "./pages/FindTire";
import MyTires from "./pages/MyTires";
import TireTracking from "./pages/TireTracking";
import RecommendationModal from "./pages/RecommendationModal";
import Activities from "./pages/Activities";
import Retailers from "./pages/Retailers";

function App() {
  const isConnected = "true";

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={isConnected ? <Navigate to="/dashboard" replace /> : <Home />}
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/trouver-pneu" element={<FindTire />} />
          <Route path="/retailers" element={<Retailers />} />

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
            path="/suivi-pneu"
            element={
              <RequireAuth>
                <TireTracking />
              </RequireAuth>
            }
          />
        </Route>

        <Route
          path="/remplacement"
          element={
            <RequireAuth>
              <RecommendationModal />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;