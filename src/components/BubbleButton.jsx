import React from 'react';
import PropTypes from 'prop-types';
import "../styles/button-bubble.css";

const BubbleButton = ({ nextProject, projectColor }) => {
  return (
    <div className="btn-group mt-[10vh] tablet:ml-[20rem] mobile:ml-[5rem]">
      <a
        href={`${nextProject.projectLink}`}
        className="btn-bubble-arrow w-inline-block"
        data-cursor={`To ${nextProject.projectFirstName} ${nextProject?.projectSecondName}`}
      >
        <div 
          className="btn-bubble-arrow__arrow"
          style={{ backgroundColor: projectColor }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="100%"
            className="btn-bubble-arrow__arrow-svg"
          >
            <polyline
              points="18 8 18 18 8 18"
              fill="none"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="1.5"
            ></polyline>
            <line
              x1="18"
              y1="18"
              x2="5"
              y2="5"
              fill="none"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="1.5"
            ></line>
          </svg>
        </div>
        <div className="btn-bubble-arrow__content">
          <span className="btn-bubble-arrow__content-text">
            Next Project
          </span>
        </div>
        <div className="btn-bubble-arrow__arrow is--duplicate">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="100%"
            className="btn-bubble-arrow__arrow-svg"
          >
            <polyline
              points="18 8 18 18 8 18"
              fill="none"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="1.5"
            ></polyline>
            <line
              x1="18"
              y1="18"
              x2="5"
              y2="5"
              fill="none"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="1.5"
            ></line>
          </svg>
        </div>
      </a>
    </div>
  );
};
BubbleButton.propTypes = {
  nextProject: PropTypes.shape({
    projectLink: PropTypes.string.isRequired,
    projectFirstName: PropTypes.string.isRequired,
    projectSecondName: PropTypes.string,
  }).isRequired,
  projectColor: PropTypes.string.isRequired,
};

export default BubbleButton;
