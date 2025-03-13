import React, { useState, useEffect } from "react";
import DateObject from "react-date-object";
import gsap from "gsap";
import AnimatedButton from "../animations/StaggerAnimation";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState(
    new DateObject({ timezone: "Europe/Bucharest" })
  );

  useEffect(() => {
    gsap.to(".blink-colon", {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.5,
    });

    const interval = setInterval(() => {
      setTime(new DateObject({ timezone: "Europe/Bucharest" }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = time.format("hh");
  const minutes = time.format("mm");
  const ampm = time.format("A");

  return (
    <div className="menu uppercase font-general-semibold text-lg fixed top-0 left-0 w-full z-50 tablet:mix-blend-difference">
      <div className="fixed top-4 left-4 z-[60] tablet:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 uppercase rounded-lg tablet:text-[#e2e1df] mobile:text-[#131313]"
        >
          <span
            className={`transition-all duration-300 ease-in-out transform ${
              isOpen
                ? "opacity-0 scale-90 translate-x-2"
                : "opacity-100 scale-100 translate-x-0"
            }`}
          >
            Menu
          </span>
          <span className={`transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
            +
          </span>
          <span
            className={`transition-all duration-300 ease-in-out transform ${
              isOpen
                ? "opacity-100 scale-100 translate-x-0"
                : "opacity-0 scale-90 translate-x-2"
            }`}
          >
            Close
          </span>
        </button>
      </div>
      
      <div
        className={`fixed inset-0 backdrop-blur-2xl bg-[#dbdbdb]/20 transition-all duration-500 ease-in-out transform ${
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-full"
        } tablet:bg-transparent tablet:backdrop-blur-none tablet:opacity-100 tablet:visible tablet:translate-y-0 tablet:relative tablet:p-3 tablet:flex tablet:justify-between`}
      >
        <div className="flex flex-col tablet:flex-row mobile:mt-20 mobile:text-2xl tablet:text-base tablet:mt-0 mobile:space-y-5 tablet:space-y-0 tablet:text-[#e2e1df] mobile:text-[#131313] mobile:p-5 tablet:p-0">
          <div>
            <p>designer & developer</p>
          </div>
          <div className="tablet:ml-10 mobile:-mt-2 tablet:mt-0">
            <p>LOCATION</p>
            <p className="font-geist-medium">
              IASI, RO, {hours}
              <span className="blink-colon">:</span>
              {minutes} {ampm}
            </p>
          </div>

        </div>
        
        <div className="flex flex-col tablet:flex-row mobile:text-2xl tablet:text-base tablet:items-center tablet:space-y-0 tablet:text-[#e2e1df] mobile:text-[#131313] mobile:p-5 tablet:p-0">
          <div>
            <p>navigation</p>
            <div className="flex gap-5 font-geist-medium">
              <p><AnimatedButton text="about" href="#about" /></p>
              <p><AnimatedButton text="work(4)" href="#work" /></p>
              <p><AnimatedButton text="contact" href="#contact" /></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;