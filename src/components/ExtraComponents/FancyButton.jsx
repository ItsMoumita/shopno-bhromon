
import React from "react";
import { Link } from "react-router"; 

const FancyButton = ({ label, to, onClick }) => {
  const buttonContent = (
    <span
      className="
          relative z-10 text-[#4657F0] dark:text-white/70 text-lg font-semibold 
          transition-all duration-300 hover:text-white
        "
    >
      {label}
    </span>
  );

  return to ? (
    <Link to={to}>
      <button
        className="
          relative inline-block w-[150px] h-[50px] rounded-[10px] 
          border border-[#4657F0] bg-transparent overflow-hidden 
          transition-all duration-500 z-10 cursor-pointer
          before:content-[''] before:absolute before:top-0 before:left-[-10px] before:h-full before:w-0
          before:bg-[#4657F0] before:skew-x-[15deg] before:transition-all before:duration-500 before:z-[-1]
          hover:before:w-[58%]
          after:content-[''] after:absolute after:top-0 after:right-[-10px] after:h-full after:w-0
          after:bg-[#2f3fd9] after:skew-x-[15deg] after:transition-all after:duration-500 after:z-[-1]
          hover:after:w-[58%]
        "
      >
        {buttonContent}
      </button>
    </Link>
  ) : (
    <button
      onClick={onClick}
      className="
        relative inline-block w-[150px] h-[50px] rounded-[10px] 
        border border-[#4657F0] bg-transparent overflow-hidden 
        transition-all duration-500 z-10 cursor-pointer
        before:content-[''] before:absolute before:top-0 before:left-[-10px] before:h-full before:w-0
        before:bg-[#4657F0] before:skew-x-[15deg] before:transition-all before:duration-500 before:z-[-1]
        hover:before:w-[58%]
        after:content-[''] after:absolute after:top-0 after:right-[-10px] after:h-full after:w-0
        after:bg-[#2f3fd9] after:skew-x-[15deg] after:transition-all after:duration-500 after:z-[-1]
        hover:after:w-[58%]
      "
    >
      {buttonContent}
    </button>
  );
};

export default FancyButton;