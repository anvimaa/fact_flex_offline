import { w as writable } from './index2-Cz2gv4fD.js';

function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) return savedTheme;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}
const theme = writable(getInitialTheme());
if (typeof window !== "undefined") {
  const currentTheme = getInitialTheme();
  document.documentElement.classList.toggle("dark", currentTheme === "dark");
}

export { theme as t };
//# sourceMappingURL=theme-CG4ny1_k.js.map
