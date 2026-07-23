import { useEffect, useState } from "react";
import { createTheme, getTheme } from "@weave-mui/material";
import { themes } from "@weave-mui/enums";
import { VIS_D } from "./visdTokens.js";

export const FONT = VIS_D.font.element;
export const PAGE_X = "72px";

export function useAccountTheme() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    getTheme(themes.LIGHT_GRAY).then((base) => {
      setTheme(
        createTheme({
          ...base,
          palette: {
            ...base.palette,
            primary: { ...base.palette?.primary, main: VIS_D.colors.ink, contrastText: "#ffffff" },
            text: { ...base.palette?.text, primary: VIS_D.colors.ink, secondary: VIS_D.colors.textPrimary },
            background: {
              ...base.palette?.background,
              default: VIS_D.colors.backgroundPanel,
              paper: VIS_D.colors.background,
            },
            divider: VIS_D.colors.border,
          },
          typography: {
            ...base.typography,
            fontFamily: FONT,
            body1: { ...VIS_D.typography.bodyMedium, fontFamily: FONT },
            body2: { ...VIS_D.typography.bodySmall, fontFamily: FONT },
            h1: { ...VIS_D.typography.pageTitle, fontFamily: FONT },
          },
          shape: { ...base.shape, borderRadius: VIS_D.radius.field },
          components: {
            ...base.components,
            MuiCssBaseline: {
              styleOverrides: {
                body: { fontFamily: FONT, color: VIS_D.colors.ink, backgroundColor: VIS_D.colors.backgroundPanel },
              },
            },
            MuiGlobalHeader: {
              styleOverrides: {
                root: {
                  backgroundColor: VIS_D.colors.ink,
                  color: "#fff",
                  minHeight: VIS_D.sizes.globalHeaderHeight,
                  paddingLeft: PAGE_X,
                  paddingRight: PAGE_X,
                  "& .MuiTextField-root": {
                    width: 460,
                    maxWidth: "100%",
                    "& .MuiOutlinedInput-root, & .MuiFilledInput-root": {
                      height: VIS_D.sizes.fieldHeight,
                      borderRadius: `${VIS_D.radius.field}px`,
                      bgcolor: VIS_D.colors.searchFillOnDark,
                      color: "#fff",
                      "& fieldset": { border: "none" },
                      "&:before, &:after": { display: "none" },
                    },
                    "& .MuiInputBase-input::placeholder": { color: "rgba(255,255,255,0.45)" },
                    "& .MuiSvgIcon-root": { color: "rgba(255,255,255,0.55)" },
                  },
                  "& .ComposableSlotContainer-end-section > .MuiBox-root:first-of-type": {
                    display: "none",
                  },
                },
              },
            },
            MuiButton: {
              ...base.components?.MuiButton,
              styleOverrides: {
                ...base.components?.MuiButton?.styleOverrides,
                contained: {
                  backgroundColor: `${VIS_D.colors.ink} !important`,
                  color: "#ffffff !important",
                  boxShadow: "none !important",
                  "&:hover": { backgroundColor: "#222222 !important" },
                },
              },
            },
            MuiLink: { styleOverrides: { root: { color: `${VIS_D.colors.ink} !important` } } },
          },
        })
      );
    });
  }, []);

  return theme;
}
