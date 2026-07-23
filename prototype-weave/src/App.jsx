import { useEffect, useMemo, useState } from "react";
import {
  ApplicationInfoSlot,
  Avatar,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CssBaseline,
  Divider,
  GlobalHeader,
  IconButton,
  InputAdornment,
  Link,
  MenuItem,
  Select,
  ServiceCenterSlot,
  Tab,
  TabContext,
  TabList,
  TabPanel,
  TextField,
  ThemeProvider,
  Typography,
  UserManagementSlot,
  createTheme,
  getTheme,
} from "@weave-mui/material";
import {
  buttonGroupKind,
  cardVariant,
  selectVariants,
  surfaceLevels,
  themes,
} from "@weave-mui/enums";
import {
  CaretDownS,
  CtaArrowRightS,
  DeviceDesktopS,
  NotificationS,
  SearchS,
} from "@weave-mui/icons-weave";
import AccountSearchField, { SearchFilterBar } from "./AccountSearchField.jsx";
import { ACCOUNT_NAV, PAGE_TABS, PRODUCTS } from "./data.js";
import AutodeskLogo from "./AutodeskLogo.jsx";
import ProductLockup from "./ProductLockup.jsx";
import { VIS_D } from "./visdTokens.js";

const FONT = VIS_D.font.element;

const tabListSx = {
  borderBottom: `1px solid ${VIS_D.colors.border}`,
  mb: `${VIS_D.spacing.sectionGap}px`,
  minHeight: 48,
  "& .MuiTab-root": {
    ...VIS_D.typography.label14Semi,
    textTransform: "none",
    color: VIS_D.colors.text,
    minHeight: 48,
    px: 2,
    py: "10px",
  },
  "& .MuiTab-root.Mui-selected": {
    color: VIS_D.colors.ink,
    fontWeight: 600,
  },
  "& .MuiTabs-indicator": {
    backgroundColor: VIS_D.colors.ink,
    height: 3,
  },
};

const headerSearchFieldSx = {
  "& .MuiOutlinedInput-root": {
    height: VIS_D.sizes.fieldHeight,
    borderRadius: `${VIS_D.radius.field}px`,
    bgcolor: VIS_D.colors.searchFillOnDark,
    color: "#fff",
    "& fieldset": { border: "none" },
  },
  "& .MuiInputBase-input::placeholder": {
    color: "rgba(255,255,255,0.45)",
  },
  "& .MuiSvgIcon-root": {
    color: "rgba(255,255,255,0.55)",
  },
};

function ProductCard({ product, onAction }) {
  return (
    <Card
      variant={cardVariant.OUTLINED}
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: VIS_D.sizes.cardMinHeight,
        height: "100%",
        borderRadius: `${VIS_D.radius.card}px`,
        border: `1px solid ${VIS_D.colors.border}`,
        boxShadow: "none",
        bgcolor: VIS_D.colors.background,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          p: `${VIS_D.spacing.cardPadding}px`,
          "&:last-child": { pb: `${VIS_D.spacing.cardPadding}px` },
        }}
      >
        <Box sx={{ mb: "16px" }}>
          <ProductLockup icon={product.icon} name={product.name} />
        </Box>

        {product.desktop && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              mb: "16px",
              color: VIS_D.colors.ink,
            }}
          >
            {(product.platforms || ["Windows"]).map((os) => (
              <DeviceDesktopS key={os} aria-label={os} sx={{ width: 18, height: 18 }} />
            ))}
          </Box>
        )}

        <Typography
          sx={{
            ...VIS_D.typography.bodyMedium,
            color: VIS_D.colors.textPrimary,
            mb: "24px",
            flex: 1,
          }}
        >
          {product.description}
        </Typography>

        {product.version && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "16px",
              mb: "24px",
            }}
          >
            {[
              ["Version", product.version],
              ["Platform", product.platform],
              ["Language", product.language],
            ].map(([label, value]) => (
              <Box key={label}>
                <Typography
                  sx={{
                    ...VIS_D.typography.smallprint,
                    color: VIS_D.colors.textMuted,
                    display: "block",
                    mb: "4px",
                  }}
                >
                  {label}
                </Typography>
                <Select
                  variant={selectVariants.BOX}
                  size="small"
                  fullWidth
                  value={value}
                  aria-label={`${label} for ${product.name}`}
                  sx={{
                    "& .MuiSelect-select": {
                      ...VIS_D.typography.compact,
                      py: "4px",
                    },
                  }}
                >
                  <MenuItem value={value}>{value}</MenuItem>
                </Select>
              </Box>
            ))}
          </Box>
        )}

        {product.desktop ? (
          <ButtonGroup kind={buttonGroupKind.SPLIT} fullWidth sx={{ mb: "8px" }}>
            <Button
              variant="contained"
              onClick={() => onAction(product.cta)}
              sx={{
                ...VIS_D.typography.label16Semi,
                borderRadius: `${VIS_D.radius.button}px`,
                py: "8px",
              }}
            >
              {product.cta}
            </Button>
            <Button variant="contained" aria-label="More download options" sx={{ px: 1.5 }}>
              <CaretDownS />
            </Button>
          </ButtonGroup>
        ) : (
          <Button
            variant="contained"
            fullWidth
            sx={{ mb: "8px", ...VIS_D.typography.label16Semi, py: "8px" }}
            onClick={() => onAction(product.cta)}
          >
            {product.cta}
          </Button>
        )}

        {product.installFootnote && (
          <Typography
            sx={{
              ...VIS_D.typography.smallprint,
              color: VIS_D.colors.textMuted,
              textAlign: "center",
              mb: "16px",
            }}
          >
            {product.installFootnote}
          </Typography>
        )}

        <Divider sx={{ borderColor: VIS_D.colors.divider, mb: "16px" }} />

        <Link
          component="button"
          underline="none"
          onClick={() => onAction(`View details — ${product.name}`)}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            ...VIS_D.typography.label14Semi,
            color: VIS_D.colors.ink,
            mt: "auto",
          }}
        >
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              border: `1px solid ${VIS_D.colors.border}`,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CtaArrowRightS sx={{ width: 12, height: 12 }} />
          </Box>
          View details
        </Link>
      </CardContent>
    </Card>
  );
}

