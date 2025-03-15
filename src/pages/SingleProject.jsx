import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import projectsData from "../data/projects";
import "../styles/button-bubble.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import DynamicCursor from "../utils/DynamicCursor";
import PageTransition from "../animations/Transition";
import "../styles/reveal-animation.css";
import SplitType from "split-type";
import AvailableAt from "../components/AvailableAt";
import Gallery from "../components/Gallery";
import { bouncy } from "ldrs";

const NotFound = lazy(() => import("./NotFound"));
gsap.registerPlugin(ScrollTrigger);
bouncy.register();

function SingleProject() {
  const { projectLink } = useParams();
  const [isTransitioning, setIsTransitioning] = useState(true);

  const project = projectsData.find(
    (project) => project.projectLink === projectLink
  );
  const titleRef = useRef(null);
  const projectTitle = useRef(null);
  const paragraphsRef = useRef([]);

  const addToParagraphsRefs = (el) => {
    if (el && !paragraphsRef.current.includes(el)) {
      paragraphsRef.current.push(el);
    }
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
          y: 50,
          duration: 0.6,
          stagger: 0.15,
          delay: 1.4,
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
    if (!projectTitle.current) return;

    const splitText = new SplitType(projectTitle.current, {
      types: "words",
    });

    if (splitText.words.length > 0) {
      gsap.from(splitText.words, {
        opacity: 0,
        y: 100,
        duration: 0.5,
        stagger: 0.12,
        delay: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: projectTitle.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    }

    return () => splitText.revert();
  }, []);

  const handleTransitionComplete = () => {
    setIsTransitioning(false);
  };

  useEffect(() => {
    if (project) {
      document.title = `${project.projectFirstName} ${project?.projectSecondName} | Eliza Doltu`;

      return () => {
        document.title = "Eliza Doltu | Web developer & designer";
      };
    }
  }, [project]);

  useEffect(() => {
    if (!titleRef.current) return;

    const h1Elements = titleRef.current.querySelectorAll("h1");

    gsap.to(h1Elements, {
      fontSize: "2rem",
      ease: "power2.out",
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top top",
        end: "top+=1000px top",
        scrub: true,
      },
    });
  }, []);

  if (!project) return (<Suspense fallback={<div className="flex justify-center items-center bg-[#131313]"><l-bouncy size="45" speed="1.75" color="white"></l-bouncy></div>}><NotFound /></Suspense>);

  return (
    <>
      <PageTransition
        isActive={isTransitioning}
        onComplete={handleTransitionComplete}
      />

      <main className="size-container-ideal">
        <DynamicCursor />
        <section id="single-project">
          <div className="text-base fixed mobile:hidden tablet:flex uppercase text-[#e2e1df] mix-blend-difference leading-none left-1/2 top-0 mt-3 -translate-x-1/2 z-50">
            <a href="/" className="cursor-pointer">
              <h4 className="font-geist-medium " data-cursor="Home">
                <span className="font-kenoky">eliza</span> doltu
              </h4>
            </a>
          </div>
          <div
            ref={mergeRefs(titleRef, projectTitle)}
            className="tablet:fixed text-[#e2e1df] mix-blend-difference tablet:top-0 mobile:top-6 left-0 z-40 w-full flex justify-between uppercase leading-none p-2"
          >
            <h1
              className="desktop:text-11xl tablet:text-10xl mobile:text-4xl font-kenoky"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            >
              {project.projectFirstName}
            </h1>
            <h1
              className="desktop:text-11xl tablet:text-10xl mobile:text-4xl font-geist-semibold "
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            >
              {project.projectSecondName}
            </h1>
          </div>
          <div className="flex mobile:flex-col tablet:flex-row justify-between p-2 tablet:mt-[25vh] mobile:mt-[10vh]">
            <p
              className="font-geist-semibold uppercase"
              ref={addToParagraphsRefs}
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            >
              {project.projectDate}
            </p>
            <div className="tablet:w-xl mobile:w-full text-sm font-geist-medium">
              <p
                ref={addToParagraphsRefs}
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
              >
                {project.projectFirstParagraph}
              </p>
              <p
                ref={addToParagraphsRefs}
                className="mt-5"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
              >
                {project.projectSecondParagraph}
              </p>
            </div>
          </div>
          <img
            src={project.mainPhoto}
            alt={project.projectFirstName}
            className="mt-12 w-full p-3"
          />
          <section className="mt-5 border-t-gray-400 border-b-gray-400 py-5 leading-none border-t-1 border-b-1 flex mobile:flex-col tablet:flex-row justify-between font-geist-medium p-3">
            <p className="uppercase">technologies used</p>
            <div className="grid grid-rows-2 grid-cols-2 gap-8 uppercase tablet:text-base leading-none mobile:mt-5 tablet:mt-0">
              <div>
                <p>frontend</p>
                <p className="mt-1">{project.frontend}</p>
              </div>
              {project?.backend ? (
                <div>
                  <p>backend</p>
                  <p className="mt-1">{project.backend}</p>
                </div>
              ) : (
                <div>
                  <p>design</p>
                  <p className="mt-1">{project?.design}</p>
                </div>
              )}
              {project?.database ? (
                <div>
                  <p>database</p>
                  <p className="mt-1">{project.database}</p>
                </div>
              ) : (
                <div>
                  <p>animations & scrolling</p>
                  <p className="mt-1">{project?.["animations&scrolling"]}</p>
                </div>
              )}
              <div>
                <p>deployment</p>
                <p className="mt-1">{project.deployment}</p>
              </div>
            </div>
          </section>
          <p className="uppercase mt-5 font-geist-medium p-3">gallery</p>
          <Gallery />
        </section>

        <AvailableAt />
      </main>
    </>
  );
}

export default SingleProject;
