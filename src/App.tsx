import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthGate from "./components/AuthGate";
import { MainLayout } from "./components/MainLayout";

import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Modules from "./pages/Modules";
import Analysis from "./pages/Analysis";
import Auth from "./pages/Auth";

import RobloxEntry from "./pages/roblox/RobloxEntry";
import RobloxRegion from "./pages/roblox/RobloxRegion";
import RobloxObjective from "./pages/roblox/RobloxObjective";
import RobloxVerify from "./pages/roblox/RobloxVerify";
import RobloxCheckout from "./pages/roblox/RobloxCheckout";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>
          {/* PUBLIC */}
          <Route path="/auth" element={<Auth />} />

          {/* PROTECTED */}
          <Route element={<AuthGate />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/modules" element={<Modules />} />

              <Route path="/modules/roblox" element={<RobloxEntry />} />
              <Route path="/modules/roblox/region" element={<RobloxRegion />} />
              <Route path="/modules/roblox/objective" element={<RobloxObjective />} />
              <Route path="/modules/roblox/verify" element={<RobloxVerify />} />
              <Route path="/modules/roblox/checkout" element={<RobloxCheckout />} />

              <Route path="/analysis" element={<Analysis />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
