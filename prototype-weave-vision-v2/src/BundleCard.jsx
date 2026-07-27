import { Box, Button, Divider, Link, Typography } from "@weave-mui/material";
import { FigmaCtaArrowRight } from "./BillingIcons.jsx";
import ProductLockup from "./ProductLockup.jsx";
import { VIS_D } from "./visdTokens.js";

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

/** A "purchased together" bundle: an Autodesk product + a related 3rd-party app. */
export default function BundleCard({ bundle, onAction }) {
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

        {/* 3rd-party app — secondary */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <ProductLockup tint={bundle.app.tint} name={bundle.app.name} size={22} nameSize={14} nameWeight={700} />
          <Typography sx={{ ...VIS_D.typography.smallprint, color: VIS_D.colors.textLight }}>
            · {bundle.app.vendor}
          </Typography>
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

      {/* footer */}
      <Box sx={{ px: "24px", pb: "24px" }}>
        <Divider sx={{ borderColor: VIS_D.colors.rowDivider, mb: "12px" }} />
        <Link
          component="button"
          underline="none"
          onClick={() => onAction(`View bundle — ${bundle.product.name}`)}
          sx={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
        >
          <FigmaCtaArrowRight size={20} />
          <Typography
            component="span"
            sx={{ fontFamily: VIS_D.font.element, fontSize: "16px", fontWeight: 400, color: VIS_D.colors.ink }}
          >
            View bundle
          </Typography>
        </Link>
      </Box>
    </Box>
  );
}
