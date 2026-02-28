import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import App from "./App.tsx";
import "./index.css";
// 🔥 FIX for sockjs-client
(window as any).global = window;
document.documentElement.classList.add('dark');

createRoot(document.getElementById("root")!).render(
  <ThemeProvider 
    attribute="class" 
    defaultTheme="dark" 
    forcedTheme="dark"
    disableTransitionOnChange
  >
    <App />
  </ThemeProvider>
);
