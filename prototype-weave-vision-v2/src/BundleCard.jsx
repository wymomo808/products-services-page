import { Box, Button, Divider, Link, Typography } from "@weave-mui/material";
import ProductLockup from "./ProductLockup.jsx";
import { VIS_D } from "./visdTokens.js";

const FONT = VIS_D.font.element;

const primaryBtnSx = {
  ...VIS_D.typography.label16Semi,
  textTransform: "none",
  bgcolor: VIS_D.colors.ink,
  color: "#fff",
  borderRadius: `${VIS_D.radius.button}px`,
  boxShadow: "none",
  py: "8px",
  "&:hover": { bgcolor: "#222222", boxShadow: "none" },
};

/** A "purchased together" bundle: an Autodesk product + related 3rd-party app(s). */
export default function BundleCard({ bundle, onAction, onViewDetails }) {
  const bundledApps = bundle.apps ?? (bundle.app ? [bundle.app] : []);

  const handleAppClick = (app) => {
    if (app.id && onViewDetails) {
      onViewDetails(app);
      return;
    }
    onAction(`View details — ${app.name}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        bgcolor: VIS_D.colors.background,
        borderRadius: `${VIS_D.radius.card}px`,
        boxShadow: `inset 0 0 0 1px ${VIS_D.colors.border}`,
        overflow: "hidden",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px", flex: 1, p: "24px" }}>
        {/* purchase date */}
        <Typography sx={{ ...VIS_D.typography.smallprint, color: VIS_D.colors.textLight }}>
          Purchased {bundle.purchasedOn}
        </Typography>

        {/* Autodesk product — primary */}
        <ProductLockup
          logoSrc={bundle.product.logo}
          name={bundle.product.name}
          size={44}
          nameSize={20}
          nameWeight={700}
        />

        {/* bundled-with separator */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Divider sx={{ flex: 1, borderColor: VIS_D.colors.rowDivider }} />
          <Typography sx={{ ...VIS_D.typography.smallprint, color: VIS_D.colors.textLight, whiteSpace: "nowrap" }}>
            bundled with
          </Typography>
          <Divider sx={{ flex: 1, borderColor: VIS_D.colors.rowDivider }} />
        </Box>

        {/* 3rd-party app(s) — secondary */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {bundledApps.map((app) => (
            <Box key={app.id ?? app.name} sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Link
                component="button"
                underline="hover"
                onClick={() => handleAppClick(app)}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  flex: 1,
                  minWidth: 0,
                  p: 0,
                  color: VIS_D.colors.ink,
                  fontFamily: FONT,
                  textAlign: "left",
                  justifyContent: "flex-start",
                }}
              >
                <ProductLockup tint={app.tint} name={app.name} size={22} nameSize={14} nameWeight={700} />
              </Link>
              <Typography sx={{ ...VIS_D.typography.smallprint, color: VIS_D.colors.textLight, flexShrink: 0 }}>
                · {app.vendor}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* primary CTA */}
        {bundle.cta && (
          <Button
            variant="contained"
            fullWidth
            onClick={() => onAction(`${bundle.cta} — ${bundle.product.name}`)}
            sx={{ ...primaryBtnSx, mt: "auto" }}
          >
            {bundle.cta}
          </Button>
        )}
      </Box>
    </Box>
  );
}
