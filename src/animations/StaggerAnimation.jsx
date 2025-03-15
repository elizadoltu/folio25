import React from "react";
import PropTypes from "prop-types";
import "../styles/stagger-animation.css";

const AnimatedButton = ({ text, href, isInternalLink }) => {
  const handleClick = (e) => {
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <a 
      href={href} 
      aria-label={text} 
      className="w-inline-block btn-animate-chars" 
      target={!isInternalLink && href && !href.startsWith('#') ? "_blank" : undefined}
      onClick={handleClick}
      rel={!isInternalLink && href && !href.startsWith('#') ? "noopener" : undefined}
    >
      <span data-button-animate-chars className="btn-animate-chars__text">
        {text.split("").map((char, index) => (
          <span key={`${char}-${index}`} className="btn-char" style={{ transitionDelay: `${index * 0.02}s` }}>
            {char === " " ? "\u00A0" : char} 
          </span>
        ))}
      </span>
    </a>
  );
};

AnimatedButton.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string,
  isInternalLink: PropTypes.bool,
};

AnimatedButton.defaultProps = {
  isInternalLink: false,
};

export default AnimatedButton;
