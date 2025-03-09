import React, { useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import Menu from "../components/Menu";
import ScrollTrigger from "gsap/ScrollTrigger";
import MarqueeScrollDirection from "../components/MarqueeDirection";
import About from "../components/About";
import Contact from "../components/Contact";

gsap.registerPlugin(ScrollTrigger);

function Main() {
  const firstSectionRef = useRef(null);
  const secondSectionRef = useRef(null);
  const containerRef = useRef(null);

  return (
    <div className="size-container-ideal relative">
      <Menu />
      <div className="uppercase mt-5 text-12xl flex leading-none flex-wrap flex-1 justify-between p-3">
        <h1 className="font-kenoky">eliza</h1>
        <h1 className="font-geist-semibold">doltu</h1>
      </div>
      <div className="flex justify-end w-full px-3">
        <div className="flex gap-5 w-4xl uppercase">
          <p className="text-sm">
            Hi, my name is Eliza, and creativity drives everything I do. As a
            web developer and designer, I see websites as more than just
            functional spaces—they’re immersive experiences shaped by visuals,
            typography, and motion. I love blending design and technology to
            bring ideas to life.
          </p>
          <p className="text-sm">
            I’m currently studying Computer Science at Alexandru Ioan Cuza
            University, constantly improving my technical skills and
            problem-solving abilities. Beyond coding, I’ve always been
            passionate about movement—skiing, football, and staying active have
            been part of my life since childhood.
          </p>
        </div>
      </div>
      <div className="mt-[20vh] p-3 flex justify-between items-end">
        <div className="w-96">
          <img
          src="/logo-black.svg"
          alt="logo of the website"
          className="w-30 h-30"
        />
        <p className="mt-5 text-sm uppercase">
          For me, web development is an art where logic and creativity meet. I
          enjoy crafting sleek interfaces, dynamic interactions, and intuitive
          designs that not only look good but feel seamless and engaging.
        </p>
        </div>
        <img src="/profile-1.svg" alt="eliza teodora doltu" />
      </div>
      <div className="size-container-ideal">
       
          <div className="mt-[20vh]">
            <MarqueeScrollDirection direction="left" />
            <MarqueeScrollDirection direction="right" />
          </div>
          <About />
      </div>
      <Contact />
    </div>
  );
}

export default Main;
