import { useEffect, useMemo, useState } from "react";
import {
  ApplicationInfoSlot,
  Avatar,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  CssBaseline,
  GlobalHeader,
  IconButton,
  InputAdornment,
  Link,
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
import { surfaceLevels, themes } from "@weave-mui/enums";
import {
  CaretDownS,
  EditS,
  FilterS,
  MoreVerticalS,
  NotificationS,
  SearchS,
} from "@weave-mui/icons-weave";
import AccountSearchField, { FilterBarButton, SearchFilterBar } from "./AccountSearchField.jsx";
import { HUB, HUB_NAV, HUB_PROJECTS } from "./data.js";
import AutodeskLogo from "./AutodeskLogo.jsx";
import { VIS_D } from "./visdTokens.js";

const FONT = VIS_D.font.element;
const PAGE_X = "68px";

const FOOTER_LINKS = [
  "Privacy settings",
  "Do not sell my personal information",
  "Cookie preferences",
  "Report Noncompliance",
  "Terms of use",
];

const headerSearchFieldSx = {
  "& .MuiOutlinedInput-root": {
    height: VIS_D.sizes.fieldHeight,
    borderRadius: `${VIS_D.radius.field}px`,
    bgcolor: VIS_D.colors.searchFillOnDark,
    color: "#fff",
    "& fieldset": { border: "none" },
  },
  "& .MuiInputBase-input::placeholder": { color: "rgba(255,255,255,0.45)" },
  "& .MuiSvgIcon-root": { color: "rgba(255,255,255,0.55)" },
};

const eyebrowSx = {
  ...VIS_D.typography.label14Semi,
  fontSize: "12px",
  fontWeight: 600,
  letterSpacing: "0.5px",
  textTransform: "uppercase",
  color: VIS_D.colors.textLight,
};

const fieldLabelSx = { ...VIS_D.typography.label14Semi, color: VIS_D.colors.ink };

const valueTextSx = { ...VIS_D.typography.bodySmall, color: VIS_D.colors.text };

// Table column layout: checkbox | Name | Admins | Members | Status | Advanced AI | Actions
const GRID_COLS = "40px 1.4fr 1.4fr 0.8fr 0.8fr 1fr 120px";

/** Small caps status pill text ("ENABLED"/"DISABLED") with optional warning dot. */
function AiStatus({ enabled, count }) {
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
      <Typography
        component="span"
        sx={{
          ...VIS_D.typography.smallprint,
          fontWeight: 600,
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          color: enabled ? VIS_D.colors.ink : VIS_D.colors.textLight,
        }}
      >
        {enabled ? "Enabled" : "Disabled"}
      </Typography>
      {enabled &&
        (count != null ? (
          <Box
            sx={{
              minWidth: 20,
              height: 20,
              px: "6px",
              borderRadius: "10px",
              bgcolor: VIS_D.colors.warning,
              color: VIS_D.colors.ink,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            {count}
          </Box>
        ) : (
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              bgcolor: VIS_D.colors.warning,
            }}
          />
        ))}
    </Box>
  );
}

