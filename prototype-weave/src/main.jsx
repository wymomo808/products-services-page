import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./fonts.css";
import AccountApp from "./AccountApp.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AccountApp />
  </StrictMode>
);
