import React, { useEffect, useRef } from "react";
import AnimatedButton from "../animations/StaggerAnimation";
import "../styles/underline-animation.css";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const titleRef = useRef();

  useEffect(() => {
    if (!titleRef.current) return;

    const splitText = new SplitType(titleRef.current, {
      types: "words",
    });

    if (splitText.words.length > 0) {
      gsap.from(splitText.words, {
        opacity: 0,
        y: 100,
        duration: 0.5,
        stagger: 0.12,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    }

    return () => splitText.revert();
  }, []);
  useEffect(() => {
    gsap.fromTo(
      ".contact-image",
      {
        rotation: 0,
      },
      {
        rotation: 360,
        duration: 3,
        scrollTrigger: {
          trigger: ".contact-image",
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
      }
    );
  }, []);

  const logoSrc = "/logo-white.svg";

  return (
    <footer className="mt-[20vh]" id="contact">
      <section
        className="uppercase mt-5 desktop:text-12xl tablet:text-10xl mobile:text-[2.8rem] flex leading-none flex-wrap flex-1 justify-between p-3"
        ref={titleRef}
      >
        <h1
          className="font-kenoky mr-1"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
        >
          get in
        </h1>

        <h1
          className="font-geist-medium tracking-tighter"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
        >
          touch
        </h1>
      </section>
      <section className="flex flex-1 flex-wrap flex-col items-end px-3 leading-none tablet:text-base uppercase">
        <p className=" leading-none">
          <span className="underline font-kenoky">let's connect</span> :Whether
          you have a question
        </p>
        <p className="leading-none">
          {" "}
          need assistance, or want to explore opportunities
        </p>
        <p className="leading-none">i am here to help.</p>
      </section>

      <section className="size-container-ideal flex mobile:flex-col tablet:flex-row justify-between items-end mt-[20vh] p-3 text-[#e2e1df]">
        <div className="flex flex-col justify-between">
          <div className="grid tablet:grid-cols-4 gap-5 mobile:grid-cols-2 uppercase font-geist-medium">
            <div className="social__column">
              <p>
                <AnimatedButton
                  text="behance"
                  href="https://www.behance.net/elizadoltu"
                />
              </p>
              <p>
                <AnimatedButton
                  text="instagram"
                  href="https://www.instagram.com/elizadoltu.design/"
                />
              </p>
            </div>
            <div className="social__column">
              <p>
                <AnimatedButton
                  text="linkedin"
                  href="https://www.linkedin.com/in/eliza-teodora-doltu-56336b24a/"
                />
              </p>
              <p>
                <AnimatedButton
                  text="awwwards"
                  href="https://www.awwwards.com/elizateodoradoltu/"
                />
              </p>
            </div>

            <div className="social__column">
              <p>
                <AnimatedButton
                  text="email"
                  href="mailto:elizadoltuofficial@gmail.com"
                />
              </p>

              <p>
                <AnimatedButton text="+40732134019" href="tel:+40732134019" />
              </p>
            </div>
            <div className="social__column">
              <p className="underline-link cursor-default leading-none">
                by eliza doltu 25'
              </p>
              <p className="underline-link cursor-default ">
                all rights reserved
              </p>
            </div>
          </div>
        </div>
        <img
          src={logoSrc}
          alt="official logo website"
          className="contact-image mobile:mt-20 tablet:mt-0 w-64 h-64"
        />
      </section>
    </footer>
  );
};

export default Contact;
