import { Box, Button, Typography } from "@weave-mui/material";
import { VIS_D } from "./visdTokens.js";

const FONT = VIS_D.font.element;
const ALERT_BORDER = "#F77236";

const outlineBtnSx = {
  ...VIS_D.typography.label16Semi,
  fontFamily: FONT,
  textTransform: "none",
  color: VIS_D.colors.ink,
  borderColor: VIS_D.colors.ink,
  borderRadius: `${VIS_D.radius.button}px`,
  px: "20px",
  py: "10px",
  width: "100%",
  boxShadow: "none",
  "&:hover": { borderColor: VIS_D.colors.ink, bgcolor: VIS_D.colors.searchFill, boxShadow: "none" },
};

function UnassignedSeatsBadge() {
  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        bgcolor: ALERT_BORDER,
        color: "#fff",
        borderRadius: "999px",
        px: "10px",
        py: "6px",
        ...VIS_D.typography.smallprint,
        fontWeight: 600,
        lineHeight: 1.2,
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 16 16"
        aria-hidden
        sx={{ width: 14, height: 14, display: "block", flexShrink: 0 }}
      >
        <path
          d="M8 2.5 13.5 12.5H2.5L8 2.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path d="M8 6.5V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="8" cy="11" r="0.75" fill="currentColor" />
      </Box>
      Unassigned seats
    </Box>
  );
}

export default function UnassignedSeatsCard({ productName, availableSeats, onAssignSeats }) {
  if (availableSeats <= 0) return null;

  const seatLabel = availableSeats === 1 ? "seat" : "seats";

  return (
    <Box
      component="article"
      sx={{
        maxWidth: 376,
        borderRadius: `${VIS_D.radius.card}px`,
        bgcolor: VIS_D.colors.background,
        border: `1px solid ${ALERT_BORDER}`,
        overflow: "hidden",
        p: "32px",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <UnassignedSeatsBadge />
          <Box
            component="img"
            src="./illustrations/seats-unassigned-3d.svg"
            alt=""
            aria-hidden
            sx={{ width: 100, height: 100, display: "block" }}
          />
        </Box>

        <Typography sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT, color: VIS_D.colors.textPrimary }}>
          You can assign {availableSeats} {productName} {seatLabel}
          <Box component="span" sx={{ display: "block", mt: "4px" }}>
            You currently have unassigned seats.
          </Box>
        </Typography>

        <Button variant="outlined" onClick={onAssignSeats} sx={outlineBtnSx}>
          Assign seats
        </Button>
      </Box>
    </Box>
  );
}
