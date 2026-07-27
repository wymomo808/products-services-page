import { Box, Button, InputAdornment, TextField } from "@weave-mui/material";
import { SearchS } from "@weave-mui/icons-weave";
import { FONT } from "./useAccountTheme.js";
import { VIS_D } from "./visdTokens.js";

/** Page-level search input — Billing VisD search filter bar. */
export const accountSearchFieldSx = {
  flex: 1,
  minWidth: 200,
  "& .MuiOutlinedInput-root": {
    height: VIS_D.sizes.fieldHeight,
    borderRadius: `${VIS_D.radius.field}px`,
    bgcolor: VIS_D.colors.searchFill,
    fontFamily: FONT,
    fontSize: VIS_D.typography.bodyMedium.fontSize,
    fontWeight: VIS_D.typography.bodyMedium.fontWeight,
    lineHeight: VIS_D.typography.bodyMedium.lineHeight,
    "& fieldset": { border: "none" },
    "&:hover fieldset": { border: "none" },
    "&.Mui-focused fieldset": { border: "none" },
  },
  "& .MuiInputBase-input": {
    py: 0,
  },
  "& .MuiInputBase-input::placeholder": {
    color: VIS_D.colors.textLight,
    opacity: 1,
  },
  "& .MuiInputAdornment-root .MuiSvgIcon-root": {
    color: VIS_D.colors.textLight,
  },
};

/** Outlined toolbar button — Filter / Actions in the search filter bar. */
export const filterBarButtonSx = {
  ...VIS_D.typography.label14Semi,
  fontFamily: FONT,
  color: VIS_D.colors.ink,
  borderColor: VIS_D.colors.ink,
  borderRadius: `${VIS_D.radius.button}px`,
  height: VIS_D.sizes.fieldHeight,
  textTransform: "none",
  flexShrink: 0,
  bgcolor: VIS_D.colors.background,
  boxShadow: "none",
  "&:hover": { borderColor: VIS_D.colors.ink, bgcolor: "transparent", boxShadow: "none" },
};

/** Full-width bordered toolbar: left controls + optional right actions. */
export const searchFilterBarSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "16px",
  border: `1px solid ${VIS_D.colors.border}`,
  borderRadius: `${VIS_D.radius.filters}px`,
  bgcolor: VIS_D.colors.background,
  p: "16px",
  mb: "24px",
};

export function SearchFilterBar({ children, actions, sx }) {
  return (
    <Box sx={{ ...searchFilterBarSx, ...sx }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, minWidth: 0 }}>
        {children}
      </Box>
      {actions ?? null}
    </Box>
  );
}

export default function AccountSearchField({ sx, InputProps, ...props }) {
  return (
    <TextField
      placeholder="Search"
      size="small"
      sx={{ ...accountSearchFieldSx, ...sx }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchS sx={{ width: 16, height: 16 }} />
          </InputAdornment>
        ),
        ...InputProps,
      }}
      {...props}
    />
  );
}

/** Outlined filter button for use inside SearchFilterBar. */
export function FilterBarButton({ children, sx, ...props }) {
  return (
    <Button variant="outlined" sx={{ ...filterBarButtonSx, ...sx }} {...props}>
      {children}
    </Button>
  );
}

/** Outlined actions dropdown button for use inside SearchFilterBar. */
export function ActionsBarButton({ children, sx, ...props }) {
  return (
    <Button variant="outlined" sx={{ ...filterBarButtonSx, ...sx }} {...props}>
      {children}
    </Button>
  );
}
