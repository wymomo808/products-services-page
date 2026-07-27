import { Box, Button, Typography } from "@weave-mui/material";
import { FigmaCtaArrowRight } from "./BillingIcons.jsx";
import { EXPLORE_MORE_SOLUTIONS } from "./data.js";
import { SolutionCarousel } from "./OrgApprovedSolutions.jsx";
import { FONT } from "./useAccountTheme.js";
import { VIS_D } from "./visdTokens.js";

const viewMoreButtonSx = {
  ...VIS_D.typography.label14Semi,
  fontFamily: FONT,
  textTransform: "none",
  color: VIS_D.colors.ink,
  borderColor: VIS_D.colors.ink,
  borderRadius: `${VIS_D.radius.button}px`,
  px: "16px",
  py: "8px",
  boxShadow: "none",
  gap: "8px",
  "&:hover": { borderColor: VIS_D.colors.ink, bgcolor: VIS_D.colors.searchFill, boxShadow: "none" },
};

export default function ExploreMoreSolutions({ onAction, onViewDetails, onViewMore }) {
  return (
    <Box component="section">
      <Box component="h2" sx={{ ...VIS_D.typography.sectionTitle, fontFamily: FONT, fontWeight: 800, mb: "8px" }}>
        Explore more solutions
      </Box>
      <Typography sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT, color: VIS_D.colors.textPrimary, mb: "24px" }}>
        These solutions are not approved for your company yet. Request approval to submit them for review. Once approved,
        you can get licenses and deploy them to your team.
      </Typography>

      <Box sx={{ mb: "24px" }}>
        <SolutionCarousel
          rows={EXPLORE_MORE_SOLUTIONS}
          onAction={onAction}
          onViewDetails={onViewDetails}
          ctaLabel="Request approval"
          visibleCount={4}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <Button
          variant="outlined"
          onClick={() => {
            if (onViewMore) {
              onViewMore();
              return;
            }
            onAction("View more — explore solutions");
          }}
          sx={viewMoreButtonSx}
          endIcon={<FigmaCtaArrowRight size={20} />}
        >
          View more
        </Button>
      </Box>
    </Box>
  );
}
