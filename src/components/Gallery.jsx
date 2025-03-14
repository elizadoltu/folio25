import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useParams } from "react-router-dom";
import ScrollTrigger from "gsap/ScrollTrigger";
import projectsData from "../data/projects";
import "../styles/reveal-animation.css";

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {

    const { projectLink } = useParams();
      const imageContainers = useRef([]);
      const imageRefs = useRef([]);
    

    const project = projectsData.find(
        (project) => project.projectLink === projectLink
      );

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

    return (
        <section className="grid tablet:grid-cols-2 mobile:grid-cols-1 gap-4 mt-5 p-3">
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
        </section>
    );
}

export default Gallery;