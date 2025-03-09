import React, { useState, useEffect } from "react";
import DateObject from "react-date-object";
import gsap from "gsap";
import AnimatedButton from "../animations/StaggerAnimation";

const Menu = () => {
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
    <div className="uppercase text-base w-full top-0 left-0 z-50 flex flex-1 flex-wrap justify-between p-3 fixed ">
      <div className="flex">
        <p>designer & developer</p>
        <div className="ml-10">
          <p>LOCATION</p>
          <p className="font-geist-semibold">
            IASI, RO, {hours}
            <span className="blink-colon">:</span>
            {minutes} {ampm}
          </p>
        </div>
      </div>

      <div>
        <p>navigation</p>
        <div className="flex gap-5 font-geist-semibold">
            <p><AnimatedButton text="about" href="#about"/></p>
            <p><AnimatedButton text="work" href="#work"/></p>
            <p><AnimatedButton text="contact" href="#contact"/></p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
