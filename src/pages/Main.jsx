import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Menu from "../components/Menu";
import ScrollTrigger from "gsap/ScrollTrigger";
import MarqueeScrollDirection from "../components/MarqueeDirection";
import About from "../components/About";
import Work from "../components/Work";
import DynamicCursor from "../utils/DynamicCursor";
import SplitType from "split-type";
import PageFadeSequence from "../animations/PageFadeSequence";

gsap.registerPlugin(ScrollTrigger);

function Main() {
  

  const [isTransitionActive, setIsTransitionActive] = useState(true);

  const handleTransitionComplete = () => {
    setContentVisible(true);
  };
  
  

  const imageAnimationRevealRef = useRef(null);
  const paragraphsRef = useRef([]);
  const titleRef = useRef();

  const addToParagraphsRefs = (el) => {
    if (el && !paragraphsRef.current.includes(el)) {
      paragraphsRef.current.push(el);
    }
  };


  useEffect(() => {
    gsap.fromTo(
      imageAnimationRevealRef.current,
      {
        clipPath: "inset(0 100% 0 0)",
      },
      {
        clipPath: "inset(0 0 0 0)",
        duration: 0.5,
        delay: 3.5,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: imageAnimationRevealRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
          once: true,
        },
      }
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".logo-image",
      {
        rotation: 0,
      },
      {
        delay: 3.0,
        rotation: 360,
        duration: 2.5,
        scrollTrigger: {
          trigger: ".logo-image",
          start: "top 80%",
        },
      }
    );
  }, []);

  useEffect(() => {
    const revertFunctions = [];

    paragraphsRef.current.forEach((element) => {
      if (!element) return;

      const splitText = new SplitType(element, {
        types: "lines",
      });

      if (splitText.lines && splitText.lines.length > 0) {
        gsap.from(splitText.lines, {
          opacity: 0,
          y: 50,
          duration: 0.6,
          stagger: 0.1,
          delay: 3.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 100%",
            toggleActions: "play none none none",
          },
        });
      }

      revertFunctions.push(() => splitText.revert());
    });

    return () => {
      revertFunctions.forEach((revert) => revert());
      paragraphsRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (!titleRef.current) return;

    const splitText = new SplitType(titleRef.current, {
      types: "words",
    });

    if (splitText.words.length > 0) {
      gsap.from(splitText.words, {
        opacity: 0,
        y: 100,
        duration: 0.5,
        stagger: 0.12,
        delay: 3.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    }

    return () => splitText.revert();
  }, []);

  return (
    <>
  <PageFadeSequence 
        isActive={isTransitionActive} 
        onComplete={() => {
          setIsTransitionActive(false);
          handleTransitionComplete();
        }} 
      />
      
      <div className="size-container-ideal relative">
        <DynamicCursor />
        <Menu />
        <div
          className="uppercase mt-5 text-12xl flex leading-none flex-wrap flex-1 justify-between p-3"
          ref={titleRef}
        >
          <h1
            className="font-kenoky"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          >
            eliza
          </h1>

          <h1
            className="font-geist-medium tracking-tighter"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          >
            doltu
          </h1>
        </div>
        <div className="flex justify-end w-full px-3">
          <div className="flex gap-2 w-[50rem] font-geist-medium">
            <p className="text-sm w-7xl" ref={addToParagraphsRefs}>
              Hi, my name is Eliza, and creativity drives everything I do. As a
              web developer and designer, I see websites as more than just
              functional spaces—they're immersive experiences shaped by visuals,
              typography, and motion. I love blending design and technology to
              bring ideas to life.
            </p>
            <p className="text-sm w-7xl" ref={addToParagraphsRefs}>
              I'm currently studying Computer Science at Alexandru Ioan Cuza
              University, constantly improving my technical skills and
              problem-solving abilities. Beyond coding, I've always been
              passionate about movement—skiing, football, and staying active have
              been part of my life since childhood.
            </p>
          </div>
        </div>
        <div className="mt-[22vh] p-5 flex justify-between items-end">
          <div className="w-96">
            <img
              src="/logo-black.svg"
              alt="logo of the website"
              className="w-30 h-30 logo-image"
            />
            <p
              className="mt-5 text-sm font-geist-medium"
              ref={addToParagraphsRefs}
            >
              For me, web development is an art where logic and creativity meet. I
              enjoy crafting sleek interfaces, dynamic interactions, and intuitive
              designs that not only look good but feel seamless and engaging.
            </p>
          </div>
          <div className="text-right">
          <p className="text-sm font-geist-medium uppercase">Scroll Down</p>
            <img
            src="/profile-1.svg"
            alt="eliza teodora doltu"
            ref={imageAnimationRevealRef}
            style={{
              clipPath: "inset(0 100% 0 0)",
              transition: "clip-path 0.3s ease-out",
            }}
          />
          </div>
          
        </div>
        <div className="size-container-ideal">
          <div className="mt-[20vh]">
            <MarqueeScrollDirection direction="left" />
            <MarqueeScrollDirection direction="right" />
          </div>
          <About />

          <Work />
        </div>
      </div>
    </>
  );
}

export default Main;
