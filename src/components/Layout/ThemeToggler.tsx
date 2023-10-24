import React, { useEffect } from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { useDark } from "@/store/dark/useDark";

function ThemeToggler() {
  const dark = useDark.use.dark();
  const toggleTheme = useDark.use.toggleTheme();
  let htmlTag: HTMLElement | null;

  useEffect(() => {
    htmlTag = document.getElementById("chocovery-app");

    return () => {
      htmlTag;
    };
  }, [dark]);

  const darkToggler = () => {
    htmlTag?.classList.toggle("dark");
    toggleTheme();
  };

  return <ThemeToggle onClick={darkToggler} isDark={dark} />;
}

export default ThemeToggler;
