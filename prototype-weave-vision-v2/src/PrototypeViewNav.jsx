import { Box, Button, Typography } from "@weave-mui/material";
import { FONT } from "./useAccountTheme.js";
import { VIS_D } from "./visdTokens.js";

const navButtonSx = (active) => ({
  ...VIS_D.typography.label14Semi,
  fontFamily: FONT,
  textTransform: "none",
  minWidth: 120,
  px: "16px",
  py: "6px",
  borderRadius: `${VIS_D.radius.button}px`,
  boxShadow: "none",
  bgcolor: active ? "#fff" : "transparent",
  color: active ? VIS_D.colors.ink : "rgba(255,255,255,0.82)",
  border: active ? "none" : "1px solid rgba(255,255,255,0.28)",
  "&:hover": {
    bgcolor: active ? "#fff" : "rgba(255,255,255,0.1)",
    boxShadow: "none",
  },
});

export default function PrototypeViewNav({ view, onViewChange }) {
  return (
    <Box
      component="nav"
      aria-label="Prototype view"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        px: { xs: "16px", md: "68px" },
        py: "10px",
        bgcolor: "#1f1f1f",
        color: "#fff",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
        position: "sticky",
        top: 0,
        zIndex: 1500,
      }}
    >
      <Typography
        sx={{
          fontFamily: FONT,
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.72)",
        }}
      >
        Prototype view
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Button
          variant={view === "admin" ? "contained" : "outlined"}
          onClick={() => onViewChange("admin")}
          sx={navButtonSx(view === "admin")}
        >
          Admin view
        </Button>
        <Button
          variant={view === "user" ? "contained" : "outlined"}
          onClick={() => onViewChange("user")}
          sx={navButtonSx(view === "user")}
        >
          User view
        </Button>
      </Box>
    </Box>
  );
}
