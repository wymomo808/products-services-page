import { Box, Link, Typography } from "@weave-mui/material";
import { FigmaCtaArrowRight } from "./BillingIcons.jsx";
import { FONT } from "./useAccountTheme.js";
import { VIS_D } from "./visdTokens.js";

const EXPIRY_COLOR = "#C74600";
const EXPIRY_BG = "#FFF4EC";
const UPDATE_COLOR = "#067647";
const UPDATE_BG = "#EDF7F1";

const CHIP_TONES = {
  warning: { color: EXPIRY_COLOR, bg: EXPIRY_BG, border: "#F77236" },
  info: { color: UPDATE_COLOR, bg: UPDATE_BG, border: "#56C271" },
  default: { color: VIS_D.colors.textLight, bg: VIS_D.colors.background, border: VIS_D.colors.border },
};

function Eyebrow({ children }) {
  return (
    <Typography
      component="span"
      sx={{
        display: "block",
        fontFamily: FONT,
        fontSize: "11px",
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: VIS_D.colors.textLight,
        mb: "12px",
      }}
    >
      {children}
    </Typography>
  );
}

function HeroMetric({ value, unit, warning = false, info = false }) {
  const color = warning ? EXPIRY_COLOR : info ? UPDATE_COLOR : VIS_D.colors.ink;
  return (
    <Box sx={{ display: "flex", alignItems: "baseline", gap: "6px", flexWrap: "wrap" }}>
      <Typography
        component="span"
        sx={{
          fontFamily: FONT,
          fontSize: { xs: "40px", md: "48px" },
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          fontSynthesis: "none",
          color,
        }}
      >
        {value}
      </Typography>
      {unit ? (
        <Typography
          component="span"
          sx={{
            fontFamily: FONT,
            fontSize: "18px",
            fontWeight: 600,
            lineHeight: 1.2,
            color: warning || info ? color : VIS_D.colors.textPrimary,
          }}
        >
          {unit}
        </Typography>
      ) : null}
    </Box>
  );
}

function DetailChip({ label, value, tone = "default" }) {
  const styles = tone === "warning" || tone === "info" ? CHIP_TONES[tone] : CHIP_TONES.default;
  const valueColor = tone === "warning" || tone === "info" ? styles.color : VIS_D.colors.ink;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        minWidth: 0,
        p: "14px 16px",
        borderRadius: `${VIS_D.radius.field}px`,
        bgcolor: tone === "default" ? CHIP_TONES.default.bg : styles.bg,
        border: `1px solid ${tone === "default" ? CHIP_TONES.default.border : styles.border}`,
      }}
    >
      <Typography
        sx={{
          fontFamily: FONT,
          fontSize: "12px",
          fontWeight: 600,
          lineHeight: 1.2,
          color: tone === "default" ? CHIP_TONES.default.color : styles.color,
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontFamily: FONT,
          fontSize: "16px",
          fontWeight: 800,
          lineHeight: 1.2,
          color: valueColor,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

function UsageBar({ assigned, total }) {
  const pct = total > 0 ? Math.round((assigned / total) * 100) : 0;

  return (
    <Box sx={{ mt: "20px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: "12px", mb: "8px" }}>
        <Typography sx={{ fontFamily: FONT, fontSize: "12px", fontWeight: 600, color: VIS_D.colors.textLight }}>
          Seat usage
        </Typography>
        <Typography sx={{ fontFamily: FONT, fontSize: "12px", fontWeight: 800, color: VIS_D.colors.ink }}>
          {pct}%
        </Typography>
      </Box>
      <Box
        sx={{
          height: 8,
          borderRadius: 999,
          bgcolor: "rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: `${pct}%`,
            height: "100%",
            borderRadius: 999,
            bgcolor: VIS_D.colors.ink,
          }}
        />
      </Box>
    </Box>
  );
}

function SummaryAction({ children, onClick }) {
  return (
    <Link
      component="button"
      underline="none"
      onClick={onClick}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        color: VIS_D.colors.ink,
        fontFamily: FONT,
        fontSize: "15px",
        fontWeight: 700,
        lineHeight: 1.2,
        mt: "24px",
        p: 0,
        "&:hover": { color: VIS_D.colors.textPrimary },
      }}
    >
      {children}
      <FigmaCtaArrowRight size={18} />
    </Link>
  );
}

function SummaryPanel({ title, hero, caption, chips, footer, actionLabel, onAction, children, chipGridColumns }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        p: { xs: "24px", md: "28px" },
        borderRadius: `${VIS_D.radius.card}px`,
        bgcolor: VIS_D.colors.background,
        border: `1px solid ${VIS_D.colors.border}`,
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      <Eyebrow>{title}</Eyebrow>
      {hero}
      {caption ? (
        <Typography
          sx={{
            fontFamily: FONT,
            fontSize: "15px",
            fontWeight: 400,
            lineHeight: 1.5,
            color: VIS_D.colors.textPrimary,
            mt: "10px",
            maxWidth: 420,
          }}
        >
          {caption}
        </Typography>
      ) : null}

      {chips?.length ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns:
              chipGridColumns ?? { xs: "1fr 1fr", sm: "repeat(2, minmax(0, 1fr))" },
            gap: "12px",
            mt: "24px",
          }}
        >
          {chips.map((chip) => (
            <DetailChip key={chip.label} {...chip} />
          ))}
        </Box>
      ) : null}

      {children}

      {footer ? (
        <Typography
          sx={{
            fontFamily: FONT,
            fontSize: "13px",
            fontWeight: 400,
            lineHeight: 1.5,
            color: VIS_D.colors.textLight,
            mt: "16px",
          }}
        >
          {footer}
        </Typography>
      ) : null}

      <Box sx={{ mt: "auto", pt: "8px" }}>
        <SummaryAction onClick={onAction}>{actionLabel}</SummaryAction>
      </Box>
    </Box>
  );
}

