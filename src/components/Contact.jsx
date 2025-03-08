import React from "react";
import AnimatedButton from "../animations/StaggerAnimation";
import logo from "../assets/logo.svg";
import "../styles/underline-animation.css";

const Contact = () => {
  return (
    <div className="size-container-ideal flex justify-between mt-[20vh]">
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
      <img src={logo} alt="official logo website" />
    </div>
  );
};

export default Contact;
