import { Box, Button, Typography } from "@weave-mui/material";
import { VIS_D } from "./visdTokens.js";

const FONT = VIS_D.font.element;

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

function ExpiringSoonBadge() {
  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        bgcolor: "#FFF4EC",
        color: "#C74600",
        border: "1px solid #F77236",
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
        <rect x="2.5" y="3.5" width="11" height="10" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M5 2.5V4.5M11 2.5V4.5M2.5 6.5H13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </Box>
      Expiring soon
    </Box>
  );
}

function SubscriptionIllustration() {
  return (
    <Box
      component="svg"
      viewBox="0 0 90 90"
      aria-hidden
      sx={{ width: 90, height: 90, display: "block", color: VIS_D.colors.ink }}
    >
      <rect x="14" y="18" width="62" height="54" rx="6" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M14 30H76" stroke="currentColor" strokeWidth="2" />
      <path d="M30 14V22M60 14V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="45" cy="50" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M45 44V50L49 54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Box>
  );
}

export default function SubscriptionExpiringCard({ daysRemaining = 15, onRenew }) {
  if (!daysRemaining || daysRemaining <= 0) return null;

  const dayLabel = daysRemaining === 1 ? "day" : "days";

  return (
    <Box
      component="article"
      sx={{
        maxWidth: 376,
        borderRadius: `${VIS_D.radius.card}px`,
        bgcolor: VIS_D.colors.background,
        border: `1px solid ${VIS_D.colors.border}`,
        overflow: "hidden",
        p: "32px",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <ExpiringSoonBadge />
          <SubscriptionIllustration />
        </Box>

        <Typography sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT, color: VIS_D.colors.textPrimary }}>
          Your subscription will expire in {daysRemaining} {dayLabel}.
          <Box component="span" sx={{ display: "block", mt: "4px" }}>
            Renew now to keep access for your team.
          </Box>
        </Typography>

        <Button variant="outlined" onClick={onRenew} sx={outlineBtnSx}>
          Renew
        </Button>
      </Box>
    </Box>
  );
}
