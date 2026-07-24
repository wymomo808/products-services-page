import { Box } from "@weave-mui/material";
import { SecurityM } from "@weave-mui/icons-weave";
import { VIS_D } from "./visdTokens.js";

const STATUS_COLORS = {
  Deployed: { bg: "#E8F5E9", color: "#1B5E20", border: "#A5D6A7" },
  Approved: { bg: "#E3F2FD", color: "#0D47A1", border: "#90CAF9" },
  Available: { bg: VIS_D.colors.panel, color: VIS_D.colors.text, border: VIS_D.colors.border },
  Pending: { bg: "#FFF8E1", color: "#F57F17", border: "#FFE082" },
};

export function OrgStatusBadge({ status }) {
  if (!status) return null;
  const colors = STATUS_COLORS[status] ?? STATUS_COLORS.Available;

  return (
    <Box
      component="span"
      sx={{
        ...VIS_D.typography.smallprint,
        fontWeight: 700,
        color: colors.color,
        bgcolor: colors.bg,
        border: `1px solid ${colors.border}`,
        borderRadius: "4px",
        px: "8px",
        py: "2px",
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </Box>
  );
}

export function SecurityReviewedBadge() {
  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        ...VIS_D.typography.smallprint,
        fontWeight: 600,
        lineHeight: 1.2,
        color: "#8558C5",
        bgcolor: "#F4EDFD",
        border: "1px solid #D5BCF7",
        borderRadius: "999px",
        px: "8px",
        py: "4px",
        width: "fit-content",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      <SecurityM sx={{ width: 12, height: 12, color: "inherit", flexShrink: 0 }} />
      Security reviewed
    </Box>
  );
}

export default function TrustBadges({ badges, variant = "default" }) {
  if (!badges?.length) return null;

  const isGreen = variant === "green";

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
      {badges.map((label) => (
        <Box
          key={label}
          component="span"
          sx={{
            ...VIS_D.typography.smallprint,
            fontWeight: 600,
            color: isGreen ? "#1B5E20" : VIS_D.colors.text,
            bgcolor: isGreen ? "#E8F5E9" : VIS_D.colors.panel,
            border: `1px solid ${isGreen ? "#A5D6A7" : VIS_D.colors.border}`,
            borderRadius: "4px",
            px: "8px",
            py: "2px",
          }}
        >
          {label}
        </Box>
      ))}
    </Box>
  );
}
