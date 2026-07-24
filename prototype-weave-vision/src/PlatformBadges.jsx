import { Box, Typography } from "@weave-mui/material";
import { CloudS } from "@weave-mui/icons-weave";
import { VIS_D } from "./visdTokens.js";

const glyphColor = VIS_D.colors.textLight; // rgba(0,0,0,0.6)

/** Windows four-pane glyph (~16px, monochrome). */
function WindowsGlyph() {
  return (
    <Box component="svg" viewBox="0 0 16 16" aria-hidden sx={{ width: 16, height: 16, display: "block" }}>
      <path
        fill={glyphColor}
        d="M0 2.25 6.75 1.3v6.2H0V2.25zM7.55 1.2 16 0v7.5H7.55V1.2zM0 8.5h6.75v6.2L0 13.75V8.5zM7.55 8.5H16V16l-8.45-1.2V8.5z"
      />
    </Box>
  );
}

/** Apple logo glyph (~13×16, monochrome). */
function AppleGlyph() {
  return (
    <Box component="svg" viewBox="0 0 14 16" aria-hidden sx={{ width: 13, height: 16, display: "block" }}>
      <path
        fill={glyphColor}
        d="M11.2 8.44c-.02-1.63 1.33-2.41 1.39-2.45-.76-1.11-1.94-1.26-2.36-1.28-1-.1-1.96.59-2.47.59-.51 0-1.3-.58-2.14-.56-1.1.02-2.12.64-2.68 1.62-1.15 1.99-.29 4.93.82 6.54.55.79 1.2 1.67 2.05 1.64.82-.03 1.13-.53 2.13-.53s1.28.53 2.14.51c.88-.01 1.44-.8 1.98-1.59.62-.91.88-1.79.89-1.84-.02-.01-1.71-.66-1.73-2.61zM9.6 3.62c.45-.55.76-1.31.67-2.07-.65.03-1.44.43-1.91.98-.42.48-.79 1.26-.69 2 .73.06 1.47-.37 1.93-.91z"
      />
    </Box>
  );
}

/** Platform availability row: Windows · Apple · "LINUX" · Cloud (per Figma spec). */
export default function PlatformBadges({ platforms = ["windows", "apple", "linux", "cloud"] }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "12px", height: 22 }}>
      {platforms.includes("windows") && <WindowsGlyph />}
      {platforms.includes("apple") && <AppleGlyph />}
      {platforms.includes("linux") && (
        <Typography
          component="span"
          sx={{
            fontFamily: VIS_D.font.element,
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "22px",
            color: glyphColor,
          }}
        >
          LINUX
        </Typography>
      )}
      {platforms.includes("cloud") && <CloudS sx={{ width: 16, height: 16, color: glyphColor }} />}
    </Box>
  );
}
