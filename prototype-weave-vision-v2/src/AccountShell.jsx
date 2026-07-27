import {
  ApplicationInfoSlot,
  Avatar,
  Badge,
  Box,
  CssBaseline,
  GlobalHeader,
  IconButton,
  ServiceCenterSlot,
  ThemeProvider,
  Typography,
  UserManagementSlot,
} from "@weave-mui/material";
import { surfaceLevels } from "@weave-mui/enums";
import { NotificationS } from "@weave-mui/icons-weave";
import { ACCOUNT_NAV } from "./data.js";
import AutodeskLogo from "./AutodeskLogo.jsx";
import { FONT, PAGE_X } from "./useAccountTheme.js";
import { VIS_D } from "./visdTokens.js";

const FOOTER_LINKS = [
  "Privacy settings",
  "Do not sell my personal information",
  "Cookie preferences",
  "Report Noncompliance",
  "Terms of use",
];

const NAV_ROUTES = {
  "Products & solutions": "products-and-solutions",
  "User Management": "user-management",
  "Billing and orders": "billing-and-orders",
};

export default function AccountShell({ theme, activeNav, onNavigate, children, toast }) {
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
      <Box sx={{ fontFamily: FONT, minHeight: "100vh", bgcolor: VIS_D.colors.backgroundPanel, display: "flex", flexDirection: "column" }}>
        <GlobalHeader surface={surfaceLevels.LEVEL_300}>
          <ApplicationInfoSlot>
            <AutodeskLogo />
          </ApplicationInfoSlot>
          <ServiceCenterSlot>
            <IconButton aria-label="Notifications" size="small">
              <Badge variant="dot" sx={{ "& .MuiBadge-badge": { backgroundColor: VIS_D.colors.link } }}>
                <NotificationS sx={{ width: 20, height: 20 }} />
              </Badge>
            </IconButton>
          </ServiceCenterSlot>
          <UserManagementSlot>
            <Avatar sx={{ width: 28, height: 28, bgcolor: VIS_D.colors.accent, fontSize: "12px" }}>AD</Avatar>
          </UserManagementSlot>
        </GlobalHeader>

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
          {ACCOUNT_NAV.map((item) => {
            const active = item === activeNav;
            const route = NAV_ROUTES[item];
            return (
              <Box
                key={item}
                component="a"
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  if (route && onNavigate) onNavigate(route);
                }}
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

        {children}

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
              <Box
                component="a"
                href="#"
                sx={{
                  ...VIS_D.typography.smallprint,
                  color: VIS_D.colors.text,
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {label}
              </Box>
              <Typography sx={{ ...VIS_D.typography.smallprint, color: VIS_D.colors.textLight }}>|</Typography>
            </Box>
          ))}
          <Typography sx={{ ...VIS_D.typography.smallprint, color: VIS_D.colors.text }}>
            © 2021 Autodesk Inc. All rights reserved
          </Typography>
        </Box>

        {toast ? (
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
        ) : null}
      </Box>
    </ThemeProvider>
  );
}
