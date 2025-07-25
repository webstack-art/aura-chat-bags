import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";
import Category from "./pages/Category";
import BestSellersPage from "./pages/BestSellersPage";
import Search from "./pages/Search";
import Brands from "./pages/Brands";
import Categories from "./pages/Categories";
import Reviews from "./pages/Reviews";
import FAQ from "./pages/FAQ";
import ReturnPolicy from "./pages/ReturnPolicy";
import Support from "./pages/Support";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Orders from "./pages/Orders";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/brands" element={<Brands />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/return-policy" element={<ReturnPolicy />} />
              <Route path="/support" element={<Support />} />
              <Route path="/terms-of-use" element={<TermsOfUse />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/category/:categoryName" element={<Category />} />
              <Route path="/best-sellers" element={<BestSellersPage />} />
              <Route path="/search" element={<Search />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