export default function AppManagementSummary({
  purchase,
  subscriptionSummary,
  subscriptionExpiry,
  updateStatus,
  assignment,
  availableSeats,
  onViewSubscription,
  onAssignUsers,
  onViewUpdates,
  updatesOnly = false,
  hideAssignment = false,
}) {
  const assignedCount = assignment?.assignedUsers.length ?? 0;
  const totalSeats = assignment?.totalSeats ?? 0;
  const daysRemaining = subscriptionExpiry?.daysRemaining ?? 0;
  const updateAvailable = updateStatus?.updateAvailable ?? false;
  const pendingUpdates = updateStatus?.pendingUpdates ?? 0;
  const updateStatusLabel = updateAvailable ? "Updates Available" : "Up to date";
  const priceMatch =
    typeof purchase?.totalPrice === "string"
      ? purchase.totalPrice.match(/^(\$[\d,]+)\s*(.*)$/) ??
        purchase.totalPrice.match(/^(\$[\d,]+)(\/.*)$/)
      : null;
  const priceValue = priceMatch?.[1] ?? purchase?.totalPrice ?? "—";
  const priceUnit = priceMatch?.[2] ?? "";
  const seatsMatch =
    typeof purchase?.seats === "string" ? purchase.seats.match(/^(\d+)/) : null;
  const seatCount = seatsMatch?.[1] ?? purchase?.seats ?? "—";

  const updatesPanel = (
    <SummaryPanel
      title="Updates"
      hero={
        updateAvailable ? (
          <HeroMetric value={String(pendingUpdates)} unit="Updates Available" />
        ) : (
          <HeroMetric value={updateStatus?.latestVersion ?? "—"} unit="installed" />
        )
      }
      caption={
        updateAvailable
          ? `Version ${updateStatus?.latestVersion ?? "—"} was released on ${updateStatus?.latestReleaseDate ?? "—"}. Install the update for your team.`
          : `Your team is on the latest version (${updateStatus?.installedVersion ?? "—"}).`
      }
      chips={[
        { label: "Installed", value: updateStatus?.installedVersion ?? "—" },
        { label: "Latest", value: updateStatus?.latestVersion ?? "—" },
        { label: "Released", value: updateStatus?.latestReleaseDate ?? "—" },
        {
          label: "Status",
          value: updateStatusLabel,
          tone: updateAvailable ? "info" : "default",
        },
      ]}
      chipGridColumns={{ xs: "1fr 1fr", md: "repeat(4, minmax(0, 1fr))" }}
      actionLabel="View updates"
      onAction={onViewUpdates}
    />
  );

  if (updatesOnly) {
    return (
      <Box component="section" aria-label="Update summary" sx={{ mt: "8px" }}>
        {updatesPanel}
      </Box>
    );
  }

  return (
    <Box
      component="section"
      aria-label={hideAssignment ? "Update and subscription summary" : "Update, subscription, and assignment summary"}
      sx={{
        display: "grid",
        gridTemplateColumns: hideAssignment
          ? { xs: "1fr", md: "1fr 1fr" }
          : { xs: "1fr", md: "1fr 1fr", xl: "1fr 1fr 1fr" },
        gap: "16px",
        mt: "8px",
      }}
    >
        {updatesPanel}

        <SummaryPanel
          title="Subscription"
          hero={<HeroMetric value={priceValue} unit={priceUnit} />}
          caption={`${seatCount} seats on a ${subscriptionSummary?.term ?? "—"} plan · Auto-renew ${subscriptionSummary?.autoRenew ?? "—"}`}
          chips={[
            { label: "Seats", value: purchase?.seats ?? "—" },
            { label: "Term", value: subscriptionSummary?.term ?? "—" },
            {
              label: "Expires",
              value: daysRemaining > 0 ? `${daysRemaining} days` : subscriptionSummary?.expiresOn ?? "—",
              tone: daysRemaining > 0 && daysRemaining <= 30 ? "warning" : "default",
            },
            { label: "Auto-renew", value: subscriptionSummary?.autoRenew ?? "—" },
          ]}
          footer={
            subscriptionSummary?.subscriptionId
              ? `Subscription ID ${subscriptionSummary.subscriptionId}`
              : undefined
          }
          actionLabel="View subscription"
          onAction={onViewSubscription}
        />

        {hideAssignment ? null : (
          <SummaryPanel
            title="User assignment"
            hero={
              <HeroMetric
                value={`${assignedCount}/${totalSeats}`}
                unit="seats assigned"
              />
            }
            caption={
              availableSeats > 0
                ? `${availableSeats} unassigned ${availableSeats === 1 ? "seat" : "seats"} available for your team.`
                : "All seats are currently assigned."
            }
            chips={[
              { label: "Total seats", value: totalSeats },
              { label: "Assigned", value: assignedCount },
              {
                label: "Unassigned",
                value: availableSeats,
                tone: availableSeats > 0 ? "warning" : "default",
              },
              { label: "Team", value: subscriptionSummary?.team ?? "—" },
            ]}
            actionLabel="Assign users"
            onAction={onAssignUsers}
          >
            <UsageBar assigned={assignedCount} total={totalSeats} />
          </SummaryPanel>
        )}
    </Box>
  );
}
