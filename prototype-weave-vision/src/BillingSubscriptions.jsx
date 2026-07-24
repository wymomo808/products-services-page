import { useMemo, useRef, useState } from "react";
import {
  Box,
  ClickAwayListener,
  IconButton,
  Link,
  Typography,
} from "@weave-mui/material";
import { CaretDownS, CaretUpS, CtaArrowRightS, FilterS } from "@weave-mui/icons-weave";
import AccountSearchField, {
  ActionsBarButton,
  FilterBarButton,
  SearchFilterBar,
} from "./AccountSearchField.jsx";
import BillingFilterPanel, {
  EMPTY_BILLING_FILTERS,
  applyBillingFilters,
} from "./BillingFilterPanel.jsx";
import { BO_SUBSCRIPTIONS, BO_TOTAL_SUBSCRIPTIONS } from "./data.js";
import { FONT } from "./useAccountTheme.js";
import { VIS_D } from "./visdTokens.js";

const GRID_COLS =
  "minmax(280px, 2.2fr) minmax(120px, 1fr) minmax(90px, 0.8fr) minmax(72px, 0.7fr) minmax(120px, 1fr) minmax(110px, 0.9fr) 40px";

function SubscriptionIcon({ row }) {
  if (row.logoSrc) {
    return (
      <Box
        component="img"
        src={row.logoSrc}
        alt=""
        sx={{ width: 30, height: 30, flexShrink: 0, objectFit: "contain" }}
      />
    );
  }

  return (
    <Box
      aria-hidden
      sx={{
        width: 30,
        height: 30,
        flexShrink: 0,
        borderRadius: "6px",
        bgcolor: row.tint,
        color: "#fff",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: "14px",
        lineHeight: 1,
      }}
    >
      {row.abbr ?? row.displayName.charAt(0)}
    </Box>
  );
}

function SubscriptionCell({ row }) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: "12px", minWidth: 0 }}>
      <SubscriptionIcon row={row} />
      <Box sx={{ minWidth: 0 }}>
        <Box
          component="span"
          sx={{
            display: "block",
            fontFamily: FONT,
            fontSize: "16px",
            fontWeight: 700,
            lineHeight: 1.5,
            color: VIS_D.colors.ink,
            fontSynthesis: "none",
          }}
        >
          {row.displayName}
        </Box>
        <Typography sx={{ ...VIS_D.typography.smallprint, color: VIS_D.colors.textLight, lineHeight: 1.4 }}>
          {row.referenceLabel}
        </Typography>
      </Box>
    </Box>
  );
}

function seatLabel(count) {
  return `${count} ${count === 1 ? "seat" : "seats"}`;
}

function hasActiveFilters(filters) {
  return (
    filters.autoRenew.length > 0 ||
    filters.status.length > 0 ||
    filters.type.length > 0 ||
    filters.orderType.length > 0 ||
    filters.products.length > 0 ||
    filters.teams.length > 0 ||
    filters.renewalDate !== "all"
  );
}

