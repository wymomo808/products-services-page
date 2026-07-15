import { Box, Typography } from "@weave-mui/material";
import { VIS_D } from "./visdTokens.js";

/** Product lockup — 254×27 product-center card size from Figma VisD. */
export default function ProductLockup({ icon: Icon, name }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        minHeight: 27,
      }}
    >
      <Icon aria-hidden sx={{ width: 24, height: 24, flexShrink: 0 }} />
      <Typography component="span" sx={VIS_D.typography.headlineSmall}>
        {name}
      </Typography>
    </Box>
  );
}
