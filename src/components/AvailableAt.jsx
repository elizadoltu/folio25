import React, { useEffect, useRef, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import projectsData from "../data/projects";
import "../styles/button-bubble.css";
const Contact = lazy(() => import('../components/Contact'));
const BubbleButton = lazy(() => import('../components/BubbleButton'));
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "../styles/reveal-animation.css";
import { useParallax } from "react-scroll-parallax";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const AvailableAt = () => {
  const { projectLink } = useParams();
  const textFeaturedWorkRef = useRef(null);
  const paragraphsRef = useRef([]);
  const addToParagraphsRefs = (el) => {
    if (el && !paragraphsRef.current.includes(el)) {
      paragraphsRef.current.push(el);
    }
  };

  const project = projectsData.find(
    (project) => project.projectLink === projectLink
  );
  const nextProjectImageRef = useRef([]);
  const parentRef = useRef([]);

  const currentIndex = projectsData.findIndex(
    (p) => p.projectLink === projectLink
  );
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  const parallaxConfig = {
    image: {
      translateY: [0, 0],
      speed: 8,
      easing: "easeInOutQuad",
    },
    text: {
      translateY: [-70, 50],
      speed: 2,
      easing: "easeInOutQuad",
    },
  };
  const { ref: title } = useParallax(parallaxConfig.text);
  const addToNextProjectRef = (el) => {
    if (el && !nextProjectImageRef.current.includes(el)) {
      nextProjectImageRef.current.push(el);
    }
  };

  const addToParentRef = (el) => {
    if (el && !parentRef.current.includes(el)) {
      parentRef.current.push(el);
    }
  };

  useEffect(() => {
    const revertFunctions = [];

    paragraphsRef.current.forEach((element) => {
      if (!element) return;

      const splitText = new SplitType(element, {
        types: "words",
      });

      if (splitText.words && splitText.words.length > 0) {
        gsap.from(splitText.words, {
          opacity: 0,
          y: 50,
          duration: 0.6,
          stagger: 0.1,
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
    if (!textFeaturedWorkRef.current) return;

    const splitText = new SplitType(textFeaturedWorkRef.current, {
      types: "chars",
    });

    if (splitText.chars.length > 0) {
      gsap.from(splitText.chars, {
        opacity: 0,
        y: 50,
        duration: 0.2,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textFeaturedWorkRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    }

    return () => splitText.revert();
  }, []);

  useEffect(() => {
    if (parentRef.current.length > 0) {
      parentRef.current.forEach((parent, index) => {
        if (!parent) return;

        const nextProjectImage = nextProjectImageRef.current[index];
        if (!nextProjectImage) return;

        const handleMouseEnter = () => {
          gsap.to(nextProjectImage, {
            scale: 1.1,
            duration: 0.5,
            ease: "expoScale(0.5,7,none)",
          });
          gsap.to(parent, {
            scale: 0.95,
            duration: 0.5,
            ease: "expoScale(0.5,7,none)",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(nextProjectImage, {
            scale: 1,
            duration: 0.5,
            ease: "expoScale(0.5,7,none)",
          });
          gsap.to(parent, {
            scale: 1,
            duration: 0.5,
            ease: "expoScale(0.5,7,none)",
          });
        };

        parent.addEventListener("mouseenter", handleMouseEnter);
        parent.addEventListener("mouseleave", handleMouseLeave);

        parent._mouseEnterHandler = handleMouseEnter;
        parent._mouseLeaveHandler = handleMouseLeave;
      });

      return () => {
        parentRef.current.forEach((parent) => {
          if (parent) {
            parent.removeEventListener("mouseenter", parent._mouseEnterHandler);
            parent.removeEventListener("mouseleave", parent._mouseLeaveHandler);
          }
        });
      };
    }
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

    if (!project) return <div>Project not found</div>;

  return (
    <div className="mt-[20vh] size-container-ideal">
      <h1
        className="desktop:text-11xl tablet:text-10xl mobile:text-5xl font-geist-semibold tracking-tighter uppercase leading-none flex-1 flex-wrap flex items-center"
        ref={mergeRefs(textFeaturedWorkRef, title)}
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      >
        <span className="font-kenoky mr-2">Available </span> at
      </h1>
      <div className="size-container-ideal bg-[#131313] text-[#e2e1df]">
        <div className="grid tablet:grid-cols-2 gap-3 mt-5 text-sm uppercase font-geist-medium p-3">
          <div className="flex flex-col flex-1 flex-wrap">
            <p className="text-[#FF4C2F] leading-none">01</p>

            <div
              className="flex justify-between"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            >
              <p ref={addToParagraphsRefs} className="text-[#FF4C2F] leading-none">{project.design}</p>
              <div
                className="text-right leading-none mt-1"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
              >
                <p ref={addToParagraphsRefs}>ux/ui design</p>
                <p ref={addToParagraphsRefs}>prototyping</p>
                <p ref={addToParagraphsRefs}>visual consistency</p>
                <p ref={addToParagraphsRefs}>user-centric design</p>
                <p ref={addToParagraphsRefs}>
                  responsive layouts
                </p>
              </div>
            </div>
          </div>
          <div
            className="flex flex-col flex-1 flex-wrap"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          >
            <p className="text-[#FF4C2F] leading-none">02</p>

            <div
              className="flex justify-between"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            >
              <p ref={addToParagraphsRefs} className="text-[#FF4C2F] leading-none">{project.code}</p>
              <div
                className="text-right leading-none mt-1"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
              >
                <p ref={addToParagraphsRefs}>Source code</p>
                <p ref={addToParagraphsRefs}>repository</p>
                <p ref={addToParagraphsRefs}>version control</p>
                <p ref={addToParagraphsRefs}>development frameworks</p>
                <p ref={addToParagraphsRefs}>scalable architecture</p>
                <p ref={addToParagraphsRefs}>
                  deployment pipelines
                </p>
              </div>
            </div>
          </div>
          
         
        </div>
        <div className="grid tablet:grid-cols-2 gap-3 p-3">
          <div className="live-design-preview--container">
            <div className="mt-20 flex justify-between">
              <img src="/rectangle.png" alt="a corner of a div" />
              <img
                src="/rectangle.png"
                alt="a corner of a div"
                className="rotate-90"
              />
            </div>
            <div
              ref={addToParentRef}
              data-cursor={`see the ${project?.liveAt || project.design} version`}
            >
              <a href={project.linkDesign} target="_blank">
                <div className="-mt-10 p-5 relative h-[80vh]">
                  <div className="w-full h-full overflow-hidden">
                    <img
                      ref={addToNextProjectRef}
                      src={project.photos[1]}
                      alt={project.photos[2]}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute top-5 left-5 bottom-5 right-5 bg-[#2e2e2e] opacity-90"></div>
                  <div className="absolute top-1/2 left-1/2 text-[#E2E1DF] flex flex-col items-center uppercase -translate-x-1/2 -translate-y-1/2">
                    <p>&#40;Design&#41;</p>
                    <h1 className="font-kenoky tablet:text-9xl mobile:text-6xl">
                      {project?.liveAt || project.design}
                    </h1>
                  </div>
                </div>
              </a>
            </div>

            <div className="-mt-10 flex justify-between">
              <img
                src="/rectangle.png"
                alt="a corner of a div"
                className="-rotate-90"
              />
              <img
                src="/rectangle.png"
                alt="a corner of a div"
                className="rotate-180"
              />
            </div>
          </div>
          <div className="code-repo--container">
            <div className="mt-20 flex justify-between">
              <img src="/rectangle.png" alt="a corner of a div" />
              <img
                src="/rectangle.png"
                alt="a corner of a div"
                className="rotate-90"
              />
            </div>
            <div
              ref={addToParentRef}
              data-cursor={`see the source on ${project.code}`}
            >
              <a href={project.linkCode} target="_blank">
                <div className="-mt-10 p-5 relative h-[80vh]">
                  <div className="w-full h-full overflow-hidden">
                    <img
                      ref={addToNextProjectRef}
                      src={project.photos[2]}
                      alt={project.photos[2]}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute top-5 left-5 bottom-5 right-5 bg-[#2e2e2e] opacity-90"></div>
                  <div className="absolute top-1/2 left-1/2 text-[#E2E1DF] flex flex-col items-center uppercase -translate-x-1/2 -translate-y-1/2">
                    <p>&#40;Code&#41;</p>
                    <h1 className="font-kenoky tablet:text-9xl mobile:text-6xl">{project.code}</h1>
                  </div>
                </div>
              </a>
            </div>

            <div className="-mt-10 flex justify-between">
              <img
                src="/rectangle.png"
                alt="a corner of a div"
                className="-rotate-90"
              />
              <img
                src="/rectangle.png"
                alt="a corner of a div"
                className="rotate-180"
              />
            </div>
          </div>
        </div>
        <div className="next-project--container p-3">
            <div className="mt-20 flex justify-between">
              <img src="/rectangle.png" alt="a corner of a div" />
              <img
                src="/rectangle.png"
                alt="a corner of a div"
                className="rotate-90"
              />
            </div>
            <div
              ref={addToParentRef}
              data-cursor={`next project ${nextProject.projectFirstName} ${nextProject.projectSecondName}`}
            >
             
                <div className="-mt-10 p-5 relative h-[80vh]">
                  <div className="w-full h-full overflow-hidden">
                    <img
                      ref={addToNextProjectRef}
                      src={nextProject.mainPhoto}
                      alt={nextProject.projectFirstName}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute top-5 left-5 bottom-5 right-5 bg-[#2e2e2e] opacity-90"></div>
                  <div className="absolute top-1/2 left-1/2 text-[#E2E1DF] flex flex-col items-center uppercase -translate-x-1/2 -translate-y-1/2">
                    <p>&#40;next project&#41;</p>
                    <h1 className="font-kenoky tablet:text-9xl mobile:text-4xl">{nextProject.projectFirstName}</h1>
                  </div>
                </div>
              
            </div>

            <div className="-mt-10 flex justify-between">
              <img
                src="/rectangle.png"
                alt="a corner of a div"
                className="-rotate-90"
              />
              <img
                src="/rectangle.png"
                alt="a corner of a div"
                className="rotate-180"
              />
            </div>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
          <BubbleButton nextProject={nextProject} projectColor={project.color} />

        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <Contact />
        </Suspense>
      </div>
    </div>
  );
};

export default AvailableAt;
