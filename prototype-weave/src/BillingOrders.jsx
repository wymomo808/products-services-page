import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Link,
  Tab,
  TabContext,
  TabList,
  TabPanel,
  Typography,
} from "@weave-mui/material";
import { tabAlignment, tabVariant } from "@weave-mui/enums";
import { CaretDownS } from "@weave-mui/icons-weave";
import { FigmaCartFull, FigmaCtaArrowRight } from "./BillingIcons.jsx";
import AccountShell from "./AccountShell.jsx";
import { SubscriptionHubCard, UpcomingModuleCard } from "./BillingComponents.jsx";
import BillingSubscriptions from "./BillingSubscriptions.jsx";
import { BO_SUBSCRIPTION_CARDS, BO_TABS, BO_TOTAL_SUBSCRIPTIONS, BO_UPCOMING } from "./data.js";
import { FONT, PAGE_X, useAccountTheme } from "./useAccountTheme.js";
import { VIS_D } from "./visdTokens.js";

const billingCartIconSx = { color: VIS_D.colors.ink };
const billingCtaArrowSx = { color: VIS_D.colors.ink };

const tabListSx = {
  borderBottom: `1px solid ${VIS_D.colors.rowDivider}`,
  mb: "32px",
  minHeight: 32,
  "& .MuiTabs-flexContainer": { gap: 0 },
  "& .MuiTab-root": {
    ...VIS_D.typography.label16Semi,
    fontFamily: FONT,
    textTransform: "none",
    color: VIS_D.colors.textLight,
    minHeight: 32,
    minWidth: 0,
    px: "8px",
    py: "6px",
  },
  "& .MuiTab-root.Mui-selected": { color: VIS_D.colors.ink },
  "& .MuiTabs-indicator": { backgroundColor: VIS_D.colors.ink, height: 2 },
};

const outlinedButtonSx = {
  ...VIS_D.typography.label16Semi,
  textTransform: "none",
  borderRadius: `${VIS_D.radius.button}px`,
  borderColor: VIS_D.colors.ink,
  color: VIS_D.colors.ink,
  height: 40,
  px: "20px",
  boxShadow: "none",
  "&:hover": { borderColor: VIS_D.colors.ink, bgcolor: VIS_D.colors.searchFill, boxShadow: "none" },
};

function SummaryContent({ onAction }) {
  return (
    <>
      <Box sx={{ display: "flex", mb: "32px", overflow: "hidden" }}>
        {BO_UPCOMING.map((item, index) => (
          <UpcomingModuleCard
            key={item.id}
            item={item}
            onAction={onAction}
            isFirst={index === 0}
            isLast={index === BO_UPCOMING.length - 1}
          />
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          mb: "24px",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "baseline", gap: "32px", flexWrap: "wrap" }}>
          <Typography sx={{ ...VIS_D.typography.billingSummary, fontFamily: FONT }}>
            You have {BO_TOTAL_SUBSCRIPTIONS} subscriptions and contracts
          </Typography>
          <Link
            component="button"
            underline="none"
            onClick={() => onAction("Manage all")}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              flexShrink: 0,
              color: VIS_D.colors.ink,
            }}
          >
            <FigmaCtaArrowRight size={20} sx={billingCtaArrowSx} />
            <Box
              component="span"
              sx={{
                ...VIS_D.typography.bodyMedium,
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              Manage all
            </Box>
          </Link>
        </Box>
        <Button variant="outlined" onClick={() => onAction("Export")} sx={outlinedButtonSx}>
          Export
        </Button>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: "24px",
        }}
      >
        {BO_SUBSCRIPTION_CARDS.map((card) => (
          <SubscriptionHubCard key={card.id} card={card} onAction={onAction} />
        ))}
      </Box>
    </>
  );
}

export default function BillingOrders({ onNavigate }) {
  const theme = useAccountTheme();
  const [tab, setTab] = useState("summary");
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  return (
    <AccountShell theme={theme} activeNav="Billing and orders" onNavigate={onNavigate} toast={toast}>
      <Box sx={{ px: PAGE_X, pt: "32px", pb: "48px", flex: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 2,
            mb: "24px",
            flexWrap: "wrap",
          }}
        >
          <Typography
            component="h1"
            sx={{ ...VIS_D.typography.productDetailTitle, fontFamily: FONT, mb: 0 }}
          >
            Billing and orders
          </Typography>
          <Button
            variant="outlined"
            startIcon={<FigmaCartFull size={20} sx={billingCartIconSx} />}
            endIcon={<CaretDownS sx={{ width: 12, height: 12 }} />}
            onClick={() => setToast("Buy")}
            sx={outlinedButtonSx}
          >
            Buy
          </Button>
        </Box>

        <TabContext value={tab}>
          <TabList
            onChange={(_event, value) => setTab(value)}
            variant={tabVariant.STANDARD}
            align={tabAlignment.LEFT}
            showAddButton={false}
            aria-label="Billing and orders views"
            sx={tabListSx}
          >
            {BO_TABS.map((item) => (
              <Tab key={item.id} label={item.label} value={item.id} />
            ))}
          </TabList>

          {BO_TABS.map((item) => (
            <TabPanel key={item.id} value={item.id} sx={{ p: 0 }}>
              {item.id === "summary" ? (
                <SummaryContent onAction={setToast} />
              ) : item.id === "subscriptions" ? (
                <BillingSubscriptions onAction={setToast} />
              ) : (
                <Box sx={{ py: "64px", textAlign: "center" }}>
                  <Typography sx={{ ...VIS_D.typography.headlineSmall, fontSize: "18px", mb: "8px" }}>
                    {item.label}
                  </Typography>
                  <Typography sx={{ ...VIS_D.typography.bodyMedium, color: VIS_D.colors.textPrimary }}>
                    {item.label} content (prototype placeholder).
                  </Typography>
                </Box>
              )}
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </AccountShell>
  );
}
