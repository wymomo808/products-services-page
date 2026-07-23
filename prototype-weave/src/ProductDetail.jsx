import {
  Box,
  Button,
  Divider,
  Link,
  Tab,
  TabContext,
  TabList,
  TabPanel,
  Typography,
} from "@weave-mui/material";
import { tabAlignment, tabVariant } from "@weave-mui/enums";
import { FigmaCtaArrowRight } from "./BillingIcons.jsx";
import PlatformBadges from "./PlatformBadges.jsx";
import AutodeskProductDetail from "./AutodeskProductDetail.jsx";
import MarketplaceAppDetail from "./MarketplaceAppDetail.jsx";
import ProductLockup from "./ProductLockup.jsx";
import { PS_PRODUCTS } from "./data.js";
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
  px: "24px",
  "&:hover": { bgcolor: "#222222", boxShadow: "none" },
};

const DETAIL_TABS = [
  { id: "updates", label: "Updates" },
  { id: "extensions", label: "Extensions" },
  { id: "language", label: "Language packs" },
];

function RelatedSolution({ item, onAction }) {
  return (
    <Box
      sx={{
        border: `1px solid ${VIS_D.colors.border}`,
        borderRadius: `${VIS_D.radius.card}px`,
        p: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        height: "100%",
      }}
    >
      <ProductLockup tint={item.tint} name={item.name} size={24} nameSize={14} nameWeight={700} />
      <Typography sx={{ ...VIS_D.typography.bodySmall, color: VIS_D.colors.textPrimary, flex: 1 }}>
        {item.description}
      </Typography>
      <Button variant="contained" onClick={() => onAction(item.cta)} sx={{ ...primaryBtnSx, alignSelf: "flex-start" }}>
        {item.cta}
      </Button>
    </Box>
  );
}

export default function ProductDetail({ product, onBack, onAction, onViewAllApps, onViewDetails }) {
  if (product.id === "autocad") {
    return (
      <AutodeskProductDetail
        product={product}
        onBack={onBack}
        onAction={onAction}
        onViewAllApps={onViewAllApps}
        onViewDetails={onViewDetails}
      />
    );
  }

  if (product.id === "plot-publisher") {
    return <MarketplaceAppDetail product={product} onBack={onBack} onAction={onAction} />;
  }

  const isProduct = product.category === "products";
  const related = PS_PRODUCTS.filter(
    (item) =>
      item.id !== product.id &&
      item.category !== "products" &&
      (product.worksWith || []).some((w) => item.worksWith?.includes(w))
  ).slice(0, 2);

  const solutionTypeLabel =
    {
      apps: "app",
      integrations: "integration",
      agents: "agent",
      skills: "skill",
      templates: "template",
    }[product.category] ?? "solution";

  return (
    <Box>
      <Link
        component="button"
        underline="none"
        onClick={onBack}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          mb: "24px",
          color: VIS_D.colors.ink,
          ...VIS_D.typography.bodySmall,
        }}
      >
        ← Back to all products & solutions
      </Link>

      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "24px", mb: "32px" }}>
        <Box sx={{ flex: 1, minWidth: 280 }}>
          <ProductLockup
            logoSrc={product.logo}
            tint={product.tint}
            icon={product.icon}
            name={product.name}
            size={44}
            nameSize={28}
            nameWeight={700}
          />
          {product.platforms && (
            <Box sx={{ mt: "12px" }}>
              <PlatformBadges platforms={product.platforms} />
            </Box>
          )}
          {product.vendor && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px", mt: "12px" }}>
              <Typography sx={{ ...VIS_D.typography.smallprint, fontWeight: 600, color: VIS_D.colors.textLight }}>
                {product.vendor}
              </Typography>
              {(product.worksWith || []).map((w) => (
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
                  Works with {w}
                </Box>
              ))}
            </Box>
          )}
        </Box>

        <Button variant="contained" onClick={() => onAction(product.cta)} sx={primaryBtnSx}>
          {product.cta}
        </Button>
      </Box>

      <Typography sx={{ ...VIS_D.typography.bodyMedium, color: VIS_D.colors.textPrimary, maxWidth: 720, mb: "32px" }}>
        {product.description}
      </Typography>

      {isProduct ? (
        <TabContext value="updates">
          <TabList
            variant={tabVariant.STANDARD}
            align={tabAlignment.LEFT}
            aria-label="Product detail sections"
            sx={{
              borderBottom: `1px solid ${VIS_D.colors.rowDivider}`,
              mb: "24px",
              "& .MuiTab-root": {
                ...VIS_D.typography.label16Semi,
                fontFamily: FONT,
                textTransform: "none",
                minHeight: 48,
              },
              "& .MuiTabs-indicator": { backgroundColor: VIS_D.colors.ink, height: 2 },
            }}
          >
            {DETAIL_TABS.map((t) => (
              <Tab key={t.id} label={t.label} value={t.id} />
            ))}
          </TabList>
          {DETAIL_TABS.map((t) => (
            <TabPanel key={t.id} value={t.id} sx={{ p: 0 }}>
              <Box
                sx={{
                  border: `1px solid ${VIS_D.colors.border}`,
                  borderRadius: `${VIS_D.radius.card}px`,
                  p: "24px",
                  bgcolor: VIS_D.colors.backgroundPanel,
                }}
              >
                <Typography sx={{ ...VIS_D.typography.headlineSmall, mb: "8px" }}>{t.label}</Typography>
                <Typography sx={{ ...VIS_D.typography.bodyMedium, color: VIS_D.colors.textPrimary }}>
                  {t.label} available for {product.name} {product.version}. Select items to include in your install or
                  deployment package.
                </Typography>
              </Box>
            </TabPanel>
          ))}
        </TabContext>
      ) : (
        <Box
          sx={{
            border: `1px solid ${VIS_D.colors.border}`,
            borderRadius: `${VIS_D.radius.card}px`,
            p: "24px",
            bgcolor: VIS_D.colors.backgroundPanel,
            mb: "32px",
          }}
        >
          <Typography sx={{ ...VIS_D.typography.headlineSmall, mb: "8px" }}>About this solution</Typography>
          <Typography sx={{ ...VIS_D.typography.bodyMedium, color: VIS_D.colors.textPrimary }}>
            Request access or add this {solutionTypeLabel} to your organization. Once
            approved, it will appear in your entitled solutions and can be assigned to users.
          </Typography>
        </Box>
      )}

      {related.length > 0 && (
        <Box sx={{ mt: "40px" }}>
          <Typography sx={{ ...VIS_D.typography.headlineSmall, fontSize: "18px", fontWeight: 800, mb: "16px" }}>
            Related solutions
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
              gap: "16px",
            }}
          >
            {related.map((item) => (
              <RelatedSolution key={item.id} item={item} onAction={onAction} />
            ))}
          </Box>
        </Box>
      )}

      <Divider sx={{ borderColor: VIS_D.colors.rowDivider, my: "32px" }} />

      <Link
        component="button"
        underline="none"
        onClick={onBack}
        sx={{ display: "inline-flex", alignItems: "center", gap: "8px", color: VIS_D.colors.ink }}
      >
        <FigmaCtaArrowRight size={20} sx={{ transform: "rotate(180deg)" }} />
        <Typography component="span" sx={{ ...VIS_D.typography.bodySmall }}>
          Back to all products & solutions
        </Typography>
      </Link>
    </Box>
  );
}
