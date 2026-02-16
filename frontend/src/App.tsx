import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import Vision from "./pages/Vision";
import Resources from "./pages/Resources";
import TeacherResources from "./pages/TeacherResources";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import District from "./pages/District";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
// import TableDemo from "./pages/TableDemo";
import MembershipForm from "./pages/MembershipForm";
import LoginPage from "./pages/LoginPage";
import "./i18n/config";
import Circulars from "./pages/Circulars";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              {/* <Route path="/vision" element={<Vision />} /> */}
              <Route path="/resources" element={<Resources />} />
              <Route path="/teacher-resources" element={<TeacherResources />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/district/:districtId" element={<District />} />
              {/* <Route path="/table-demo" element={<TableDemo />} /> */}
              <Route path="/membershipForm" element={<MembershipForm />} />
             {/* <Route path="/admin/login" element={<AdminLogin />} />*/}
              {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
              <Route path="/circulars" element={<Circulars />} />
               <Route path="/login" element={<LoginPage />} />
                <Route
              path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
