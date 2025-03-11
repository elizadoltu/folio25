import mainBooking from "./images/booking-iasi/main.png";
import booking1 from "./images/booking-iasi/1.png";
import booking2 from "./images/booking-iasi/2.png";
import booking3 from "./images/booking-iasi/3.png";
import booking4 from "./images/booking-iasi/4.png";
import booking5 from "./images/booking-iasi/5.png";
import booking6 from "./images/booking-iasi/6.png";

import mainMeowseum from "./images/meowseum/main.png";
import meowseumn1 from "./images/meowseum/1.png";
import meowseumn2 from "./images/meowseum/2.png";
import meowseumn3 from "./images/meowseum/3.png";
import meowseumn4 from "./images/meowseum/4.png";
import meowseumn5 from "./images/meowseum/5.png";
import meowseumn6 from "./images/meowseum/6.png";

import mainRealio from "./images/realio-app/main.png";
import realio1 from "./images/realio-app/1.png";
import realio2 from "./images/realio-app/2.png";
import realio3 from "./images/realio-app/3.png";
import realio4 from "./images/realio-app/4.png";
import realio5 from "./images/realio-app/5.png";
import realio6 from "./images/realio-app/6.png";

import mainPortfolio from "./images/portfolio-24/main.png";
import portfolio1 from "./images/portfolio-24/1.png";
import portfolio2 from "./images/portfolio-24/2.png";
import portfolio3 from "./images/portfolio-24/3.png";
import portfolio4 from "./images/portfolio-24/4.png";
import portfolio5 from "./images/portfolio-24/5.png";
import portfolio6 from "./images/portfolio-24/6.png";

const projectsData = [
    {
      "projectFirstName": "Booking",
      "projectSecondName": "Iasi",
      "projectDate": "February - June 2024",
      "projectFirstParagraph": "This project is developed as part of the Software Engineering class at the Faculty of Computer Science, Alexandru Ioan Cuza University in Iași. It aims to provide an intuitive and efficient booking system for various locations within Iași.",
      "projectSecondParagraph": "The system features user profile creation, 3D visualization of exteriors and interiors of locations, and deployment on a local server using Docker. This project adheres to strict CSP (Content Security Policy) rules with nonce-based fetching to ensure security and reliability.",
      "frontend": "vite - react - css module",
      "backend": "nodejs - expressjs",
      "database": "oracle database",
      "deployment": "docker",
      "projectLink": "booking-iasi",
      "mainPhoto": mainBooking,
      "photos" : [
        booking1, booking2, booking3, booking4, booking5, booking6
      ],
      color: "#ff4c2f",
      design: "Figma",
      linkDesign: "https://www.figma.com/design/dQbhAKhZoPeAJJ9U2W6lzW/IP?node-id=0-1&t=hsEHdJ6v6qCQbWWd-1",
      code: "Github",
      linkCode: "https://github.com/vladsuper5555/BookingIasi"
    },
    {
      "projectFirstName": "Realio",
      "projectSecondName": "App",
      "projectDate": "October - January 2024",
      "projectFirstParagraph": "Building a smart property management platform to manage listings, client inquiries, and transactions, with machine learning for market trend predictions. The backend uses Clean Architecture, CQRS, MediatR, and JWT authentication for security, with PostgreSQL ensuring reliable data storage.",
      "projectSecondParagraph": "The frontend, built with Angular and Angular Material, provides a responsive user experience. The platform simplifies property management while offering data-driven market insights.",
      "frontend": "angular - tailwind css",
      "backend": "c# - .net",
      "database": "postgresql",
      "deployment": "docker - vercel",
      "projectLink": "realio-app",
      "mainPhoto": mainRealio,
      "photos" : [
        realio1, realio2, realio3, realio4, realio5, realio6
      ],
      color: "#00538a",
      design: "Figma",
      linkDesign: "https://www.figma.com/design/CcpX9vAb0Bcfla0Y2pgcWG/Real-Estate-Management-App?node-id=0-1&t=437GkMT5UTAGGixb-1",
      code: "Github",
      linkCode: "https://github.com/elizadoltu/realio-real-estate-platform"
    },
    {
      "projectFirstName": "Mewoseum",
      "projectSecondName": 'App',
      "projectDate": "January - February 2025",
      "projectFirstParagraph": "Meowseum is the ultimate online platform for cat lovers, dedicated to building the world's largest digital cat gallery. Users can upload, share, and explore a growing collection of adorable and funny feline photos, giving every cat its moment in the spotlight.",
      "projectSecondParagraph": "Powered by React.js, Vite, GSAP, and Tailwind CSS, Meowseum offers a seamless and visually stunning experience. With smooth animations, responsive design, and an intuitive interface, it’s the perfect space for cat enthusiasts to connect and celebrate their love for felines.",
      "frontend": "vite - react - tailwind - gsap",
      "backend": "nodejs - expressjs",
      "database": "mongodb",
      "deployment": "vercel - railway",
      "projectLink": "meowseum",
      "mainPhoto": mainMeowseum,
      "photos" : [
        meowseumn1, meowseumn2, meowseumn3, meowseumn4, meowseumn5, meowseumn6
      ],
      color: "#FFB200",
      design: "Live",
      linkDesign: "https://www.themeowseum.com",
      code: "Github",
      linkCode: "https://github.com/elizadoltu/meowseum"
    },
    {
      "projectFirstName": "Portfolio",
      "projectSecondName": "24",
      "projectDate": "August - September 2024",
      "projectFirstParagraph": "Developed and deployed a personal website on Vercel, using ReactJS and Tailwind CSS for a smooth and responsive experience. Integrated Lenis Scroll for enhanced scrolling, along with GSAP and React Spring for dynamic animations.",
      "projectSecondParagraph": "Designed in Figma with a clean, user-friendly interface, the site incorporates React Scroll Parallax for engaging effects. Optimized for SEO, ensuring better search engine visibility and performance.",
      "frontend": "vite - react - tailwind",
      "design": "figma",
      "animations&scrolling": "lenis - gsap - react spring",
      "deployment": "vercel",
      "projectLink": "portfolio-24",
      "mainPhoto": mainPortfolio,
      "photos" : [
        portfolio1, portfolio2, portfolio3, portfolio4, portfolio5, portfolio6
      ],
      color: "#578E7E",
      liveAt: 'live',
      linkDesign: "https://cerulean-rugelach-60baac.netlify.app/",
      code: "Github",
      linkCode: "https://github.com/elizadoltu/portfolio"
    }
  ]

  export default projectsData;
  