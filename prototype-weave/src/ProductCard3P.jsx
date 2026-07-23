import { Box, Button, ButtonGroup, Divider, Link, Typography } from "@weave-mui/material";
import { buttonGroupKind } from "@weave-mui/enums";
import { CaretDownS, MoreS } from "@weave-mui/icons-weave";
import { FigmaCtaArrowRight } from "./BillingIcons.jsx";
import PlatformBadges from "./PlatformBadges.jsx";
import ProductLockup from "./ProductLockup.jsx";
import { VIS_D } from "./visdTokens.js";

/** Inline, borderless "select" — value + caret, matching the Figma deprecated select. */
function InlineSelect({ value, label, onClick }) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      aria-label={`${label}: ${value}`}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        background: "none",
        border: "none",
        p: 0,
        cursor: "pointer",
        color: VIS_D.colors.textLight,
        font: "inherit",
      }}
    >
      <Typography
        component="span"
        sx={{ fontFamily: VIS_D.font.element, fontSize: "16px", fontWeight: 400, lineHeight: "20px", color: VIS_D.colors.textLight }}
      >
        {value}
      </Typography>
      <CaretDownS sx={{ width: 12, height: 12, color: VIS_D.colors.textLight }} />
    </Box>
  );
}

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

const TYPE_LABELS = {
  products: "Product",
  apps: "App",
  integrations: "Integration",
  agents: "Agent",
  skills: "Skill",
  templates: "Template",
};

function cardCta(product) {
  switch (product.category) {
    case "apps":
    case "templates":
      return "Download";
    case "agents":
    case "skills":
      return "Add";
    case "integrations":
      return product.cta ?? "Connect";
    default:
      return product.cta;
  }
}

function ContentTypeBadge({ category }) {
  const label = TYPE_LABELS[category];
  if (!label) return null;

  return (
    <Box
      sx={{
        ...VIS_D.typography.smallprint,
        fontWeight: 600,
        color: VIS_D.colors.textLight,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
      }}
    >
      {label}
    </Box>
  );
}

function AutodeskBadge() {
  return (
    <Box
      sx={{
        ...VIS_D.typography.smallprint,
        fontWeight: 700,
        color: VIS_D.colors.ink,
        bgcolor: VIS_D.colors.background,
        border: `1px solid ${VIS_D.colors.ink}`,
        borderRadius: "4px",
        px: "8px",
        py: "2px",
      }}
    >
      Autodesk
    </Box>
  );
}

export default function ProductCard3P({ product, onAction, onViewDetails }) {
  const isSplit = product.variant === "split";
  const cta = cardCta(product);
  const isProduct = product.category === "products";
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
        position: "relative",
      }}
    >
      {product.isAutodesk ? (
        <Box sx={{ position: "absolute", top: "24px", right: "24px", zIndex: 1 }}>
          <AutodeskBadge />
        </Box>
      ) : null}
      {/* body */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "28px", flex: 1, p: "24px" }}>
        {/* slot-01: lockup */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px", pr: product.isAutodesk ? "92px" : 0 }}>
          <ContentTypeBadge category={product.category} />
          <Box sx={{ height: 36, display: "flex", alignItems: "center" }}>
            <ProductLockup
              logoSrc={product.logo}
              tint={product.tint}
              icon={product.icon}
              name={product.name}
              size={30}
              nameWeight={700}
            />
          </Box>
        </Box>

        {/* slot-02: platforms (products) or vendor + compatibility (solutions) + description */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {isProduct && product.platforms ? (
            <PlatformBadges platforms={product.platforms} />
          ) : (
            product.vendor && (
              <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px" }}>
                <Typography
                  component="span"
                  sx={{ ...VIS_D.typography.smallprint, fontWeight: 600, color: VIS_D.colors.textLight }}
                >
                  {product.vendor}
                </Typography>
                {(product.worksWith || []).map((w) => (
                  <Box
                    key={w}
                    sx={{
                      ...VIS_D.typography.smallprint,
                      color: VIS_D.colors.text,
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
            )
          )}
          <Typography
            sx={{
              fontFamily: VIS_D.font.element,
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "22px",
              color: VIS_D.colors.textPrimary,
            }}
          >
            {product.description}
          </Typography>
        </Box>

        {/* slot-03: selects + action + footnote */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {isProduct && product.version && (
            <Box sx={{ display: "flex", gap: "16px", mb: "8px" }}>
              <InlineSelect label="Version" value={product.version} onClick={() => onAction(`Version — ${product.name}`)} />
              <InlineSelect label="Platform" value={product.platform} onClick={() => onAction(`Platform — ${product.name}`)} />
              <InlineSelect label="Language" value={product.language} onClick={() => onAction(`Language — ${product.name}`)} />
            </Box>
          )}

          {isSplit ? (
            <ButtonGroup kind={buttonGroupKind.SPLIT} fullWidth>
              <Button variant="contained" onClick={() => onAction(cta)} sx={primaryBtnSx}>
                {cta}
              </Button>
              <Button
                variant="contained"
                aria-label={`More options for ${product.name}`}
                onClick={() => onAction(`More options — ${product.name}`)}
                sx={{ ...primaryBtnSx, px: "16px", minWidth: 0 }}
              >
                <MoreS sx={{ width: 20, height: 20 }} />
              </Button>
            </ButtonGroup>
          ) : (
            <Button variant="contained" fullWidth onClick={() => onAction(cta)} sx={primaryBtnSx}>
              {cta}
            </Button>
          )}

          {product.installFootnote && (
            <Typography sx={{ ...VIS_D.typography.smallprint, color: VIS_D.colors.textLight, mt: "4px" }}>
              {product.installFootnote}
            </Typography>
          )}
        </Box>
      </Box>

      {/* footer: divider + View details */}
      <Box sx={{ px: "24px", pb: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <Box sx={{ py: "8px" }}>
          <Divider sx={{ borderColor: VIS_D.colors.rowDivider }} />
        </Box>
        <Link
          component="button"
          underline="none"
          onClick={() => (onViewDetails ? onViewDetails(product) : onAction(`View details — ${product.name}`))}
          sx={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
        >
          <FigmaCtaArrowRight size={20} />
          <Typography
            component="span"
            sx={{ fontFamily: VIS_D.font.element, fontSize: "16px", fontWeight: 400, lineHeight: 1.5, color: VIS_D.colors.ink }}
          >
            View details
          </Typography>
        </Link>
      </Box>
    </Box>
  );
}
