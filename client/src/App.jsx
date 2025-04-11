import { Landin, Ecomerce, Custimizer } from "./pages/index.js";
import { Header, Footer } from "./layout/index.js";
import { useEffect } from "react";
import Lenis from '@studio-freight/lenis';
import { Route, Routes } from "react-router-dom";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time); // ✅ ici on utilise bien "time" et pas "number"
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
      <Routes>
        <Route path="/" element={<Landin />} />
        <Route path="/customizer" element={<Custimizer />} />
        <Route path="/ecomerce" element={<Ecomerce />} />
      </Routes>
  );
}

export default App;
// import React from 'react'