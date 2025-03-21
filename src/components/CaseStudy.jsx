import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import projectsData from "../data/projects";

const CaseStudy = () => {
  const { projectLink } = useParams();
  const project = projectsData.find(
    (project) => project.projectLink === projectLink
  );

  return (
    <section className="border-b-1 border-b-gray-400 px-3 py-7 w-full">
      <div className="flex mobile:flex-col tablet:flex-row w-full justify-between items-start">
        <div className="tablet:max-w-lg flex flex-col">
          <h2 className="uppercase font-geist-semibold text-5xl tracking-tighter">fonts & colours</h2>
          <p className="font-geist-medium text-sm mt-2">
            Exploring the impact of fonts and colors in web design: A deep dive
            into case studies that highlight how typography and color choices
            shape user experience and brand identity.
          </p>
        </div>
        <div className="leading-none tablet:w-5xl mobile:w-full flex flex-col justify-end mobile:mt-10 tablet:mt-0">
          <p className="uppercase font-geist-semibold text-5xl tracking-tighter leading-none">
            colours
          </p>
          <div className="grid tablet:grid-cols-2 mobile:grid-cols-1 mt-2 gap-4">
            <div
              className="prime__color h-96 border rounded-sm relative"
              style={{ backgroundColor: project.color1 }}
            >
              <p className="absolute bottom-1 right-2 text-[#131313] text-base font-geist-semibold">
                {project.color1}
              </p>
            </div>

            <div
              className="prime__color h-96 rounded-sm relative"
              style={{ backgroundColor: project.color2 }}
            >
              <p className="absolute bottom-1 right-2 text-[#e2e1df] text-base font-geist-semibold">
                {project.color2}
              </p>
            </div>
            <div
              className="prime__color border h-96 rounded-sm relative"
              style={{ backgroundColor: project.color3 }}
            >
              <p className="absolute bottom-1 right-2 text-[#131313] text-base font-geist-semibold">
                {project.color3}
              </p>
            </div>
            <div
              className="prime__color h-96 rounded-sm relative"
              style={{ backgroundColor: project.color4 }}
            >
              <p className="absolute bottom-1 right-2 text-[#e2e1df] text-base font-geist-semibold">
                {project.color4}
              </p>
            </div>
          </div>
          <h2 className="uppercase font-geist-semibold text-5xl tracking-tighter leading-none mt-10">fonts</h2>
          <div className=" mt-5 mobile:w-full">
           {project?.fontWeights.map((weight) => (
              <p key={weight} style={{ fontFamily: project?.fontFamily, fontWeight: weight }} className="tablet:text-9xl mobile:text-6xl border-y py-3 tracking-tighter">{project.fontName}</p>
            )) }
          </div>
          
           {project.secondFont && project?.fontWeights.map((weight) => (
            <div key={weight}>
              <p style={{ fontFamily: project?.secondFont, fontWeight: weight }} className="tablet:text-9xl mobile:text-6xl border-y py-3 tracking-tighter">{project.secondFontName}</p></div>
            )) }
          
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
