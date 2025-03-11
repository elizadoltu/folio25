import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

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
          clipPath: "inset(0 100% 0 0)"
        },
        {
          clipPath: "inset(0 0 0 0)",
          duration: 0.5,
          delay: 0.5,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: el, 
            start: "top 90%",
            toggleActions: "play none none none",
            once: true
          }
        }
      );
    })
  }, []);

  const mergeRefs = (...refs) => (el) => {
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
        types: "lines"
      });
      
      if (splitText.lines && splitText.lines.length > 0) {
        gsap.from(splitText.lines, {
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
      revertFunctions.forEach(revert => revert());
      paragraphsRef.current = [];
    };
  }, []);

  useEffect(() => {
    const revertFunctions = [];
    
    keyWordsRef.current.forEach((element) => {
      if (!element) return;
      
      const splitText = new SplitType(element, {
        types: "words"
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
      revertFunctions.forEach(revert => revert());
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
    <div className="size-container-ideal p-3" id="about">
      <div className="uppercase mt-[20vh] text-6xl" ref={addToKeyRefs} style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
        <h1 className="font-geist-medium tracking-tighter"><span className="font-kenoky">technology</span> & creativity</h1>
      </div>
      <div className="flex flex-col items-center text-6xl uppercase tracking-tighter" ref={addToKeyRefs} style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
        <h1 className="font-geist-medium">engaging digital <span className="font-kenoky">experiences</span></h1>
        <div className="flex justify-between">
          <h1 className="font-kenoky">learn;experiment</h1>
          <h1 className="font-geist-medium ml-30">&refine</h1>
        </div>
      </div>
      <div className="flex justify-end text-6xl uppercase tracking-tighter" ref={addToKeyRefs} style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
        <h1>functionality <span className="font-kenoky">& aesthetics</span></h1>
      </div>
      <div className="grid grid-cols-2 w-full gap-5 mt-[10vh]">
        <div className="flex items-stretch overflow-hidden">
          <img
          ref={mergeRefs(addToRefs, addToAnimationReveal)}
            src="/profile-3.svg"
            alt="eliza teodora doltu skiing"
            className="w-full h-[500px] object-cover"
            data-cursor="Who doesn't love skiing?"
            style={{
              clipPath: "inset(0 100% 0 0)",
            transition: "clip-path 0.3s ease-out",
            }}
          />
        </div>

        <div className="flex flex-col items-stretch font-geist-medium">
          <div className="flex overflow-hidden">
            <img
            ref={mergeRefs(addToRefs, addToAnimationReveal)}
              src="/profile-2.svg"
              alt="eliza - teodora doltu"
              className="w-full h-[500px] object-cover"
              data-cursor="James Bond style"
              style={{
                clipPath: "inset(0 100% 0 0)",
              transition: "clip-path 0.5s ease-out",
              }}
            />
          </div>
          <h1 className="tracking-tighter uppercase font-geist-medium text-9xl" ref={addToKeyRefs} style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}><span className="font-kenoky">who</span> am i?</h1>
          <p className=" text-sm max-w-2xl mt-4" ref={addToParagraphsRefs}>
            A huge sci-fi fan, I draw inspiration from Dune and Star Wars,
            fascinated by their world-building and futuristic ideas. Just as
            these stories push creative boundaries, I aim to build digital
            experiences that captivate and inspire.
          </p>
          <p className="max-w-2xl text-sm mt-4" ref={addToParagraphsRefs}>
            Whether I’m coding, skiing, or cheering for Real Madrid, I bring
            passion and energy to everything I do. I thrive in fast-paced
            environments, always eager to learn, adapt, and innovate in the
            ever-evolving world of technology.
          </p>
        </div>
      </div>

      <div className="uppercase mt-[10vh] flex gap-10 text-base font-geist-semibold">
        <div>
          <h1 className="underline" ref={addToParagraphsRefs}>honors & awards</h1>
          <div className="mt-5 leading-none uppercase">
            <p ref={addToParagraphsRefs}>young jury - awwwards &#40;2025&#41;</p>
            <p ref={addToParagraphsRefs}>honors - portfolio 24' &#40;2024&#41;</p>
            <p ref={addToParagraphsRefs}>honors - meowseum &#40;2025&#41;</p>
            <p ref={addToParagraphsRefs}>judge awards - ftc &#40;2019&#41;</p>
          </div>
        </div>
        <div>
            <h1 className="underline" ref={addToParagraphsRefs}>skills</h1>
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
    </div>
  );
};

export default About;
