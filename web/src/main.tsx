import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const lightThemeTokens: Record<string, string> = {
  "--paper": "#faf9f7",
  "--paper-deep": "#f2ece5",
  "--ink": "#1a1814",
  "--muted": "#6b6560",
  "--line": "#e8e4df",
  "--line-strong": "#d7d1ca",
  "--panel": "rgba(255, 255, 255, 0.9)",
  "--panel-strong": "rgba(255, 255, 255, 0.96)",
  "--panel-quiet": "rgba(255, 255, 255, 0.72)",
  "--dock": "#f7f5f2",
  "--glass-soft": "rgba(255, 255, 255, 0.5)",
  "--glass": "rgba(255, 255, 255, 0.72)",
  "--glass-hover": "rgba(255, 255, 255, 0.86)",
  "--glass-strong": "rgba(255, 255, 255, 0.94)",
  "--accent": "#0d9488",
  "--accent-soft": "#c8f1ed",
  "--accent-deep": "#0f6f67",
  "--sky": "#4c97b5",
  "--sky-soft": "#c6e6f2",
  "--sky-deep": "#245b73",
  "--mint": "#4d9a6a",
  "--mint-soft": "#cce7d5",
  "--mint-deep": "#2b6b44",
  "--success": "#15803d",
  "--warning": "#b45309",
  "--error": "#b91c1c",
  "--accent-gradient": "linear-gradient(135deg, rgba(13, 148, 136, 0.18), rgba(255, 255, 255, 0.92))",
  "--warm-gradient": "linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(200, 241, 237, 0.24))",
  "--cool-gradient": "linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(198, 230, 242, 0.28))",
  "--mint-gradient": "linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(204, 231, 213, 0.28))",
  "--card-gradient": "linear-gradient(180deg, #ffffff, #f5f5f5)",
  "--bg-start": "#faf9f7",
  "--bg-mid": "#f5f2ed",
  "--bg-end": "#efeae4",
  "--glow-warm": "rgba(13, 148, 136, 0.16)",
  "--glow-cool": "rgba(76, 151, 181, 0.16)",
  "--bg-blob-1": "rgba(13, 148, 136, 0.07)",
  "--bg-blob-2": "rgba(76, 151, 181, 0.07)",
  "--content-scale": "1",
  "--shadow-soft": "0 28px 70px rgba(24, 44, 104, 0.12)",
  "--shadow-card": "0 12px 28px rgba(26, 41, 81, 0.08)",
  "--bg": "var(--paper)",
  "--surface": "var(--paper)",
  "--surface-2": "var(--paper-deep)",
  "--ink-strong": "var(--ink)",
  "--border": "var(--line)",
  "--border-strong": "var(--line-strong)",
  "--accent-hover": "var(--accent-deep)",
  "--radius": "0.75rem",
  "--radius-sm": "0.5rem",
  "--shadow": "var(--shadow-card)",
};

const darkThemeTokens: Record<string, string> = {
  "--paper": "#121110",
  "--paper-deep": "#191816",
  "--ink": "#f5f2ed",
  "--muted": "#a39e97",
  "--line": "#2a2724",
  "--line-strong": "#3a3530",
  "--panel": "rgba(28, 26, 24, 0.82)",
  "--panel-strong": "rgba(28, 26, 24, 0.96)",
  "--panel-quiet": "rgba(24, 22, 20, 0.72)",
  "--dock": "#0f0e0d",
  "--glass-soft": "rgba(30, 30, 30, 0.6)",
  "--glass": "rgba(28, 26, 24, 0.8)",
  "--glass-hover": "rgba(38, 38, 38, 0.9)",
  "--glass-strong": "rgba(16, 16, 16, 0.9)",
  "--accent": "#5ed1c7",
  "--accent-soft": "#173833",
  "--accent-deep": "#baf1eb",
  "--sky": "#89cbe5",
  "--sky-soft": "#122632",
  "--sky-deep": "#d3f0fb",
  "--mint": "#74d49a",
  "--mint-soft": "#13281a",
  "--mint-deep": "#d2f5df",
  "--success": "#4ade80",
  "--warning": "#f0bd6e",
  "--error": "#ff7a72",
  "--accent-gradient": "linear-gradient(135deg, rgba(94, 209, 199, 0.12), rgba(18, 18, 18, 0.95))",
  "--warm-gradient": "linear-gradient(180deg, rgba(14, 14, 14, 0.96), rgba(59, 33, 25, 0.34))",
  "--cool-gradient": "linear-gradient(180deg, rgba(14, 14, 14, 0.96), rgba(18, 38, 50, 0.3))",
  "--mint-gradient": "linear-gradient(180deg, rgba(14, 14, 14, 0.96), rgba(19, 40, 26, 0.28))",
  "--card-gradient": "linear-gradient(180deg, #141414, #1a1a1a)",
  "--bg-start": "#0a0908",
  "--bg-mid": "#070605",
  "--bg-end": "#050504",
  "--glow-warm": "rgba(94, 209, 199, 0.07)",
  "--glow-cool": "rgba(137, 203, 229, 0.06)",
  "--bg-blob-1": "rgba(94, 209, 199, 0.05)",
  "--bg-blob-2": "rgba(137, 203, 229, 0.05)",
  "--content-scale": "1",
  "--shadow-soft": "0 28px 70px rgba(0, 0, 0, 0.6)",
  "--shadow-card": "0 12px 28px rgba(0, 0, 0, 0.4)",
  "--bg": "var(--paper)",
  "--surface": "var(--paper)",
  "--surface-2": "var(--paper-deep)",
  "--ink-strong": "var(--ink)",
  "--border": "var(--line)",
  "--border-strong": "var(--line-strong)",
  "--accent-hover": "var(--accent-deep)",
  "--radius": "0.75rem",
  "--radius-sm": "0.5rem",
  "--shadow": "var(--shadow-card)",
};

function applyThemeTokens(isDark: boolean) {
  const root = document.documentElement;
  const tokens = isDark ? darkThemeTokens : lightThemeTokens;

  root.style.colorScheme = isDark ? "dark" : "light";
  root.style.background = isDark ? "#050504" : "#faf9f7";

  for (const [key, value] of Object.entries(tokens)) {
    root.style.setProperty(key, value);
  }
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
applyThemeTokens(systemTheme.matches);
systemTheme.addEventListener("change", (event) => {
  applyThemeTokens(event.matches);
});

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
