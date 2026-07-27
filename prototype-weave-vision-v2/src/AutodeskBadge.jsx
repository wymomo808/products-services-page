import { Box } from "@weave-mui/material";

const AUTODESK_SYMBOL = "./logos/autodesk-symbol.png";

/** Corner badge — Autodesk symbol mark. */
export default function AutodeskBadge() {
  return (
    <Box
      component="img"
      src={AUTODESK_SYMBOL}
      alt="Autodesk"
      sx={{ display: "block", height: 18, width: "auto" }}
    />
  );
}
