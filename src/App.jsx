import React, { useEffect, lazy, Suspense } from "react";
import "./index.css";
import "./global/geist.css";
import "./global/kenoky.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
import { ParallaxProvider } from "react-scroll-parallax";

gsap.registerPlugin(ScrollTrigger);

const Main = lazy(() => import("./pages/Main"));
const SingleProject = lazy(() => import("./pages/SingleProject"));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
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
    <ParallaxProvider>
      <Router>
        <Suspense fallback={<div className="bg-[#131313] text-[#e2e1df] flex justify-center items-center h-screen w-full">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/projects/:projectLink" element={<SingleProject />} />
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </Suspense>
      </Router>
    </ParallaxProvider>
  );
}

export default App;
