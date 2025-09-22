import React from "react";
import { Link } from "react-router";

const CustomButton = ({ to, label = "Click Me", onClick }) => {
  const InnerButton = (
    <>
      <style>{`
        .uiverse-brand-btn {
          min-width: 120px;
          position: relative;
          cursor: pointer;
          padding: 12px 17px;
          border: 0;
          border-radius: 7px;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);

          /* 🔵 Brand background */
          background: radial-gradient(
            ellipse at bottom,
            rgba(70, 87, 240, 1) 0%,   /* #4657F0 */
            rgba(40, 50, 140, 1) 60%,  /* darker shade for depth */
            rgba(20, 25, 80, 1) 100%
          );

          color: rgba(255, 255, 255, 0.85);
          font-weight: 600;
          transition: all 0.5s cubic-bezier(0.15, 0.83, 0.66, 1);
        }

        .uiverse-brand-btn::before {
          content: "";
          width: 70%;
          height: 1px;
          position: absolute;
          bottom: 0;
          left: 15%;

          /* ✨ White glow underline */
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 1) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          opacity: 0.3;
          transition: all 0.5s cubic-bezier(0.15, 0.83, 0.66, 1);
        }

        /* 🌟 Hover effect */
        .uiverse-brand-btn:hover {
          color: #fff;
          transform: scale(1.05) translateY(-3px);
          box-shadow: 0 6px 16px rgba(70, 87, 240, 0.6); /* glow */
        }

        .uiverse-brand-btn:hover::before {
          opacity: 1;
        }
      `}</style>

      <button className="uiverse-brand-btn" onClick={onClick}>
        {label}
      </button>
    </>
  );

  return to ? <Link to={to}>{InnerButton}</Link> : InnerButton;
};

export default CustomButton;