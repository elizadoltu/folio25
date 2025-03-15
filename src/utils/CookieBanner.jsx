import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const cookieBannerRef = useRef(null);

  useEffect(() => {
    const storedConsent = localStorage.getItem("cookie_consent");
  
    if (!storedConsent) {
      const timer = setTimeout(() => {
        setShowBanner(true);
  
        requestAnimationFrame(() => {
          if (cookieBannerRef.current) {
            gsap.fromTo(
              cookieBannerRef.current,
              { opacity: 0, y: 100 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
              }
            );
          }
        });
      }, 4500);
  
      return () => clearTimeout(timer);
    }
  }, []);
  

  const handleConsent = (accepted) => {
    localStorage.setItem("cookie_consent", accepted ? "accepted" : "denied");
    setShowBanner(false);

    window.gtag("consent", "update", {
      analytics_storage: accepted ? "granted" : "denied",
      ad_storage: accepted ? "granted" : "denied",
    });
  };

  if (!showBanner) return null; 

  return (
    <div
      className="cookie-banner font-geist-medium uppercase text-sm mobile:flex flex-col tablet:flex-row fixed bottom-3 left-1/2 -translate-x-1/2 bg-[#131313] text-[#e2e1df] p-3 z-50 rounded-lg max-w-[90%] tablet:max-w-[400px]"
      ref={cookieBannerRef}
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
    >
      <p className="tablet:mb-0 text-center tablet:text-left">
        We use cookies for analytics.
      </p>
      <div className="flex flex-col tablet:flex-row gap-2 tablet:gap-4 justify-center tablet:justify-start w-full mt-3">
        <button
          className="px-4 py-2 bg-[#e2e1df] text-[#131313] rounded uppercase text-xs tablet:text-sm w-full tablet:w-auto"
          onClick={() => handleConsent(true)}
        >
          accept
        </button>
        <button
          className="px-4 py-2 bg-[#FF4C2F] rounded uppercase text-xs tablet:text-sm w-full tablet:w-auto"
          onClick={() => handleConsent(false)}
        >
          decline
        </button>
      </div>
    </div>
  );
  
};

export default CookieBanner;
