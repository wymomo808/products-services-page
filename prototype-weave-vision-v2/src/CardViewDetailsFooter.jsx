import { Box, Divider, Link, Typography } from "@weave-mui/material";
import { FigmaCtaArrowRight } from "./BillingIcons.jsx";
import { VIS_D } from "./visdTokens.js";

export default function CardViewDetailsFooter({ onClick }) {
  return (
    <Box sx={{ px: "24px", pb: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
      <Box sx={{ py: "8px" }}>
        <Divider sx={{ borderColor: VIS_D.colors.rowDivider }} />
      </Box>
      <Link
        component="button"
        underline="none"
        onClick={onClick}
        sx={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
      >
        <FigmaCtaArrowRight size={20} />
        <Typography
          component="span"
          sx={{
            fontFamily: VIS_D.font.element,
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: 1.5,
            color: VIS_D.colors.ink,
          }}
        >
          View details
        </Typography>
      </Link>
    </Box>
  );
}
