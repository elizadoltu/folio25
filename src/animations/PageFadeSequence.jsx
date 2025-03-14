import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import "../styles/page-fade-sequence.css";
import PropTypes from "prop-types";

const PageFadeSequence = ({ isActive, onComplete }) => {
  const sequenceContainerRef = useRef(null);
  const sequenceItemRefs = useRef([]);
  const headingRef1 = useRef(null);
  const headingRef2 = useRef(null);

  const addToSequenceItemRefs = (el) => {
    if (el && !sequenceItemRefs.current.includes(el)) {
      sequenceItemRefs.current.push(el);
    }
  };

  useLayoutEffect(() => {
    if (!sequenceContainerRef.current) return;
  
    if (isActive) {
      gsap.set(sequenceContainerRef.current, { autoAlpha: 1 });
      gsap.set(sequenceItemRefs.current, { scaleY: 1, transformOrigin: "top" });
      gsap.set([headingRef1.current, headingRef2.current], {
        y: 30,
        autoAlpha: 0,
      });
  
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });
      
      tl.to(headingRef1.current, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        ease: "power3.out",
      })
      .to(
        headingRef2.current,
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .to({}, {duration: 0.5})
      .to(
        [headingRef1.current, headingRef2.current],
        {
          autoAlpha: 0,
          duration: 0.5,
          ease: "power3.in",
        },
        "+=0.8"
      )
      .to({}, {duration: 0.1})
      .to(sequenceItemRefs.current, {
        scaleY: 0,
        duration: 0.8,
        ease: "power3.inOut",
        stagger: 0.15
      });
    } else {
      gsap.set(sequenceContainerRef.current, { autoAlpha: 0 });
    }
  }, [isActive, onComplete]);
  
  

  return (
    <div className="page-fade-sequence__container" ref={sequenceContainerRef}>
      <div className="page-fade-sequence__text-wrapper uppercase font-geist-semibold tablet:text-4xl mobile:text-2xl">
        <h2 ref={headingRef1} className="page-fade-sequence__heading" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
          web <span className="font-kenoky">dev</span>
        </h2>
        <h2 ref={headingRef2} className="page-fade-sequence__subheading ml-2" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
          <span className="font-kenoky">& developer</span> based in iasi
        </h2>
      </div>

      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={`sequence-item-${index}-${Math.random().toString(36).substring(2, 11)}`}
          className="page-fade-sequence__item"
          ref={addToSequenceItemRefs}
          style={{ backgroundColor: "#131313" }}
        />
      ))}
    </div>
  );
};
PageFadeSequence.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onComplete: PropTypes.func,
};

export default PageFadeSequence;
