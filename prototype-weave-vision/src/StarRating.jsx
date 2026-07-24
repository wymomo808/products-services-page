import { Box, Typography } from "@weave-mui/material";
import { FONT } from "./useAccountTheme.js";
import { VIS_D } from "./visdTokens.js";

function StarIcon({ filled = true, size = 14 }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 16 16"
      aria-hidden
      sx={{ width: size, height: size, display: "block", flexShrink: 0 }}
    >
      <path
        fill={filled ? VIS_D.colors.warning : VIS_D.colors.panel}
        stroke={filled ? "none" : VIS_D.colors.textLight}
        strokeWidth={filled ? 0 : 1}
        d="M8 1.2l1.96 3.97 4.38.64-3.17 3.09.75 4.36L8 11.9l-3.92 2.06.75-4.36-3.17-3.09 4.38-.64L8 1.2z"
      />
    </Box>
  );
}

export default function StarRating({ rating, reviewCount }) {
  if (rating === undefined) return null;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: "2px" }} aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, index) => (
          <StarIcon key={index} filled={index < Math.round(rating)} size={14} />
        ))}
      </Box>
      <Typography sx={{ ...VIS_D.typography.smallprint, fontFamily: FONT, fontWeight: 600, color: VIS_D.colors.ink }}>
        {rating.toFixed(1)}
      </Typography>
      {reviewCount !== undefined && (
        <Typography sx={{ ...VIS_D.typography.smallprint, fontFamily: FONT, color: VIS_D.colors.textLight }}>
          ({reviewCount})
        </Typography>
      )}
    </Box>
  );
}
