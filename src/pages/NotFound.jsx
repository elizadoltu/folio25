import React from "react";
import AnimatedButton from "../animations/StaggerAnimation";

function NotFound() {
  return (
    <section className="bg-[#131313] text-[#e2e1df] uppercase h-screen w-full flex flex-col justify-center items-center">
      <h1 className="font-geist-semibold tablet:text-9xl mobile:text-6xl">
        404 <span className="font-kenoky">error</span>
      </h1>
      <p className="flex items-center">
        <img
          src="/arrow-corner.svg"
          alt="arrow corner icon"
          className="w-6 h-6 mr-2"
        />
        <AnimatedButton href="/" text="go back home" />
      </p>
    </section>
  );
}

export default NotFound;
