import React from "react";

const About = () => {
  return (
    <div className="size-container-ideal p-3" id="about">
      <div className="grid grid-cols-2 text-right text-5xl uppercase mt-[10vh]">
        <div></div>
        <div className="font-geist-medium">
          <p>
            <span className="font-kenoky">technology</span> & creativity
          </p>
          <p>
            engaging digital <span className="font-kenoky">experiences</span>
          </p>
          <p>
            <span className="font-kenoky">learn;experiment</span> & refine
          </p>
          <p>
            functionality <span className="font-kenoky">& aesthetics</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 w-full gap-5 mt-[10vh]">
        <div className="flex items-stretch">
          <img
            src="/profile-3.svg"
            alt="eliza teodora doltu skiing"
            className="w-full h-[500px] object-cover"
          />
        </div>

        <div className="flex flex-col items-stretch uppercase">
          <div className="flex">
            <img
              src="/profile-2.svg"
              alt="eliza - teodora doltu"
              className="w-full h-[500px] object-cover"
            />
          </div>

          <p className="max-w-lg text-sm mt-4">
            A huge sci-fi fan, I draw inspiration from Dune and Star Wars,
            fascinated by their world-building and futuristic ideas. Just as
            these stories push creative boundaries, I aim to build digital
            experiences that captivate and inspire.
          </p>
          <p className="max-w-lg text-sm mt-4">
            Whether I’m coding, skiing, or cheering for Real Madrid, I bring
            passion and energy to everything I do. I thrive in fast-paced
            environments, always eager to learn, adapt, and innovate in the
            ever-evolving world of technology.
          </p>
        </div>
      </div>

      <div className="uppercase mt-[10vh] flex gap-10">
        <div>
          <h1 className="font-geist-semibold">honors & awards</h1>
          <div className="mt-5 leading-none uppercase">
            <p>young jury - awwwards &#40;2025&#41;</p>
            <p>honors - portfolio 24' &#40;2024&#41;</p>
            <p>honors - meowseum &#40;2025&#41;</p>
            <p>judge awards - ftc &#40;2019&#41;</p>
          </div>
        </div>
        <div>
            <h1 className="font-geist-semibold">skills</h1>
            <div className="flex gap-5 leading-none mt-5">
                <div>
                    <p>react</p>
                    <p>angular</p>
                    <p>tailwind css</p>
                    <p>gsap</p>
                    <p>figma</p>
                </div>
                <div>
                    <p>nodejs</p>
                    <p>expressjs</p>
                    <p>python</p>
                    <p>mongodb</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;
