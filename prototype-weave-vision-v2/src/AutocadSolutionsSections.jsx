import { Box, Typography } from "@weave-mui/material";
import OrgApprovedSolutions from "./OrgApprovedSolutions.jsx";
import ProductCarousel from "./ProductCarousel.jsx";
import { FONT } from "./useAccountTheme.js";
import { VIS_D } from "./visdTokens.js";

const sectionTitleSx = {
  ...VIS_D.typography.sectionTitle,
  fontFamily: FONT,
  fontWeight: 800,
  mb: "8px",
};

const eyebrowSx = {
  ...VIS_D.typography.smallprint,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  mb: "6px",
};

export function getDiscoverAutocadDescription(isUserView) {
  return isUserView
    ? "Browse apps, agents, and integrations that work with AutoCAD. Request a seat for org-approved solutions or request approval for solutions not yet available to your company."
    : "Browse apps, agents, and integrations that work with AutoCAD. Buy licenses for org-approved solutions or request approval for solutions not yet available to your company.";
}

export function YourAutocadSolutionsSection({
  products,
  isUserView,
  productName = "AutoCAD",
  onAction,
  onViewDetails,
  sx,
}) {
  if (!products.length) return null;

  return (
    <Box
      component="section"
      sx={{
        mt: "40px",
        bgcolor: VIS_D.colors.backgroundPanel,
        borderRadius: `${VIS_D.radius.card}px`,
        border: `1px solid ${VIS_D.colors.border}`,
        p: { xs: "20px", md: "28px" },
        ...sx,
      }}
    >
      <Typography sx={{ ...eyebrowSx, color: VIS_D.colors.textPrimary }}>
        {isUserView ? "Assigned to you" : "Assigned to your team"}
      </Typography>
      <Box component="h2" sx={sectionTitleSx}>
        Your {productName} solutions
      </Box>
      <Typography
        sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT, color: VIS_D.colors.textPrimary, mb: "24px" }}
      >
        {isUserView
          ? `Apps, agents, and integrations assigned to you that work with ${productName}.`
          : `Apps, agents, and integrations assigned to your team that work with ${productName}.`}
      </Typography>
      <ProductCarousel
        products={products}
        onAction={onAction}
        onViewDetails={onViewDetails}
        visibleCount={4}
        hideDeployedBadge={isUserView}
      />
    </Box>
  );
}

export function DiscoverAutocadSolutionsSection({
  rows,
  isUserView,
  onAction,
  onViewDetails,
  onViewOrgApproved,
  sx,
}) {
  return (
    <Box
      component="section"
      sx={{
        mt: "48px",
        pt: "32px",
        borderTop: `3px solid ${VIS_D.colors.accent}`,
        ...sx,
      }}
    >
      <Typography sx={{ ...eyebrowSx, color: VIS_D.colors.accent }}>
        Marketplace
      </Typography>
      <OrgApprovedSolutions
        onAction={onAction}
        onViewDetails={onViewDetails}
        rowsOverride={rows}
        layout="carousel"
        onViewMore={onViewOrgApproved}
        title="Discover more solutions for AutoCAD"
        description={getDiscoverAutocadDescription(isUserView)}
      />
    </Box>
  );
}
