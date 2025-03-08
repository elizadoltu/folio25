import React, { useEffect } from "react";
import Main from "./pages/Main";
import "./index.css";
import "./global/geist.css";
import "./global/kenoky.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingleProject from "./pages/SingleProject";
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function App () {

  useEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/projects/:projectLink" element={<SingleProject />} />
      </Routes>
    </Router>
  );
}

export default App;