function InfoCard({ children, sx }) {
  return (
    <Box
      sx={{
        border: `1px solid ${VIS_D.colors.border}`,
        borderRadius: `${VIS_D.radius.card}px`,
        bgcolor: VIS_D.colors.background,
        p: "20px 24px",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export default function HubDetail() {
  const [theme, setTheme] = useState(null);
  const [tab, setTab] = useState("projects");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(() => new Set());
  const [toast, setToast] = useState("");

  useEffect(() => {
    getTheme(themes.LIGHT_GRAY).then((base) => {
      setTheme(
        createTheme({
          ...base,
          palette: {
            ...base.palette,
            primary: { ...base.palette?.primary, main: VIS_D.colors.ink, contrastText: "#ffffff" },
            text: { ...base.palette?.text, primary: VIS_D.colors.ink, secondary: VIS_D.colors.textPrimary },
            background: { ...base.palette?.background, default: VIS_D.colors.background, paper: VIS_D.colors.background },
            divider: VIS_D.colors.border,
          },
          typography: {
            ...base.typography,
            fontFamily: FONT,
            body1: { ...VIS_D.typography.bodyMedium, fontFamily: FONT },
            body2: { ...VIS_D.typography.bodySmall, fontFamily: FONT },
          },
          shape: { ...base.shape, borderRadius: VIS_D.radius.field },
          components: {
            ...base.components,
            MuiCssBaseline: {
              styleOverrides: {
                body: { fontFamily: FONT, color: VIS_D.colors.ink, backgroundColor: VIS_D.colors.background },
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
                },
              },
            },
            MuiLink: { styleOverrides: { root: { color: `${VIS_D.colors.ink} !important` } } },
          },
        })
      );
    });
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const t = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(t);
  }, [toast]);

  const projects = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return HUB_PROJECTS;
    return HUB_PROJECTS.filter(
      (p) => p.name.toLowerCase().includes(q) || p.admin.toLowerCase().includes(q)
    );
  }, [query]);

  const allSelected = projects.length > 0 && projects.every((p) => selected.has(p.id));
  const someSelected = projects.some((p) => selected.has(p.id)) && !allSelected;

  const toggleAll = () =>
    setSelected(() => (allSelected ? new Set() : new Set(projects.map((p) => p.id))));

  const toggleOne = (id) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  if (!theme) {
    return <Box sx={{ p: 4, fontFamily: FONT }}>Loading…</Box>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          fontFamily: FONT,
          minHeight: "100vh",
          bgcolor: VIS_D.colors.background,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Global header */}
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
                variant="dot"
                sx={{ "& .MuiBadge-badge": { backgroundColor: VIS_D.colors.link } }}
              >
                <NotificationS sx={{ width: 20, height: 20 }} />
              </Badge>
            </IconButton>
          </ServiceCenterSlot>
          <UserManagementSlot>
            <Avatar sx={{ width: 28, height: 28, bgcolor: VIS_D.colors.accent, fontSize: "12px" }}>
              AD
            </Avatar>
          </UserManagementSlot>
        </GlobalHeader>

        {/* Account nav */}
        <Box
          component="nav"
          aria-label="Account"
          sx={{
            bgcolor: VIS_D.colors.ink,
            color: "#fff",
            display: "flex",
            alignItems: "stretch",
            px: PAGE_X,
            minHeight: VIS_D.sizes.accountNavHeight,
            overflowX: "auto",
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
          {HUB_NAV.map((item) => {
            const active = item === "Hubs and Projects";
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
                  display: "flex",
                  alignItems: "center",
                  bgcolor: active ? VIS_D.colors.navActive : "transparent",
                  borderTop: active ? "3px solid #fff" : "3px solid transparent",
                  "&:hover": { bgcolor: active ? VIS_D.colors.navActive : "rgba(255,255,255,0.08)" },
                }}
              >
                {item}
              </Box>
            );
          })}
        </Box>

        {/* Content */}
        <Box sx={{ px: PAGE_X, pt: "20px", pb: "48px", flex: 1 }}>
          <Breadcrumbs
            separator="/"
            aria-label="breadcrumb"
            sx={{ mb: "20px", "& .MuiBreadcrumbs-separator": { color: VIS_D.colors.textLight } }}
          >
            <Link href="#" underline="hover" sx={{ ...VIS_D.typography.bodySmall }}>
              Hubs and Projects
            </Link>
            <Typography sx={{ ...VIS_D.typography.bodySmall, color: VIS_D.colors.text }}>
              {HUB.name}
            </Typography>
          </Breadcrumbs>

          {/* Page header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 2,
              mb: "24px",
            }}
          >
            <Typography component="h1" sx={{ ...VIS_D.typography.pageTitle, fontSize: "28px" }}>
              {HUB.name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
              {HUB.entitlements.map((e, i) => (
                <Box key={e} sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  {i > 0 && <Typography sx={{ color: VIS_D.colors.textLight }}>•</Typography>}
                  <Link href="#" underline="always" sx={{ ...VIS_D.typography.label14Semi }}>
                    {e}
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Info cards */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: "24px",
              mb: "24px",
            }}
          >
            <InfoCard>
              <Typography sx={{ ...eyebrowSx, mb: "12px" }}>Hub Details</Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: "88px 1fr", rowGap: "8px", columnGap: "12px" }}>
                <Typography sx={fieldLabelSx}>Admins</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {HUB.admins.map((name, i) => (
                    <Typography key={name} component="span" sx={valueTextSx}>
                      <Link href="#" underline="always" sx={valueTextSx}>
                        {name}
                      </Link>
                      {i < HUB.admins.length - 1 ? "," : ""}
                    </Typography>
                  ))}
                </Box>
                <Typography sx={fieldLabelSx}>Region</Typography>
                <Typography sx={valueTextSx}>{HUB.region}</Typography>
              </Box>
            </InfoCard>

            <InfoCard>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: "12px" }}>
                <Typography sx={eyebrowSx}>AI Settings</Typography>
                <Link
                  component="button"
                  underline="hover"
                  onClick={() => setToast("Edit AI settings")}
                  sx={{ ...VIS_D.typography.label14Semi, display: "inline-flex", alignItems: "center", gap: "4px" }}
                >
                  <EditS sx={{ width: 14, height: 14 }} />
                  Edit
                </Link>
              </Box>
              <Box sx={{ display: "grid", gridTemplateColumns: "160px 1fr", rowGap: "8px", columnGap: "12px", alignItems: "center" }}>
                <Typography sx={fieldLabelSx}>Advanced Features</Typography>
                <AiStatus enabled={HUB.ai.advancedFeatures} />
                <Typography sx={fieldLabelSx}>Project Overrides</Typography>
                <AiStatus enabled={HUB.ai.projectOverrides} count={HUB.ai.projectOverridesCount} />
              </Box>
            </InfoCard>
          </Box>

          {/* Tabs */}
          <TabContext value={tab}>
            <TabList
              onChange={(_e, v) => setTab(v)}
              aria-label="Hub views"
              sx={{
                borderBottom: `1px solid ${VIS_D.colors.border}`,
                mb: "24px",
                minHeight: 44,
                "& .MuiTab-root": {
                  ...VIS_D.typography.label14Semi,
                  textTransform: "none",
                  color: VIS_D.colors.textLight,
                  minHeight: 44,
                  px: 2,
                },
                "& .MuiTab-root.Mui-selected": { color: VIS_D.colors.ink },
                "& .MuiTabs-indicator": { backgroundColor: VIS_D.colors.ink, height: 3 },
              }}
            >
              <Tab label="Projects" value="projects" />
              <Tab label="Members" value="members" />
            </TabList>

            <TabPanel value="projects" sx={{ p: 0 }}>
              <SearchFilterBar>
                <AccountSearchField value={query} onChange={(e) => setQuery(e.target.value)} />
                <FilterBarButton
                  startIcon={<FilterS sx={{ width: 16, height: 16 }} />}
                  onClick={() => setToast("Filter")}
                >
                  Filter
                </FilterBarButton>
              </SearchFilterBar>

              {/* Projects panel */}
              <Box
                sx={{
                  border: `1px solid ${VIS_D.colors.border}`,
                  borderRadius: `${VIS_D.radius.card}px`,
                  overflow: "hidden",
                }}
              >
                {/* Panel header */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                    bgcolor: VIS_D.colors.panel,
                    px: "24px",
                    py: "16px",
                    borderBottom: `1px solid ${VIS_D.colors.border}`,
                  }}
                >
                  <Typography sx={{ ...VIS_D.typography.headlineSmall, fontSize: "18px" }}>
                    Projects ({projects.length})
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <Typography sx={{ ...VIS_D.typography.bodySmall, color: VIS_D.colors.textLight }}>
                      {selected.size} selected
                    </Typography>
                    <Box sx={{ width: "1px", height: 24, bgcolor: VIS_D.colors.border }} />
                    <Button
                      variant="outlined"
                      disabled={selected.size === 0}
                      onClick={() => setToast(`Update AI Setting for ${selected.size} project(s)`)}
                      sx={{
                        ...VIS_D.typography.label14Semi,
                        textTransform: "none",
                        borderRadius: `${VIS_D.radius.button}px`,
                        borderColor: VIS_D.colors.border,
                        color: VIS_D.colors.ink,
                        height: 36,
                      }}
                    >
                      Update AI Setting
                    </Button>
                  </Box>
                </Box>

                {/* Table header */}
                <Box
                  role="row"
                  sx={{
                    display: "grid",
                    gridTemplateColumns: GRID_COLS,
                    alignItems: "center",
                    px: "24px",
                    py: "12px",
                    borderBottom: `1px solid ${VIS_D.colors.border}`,
                  }}
                >
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={toggleAll}
                    aria-label="Select all projects"
                    sx={{ p: 0, ml: "-2px" }}
                  />
                  {["Name", "Admins", "Members", "Status", "Advanced AI", ""].map((h, i) => (
                    <Typography
                      key={h || `col-${i}`}
                      sx={{ ...VIS_D.typography.label14Semi, color: VIS_D.colors.ink }}
                    >
                      {h}
                    </Typography>
                  ))}
                </Box>

                {/* Table rows */}
                {projects.map((p) => (
                  <Box
                    key={p.id}
                    role="row"
                    sx={{
                      display: "grid",
                      gridTemplateColumns: GRID_COLS,
                      alignItems: "center",
                      px: "24px",
                      py: "16px",
                      borderBottom: `1px solid ${VIS_D.colors.rowDivider}`,
                      "&:last-of-type": { borderBottom: "none" },
                      bgcolor: selected.has(p.id) ? "rgba(95,96,255,0.04)" : "transparent",
                    }}
                  >
                    <Checkbox
                      checked={selected.has(p.id)}
                      onChange={() => toggleOne(p.id)}
                      aria-label={`Select ${p.name}`}
                      sx={{ p: 0, ml: "-2px" }}
                    />
                    <Typography sx={{ ...VIS_D.typography.bodySmall, color: VIS_D.colors.ink, fontWeight: 600 }}>
                      {p.name}
                    </Typography>
                    <Typography sx={valueTextSx}>{p.admin}</Typography>
                    <Typography sx={valueTextSx}>{p.members.toLocaleString()}</Typography>
                    <Typography sx={valueTextSx}>{p.status}</Typography>
                    <AiStatus enabled={p.advancedAi} />
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Link
                        component="button"
                        underline="none"
                        onClick={() => setToast(`Actions — ${p.name}`)}
                        sx={{
                          ...VIS_D.typography.label14Semi,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        Actions
                        <CaretDownS sx={{ width: 14, height: 14 }} />
                      </Link>
                    </Box>
                  </Box>
                ))}
              </Box>
            </TabPanel>

            <TabPanel value="members" sx={{ p: 0 }}>
              <Typography sx={{ ...VIS_D.typography.bodyMedium, color: VIS_D.colors.textPrimary }}>
                Members content (prototype placeholder)
              </Typography>
            </TabPanel>
          </TabContext>
        </Box>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            bgcolor: VIS_D.colors.footerBg,
            px: PAGE_X,
            py: "16px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "6px",
          }}
        >
          {FOOTER_LINKS.map((label) => (
            <Box key={label} sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Link href="#" underline="hover" sx={{ ...VIS_D.typography.smallprint, color: VIS_D.colors.text }}>
                {label}
              </Link>
              <Typography sx={{ ...VIS_D.typography.smallprint, color: VIS_D.colors.textLight }}>|</Typography>
            </Box>
          ))}
          <Typography sx={{ ...VIS_D.typography.smallprint, color: VIS_D.colors.text }}>
            © 2021 Autodesk Inc. All rights reserved
          </Typography>
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
