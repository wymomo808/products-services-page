import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./fonts.css";
import PrototypeShell from "./PrototypeShell.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PrototypeShell />
  </StrictMode>
);
