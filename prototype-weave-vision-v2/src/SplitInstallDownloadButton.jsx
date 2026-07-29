import { Box } from "@weave-mui/material";
import { CaretDownS } from "@weave-mui/icons-weave";
import { FONT } from "./useAccountTheme.js";
import { VIS_D } from "./visdTokens.js";

const BUTTON_HEIGHT = 36;
const MENU_WIDTH = 28;

const actionButtonSx = {
  border: "none",
  m: 0,
  p: 0,
  bgcolor: "transparent",
  color: "#fff",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: FONT,
  lineHeight: 1,
  boxSizing: "border-box",
  minHeight: BUTTON_HEIGHT,
  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.12)" },
  "&:focus-visible": {
    outline: "2px solid #0696D7",
    outlineOffset: 2,
  },
};

export default function SplitInstallDownloadButton({
  label,
  onPrimaryClick,
  onMenuClick,
  menuAriaLabel,
  sx,
}) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "stretch",
        width: 241,
        maxWidth: "100%",
        minHeight: BUTTON_HEIGHT,
        borderRadius: `${VIS_D.radius.button}px`,
        bgcolor: VIS_D.colors.ink,
        flexShrink: 0,
        ...sx,
      }}
    >
      <Box
        component="button"
        type="button"
        onClick={onPrimaryClick}
        sx={{
          ...actionButtonSx,
          fontSize: "14px",
          fontWeight: 600,
          textTransform: "none",
          flex: 1,
          minWidth: 0,
          px: "16px",
        }}
      >
        {label}
      </Box>

      <Box
        aria-hidden
        sx={{
          width: "1px",
          flexShrink: 0,
          bgcolor: "rgba(255, 255, 255, 0.35)",
          alignSelf: "stretch",
          my: "8px",
        }}
      />

      <Box
        component="button"
        type="button"
        aria-label={menuAriaLabel}
        onClick={onMenuClick}
        sx={{
          ...actionButtonSx,
          width: MENU_WIDTH,
          minWidth: MENU_WIDTH,
          flexShrink: 0,
        }}
      >
        <CaretDownS sx={{ width: 12, height: 12, color: "#fff", display: "block", flexShrink: 0 }} />
      </Box>
    </Box>
  );
}
