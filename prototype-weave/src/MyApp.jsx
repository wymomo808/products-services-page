import { Box, Button, Typography } from "@weave-mui/material";
import { VIS_D } from "./visdTokens.js";

export default function MyApp({ onAction }) {
  return (
    <Box>
      <Typography sx={{ ...VIS_D.typography.pageTitle, fontSize: "24px", mb: "4px" }}>
        My app
      </Typography>
      <Typography
        sx={{
          ...VIS_D.typography.bodyMedium,
          color: VIS_D.colors.textPrimary,
          mb: `${VIS_D.spacing.sectionGap}px`,
          maxWidth: 640,
        }}
      >
        A dedicated workspace for My app within Products & solutions. Extend this view with
        fulfillment flows, settings, or integrations as the design evolves.
      </Typography>
      <Button variant="contained" onClick={() => onAction?.("My app — Get started")}>
        Get started
      </Button>
    </Box>
  );
}
