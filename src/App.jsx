// App.jsx
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import SpaceDetail from "./pages/SpaceDetail";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";

import { AuthProvider } from "./contexts/AuthContext";
import { BookingProvider } from "./contexts/BookingContext";
import { SpacesProvider } from "./contexts/SpacesContext";

export default function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <SpacesProvider>
          <div style={{ width: "100%", minHeight: "100vh" }}>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/space/:spaceId" element={<SpaceDetail />} />
              <Route path="/dashboard/my-bookings" element={<DashboardPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </div>
        </SpacesProvider>
      </BookingProvider>
    </AuthProvider>
  );
}
