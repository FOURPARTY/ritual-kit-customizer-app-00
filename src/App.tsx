
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Search from "./pages/Search";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import OrderTracking from "./pages/OrderTracking";
import Welcome from "./pages/Welcome";
import EmailAuth from "./pages/EmailAuth";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import KitCatalog from "./pages/KitCatalog";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Index />} />
          <Route path="/buscar" element={<Search />} />
          <Route path="/kits" element={<KitCatalog />} />
          <Route path="/pedidos" element={<Orders />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/pedidos/:orderId" element={<OrderTracking />} />
          <Route path="/auth/welcome" element={<Welcome />} />
          <Route path="/auth/email" element={<EmailAuth />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
