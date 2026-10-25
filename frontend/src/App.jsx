import {
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderConfirmation from "./pages/OrderConfirmation.jsx";
import About from "./pages/About.jsx";
import Menu from "./pages/Menu.jsx";
import Contact from "./pages/Contact.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";

import AdminLogin from "./pages/admin/AdminLogin.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import ProductsAdmin from "./pages/admin/ProductsAdmin.jsx";
import OrdersAdmin from "./pages/admin/OrdersAdmin.jsx";
import ContactsAdmin from "./pages/admin/ContactsAdmin.jsx";

import AdminShell from "./components/AdminShell.jsx";
import AdminGuard from "./components/AdminGuard.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import { AnimatePresence } from "framer-motion";
import PageAnimations from "./components/PageAnimations.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors dark:bg-slate-900 dark:text-slate-100">
      <Header />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-7 sm:py-9">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public Pages */}
            <Route path="/" element={<PageAnimations><Home /></PageAnimations>} />
            <Route path="/about" element={<PageAnimations><About /></PageAnimations>} />
            <Route path="/menu" element={<PageAnimations><Menu /></PageAnimations>} />
            <Route
              path="/menu/:id"
              element={<PageAnimations><ProductDetail /></PageAnimations>}
            />
            <Route path="/contact" element={<PageAnimations><Contact /></PageAnimations>} />
            <Route path="/cart" element={<PageAnimations><Cart /></PageAnimations>} />
            <Route path="/checkout" element={<PageAnimations><Checkout /></PageAnimations>} />

            <Route
              path="/order-confirmation/:orderId"
              element={<PageAnimations><OrderConfirmation /></PageAnimations>}
            />

            {/* Admin Login */}
            <Route
              path="/admin/login"
              element={<PageAnimations><AdminLogin /></PageAnimations>}
            />

            {/* Protected Admin Routes */}
            <Route element={<AdminGuard />}>
              <Route
                path="/admin"
                element={<AdminShell />}
              >
                <Route
                  index
                  element={<Dashboard />}
                />

                <Route
                  path="products"
                  element={<ProductsAdmin />}
                />

                <Route
                  path="orders"
                  element={<OrdersAdmin />}
                />

                <Route
                  path="contacts"
                  element={<ContactsAdmin />}
                />
              </Route>
            </Route>

            {/* 404 Page */}
            <Route
              path="*"
              element={<PageAnimations><PageNotFound /></PageAnimations>}
            />
          </Routes>
        </AnimatePresence>
      </main>

      {!isAdmin && <Footer />}
    </div>
  );
}

export default App
