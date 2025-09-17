import React from "react";

const AnimatedButton = ({ label = "Explore", onClick }) => {
  return (
    <>
      <style>{`
        .uiverse-btn {
          position: relative;
          font-weight: bold;
          color: white;
          border-radius: 2rem;
          cursor: pointer;
          width: 130px; /* adjustable */
          height: 44px;
          border: none;
          background-color: #3653f8;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }
        .uiverse-btn .span-mother {
          display: flex;
          overflow: hidden;
        }
        .uiverse-btn:hover .span-mother {
          position: absolute;
        }
        .uiverse-btn:hover .span-mother span {
          transform: translateY(1.2em);
        }
        .uiverse-btn .span-mother span:nth-child(1) {
          transition: 0.2s;
        }
        .uiverse-btn .span-mother span:nth-child(2) {
          transition: 0.3s;
        }
        .uiverse-btn .span-mother span:nth-child(3) {
          transition: 0.4s;
        }
        .uiverse-btn .span-mother span:nth-child(4) {
          transition: 0.5s;
        }
        .uiverse-btn .span-mother span:nth-child(5) {
          transition: 0.6s;
        }
        .uiverse-btn .span-mother span:nth-child(6) {
          transition: 0.7s;
        }
        .uiverse-btn .span-mother2 {
          display: flex;
          position: absolute;
          overflow: hidden;
        }
        .uiverse-btn .span-mother2 span {
          transform: translateY(-1.2em);
        }
        .uiverse-btn:hover .span-mother2 span {
          transform: translateY(0);
        }
        .uiverse-btn .span-mother2 span {
          transition: 0.2s;
        }
        .uiverse-btn .span-mother2 span:nth-child(2) {
          transition: 0.3s;
        }
        .uiverse-btn .span-mother2 span:nth-child(3) {
          transition: 0.4s;
        }
        .uiverse-btn .span-mother2 span:nth-child(4) {
          transition: 0.5s;
        }
        .uiverse-btn .span-mother2 span:nth-child(5) {
          transition: 0.6s;
        }
        .uiverse-btn .span-mother2 span:nth-child(6) {
          transition: 0.7s;
        }
      `}</style>

      <button className="uiverse-btn" onClick={onClick}>
        <div className="span-mother">
          {label.split("").map((char, idx) => (
            <span key={idx}>{char}</span>
          ))}
        </div>
        <div className="span-mother2">
          {label.split("").map((char, idx) => (
            <span key={idx}>{char}</span>
          ))}
        </div>
      </button>
    </>
  );
};

export default AnimatedButton;