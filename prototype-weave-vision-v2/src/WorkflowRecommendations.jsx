import { Box, Button, Typography } from "@weave-mui/material";
import CardViewDetailsFooter from "./CardViewDetailsFooter.jsx";
import { ORG_CONTEXT, WORKFLOW_RECOMMENDATIONS } from "./data.js";
import ProductLockup from "./ProductLockup.jsx";
import StarRating from "./StarRating.jsx";
import { SecurityReviewedBadge } from "./TrustBadges.jsx";
import { FONT } from "./useAccountTheme.js";
import { VIS_D } from "./visdTokens.js";

const sectionTitleSx = {
  ...VIS_D.typography.sectionTitle,
  fontFamily: FONT,
  fontWeight: 800,
  fontSynthesis: "none",
  mb: "8px",
};

function WorksWithChip({ label }) {
  return (
    <Box
      component="span"
      sx={{
        ...VIS_D.typography.smallprint,
        color: VIS_D.colors.text,
        bgcolor: VIS_D.colors.panel,
        borderRadius: "4px",
        px: "8px",
        py: "2px",
      }}
    >
      {label}
    </Box>
  );
}

function WorkflowRecommendationCard({ rec, onAction, onViewDetails, ctaLabel = "Buy" }) {
  const showSecurityBadge = rec.trust?.includes("Security reviewed");
  const accent = rec.tint ?? VIS_D.colors.accent;

  return (
    <Box
      sx={{
        bgcolor: VIS_D.colors.background,
        borderRadius: `${VIS_D.radius.card}px`,
        boxShadow: `inset 0 0 0 1px ${VIS_D.colors.border}`,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        transition: "box-shadow 0.15s ease",
        "&:hover": {
          boxShadow: `inset 0 0 0 1px rgba(0, 0, 0, 0.18), 0 4px 16px rgba(0, 0, 0, 0.06)`,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          gap: "16px",
          p: "24px",
          borderLeft: `3px solid ${accent}`,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <ProductLockup tint={rec.tint} name={rec.name} size={32} nameSize={18} nameWeight={700} />

          <StarRating rating={rec.rating} reviewCount={rec.reviewCount} />

          {(showSecurityBadge || (rec.worksWith || []).length) ? (
            <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px" }}>
              {showSecurityBadge ? <SecurityReviewedBadge /> : null}
              {(rec.worksWith || []).map((label) => (
                <WorksWithChip key={label} label={label} />
              ))}
            </Box>
          ) : null}
        </Box>

        <Typography sx={{ ...VIS_D.typography.bodySmall, color: VIS_D.colors.textPrimary, flex: 1, m: 0 }}>
          {rec.blurb}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            pt: "16px",
            mt: "auto",
            borderTop: `1px solid ${VIS_D.colors.rowDivider}`,
          }}
        >
          <Typography sx={{ ...VIS_D.typography.headlineSmall, fontFamily: FONT, fontWeight: 800 }}>
            {rec.price}
          </Typography>
          <Button
            variant="contained"
            onClick={() => onAction(`${ctaLabel} — ${rec.name}`)}
            sx={{
              ...VIS_D.typography.label14Semi,
              fontFamily: FONT,
              textTransform: "none",
              bgcolor: VIS_D.colors.ink,
              color: "#fff",
              boxShadow: "none",
              borderRadius: `${VIS_D.radius.button}px`,
              minWidth: 88,
              px: "20px",
              "&:hover": { bgcolor: "#222", boxShadow: "none" },
            }}
          >
            {ctaLabel}
          </Button>
        </Box>
      </Box>

      <CardViewDetailsFooter
        onClick={() => {
          if (onViewDetails) {
            onViewDetails(rec);
            return;
          }
          onAction(`View details — ${rec.name}`);
        }}
      />
    </Box>
  );
}

export default function WorkflowRecommendations({ onAction, onViewDetails, ctaLabel = "Buy" }) {
  return (
    <Box component="section" sx={{ mb: "48px" }}>
      <Box sx={{ mb: "24px" }}>
        <Typography
          sx={{
            ...VIS_D.typography.smallprint,
            fontWeight: 600,
            color: VIS_D.colors.textLight,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            mb: "6px",
          }}
        >
          Personalized
        </Typography>
        <Box component="h2" sx={sectionTitleSx}>
          Recommended for your workflows
        </Box>
        <Typography
          sx={{
            ...VIS_D.typography.bodyMedium,
            fontFamily: FONT,
            color: VIS_D.colors.textPrimary,
            maxWidth: "720px",
          }}
        >
          Based on {ORG_CONTEXT.industry.toLowerCase()}, your role as {ORG_CONTEXT.role}, and products you use (
          {ORG_CONTEXT.ownedProducts.join(", ")}).
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
          gap: "16px",
        }}
      >
        {WORKFLOW_RECOMMENDATIONS.map((rec) => (
          <WorkflowRecommendationCard
            key={rec.id}
            rec={rec}
            onAction={onAction}
            onViewDetails={onViewDetails}
            ctaLabel={ctaLabel}
          />
        ))}
      </Box>
    </Box>
  );
}
