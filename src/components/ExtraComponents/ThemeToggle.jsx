import { Moon, SunDim } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { flushSync } from "react-dom";

const supportsVT = () =>
  typeof document !== "undefined" && "startViewTransition" in document;

export const ThemeToggle = ({ className = "" }) => {
  const [isDark, setIsDark] = useState(() => 
    document.documentElement.classList.contains('dark')
  );
  const buttonRef = useRef(null);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const applyTheme = (dark) => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    setIsDark(dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
  };

  const changeTheme = async () => {
    const nextDark = !isDark;
    if (!buttonRef.current || !supportsVT()) {
      applyTheme(nextDark);
      return;
    }

    await document.startViewTransition(() => {
      flushSync(() => applyTheme(nextDark));
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
      className={`p-2 rounded-full text-gray-700 hover:text-[#4657F0] dark:text-[#fcfcfd] hover:bg-gray-100 dark:hover:bg-gray-800 transition ${className}`}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {isDark ? <SunDim size={25} /> : <Moon size={25} />}
    </button>
  );
};