import React, { useEffect, lazy, Suspense } from "react";
import "./index.css";
import "./global/geist.css";
import "./global/kenoky.css";
import "./global/general-sans.css";
import "./global/switzer.css";
import "./global/dirtyline.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
import { ParallaxProvider } from "react-scroll-parallax";
import { bouncy } from "ldrs";

gsap.registerPlugin(ScrollTrigger);
bouncy.register();

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
        <Suspense fallback={<div className="w-full h-screen flex flex-col justify-center items-center bg-[#131313] text-[#e2e1df] uppercase font-geist-medium"><h4 className="mb-5">Loading</h4><l-bouncy size="45" speed="1.75" color="white"></l-bouncy></div>}>
      
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
