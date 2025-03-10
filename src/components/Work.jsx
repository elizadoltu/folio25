import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import "../styles/reveal-animation.css";
import realioImage from "../data/images/realio-app/main.png";
import bookingImage from "../data/images/booking-iasi/main.png";
import portfolioImage from "../data/images/portfolio-24/main.png";
import meowseumImage from "../data/images/meowseum/main.png";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const imageRefs = useRef([]);
  const textFeaturedWorkRef = useRef(null);
  const imageContainers = useRef([]);
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
          types: "words"
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
        revertFunctions.forEach(revert => revert());
        paragraphsRef.current = [];
      };
    }, []);

  useEffect(() => {
    if (!textFeaturedWorkRef.current) return;

    const splitText = new SplitType(textFeaturedWorkRef.current, {
      types: "chars"
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

  useEffect(() => {
    imageContainers.current.forEach((container) => {
      if (!container) return;
      
      const overlay = container.querySelector('.reveal-overlay');
      const image = container.querySelector('img');
      
      if (!overlay || !image) return;
      
      gsap.set(container, { autoAlpha: 1 });
      gsap.set(overlay, { 
        scaleY: 1,
        transformOrigin: "top" 
      });
      gsap.set(image, { scale: 1.05 });
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 85%", 
          toggleActions: "play none none none",
          once: true  
        }
      });
      
      tl.to(overlay, {
        scaleY: 0,
        duration: 0.8,
        ease: "power3.inOut" 
      })
      .to(image, {
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        delay: -0.6  
      });
    });
  }, []);
  

  const addToRefs = (el) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
    }
  };

  const addToContainers = (el) => {
    if (el && !imageContainers.current.includes(el)) {
      imageContainers.current.push(el);
    }
  };

  return (
    <div className="size-container-ideal p-3 mt-[20vh]" id="work">
      <h1 className="text-11xl font-geist-semibold tracking-tighter uppercase leading-none flex-1 flex-wrap flex" ref={textFeaturedWorkRef} style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
        <span className="font-kenoky">featured</span> work
      </h1>
      <div className="grid grid-cols-2 gap-3 mt-20 text-sm uppercase font-geist-medium">
        <div className="flex flex-col flex-1 flex-wrap">
          <p>01</p>
          
          <div className="flex justify-between" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
            <p ref={addToParagraphsRefs}>booking iasi</p>
            <div className="text-right leading-none mt-1" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
              <p ref={addToParagraphsRefs}>location booking</p>
              <p ref={addToParagraphsRefs}>3d visualization</p>
              <p ref={addToParagraphsRefs}>secure system</p>
              <p ref={addToParagraphsRefs}>user profiles</p>
              <p ref={addToParagraphsRefs}>3d interactive booking for modern spaces</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 flex-wrap" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
          <p>02</p>

          <div className="flex justify-between" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
            <p ref={addToParagraphsRefs}>realio - real estate</p>
            <div className="text-right leading-none mt-1" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
              <p ref={addToParagraphsRefs}>real estate management</p>
              <p ref={addToParagraphsRefs}>property listings</p>
              <p ref={addToParagraphsRefs}>client inquiries</p>
              <p ref={addToParagraphsRefs}>market trend prediction</p>
              <p ref={addToParagraphsRefs}>machine learning</p>
              <p ref={addToParagraphsRefs}>smart, simple and predictive real estate</p>
            </div>
          </div>
        </div>
        <div>
          <p>03</p>
          

          <div className="flex justify-between" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
            <p ref={addToParagraphsRefs}>meowseum</p>
            <div className="text-right leading-none mt-1" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
              <p ref={addToParagraphsRefs}>online gallery</p>
              <p ref={addToParagraphsRefs}>cat community</p>
              <p ref={addToParagraphsRefs}>cat photo sharing</p>
              <p ref={addToParagraphsRefs}>community engagement</p>
              <p ref={addToParagraphsRefs}>join the world's biggest cat gallery</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 flex-wrap uppercase text-sm font-geist-medium" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
        <p>04</p>
        

        <div className="flex justify-between" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
          <p ref={addToParagraphsRefs}>portfolio 24'</p>
          <div className="text-right leading-none mt-1" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
            <p ref={addToParagraphsRefs}>gsap animations</p>
            <p ref={addToParagraphsRefs}>lenis scroll</p>
            <p ref={addToParagraphsRefs}>seo optimization</p>
            <p ref={addToParagraphsRefs}>responsive design</p>
            <p ref={addToParagraphsRefs}>parallax effects</p>
            <p ref={addToParagraphsRefs}>a blend of design and functionality</p>
          </div>
        </div>
      </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-20 text-sm uppercase font-geist-medium">
        <div className="flex flex-col flex-1 flex-wrap">
          <p>01</p>
          <div className="overflow-hidden reveal" ref={addToContainers}>
            <div className="reveal-overlay absolute top-0 left-0 w-full h-full bg-black z-10"></div>
            <a href="projects/booking-iasi" className="cursor-pointer">
              <img
                src={bookingImage}
                alt=""
                ref={addToRefs}
                data-cursor="More details for Booking Iasi"
              />
            </a>
          </div>

          <div className="flex justify-between">
            <p>booking iasi</p>
            <div className="text-right leading-none mt-1">
              <p>fullstack</p>
              <p>vite - react - node - express</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 flex-wrap">
          <p>02</p>
          <div className="overflow-hidden reveal" ref={addToContainers}>
            <div className="reveal-overlay absolute top-0 left-0 w-full h-full bg-black z-10"></div>
            <a href="projects/realio-app" className="cursor-pointer">
              <img
                src={realioImage}
                alt=""
                ref={addToRefs}
                data-cursor="More details for Realio"
              />
            </a>
          </div>

          <div className="flex justify-between">
            <p>realio - real estate</p>
            <div className="text-right leading-none mt-1">
              <p>fullstack</p>
              <p>angular - tailwind - c# - .net</p>
            </div>
          </div>
        </div>
        <div>
          <p>03</p>
          <div className="overflow-hidden reveal" ref={addToContainers}>
            <div className="reveal-overlay absolute top-0 left-0 w-full h-full bg-black z-10"></div>
            <a href="projects/meowseum">
              <img
                src={meowseumImage}
                alt=""
                ref={addToRefs}
                data-cursor="More details for Meowseum"
              />
            </a>
          </div>

          <div className="flex justify-between">
            <p>meowseum</p>
            <div className="text-right leading-none mt-1">
              <p>fullstack</p>
              <p>vite - react - node - express</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 flex-wrap uppercase text-sm font-geist-medium">
        <p>04</p>
        <div className="overflow-hidden reveal" ref={addToContainers}>
          <div className="reveal-overlay absolute top-0 left-0 w-full h-full bg-black z-10"></div>
          <a href="projects/portfolio-24">
            <img
              src={portfolioImage}
              alt=""
              className="w-full object-cover"
              ref={addToRefs}
              data-cursor="More details for Portfolio '24"
            />
          </a>
        </div>

        <div className="flex justify-between">
          <p>portfolio 24'</p>
          <div className="text-right leading-none mt-1">
            <p>fullstack</p>
            <p>vite - react - node - express</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
