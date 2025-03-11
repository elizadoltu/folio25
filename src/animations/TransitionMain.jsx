import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import "../styles/main-transition.css";
import SplitType from "split-type";

const TransitionMain = ({ onComplete }) => {
    const containerRef = useRef(null);
    const horizontalLinesRef = useRef([]);
    const verticalLinesRef = useRef([]);
      const introductionTitle = useRef(null);

      useEffect(() => {
        if (!introductionTitle.current) return;
      
        const splitText = new SplitType(introductionTitle.current, {
          types: "words",
        });
      
        if (splitText.words.length > 0) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: introductionTitle.current,
              start: "top 90%",
              toggleActions: "play none none none",
            }
          });
          
          tl.fromTo(splitText.words, 
            {
              opacity: 0,
              y: 100
            }, 
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.09,
              delay: 0.1,
              ease: "power2.out"
            }
          )
          .to(splitText.words, {
            y: "-=100",
            duration: 0.6,
            ease: "power1.in"
          });
        }
      
        return () => splitText.revert();
      }, []);
      
    

    const addToHorizontalRefs = (el) => {
        if (el && !horizontalLinesRef.current.includes(el)) {
            horizontalLinesRef.current.push(el);
        }
    };

    const addToVerticalRefs = (el) => {
        if (el && !verticalLinesRef.current.includes(el)) {
            verticalLinesRef.current.push(el);
        }
    };

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                if (onComplete) onComplete();
            }
        });

        gsap.set(horizontalLinesRef.current, { width: 0 });
        gsap.set(verticalLinesRef.current, { height: 0 });

        tl.to(horizontalLinesRef.current, {
            width: '100%',
            duration: 1.2,
            ease: "power3.inOut",
            stagger: 0.2
        })
        .to(verticalLinesRef.current, {
            height: '100%',
            duration: 1.2,
            ease: "power3.inOut",
            stagger: 0.2
        }, "-=1")
        
        
        .to({}, { duration: 1.0 })
        
        
        .to(horizontalLinesRef.current, {
            width: 0,
            duration: 1.2,
            ease: "power3.inOut",
            stagger: 0.2
        }, "-=0.5")
        .to(verticalLinesRef.current, {
            height: 0,
            duration: 1.2,
            ease: "power3.inOut",
            stagger: 0.2
        }, "-=1");

    }, [onComplete]);

    return (
        <div 
            ref={containerRef} 
            className='w-full h-screen bg-[#131313] text-[#e2e1df] main-transition--container relative overflow-hidden'
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 100
            }}
        >
            <div 
                ref={addToHorizontalRefs} 
                className='absolute left-0 top-[45%] h-[1px] bg-[#e2e1df]'
            ></div>
            <div 
                ref={addToHorizontalRefs} 
                className='absolute left-0 top-[55%] h-[1px] bg-[#e2e1df]'
            ></div>
            
            <div 
                ref={addToVerticalRefs} 
                className='absolute left-[20%] top-0 w-[1px] bg-[#e2e1df]'
            ></div>
            <div 
                ref={addToVerticalRefs} 
                className='absolute left-[30%] top-0 w-[1px] bg-[#e2e1df]'
            ></div>
            
            <div 
                ref={introductionTitle} 
                className='absolute left-1/2 top-1/2 -translate-y-1/2 text-center leading-none'
            >
                <p className='text-5xl uppercase font-geist-regular' style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>web <span className='font-kenoky'>dev</span> & <span className='font-kenoky'>designer</span> based in iasi</p>
            </div>
        </div>
    );
}

export default TransitionMain;