export default function App() {
  const [theme, setTheme] = useState(null);
  const [tab, setTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    getTheme(themes.LIGHT_GRAY).then((base) => {
      setTheme(
        createTheme({
          ...base,
          palette: {
            ...base.palette,
            primary: {
              ...base.palette?.primary,
              main: VIS_D.colors.ink,
              contrastText: "#ffffff",
            },
            text: {
              ...base.palette?.text,
              primary: VIS_D.colors.ink,
              secondary: VIS_D.colors.textPrimary,
            },
            background: {
              ...base.palette?.background,
              default: VIS_D.colors.background,
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
          shape: {
            ...base.shape,
            borderRadius: VIS_D.radius.field,
          },
          components: {
            ...base.components,
            MuiCssBaseline: {
              styleOverrides: {
                body: {
                  fontFamily: FONT,
                  color: VIS_D.colors.ink,
                  backgroundColor: VIS_D.colors.background,
                },
              },
            },
            MuiGlobalHeader: {
              styleOverrides: {
                root: {
                  backgroundColor: VIS_D.colors.ink,
                  color: "#fff",
                  minHeight: VIS_D.sizes.globalHeaderHeight,
                  paddingLeft: "68px",
                  paddingRight: "68px",
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
                containedPrimary: {
                  backgroundColor: `${VIS_D.colors.ink} !important`,
                  color: "#ffffff !important",
                  boxShadow: "none !important",
                  "&:hover": { backgroundColor: "#222222 !important" },
                },
              },
            },
            MuiCard: {
              styleOverrides: {
                root: {
                  borderRadius: VIS_D.radius.card,
                  border: `1px solid ${VIS_D.colors.border}`,
                  boxShadow: "none",
                },
              },
            },
            MuiTab: {
              styleOverrides: {
                root: {
                  textTransform: "none",
                  minHeight: 48,
                  ...VIS_D.typography.label14Semi,
                  fontFamily: FONT,
                },
              },
            },
            MuiLink: {
              styleOverrides: {
                root: {
                  color: `${VIS_D.colors.ink} !important`,
                },
              },
            },
          },
        })
      );
    });
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return PRODUCTS;
    return PRODUCTS.filter((p) => p.name.toLowerCase().includes(q));
  }, [searchQuery]);

  if (!theme) {
    return (
      <Box sx={{ p: 4, fontFamily: FONT }}>
        Loading…
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ fontFamily: FONT, minHeight: "100vh", bgcolor: VIS_D.colors.background }}>
        <GlobalHeader surface={surfaceLevels.LEVEL_300}>
          <ApplicationInfoSlot>
            <AutodeskLogo />
          </ApplicationInfoSlot>

          <Box sx={{ width: 460, ml: 3, mr: "auto" }}>
            <TextField
              placeholder="Search"
              size="small"
              fullWidth
              aria-label="Search Autodesk"
              sx={headerSearchFieldSx}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchS sx={{ width: 16, height: 16 }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <ServiceCenterSlot>
            <IconButton aria-label="Notifications" size="small">
              <Badge
                badgeContent={1}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: VIS_D.colors.link,
                    color: "#fff",
                  },
                }}
              >
                <NotificationS sx={{ width: 20, height: 20 }} />
              </Badge>
            </IconButton>
          </ServiceCenterSlot>

          <UserManagementSlot>
            <Avatar sx={{ width: 28, height: 28 }} aria-label="User account" />
          </UserManagementSlot>
        </GlobalHeader>

        <Box
          component="nav"
          aria-label="Account"
          sx={{
            bgcolor: VIS_D.colors.ink,
            color: "#ffffff",
            display: "flex",
            alignItems: "stretch",
            px: "68px",
            minHeight: VIS_D.sizes.accountNavHeight,
            overflowX: "auto",
            boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            sx={{
              ...VIS_D.typography.headlineSmall,
              color: "#fff",
              lineHeight: "20px",
              py: "10px",
              pr: "32px",
              flexShrink: 0,
            }}
          >
            Account
          </Typography>
          {ACCOUNT_NAV.map((item) => {
            const active = item === "Products & solutions";
            return (
              <Box
                key={item}
                component="a"
                href="#"
                sx={{
                  color: "#fff",
                  textDecoration: "none",
                  ...VIS_D.typography.label14Semi,
                  px: "16px",
                  py: "10px",
                  whiteSpace: "nowrap",
                  bgcolor: active ? VIS_D.colors.navActive : "transparent",
                  borderTop: active ? "3px solid #fff" : "3px solid transparent",
                  display: "flex",
                  alignItems: "center",
                  "&:hover": {
                    bgcolor: active ? VIS_D.colors.navActive : "rgba(255,255,255,0.08)",
                  },
                }}
              >
                {item}
              </Box>
            );
          })}
        </Box>

        <Box
          sx={{
            px: "68px",
            pt: `${VIS_D.spacing.pageTop}px`,
            pb: 5,
          }}
        >
          <Typography component="h1" sx={{ ...VIS_D.typography.pageTitle, mb: `${VIS_D.spacing.blockGap}px` }}>
            Products & solutions
          </Typography>

          <TabContext value={tab}>
            <TabList
              onChange={(_e, value) => setTab(value)}
              aria-label="Products & solutions views"
              sx={tabListSx}
            >
              {PAGE_TABS.map((t) => (
                <Tab key={t.id} label={t.label} value={t.id} />
              ))}
            </TabList>

            <TabPanel value="all" sx={{ p: 0 }}>
              <Link
                href="#"
                sx={{
                  ...VIS_D.typography.bodySmall,
                  color: VIS_D.colors.ink,
                  textDecoration: "underline",
                  mb: `${VIS_D.spacing.sectionGap}px`,
                  display: "inline-block",
                }}
              >
                Can&apos;t find a product?
              </Link>

              <SearchFilterBar>
                <AccountSearchField
                  fullWidth
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{ flex: "none", width: "100%" }}
                />
              </SearchFilterBar>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)",
                  },
                  gap: `${VIS_D.spacing.cardGap}px`,
                  mb: `${VIS_D.spacing.blockGap + 8}px`,
                }}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onAction={setToast} />
                ))}
              </Box>
            </TabPanel>

            {PAGE_TABS.filter((t) => t.id !== "all").map((t) => (
              <TabPanel key={t.id} value={t.id} sx={{ p: 0 }}>
                <Link
                  href="#"
                  sx={{
                    ...VIS_D.typography.bodySmall,
                    color: VIS_D.colors.ink,
                    textDecoration: "underline",
                    mb: `${VIS_D.spacing.sectionGap}px`,
                    display: "inline-block",
                  }}
                >
                  Can&apos;t find a product?
                </Link>
                <Typography sx={{ ...VIS_D.typography.bodyMedium, color: VIS_D.colors.textPrimary }}>
                  {t.label} content (prototype placeholder)
                </Typography>
              </TabPanel>
            ))}
          </TabContext>
        </Box>

        {toast && (
          <Box
            role="status"
            sx={{
              position: "fixed",
              bottom: 24,
              left: "50%",
              transform: "translateX(-50%)",
              bgcolor: "grey.900",
              color: "#fff",
              px: 2,
              py: 1,
              borderRadius: 1,
              fontSize: "0.85rem",
              zIndex: 1400,
            }}
          >
            {toast}
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}
