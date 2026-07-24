import { Box, Button, Divider, IconButton, Link } from "@weave-mui/material";
import { MoreS } from "@weave-mui/icons-weave";
import { FigmaCartFull, FigmaCtaArrowRight } from "./BillingIcons.jsx";
import ProductLockup from "./ProductLockup.jsx";
import { FONT } from "./useAccountTheme.js";
import { VIS_D } from "./visdTokens.js";

const billingCartIconSx = { color: VIS_D.colors.ink };
const billingCtaArrowSx = { color: VIS_D.colors.ink };

const outlinedButtonSx = {
  ...VIS_D.typography.label14Semi,
  textTransform: "none",
  borderRadius: `${VIS_D.radius.button}px`,
  borderColor: VIS_D.colors.ink,
  color: VIS_D.colors.ink,
  height: 32,
  px: "12px",
  boxShadow: "none",
  "&:hover": { borderColor: VIS_D.colors.ink, bgcolor: VIS_D.colors.searchFill, boxShadow: "none" },
};

const buyButtonSx = {
  ...VIS_D.typography.label14Semi,
  textTransform: "none",
  color: `${VIS_D.colors.ink} !important`,
  minWidth: 0,
  px: "12px",
  "& .MuiButton-startIcon": { color: `${VIS_D.colors.ink} !important` },
  "& .MuiButton-startIcon .MuiSvgIcon-root": { color: `${VIS_D.colors.ink} !important` },
  "&:hover": { bgcolor: "transparent", color: `${VIS_D.colors.ink} !important` },
};

const weightedTextSx = (fontSize, fontWeight, extra = {}) => ({
  fontFamily: FONT,
  fontSize,
  fontWeight,
  color: VIS_D.colors.ink,
  fontSynthesis: "none",
  ...extra,
});

function StatRow({ label, value, showDivider = true }) {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: "12px", width: "100%" }}>
        <Box component="span" sx={{ ...weightedTextSx("14px", 700, { lineHeight: 1.5, flex: 1 }) }}>
          {label}
        </Box>
        <Box
          component="span"
          sx={{ ...weightedTextSx("14px", 800, { lineHeight: 1.25, flex: 1, textAlign: "right" }) }}
        >
          {value}
        </Box>
      </Box>
      {showDivider ? <Divider sx={{ borderColor: VIS_D.colors.divider }} /> : null}
    </>
  );
}

export function SubscriptionHubCard({ card, onAction }) {
  const isMarketplace = card.type === "marketplace";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minWidth: 210,
        border: `1px solid ${VIS_D.colors.divider}`,
        borderRadius: `${VIS_D.radius.card}px`,
        overflow: "hidden",
        bgcolor: VIS_D.colors.background,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "12px", px: "24px", py: "16px" }}>
        <ProductLockup
          name={card.name}
          logoSrc={card.logoSrc}
          tint={card.logoSrc ? undefined : card.tint}
          abbr={card.abbr}
          size={30}
          nameSize={16}
          nameWeight={700}
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "12px", px: "24px", pb: "24px", pt: "8px", flex: 1 }}>
        {card.stats.map((stat, index) => (
          <StatRow
            key={stat.label}
            label={stat.label}
            value={stat.value}
            showDivider={index < card.stats.length - 1}
          />
        ))}
        {isMarketplace && card.vendor ? (
          <Box component="span" sx={{ ...VIS_D.typography.smallprint, color: VIS_D.colors.textLight, mt: "4px", display: "block" }}>
            {card.vendor}
          </Box>
        ) : null}
      </Box>

      <Divider sx={{ borderColor: VIS_D.colors.divider }} />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: "24px",
          py: "16px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Button
            variant="outlined"
            onClick={() => onAction(`Manage ${card.name}`)}
            sx={outlinedButtonSx}
          >
            Manage
          </Button>
          <Button
            variant="text"
            startIcon={<FigmaCartFull size={20} sx={billingCartIconSx} />}
            onClick={() => onAction(`${isMarketplace ? "Get" : "Buy"} ${card.name}`)}
            sx={buyButtonSx}
          >
            {isMarketplace ? "Get" : "Buy"}
          </Button>
        </Box>
        <IconButton aria-label={`More options for ${card.name}`} size="small" onClick={() => onAction(`More — ${card.name}`)}>
          <MoreS sx={{ width: 20, height: 20 }} />
        </IconButton>
      </Box>
    </Box>
  );
}

export function UpcomingModuleCard({ item, onAction, isFirst, isLast }) {
  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${VIS_D.colors.divider}`,
        borderRight: isLast ? `1px solid ${VIS_D.colors.divider}` : "none",
        borderTopLeftRadius: isFirst ? `${VIS_D.radius.card}px` : 0,
        borderBottomLeftRadius: isFirst ? `${VIS_D.radius.card}px` : 0,
        borderTopRightRadius: isLast ? `${VIS_D.radius.card}px` : 0,
        borderBottomRightRadius: isLast ? `${VIS_D.radius.card}px` : 0,
        overflow: "hidden",
        bgcolor: VIS_D.colors.background,
      }}
    >
      <Box sx={{ flex: 1, px: "32px", pt: "24px", pb: "16px" }}>
        <Box sx={{ display: "flex", alignItems: "baseline", gap: "4px", mb: "12px" }}>
          <Box component="span" sx={{ ...weightedTextSx("16px", 700, { lineHeight: 1.5 }) }}>
            {item.title}
          </Box>
          {item.subtitle ? (
            <Box component="span" sx={{ ...VIS_D.typography.bodySmall, color: VIS_D.colors.text }}>
              {item.subtitle}
            </Box>
          ) : null}
        </Box>
        <Box
          component="span"
          sx={{
            ...weightedTextSx("26px", 800, { lineHeight: 1.2, color: VIS_D.colors.text, display: "block", mb: item.note ? "8px" : 0 }),
          }}
        >
          {item.count}
        </Box>
        {item.note ? (
          <Box component="span" sx={{ ...VIS_D.typography.smallprint, color: VIS_D.colors.text, fontStyle: "italic", display: "block" }}>
            Does not include Flex. View{" "}
            <Link
              component="button"
              underline="always"
              onClick={() => onAction("View token balance and usage")}
              sx={{ ...VIS_D.typography.smallprint, fontStyle: "italic", color: VIS_D.colors.ink }}
            >
              token balance and usage
            </Link>
            .
          </Box>
        ) : null}
      </Box>
      <Box sx={{ px: "32px", py: "16px" }}>
        <Link
          component="button"
          underline="none"
          onClick={() => onAction(item.action)}
          sx={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
        >
          <FigmaCtaArrowRight size={20} sx={billingCtaArrowSx} />
          <Box component="span" sx={{ ...VIS_D.typography.label14Semi, lineHeight: "20px", color: VIS_D.colors.ink }}>
            {item.action}
          </Box>
        </Link>
      </Box>
    </Box>
  );
}
