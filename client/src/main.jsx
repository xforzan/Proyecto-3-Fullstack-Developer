import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import { CarProvider } from "./context/CarContext";
import { AppointmentProvider } from  "./context/AppointmentContext"
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CarProvider>
        <AppointmentProvider>
        <AppRouter />
        </AppointmentProvider>
      </CarProvider>
    </AuthProvider>
  </StrictMode>
);
