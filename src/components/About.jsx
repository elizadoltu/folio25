import React, { useEffect, useRef, lazy, Suspense } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { bouncy } from "ldrs";
const Contact = lazy(() => import("../components/Contact"));

gsap.registerPlugin(ScrollTrigger);
bouncy.register();

const About = () => {
  const imageRefs = useRef([]);
  const keyWordsRef = useRef([]);
  const paragraphsRef = useRef([]);
  const imageAnimationRevealRef = useRef([]);

  const addToAnimationReveal = (el) => {
    if (el && !imageAnimationRevealRef.current.includes(el)) {
      imageAnimationRevealRef.current.push(el);
    }
  };

  const addToKeyRefs = (el) => {
    if (el && !keyWordsRef.current.includes(el)) {
      keyWordsRef.current.push(el);
    }
  };

  const addToParagraphsRefs = (el) => {
    if (el && !paragraphsRef.current.includes(el)) {
      paragraphsRef.current.push(el);
    }
  };

  useEffect(() => {
    imageAnimationRevealRef.current.forEach((el) => {
      gsap.fromTo(
        el,
        {
          clipPath: "inset(0 100% 0 0)",
        },
        {
          clipPath: "inset(0 0 0 0)",
          duration: 0.5,
          delay: 0.1,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    });
  }, []);

  const mergeRefs =
    (...refs) =>
    (el) => {
      refs.forEach((ref) => {
        if (typeof ref === "function") {
          ref(el);
        } else if (ref && typeof ref === "object") {
          ref.current = el;
        }
      });
    };

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
          y: 100,
          duration: 0.6,
          stagger: 0.15,
          delay: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
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
    const revertFunctions = [];

    keyWordsRef.current.forEach((element) => {
      if (!element) return;

      const splitText = new SplitType(element, {
        types: "words",
      });

      if (splitText.words && splitText.words.length > 0) {
        gsap.from(splitText.words, {
          opacity: 0,
          y: 50,
          duration: 0.6,
          stagger: 0.15,
          delay: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }

      revertFunctions.push(() => splitText.revert());
    });

    return () => {
      revertFunctions.forEach((revert) => revert());
      keyWordsRef.current = [];
    };
  }, []);

  useEffect(() => {
    imageRefs.current.forEach((imgRef, index) => {
      if (imgRef) {
        gsap.set(imgRef, { scale: 1 });

        const handleMouseEnter = () => {
          gsap.to(imgRef, { scale: 1.1, duration: 0.3 });
        };

        const handleMouseLeave = () => {
          gsap.to(imgRef, { scale: 1, duration: 0.3 });
        };

        imgRef.addEventListener("mouseenter", handleMouseEnter);
        imgRef.addEventListener("mouseleave", handleMouseLeave);

        imageRefs.current[index].handlers = {
          enter: handleMouseEnter,
          leave: handleMouseLeave,
        };
      }
    });

    return () => {
      imageRefs.current.forEach((imgRef) => {
        if (imgRef?.handlers) {
          imgRef.removeEventListener("mouseenter", imgRef.handlers.enter);
          imgRef.removeEventListener("mouseleave", imgRef.handlers.leave);
        }
      });
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
    }
  };
  return (
    <main
      className="size-container-ideal p-3 bg-[#131313] text-[#e2e1df] overflow-hidden"
      id="about"
    >
      <div
        className="uppercase mt-[20vh] tablet:text-6xl mobile:text-5xl"
        ref={addToKeyRefs}
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      >
        <h3 className="font-geist-medium tracking-tighter">
          <span className="font-kenoky">technology</span> & creativity
        </h3>
      </div>
      <div
        className="flex flex-col items-center tablet:text-6xl mobile:text-4xl uppercase tracking-tighter"
        ref={addToKeyRefs}
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      >
        <h3 className="font-geist-medium">
          engaging digital <span className="font-kenoky">experiences</span>
        </h3>
        <div className="flex justify-between">
          <h3 className="font-kenoky">learn;experiment</h3>
          <h3 className="font-geist-medium ml-30">&refine</h3>
        </div>
      </div>
      <div
        className="flex justify-end tablet:text-6xl mobile:text-5xl uppercase tracking-tighter"
        ref={addToKeyRefs}
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      >
        <h3>
          functionality <span className="font-kenoky">& aesthetics</span>
        </h3>
      </div>
      <section className="grid tablet:grid-cols-2 mobile:grid-cols-1 w-full gap-5 mt-[10vh]">
        <div className="flex items-stretch overflow-hidden">
          <img
            ref={mergeRefs(addToRefs, addToAnimationReveal)}
            src="/profile-2.webp"
            alt="eliza teodora doltu skiing"
            className="w-full h-[500px] object-cover"
            data-cursor="Who doesn't love skiing?"
            style={{
              clipPath: "inset(0 100% 0 0)",
              transition: "clip-path 0.3s ease-out",
            }}
          />
        </div>

        <section className="flex flex-col items-stretch font-geist-medium uppercase">
          <div className="flex overflow-hidden">
            <img
              ref={mergeRefs(addToRefs, addToAnimationReveal)}
              src="/profile-3.webp"
              alt="eliza - teodora doltu"
              className="w-full h-[500px] object-cover"
              data-cursor="James Bond style"
              style={{
                clipPath: "inset(0 100% 0 0)",
                transition: "clip-path 0.5s ease-out",
              }}
            />
          </div>
          <h2
            className="tracking-tighter font-geist-medium tablet:text-9xl mobile:text-7xl"
            ref={addToKeyRefs}
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          >
            <span className="font-kenoky">who</span> am i?
          </h2>
          <p
            className=" text-sm tablet:max-w-2xl mt-4"
            ref={addToParagraphsRefs}
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          >
            I'm Eliza, a Computer Science student at Alexandru Ioan Cuza
            University, driven by{" "}
            <span className="italic font-geist-regular underline">
              creativity and a passion
            </span>{" "}
            for blending design with technology. As a{" "}
            <span className="italic font-geist-regular underline">
              web developer and designer
            </span>
            , I love bringing ideas to life through code and motion.
          </p>
          <p
            className="tablet:max-w-xl text-sm mt-4"
            ref={addToParagraphsRefs}
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          >
            Movement, both in design and life, keeps me inspired—whether it’s
            <span className="font-geist-regular italic underline">
              {" "}
              skiing, football, or simply staying active.
            </span>{" "}
            I believe that staying energized and adaptable in all aspects of
            life fuels my creativity and approach to problem-solving.
          </p>
          <p
            className="tablet:max-w-2xl text-sm mt-4"
            ref={addToParagraphsRefs}
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          >
            A huge sci-fi fan, I draw inspiration from{" "}
            <span className="italic font-geist-regular underline">
              Dune and Star Wars,{" "}
            </span>{" "}
            fascinated by their world-building and futuristic ideas. Just as
            these stories push creative boundaries, I strive to craft digital
            experiences that captivate and inspire. I thrive in{" "}
            <span className="italic font-geist-regular underline">
              dynamic environments, always eager to learn, adapt, and innovate
            </span>{" "}
            in the ever-evolving world of technology.
          </p>
        </section>
      </section>

      <div className="uppercase mt-[10vh] tablet:flex gap-10 text-base font-geist-semibold">
        <div>
          <h3
            className="underline"
            ref={addToParagraphsRefs}
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          >
            honors & awards
          </h3>
          <div
            className="mt-5 leading-none uppercase"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          >
            <p ref={addToParagraphsRefs}>
              site of the day - css winner &#40;2025&#41;
            </p>
            <p ref={addToParagraphsRefs}>
              young jury - awwwards &#40;2025&#41;
            </p>
            <p ref={addToParagraphsRefs}>
              honors - portfolio 24' &#40;2024&#41;
            </p>
            <p ref={addToParagraphsRefs}>judge awards - ftc &#40;2019&#41;</p>
          </div>
        </div>
        <div className="mobile:mt-10 tablet:mt-0">
          <h3
            className="underline"
            ref={addToParagraphsRefs}
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          >
            skills
          </h3>
          <div className="flex gap-5 leading-none mt-5">
            <div>
              <p ref={addToParagraphsRefs}>react</p>
              <p ref={addToParagraphsRefs}>angular</p>
              <p ref={addToParagraphsRefs}>tailwind css</p>
              <p ref={addToParagraphsRefs}>gsap</p>
              <p ref={addToParagraphsRefs}>figma</p>
            </div>
            <div>
              <p ref={addToParagraphsRefs}>nodejs</p>
              <p ref={addToParagraphsRefs}>expressjs</p>
              <p ref={addToParagraphsRefs}>python</p>
              <p ref={addToParagraphsRefs}>mongodb</p>
            </div>
          </div>
        </div>
      </div>
      <Suspense
        fallback={
          <div className="w-full h-screen flex flex-col justify-center items-center bg-[#131313] text-[#e2e1df] uppercase font-geist-medium">
            <h4 className="mb-5">Loading</h4>
            <l-bouncy size="45" speed="1.75" color="white"></l-bouncy>
          </div>
        }
      >
        <Contact />
      </Suspense>
    </main>
  );
};

export default About;
