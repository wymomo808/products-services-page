import { useEffect, useState } from "react";
import { Box, Typography } from "@weave-mui/material";
import AccountApp from "./AccountApp.jsx";
import PrototypeViewNav from "./PrototypeViewNav.jsx";
import UserAccountApp from "./user/UserAccountApp.jsx";
import { FONT } from "./useAccountTheme.js";
import { VIS_D } from "./visdTokens.js";

function getInitialView() {
  if (typeof window === "undefined") {
    return "admin";
  }

  const hash = window.location.hash.replace("#", "").toLowerCase();
  return hash === "user" ? "user" : "admin";
}

export default function PrototypeShell() {
  const [view, setView] = useState(getInitialView);

  useEffect(() => {
    const nextHash = view === "user" ? "#user" : "#admin";
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, "", nextHash);
    }
  }, [view]);

  useEffect(() => {
    const handleHashChange = () => {
      setView(getInitialView());
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Box
        role="status"
        sx={{
          px: { xs: "16px", md: "68px" },
          py: "10px",
          bgcolor: VIS_D.colors.accent,
          color: "#fff",
          borderBottom: `1px solid ${VIS_D.colors.ink}`,
        }}
      >
        <Typography
          sx={{
            ...VIS_D.typography.bodySmall,
            fontFamily: FONT,
            color: "#fff",
            textAlign: "center",
            maxWidth: 960,
            mx: "auto",
          }}
        >
          This prototype is intended to communicate the vision of Products & Services. It&apos;s V1 — feedback is
          welcome.{" "}
          <Box
            component="a"
            href="https://autodesk.atlassian.net/wiki/spaces/~wuya/pages/1031599257/Products+Services+Vision+V1+Prototype+Guide+WIP"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "#fff",
              fontWeight: 700,
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              "&:hover": { color: "rgba(255,255,255,0.9)" },
            }}
          >
            Read the guide
          </Box>
        </Typography>
      </Box>
      <PrototypeViewNav view={view} onViewChange={setView} />
      <Box sx={{ flex: 1, minHeight: 0 }}>
        {view === "admin" ? <AccountApp /> : <UserAccountApp />}
      </Box>
    </Box>
  );
}