export default function BillingSubscriptions({ onAction }) {
  const [query, setQuery] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [filters, setFilters] = useState(EMPTY_BILLING_FILTERS);
  const [filterOpen, setFilterOpen] = useState(false);
  const filterButtonRef = useRef(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = applyBillingFilters(BO_SUBSCRIPTIONS, filters);

    if (q) {
      rows = rows.filter(
        (row) =>
          row.displayName.toLowerCase().includes(q) ||
          row.referenceLabel.toLowerCase().includes(q) ||
          row.team.toLowerCase().includes(q)
      );
    }

    return [...rows].sort((a, b) => {
      const cmp = a.displayName.localeCompare(b.displayName);
      return sortAsc ? cmp : -cmp;
    });
  }, [query, sortAsc, filters]);

  const isFiltered = query.trim() || hasActiveFilters(filters);
  const countLabel = isFiltered
    ? `Results (${filtered.length})`
    : `All (${BO_TOTAL_SUBSCRIPTIONS})`;

  return (
    <Box>
      <Box sx={{ position: "relative", mb: "24px" }}>
        <SearchFilterBar
          sx={{ mb: 0 }}
          actions={
            <ActionsBarButton
              endIcon={<CaretDownS sx={{ width: 12, height: 12 }} />}
              onClick={() => onAction("Actions")}
            >
              Actions
            </ActionsBarButton>
          }
        >
          <AccountSearchField value={query} onChange={(event) => setQuery(event.target.value)} />
          <Box ref={filterButtonRef} sx={{ position: "relative", flexShrink: 0 }}>
            <FilterBarButton
              startIcon={<FilterS sx={{ width: 16, height: 16 }} />}
              onClick={() => setFilterOpen((open) => !open)}
              aria-expanded={filterOpen}
            >
              Filter
            </FilterBarButton>
            {filterOpen ? (
              <ClickAwayListener
                onClickAway={(event) => {
                  if (filterButtonRef.current?.contains(event.target)) return;
                  setFilterOpen(false);
                }}
              >
                <Box sx={{ position: "absolute", top: "100%", left: 0, mt: "8px", zIndex: 1300 }}>
                  <BillingFilterPanel
                    open={filterOpen}
                    onClose={() => setFilterOpen(false)}
                    filters={filters}
                    onApply={setFilters}
                  />
                </Box>
              </ClickAwayListener>
            ) : null}
          </Box>
        </SearchFilterBar>
      </Box>

      <Box
        sx={{
          border: `1px solid ${VIS_D.colors.border}`,
          borderRadius: `${VIS_D.radius.card}px`,
          overflow: "hidden",
        }}
      >
        <Box sx={{ px: "24px", py: "16px", borderBottom: `1px solid ${VIS_D.colors.border}` }}>
          <Typography sx={{ ...VIS_D.typography.headlineSmall, fontFamily: FONT, fontWeight: 700 }}>
            {countLabel}
          </Typography>
        </Box>

        <Box sx={{ overflowX: "auto" }}>
          <Box sx={{ minWidth: 960 }}>
            <Box
              role="row"
              sx={{
                display: "grid",
                gridTemplateColumns: GRID_COLS,
                alignItems: "center",
                gap: "16px",
                px: "24px",
                py: "14px",
                bgcolor: VIS_D.colors.panel,
                borderBottom: `1px solid ${VIS_D.colors.border}`,
              }}
            >
              <Link
                component="button"
                underline="none"
                onClick={() => setSortAsc((value) => !value)}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  color: VIS_D.colors.ink,
                  textAlign: "left",
                }}
              >
                <Typography sx={{ ...VIS_D.typography.label14Semi, fontFamily: FONT, fontWeight: 700 }}>
                  Subscriptions
                </Typography>
                <CaretUpS
                  sx={{
                    width: 16,
                    height: 16,
                    transform: sortAsc ? "none" : "rotate(180deg)",
                  }}
                />
              </Link>
              {["Team", "Quantity", "Term", "Payment method", "Date", ""].map((heading) => (
                <Typography
                  key={heading || "actions"}
                  sx={{ ...VIS_D.typography.label14Semi, fontFamily: FONT, fontWeight: 700, color: VIS_D.colors.ink }}
                >
                  {heading}
                </Typography>
              ))}
            </Box>

            {filtered.map((row, index) => (
              <Box
                key={row.id}
                role="row"
                sx={{
                  display: "grid",
                  gridTemplateColumns: GRID_COLS,
                  alignItems: "center",
                  gap: "16px",
                  px: "24px",
                  py: "16px",
                  borderBottom: index < filtered.length - 1 ? `1px solid ${VIS_D.colors.rowDivider}` : "none",
                  "&:hover": { bgcolor: VIS_D.colors.searchFill },
                }}
              >
                <SubscriptionCell row={row} />
                <Typography sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT }}>{row.team}</Typography>
                <Typography sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT }}>{seatLabel(row.seats)}</Typography>
                <Typography sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT }}>{row.term}</Typography>
                <Typography sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT }}>{row.paymentMethod}</Typography>
                <Box>
                  <Typography sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT, lineHeight: 1.4 }}>
                    Expires
                  </Typography>
                  <Typography sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT, lineHeight: 1.4 }}>
                    {row.expires}
                  </Typography>
                </Box>
                <IconButton
                  aria-label={`View ${row.displayName}`}
                  size="small"
                  onClick={() => onAction(`View subscription — ${row.displayName}`)}
                  sx={{ color: VIS_D.colors.ink, justifySelf: "end" }}
                >
                  <CtaArrowRightS sx={{ width: 16, height: 16 }} />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
