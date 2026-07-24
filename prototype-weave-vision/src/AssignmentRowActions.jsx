import { Box, Button, IconButton } from "@weave-mui/material";
import { CaretRightS } from "@weave-mui/icons-weave";
import { VIS_D } from "./visdTokens.js";

const FONT = VIS_D.font.element;

export function OutlinedPermissionGroupIcon({ size = 20, sx }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden
      sx={{ display: "block", flexShrink: 0, overflow: "visible", color: VIS_D.colors.ink, ...sx }}
    >
      <circle cx="8.5" cy="7" r="2.4" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M4 18.5v-2.8c0-2.4 2-3.8 4.5-3.8s4.5 1.4 4.5 3.8v2.8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="15.5" cy="7.5" r="2.2" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M12 18.5v-2.4c0-2 1.6-3.2 3.5-3.2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </Box>
  );
}

const unassignButtonSx = {
  ...VIS_D.typography.label14Semi,
  fontFamily: FONT,
  textTransform: "none",
  borderRadius: `${VIS_D.radius.button}px`,
  borderColor: VIS_D.colors.border,
  color: VIS_D.colors.textLight,
  minWidth: 88,
  px: "12px",
  py: "4px",
  boxShadow: "none",
  flexShrink: 0,
  "&:hover": {
    borderColor: VIS_D.colors.ink,
    color: VIS_D.colors.ink,
    bgcolor: "transparent",
    boxShadow: "none",
  },
};

export default function AssignmentRowActions({ label, onUnassign, onView, sx }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        minWidth: 0,
        overflow: "visible",
        ...sx,
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }} />

      <Box sx={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
        <OutlinedPermissionGroupIcon />
        <Button variant="outlined" onClick={onUnassign} sx={unassignButtonSx}>
          Unassign
        </Button>
      </Box>

      <Box sx={{ width: 40, flexShrink: 0 }} />

      <IconButton
        aria-label={`View ${label}`}
        onClick={onView}
        sx={{ p: "4px", color: VIS_D.colors.ink, flexShrink: 0, mr: "-4px" }}
      >
        <CaretRightS sx={{ width: 16, height: 16, display: "block" }} />
      </IconButton>
    </Box>
  );
}
