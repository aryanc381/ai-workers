import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import LoginPage from "@/pages/LoginPage.tsx";
import SignupPage from "@/pages/SignupPage.tsx";
import DashboardPage from "@/pages/DashboardPage.tsx";
import PluginPage from "@/pages/PluginPage.tsx";

export default function App() {
  return (
    <TooltipProvider>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard/plugin" element={<PluginPage />} />
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
      <Toaster theme="light" />
    </TooltipProvider>
  );
}
