import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import projectsData from "../data/projects";
import "../styles/button-bubble.css";
import Contact from "../components/Contact";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import DynamicCursor from "../utils/DynamicCursor";
import PageTransition from "../animations/Transition";

gsap.registerPlugin(ScrollTrigger);

function SingleProject() {
  const { projectLink } = useParams();
  const [isTransitioning, setIsTransitioning] = useState(true);

  const project = projectsData.find(
    (project) => project.projectLink === projectLink
  );
  const imageRefs = useRef([]);
  const nextProjectImageRef = useRef(null);
  const parentRef = useRef(null);
  const titleRef = useRef(null);

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

  useEffect(() => {
    if (parentRef.current && nextProjectImageRef.current) {
      const handleMouseEnter = () => {
        gsap.to(nextProjectImageRef.current, {
          scale: 1.1,
          duration: 0.5,
          ease: "expoScale(0.5,7,none)",
        });
        gsap.to(parentRef.current, {
          scale: 0.95,
          duration: 0.5,
          ease: "expoScale(0.5,7,none)",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(nextProjectImageRef.current, {
          scale: 1,
          duration: 0.5,
          ease: "expoScale(0.5,7,none)",
        });
        gsap.to(parentRef.current, {
          scale: 1,
          duration: 0.5,
          ease: "expoScale(0.5,7,none)",
        });
      };

      parentRef.current.addEventListener("mouseenter", handleMouseEnter);
      parentRef.current.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        if (parentRef.current) {
          parentRef.current.removeEventListener("mouseenter", handleMouseEnter);
          parentRef.current.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
    }
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

  const currentIndex = projectsData.findIndex(
    (p) => p.projectLink === projectLink
  );
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  return (
    <>
      <PageTransition
        isActive={isTransitioning}
        onComplete={handleTransitionComplete}
      />
   
        <div className="size-container-ideal relative p-3">
          <DynamicCursor />
          <div className="text-base uppercase leading-none fixed left-1/2 -translate-x-1/2 z-50">
            <a href="/" className="cursor-pointer">
              <h1 className="font-geist-medium" data-cursor="Home">
                <span className="font-kenoky">eliza</span> doltu
              </h1>
            </a>
          </div>
          <div
            ref={titleRef}
            className="fixed top-0 left-0 z-40 w-full flex justify-between uppercase leading-none p-2"
          >
            <h1 className="text-11xl font-kenoky">
              {project.projectFirstName}
            </h1>
            <h1 className="text-11xl font-geist-semibold">
              {project.projectSecondName}
            </h1>
          </div>
          <div className="flex justify-between uppercase p-2 mt-[25vh]">
            <p className="font-geist-semibold">{project.projectDate}</p>
            <div className="w-2xl text-base ">
              <p>{project.projectFirstParagraph}</p>
              <p className="mt-5">{project.projectSecondParagraph}</p>
            </div>
          </div>
          <img
            src={project.mainPhoto}
            alt={project.projectFirstName}
            className="mt-12 w-full"
          />
          <div className="mt-5 border-t-gray-400 border-b-gray-400 py-5 leading-none border-t-1 border-b-1 flex justify-between">
            <p className="uppercase font-geist-medium">technologies used</p>
            <div className="grid grid-rows-2 grid-cols-2 gap-8 uppercase ">
              <div>
                <p className="font-geist-medium">frontend</p>
                <p className="mt-1">{project.frontend}</p>
              </div>
              {project?.backend ? (
                <div>
                  <p className="font-geist-medium">backend</p>
                  <p className="mt-1">{project.backend}</p>
                </div>
              ) : (
                <div>
                  <p className="font-geist-medium">design</p>
                  <p className="mt-1">{project?.design}</p>
                </div>
              )}
              {project?.database ? (
                <div>
                  <p className="font-geist-medium">database</p>
                  <p className="mt-1">{project.database}</p>
                </div>
              ) : (
                <div>
                  <p className="font-geist-medium">animations & scrolling</p>
                  <p className="mt-1">{project?.["animations&scrolling"]}</p>
                </div>
              )}
              <div>
                <p className="font-geist-medium">deployment</p>
                <p className="mt-1">{project.deployment}</p>
              </div>
            </div>
          </div>
          <p className="uppercase mt-5 font-geist-medium">gallery</p>
          <div className="grid grid-cols-2 gap-4 mt-5">
            {project.photos &&
              project.photos.map((photo, index) => (
                <div
                  key={photo}
                  className="overflow-hidden h-full w-full aspect-square"
                >
                  <img
                    src={photo}
                    alt={`${index + 1}`}
                    ref={(el) => (imageRefs.current[index] = el)}
                    className={`object-cover h-full w-full transition-transform duration-400 ease-in-out`}
                  />
                </div>
              ))}
          </div>

          <div className="mt-20 flex justify-between">
            <img src="/rectangle.png" alt="a corner of a div" />
            <img
              src="/rectangle.png"
              alt="a corner of a div"
              className="rotate-90"
            />
          </div>
          <div ref={parentRef} className="-mt-10 p-5 relative h-[80vh]">
            <div className="w-full h-full overflow-hidden">
              <img
                ref={nextProjectImageRef}
                src={nextProject.mainPhoto}
                alt={nextProject.projectFirstName}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute top-5 left-5 bottom-5 right-5 bg-[#131313] opacity-90"></div>
            <div className="absolute top-1/2 left-1/2 text-[#E2E1DF] flex flex-col items-center uppercase -translate-x-1/2 -translate-y-1/2">
              <p>&#40;next project&#41;</p>
              <h1 className="font-kenoky text-9xl">
                {nextProject.projectFirstName}
              </h1>
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
          <div className="btn-group mt-[10vh]">
            <a
              href={`${nextProject.projectLink}`}
              className="btn-bubble-arrow w-inline-block"
              data-cursor={`To ${nextProject.projectFirstName} ${nextProject?.projectSecondName}`}
            >
              <div
                className="btn-bubble-arrow__arrow"
                style={{ backgroundColor: project.color }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="100%"
                  className="btn-bubble-arrow__arrow-svg"
                >
                  <polyline
                    points="18 8 18 18 8 18"
                    fill="none"
                    stroke="currentColor"
                    strokeMiterlimit="10"
                    strokeWidth="1.5"
                  ></polyline>
                  <line
                    x1="18"
                    y1="18"
                    x2="5"
                    y2="5"
                    fill="none"
                    stroke="currentColor"
                    strokeMiterlimit="10"
                    strokeWidth="1.5"
                  ></line>
                </svg>
              </div>
              <div className="btn-bubble-arrow__content">
                <span className="btn-bubble-arrow__content-text">
                  Next Project
                </span>
              </div>
              <div className="btn-bubble-arrow__arrow is--duplicate">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="100%"
                  className="btn-bubble-arrow__arrow-svg"
                >
                  <polyline
                    points="18 8 18 18 8 18"
                    fill="none"
                    stroke="currentColor"
                    strokeMiterlimit="10"
                    strokeWidth="1.5"
                  ></polyline>
                  <line
                    x1="18"
                    y1="18"
                    x2="5"
                    y2="5"
                    fill="none"
                    stroke="currentColor"
                    strokeMiterlimit="10"
                    strokeWidth="1.5"
                  ></line>
                </svg>
              </div>
            </a>
          </div>
          <Contact />
        </div>
      
    </>
  );
}

export default SingleProject;
