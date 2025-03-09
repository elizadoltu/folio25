import React, { useEffect } from "react";
import AnimatedButton from "../animations/StaggerAnimation";
import "../styles/underline-animation.css";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


const Contact = () => {

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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

  return (
    <div className="size-container-ideal flex justify-between mt-[20vh] p-3">
      <div className="flex flex-col justify-between">
        <h1 className="uppercase font-kenoky text-9xl">contact</h1>
        <div className="grid grid-rows-2 grid-cols-4 uppercase font-geist-medium">
          <p><AnimatedButton text="behance" href="https://www.behance.net/elizadoltu"/></p>
          <p><AnimatedButton text="instagram" href="https://www.instagram.com/elizadoltu.design/"/></p>
          <p><AnimatedButton text="linkedin" href="https://www.linkedin.com/in/eliza-teodora-doltu-56336b24a/"/></p> 
          <p className="underline-link cursor-default">by eliza doltu 25'</p>
          <p><AnimatedButton text="email" href="mailto:elizadoltuofficial@gmail.com"/></p>
          <p><AnimatedButton text="awwwards" href="https://www.awwwards.com/elizateodoradoltu/"/></p>
          <p><AnimatedButton text="+40732134019" href="tel:+40732134019"/></p>
          <p className="underline-link cursor-default">all rights reserved</p>
        </div>
      </div>
      <img src="/logo-black.svg" alt="official logo website" className="contact-image"/>
    </div>
  );
};

export default Contact;
