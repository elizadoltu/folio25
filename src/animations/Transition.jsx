import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import '../styles/page-transition.css';

const PageTransition = ({ isActive, onComplete }) => {
  const containerRef = useRef(null);
  const gridRefs = useRef([]);

  const addToGridRefs = (el) => {
    if (el && !gridRefs.current.includes(el)) {
      gridRefs.current.push(el);
    }
  };

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    
    if (isActive) {
      gsap.set(containerRef.current, { autoAlpha: 1 });
      
      gsap.set(gridRefs.current, { scaleY: 1, transformOrigin: 'top' });
      
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        }
      });
      
      gridRefs.current.forEach((grid, index) => {
        tl.to(grid, {
          scaleY: 0,
          duration: 0.8,
          ease: "power3.inOut",
          delay: 0.5
        }, index * 0.15); 
      });
    } else {
      gsap.set(containerRef.current, { autoAlpha: 0 });
    }
  }, [isActive, onComplete]);

  return (
    <div 
      className="page-transition-container" 
      ref={containerRef}
    >
      {[...Array(5)].map((_, index) => (
        <div 
          key={index}
          className="transition-grid"
          ref={addToGridRefs}
          style={{ backgroundColor: '#131313' }}
        />
      ))}
    </div>
  );
};

export default PageTransition;
