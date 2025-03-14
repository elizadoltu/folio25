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
  const [contentVisible, setContentVisible] = useState(false);

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

      <main className="size-container-ideal relative">
        <DynamicCursor />
        <Menu />
        <section data-cursor="scroll for more" id="landing">
          <div
            className="uppercase tablet:mt-10 mobile:mt-40 desktop:text-12xl tablet:text-11xl mobile:text-8xl flex leading-none flex-wrap flex-1 justify-between p-3"
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
          <section className="tablet:flex justify-end w-full px-3 leading-none mobile:hidden ">
            <div
              className="desktop:w-[50rem] tablet:w-[42rem] font-geist-medium uppercase tablet:text-base"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            >
              <p className="leading-none" ref={addToParagraphsRefs}>
                Websites are more than just functional spaces—they're immersive
                experiences
              </p>
              <p className="leading-none" ref={addToParagraphsRefs}>
                where visuals, typography and motion come together to tell a
                story, evoke emotions and create memorable interactions.
              </p>
              <p className="leading-none text-right" ref={addToParagraphsRefs}>
                Every element, from the smallest detail to the overall design
              </p>
              <p className="leading-none" ref={addToParagraphsRefs}>
                plays a role in shaping how users feel and engage
              </p>
              <p className="leading-none" ref={addToParagraphsRefs}>
                transforming a simple visit into an inspiring journey.
              </p>
            </div>
          </section>
          <section className="tablet:mt-[22vh] mobile:mt-[10vh] p-5 tablet:flex justify-between items-end">
            <div className="tablet:w-96 mobile:w-full">
              <img
                src="/logo-black.svg"
                alt="logo of the website"
                className="tablet:w-30 tablet:h-30 mobile:w-20 mobile:h-20 logo-image"
              />
              <p
                className="mt-5 text-sm font-geist-medium flex flex-wrap flex-1"
                ref={addToParagraphsRefs}
              >
                For me, web development is an art where logic and creativity
                meet. I enjoy crafting sleek interfaces, dynamic interactions,
                and intuitive designs that not only look good but feel seamless
                and engaging.
              </p>
            </div>
            <img
              src="/profile-1.webp"
              alt="eliza teodora doltu"
              ref={imageAnimationRevealRef}
              className="mobile:w-full tablet:w-64"
              style={{
                clipPath: "inset(0 100% 0 0)",
                transition: "clip-path 0.3s ease-out",
              }}
            />
          </section>
        </section>

        <section className="size-container-ideal">
          <Work />
          <div>
            <MarqueeScrollDirection direction="left" text="since 2003" />
            <MarqueeScrollDirection direction="right" text="from romania" />
          </div>
          <About />
        </section>
      </main>
    </>
  );
}

export default Main;
