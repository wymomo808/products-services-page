import { Box, Button, Typography } from "@weave-mui/material";
import { MARKETPLACE_SOLUTIONS } from "./data.js";
import ProductLockup from "./ProductLockup.jsx";
import { VIS_D } from "./visdTokens.js";

const STATUS_STYLE = {
  Deployed: { bg: "#E8F5E9", color: "#2E7D32" },
  Approved: { bg: "#E3F2FD", color: "#1565C0" },
  Available: { bg: VIS_D.colors.panel, color: VIS_D.colors.textLight },
};

const TINT_BY_CATEGORY = {
  apps: "#0696D7",
  agents: "#5F60FF",
  templates: "#00A94F",
  skills: "#8B5CF6",
};

export default function AppIntegrationsPanel({ onAction }) {
  const connected = MARKETPLACE_SOLUTIONS.filter((s) => s.status === "Deployed" || s.status === "Approved");

  return (
    <Box>
      <Typography sx={{ ...VIS_D.typography.bodyMedium, color: VIS_D.colors.textPrimary, maxWidth: 640, mb: "24px" }}>
        Apps and integrations connected to your Autodesk products. Manage access, review status, and configure
        deployments from this view.
      </Typography>

      <Box
        sx={{
          border: `1px solid ${VIS_D.colors.border}`,
          borderRadius: `${VIS_D.radius.card}px`,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1.2fr 0.8fr 120px",
            gap: "16px",
            px: "20px",
            py: "12px",
            bgcolor: VIS_D.colors.backgroundPanel,
            borderBottom: `1px solid ${VIS_D.colors.border}`,
          }}
        >
          {["Solution", "Type", "Works with", "Status", ""].map((label) => (
            <Typography
              key={label || "action"}
              sx={{
                ...VIS_D.typography.smallprint,
                fontWeight: 600,
                color: VIS_D.colors.textLight,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              {label}
            </Typography>
          ))}
        </Box>

        {connected.map((item, index) => {
          const statusStyle = STATUS_STYLE[item.status] || STATUS_STYLE.Available;
          return (
            <Box
              key={item.id}
              sx={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1.2fr 0.8fr 120px",
                gap: "16px",
                px: "20px",
                py: "16px",
                alignItems: "center",
                borderBottom: index < connected.length - 1 ? `1px solid ${VIS_D.colors.rowDivider}` : "none",
              }}
            >
              <Box>
                <ProductLockup
                  tint={TINT_BY_CATEGORY[item.category]}
                  name={item.name}
                  size={22}
                  nameSize={14}
                  nameWeight={700}
                />
                <Typography sx={{ ...VIS_D.typography.smallprint, color: VIS_D.colors.textLight, mt: "4px", pl: "32px" }}>
                  {item.vendor}
                </Typography>
              </Box>
              <Typography sx={{ ...VIS_D.typography.bodySmall, textTransform: "capitalize" }}>
                {item.category.replace(/s$/, "")}
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {item.worksWith.map((w) => (
                  <Box
                    key={w}
                    sx={{
                      ...VIS_D.typography.smallprint,
                      bgcolor: VIS_D.colors.panel,
                      borderRadius: "4px",
                      px: "8px",
                      py: "2px",
                    }}
                  >
                    {w}
                  </Box>
                ))}
              </Box>
              <Box
                component="span"
                sx={{
                  ...VIS_D.typography.smallprint,
                  fontWeight: 700,
                  display: "inline-block",
                  px: "8px",
                  py: "2px",
                  borderRadius: "999px",
                  bgcolor: statusStyle.bg,
                  color: statusStyle.color,
                  width: "fit-content",
                }}
              >
                {item.status}
              </Box>
              <Button
                variant="contained"
                size="small"
                onClick={() => onAction(`Manage — ${item.name}`)}
                sx={{
                  ...VIS_D.typography.label14Semi,
                  textTransform: "none",
                  bgcolor: VIS_D.colors.ink,
                  boxShadow: "none",
                  "&:hover": { bgcolor: "#222", boxShadow: "none" },
                }}
              >
                Manage
              </Button>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
