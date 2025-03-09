import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/marquee-direction.css";

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_TEXT = "about";

const MarqueeScrollDirection = ({ direction = "left", speed = 15 }) => {
  const marqueeRef = useRef(null);
  const marqueeScrollRef = useRef(null);
  const marqueeCollectionRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const marqueeContent = marqueeCollectionRef.current;
    const marqueeScroll = marqueeScrollRef.current;

    if (!marqueeContent || !marqueeScroll) return;

    const duplicate = 2;
    const scrollSpeed = 10;

    const marqueeSpeedAttr = parseFloat(speed);
    const marqueeDirectionAttr = direction === "right" ? 1 : -1;
    const duplicateAmount = parseInt(duplicate || 0);
    const scrollSpeedAttr = parseFloat(scrollSpeed);
    const speedMultiplier =
      window.innerWidth < 479 ? 0.25 : window.innerWidth < 991 ? 0.5 : 1;

    const contentWidth = marqueeContent.offsetWidth;
    let marqueeSpeed =
      marqueeSpeedAttr * (contentWidth / window.innerWidth) * speedMultiplier;

    marqueeScroll.style.marginLeft = `${scrollSpeedAttr * -1}%`;
    marqueeScroll.style.width = `${scrollSpeedAttr * 2 + 100}%`;

    if (duplicateAmount > 0) {
      for (let i = 0; i < duplicateAmount; i++) {
        const clone = marqueeContent.cloneNode(true);
        marqueeScroll.appendChild(clone);
      }
    }

    requestAnimationFrame(() => {
      const marqueeItems = marquee.querySelectorAll(
        "[data-marquee-collection-target]"
      );

      gsap.set(marqueeItems, {
        xPercent: marqueeDirectionAttr === 1 ? 0 : 0,
      });

      const animation = gsap.to(marqueeItems, {
        xPercent: -100,
        repeat: -1,
        duration: marqueeSpeed,
        ease: "none",
        immediateRender: true,
      });

      animation.timeScale(marqueeDirectionAttr);
      animation.play();

      marquee.setAttribute("data-marquee-status", "normal");

      ScrollTrigger.create({
        trigger: marquee,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const isInverted = self.direction === 1;
          const currentDirection = isInverted
            ? -marqueeDirectionAttr
            : marqueeDirectionAttr;
          animation.timeScale(currentDirection);
          marquee.setAttribute(
            "data-marquee-status",
            isInverted ? "normal" : "inverted"
          );
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: marquee,
          start: "0% 100%",
          end: "100% 0%",
          scrub: 0.5,
        },
      });

      const scrollStart =
        marqueeDirectionAttr === -1 ? scrollSpeedAttr : -scrollSpeedAttr;
      const scrollEnd = -scrollStart;

      tl.fromTo(
        marqueeScroll,
        { x: `${scrollStart}vw` },
        { x: `${scrollEnd}vw`, ease: "none" }
      );
    });

    return () => {
      gsap.killTweensOf(marqueeScroll);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [direction, speed]);

  return (
    <section className="section-resource">
      <div
        ref={marqueeRef}
        data-marquee-duplicate="2"
        data-marquee-scroll-direction-target=""
        data-marquee-direction={direction}
        data-marquee-status="normal"
        data-marquee-speed={speed}
        data-marquee-scroll-speed="10"
        className="marquee-advanced leading-none"
      >
        <div
          ref={marqueeScrollRef}
          data-marquee-scroll-target=""
          className="marquee-advanced__scroll"
        >
          <div
            ref={marqueeCollectionRef}
            data-marquee-collection-target=""
            className="marquee-advanced__collection"
          >
            <div className="marquee-advanced__item">
              <p className="marquee__advanced__p font-geist-medium tracking-tighter uppercase">
                {MARQUEE_TEXT}{" "}
              </p>
            </div>

            <div className="marquee-advanced__item">
              <img
                src="/logo-black.svg"
                alt="Marquee icon"
                className="marquee__advanced__img"
                loading="eager"
              />
            </div>

            <div className="marquee-advanced__item">
              <p className="marquee__advanced__p marquee__advanced__p--alt uppercase font-kenoky">
                {MARQUEE_TEXT}{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarqueeScrollDirection;
