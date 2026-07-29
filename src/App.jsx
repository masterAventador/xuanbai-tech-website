import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import {
  ContactModal,
  SiteFooter,
  SiteHeader,
} from "./components/SiteChrome.jsx";
import { BaizePage } from "./pages/BaizePage.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { QianshouPage } from "./pages/QianshouPage.jsx";
import { TiangongPage } from "./pages/TiangongPage.jsx";

function Website() {
  const [contactOpen, setContactOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <div className="site-shell">
      <SiteHeader onContact={() => setContactOpen(true)} />
      <Routes>
        <Route
          path="/"
          element={<HomePage onContact={() => setContactOpen(true)} />}
        />
        <Route
          path="/baize"
          element={<BaizePage onContact={() => setContactOpen(true)} />}
        />
        <Route
          path="/tiangong"
          element={<TiangongPage onContact={() => setContactOpen(true)} />}
        />
        <Route
          path="/qianshou"
          element={<QianshouPage onContact={() => setContactOpen(true)} />}
        />
      </Routes>
      <SiteFooter onContact={() => setContactOpen(true)} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Website />
    </BrowserRouter>
  );
}
