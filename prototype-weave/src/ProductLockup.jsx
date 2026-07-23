import { Box } from "@weave-mui/material";
import { FONT } from "./useAccountTheme.js";
import { VIS_D } from "./visdTokens.js";

/**
 * Product lockup — brand logo (image), a colored initial tile, or a Weave icon,
 * followed by the product name.
 * - `logoSrc`  : real colored product logo (Autodesk products)
 * - `tint`     : render a rounded initial tile in this color (3rd-party apps / agents)
 * - `icon`     : Weave icon component (fallback)
 */
export default function ProductLockup({
  icon: Icon,
  logoSrc,
  tint,
  abbr,
  name,
  size = 28,
  nameSize = 16,
  nameWeight = 800,
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "10px", minHeight: size }}>
      {logoSrc ? (
        <Box
          component="img"
          src={logoSrc}
          alt={`${name} logo`}
          sx={{ width: size, height: size, flexShrink: 0, objectFit: "contain" }}
        />
      ) : tint ? (
        <Box
          aria-hidden
          sx={{
            width: size,
            height: size,
            flexShrink: 0,
            borderRadius: "6px",
            bgcolor: tint,
            color: "#fff",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: VIS_D.font.element,
            fontWeight: 700,
            fontSize: size * 0.5,
            lineHeight: 1,
          }}
        >
          {abbr ?? name.charAt(0)}
        </Box>
      ) : (
        Icon && <Icon aria-hidden sx={{ width: 24, height: 24, flexShrink: 0 }} />
      )}
      <Box
        component="span"
        sx={{
          fontFamily: FONT,
          fontSize: `${nameSize}px`,
          fontWeight: nameWeight,
          lineHeight: 1.5,
          color: VIS_D.colors.ink,
          fontSynthesis: "none",
        }}
      >
        {name}
      </Box>
    </Box>
  );
}
