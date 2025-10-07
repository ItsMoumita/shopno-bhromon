

import { Moon, SunDim } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { flushSync } from "react-dom";

const supportsVT = () =>
  typeof document !== "undefined" && "startViewTransition" in document;

export const ThemeToggle = ({ className = "" }) => {
  const [isDark, setIsDark] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const html = document.documentElement;
    const stored = localStorage.getItem("theme");
    const next = stored
      ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    html.classList.toggle("dark", next);
    html.dataset.theme = next ? "dark" : "light";
    setIsDark(next);
  }, []);

  const apply = (dark) => {
    const html = document.documentElement;
    html.classList.toggle("dark", dark);
    html.dataset.theme = dark ? "dark" : "light";
    setIsDark(dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
  };

  const changeTheme = async () => {
    const nextDark = !isDark;
    if (!buttonRef.current || !supportsVT()) {
      apply(nextDark);
      return;
    }

    await document.startViewTransition(() => {
      flushSync(() => apply(nextDark));
    }).ready;

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRad = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRad}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 700,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  };

  return (
    <button
      ref={buttonRef}
      onClick={changeTheme}
      className={`p-2 rounded-full text-gray-700 hover:text-[#4657F0] dark:text-[#fcfcfd] hover:bg-[var(--secondary)]/30 transition ${className}`}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {isDark ? <SunDim size={25} /> : <Moon size={25} />}
    </button>
  );
};