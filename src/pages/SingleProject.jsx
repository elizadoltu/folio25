import React, { useEffect, useRef, useState } from "react";
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

gsap.registerPlugin(ScrollTrigger);

function SingleProject() {
  const { projectLink } = useParams();
  const [isTransitioning, setIsTransitioning] = useState(true);
  const imageContainers = useRef([]);

  const project = projectsData.find(
    (project) => project.projectLink === projectLink
  );
  const imageRefs = useRef([]);
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
          types: "lines"
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
        revertFunctions.forEach(revert => revert());
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

  const addToContainers = (el) => {
    if (el && !imageContainers.current.includes(el)) {
      imageContainers.current.push(el);
    }
  };

  useEffect(() => {
    imageContainers.current.forEach((container) => {
      if (!container) return;
      const overlay = container.querySelector(".reveal-overlay");
      const image = container.querySelector("img");
      if (!overlay || !image) return;

      gsap.set(container, { autoAlpha: 1 });
      gsap.set(overlay, { scaleY: 1, transformOrigin: "top" });

      if (!image.hasAttribute("data-parallax")) {
        gsap.set(image, { scale: 1.05 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
          pinSpacing: false,
        },
      });

      tl.to(overlay, {
        scaleY: 0,
        duration: 0.8,
        ease: "power3.inOut",
        delay: 0.1,
      }).to(image, {
        scale: image.hasAttribute("data-parallax") ? 1.05 : 1,
        duration: 1.2,
        ease: "power2.out",
        delay: -0.6,
      });
    });
  }, []);

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

  

  useEffect(() => {
    imageRefs.current = imageRefs.current.slice(0, project.photos.length);
  }, [project.photos]);

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
  }, [project.photos]);

  if (!project) return <div>Project not found</div>;


  return (
    <>
      <PageTransition
        isActive={isTransitioning}
        onComplete={handleTransitionComplete}
      />

      <div className="size-container-ideal">
        <DynamicCursor />
        <div className="text-base fixed mobile:hidden tablet:flex uppercase text-[#e2e1df] mix-blend-difference leading-none left-1/2 top-0 mt-3 -translate-x-1/2 z-50">
          <a href="/" className="cursor-pointer">
            <h1 className="font-geist-medium " data-cursor="Home">
              <span className="font-kenoky">eliza</span> doltu
            </h1>
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
          <p className="font-geist-semibold uppercase" ref={addToParagraphsRefs}  style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>{project.projectDate}</p>
          <div className="tablet:w-xl mobile:w-full text-sm font-geist-medium">
            <p ref={addToParagraphsRefs}  style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>{project.projectFirstParagraph}</p>
            <p ref={addToParagraphsRefs} className="mt-5"  style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>{project.projectSecondParagraph}</p>
          </div>
        </div>
        <img
          src={project.mainPhoto}
          alt={project.projectFirstName}
          className="mt-12 w-full p-3"
        />
        <div className="mt-5 border-t-gray-400 border-b-gray-400 py-5 leading-none border-t-1 border-b-1 flex mobile:flex-col tablet:flex-row justify-between font-geist-medium p-3">
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
        </div>
        <p className="uppercase mt-5 font-geist-medium p-3">gallery</p>
        <div className="grid tablet:grid-cols-2 mobile:grid-cols-1 gap-4 mt-5 p-3">
          {project.photos &&
            project.photos.map((photo, index) => (
              <div
                key={photo}
                className="overflow-hidden h-full w-full aspect-square reveal"
                ref={addToContainers}
              >
                <div className="reveal-overlay absolute top-0 left-0 w-full h-full bg-black z-10"></div>

                <img
                  src={photo}
                  alt={`${index + 1}`}
                  ref={(el) => (imageRefs.current[index] = el)}
                  className={`object-cover h-full w-full transition-transform duration-400 ease-in-out`}
                />
              </div>
            ))}
        </div>
        <AvailableAt />
      </div>
    </>
  );
}

export default SingleProject;
