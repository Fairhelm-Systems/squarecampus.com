const themeScript = `
(() => {
  const storageKey = "squarecampus-theme";

  try {
    const saved = localStorage.getItem(storageKey);
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const theme = saved === "dark" || saved === "light" ? saved : "light";
    const root = document.documentElement;

    root.classList.toggle("dark", theme === "dark");
    root.dataset.theme = theme || preferred;
  } catch (error) {
    document.documentElement.classList.remove("dark");
    document.documentElement.dataset.theme = "light";
  }
})();
`;

export function ThemeScript() {
  return (
    <script id="squarecampus-theme-script" dangerouslySetInnerHTML={{ __html: themeScript }} />
  );
}
