import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Link,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@weave-mui/material";
import { selectVariants } from "@weave-mui/enums";
import { CaretDownS } from "@weave-mui/icons-weave";
import { BO_RENEWAL_DATE_OPTIONS, BO_SUBSCRIPTIONS, PS_TYPE_FILTERS } from "./data.js";
import { FONT } from "./useAccountTheme.js";
import { VIS_D } from "./visdTokens.js";

export const EMPTY_BILLING_FILTERS = {
  autoRenew: [],
  status: [],
  renewalDate: "all",
  type: [],
  orderType: [],
  products: [],
  teams: [],
};

const AUTO_RENEW_OPTIONS = [
  { id: "on", label: "On" },
  { id: "off", label: "Off" },
];

const STATUS_OPTIONS = [
  { id: "eligible", label: "Eligible to renew now" },
  { id: "expiring", label: "Expiring" },
  { id: "expired", label: "Expired" },
  { id: "suspended", label: "Suspended" },
  { id: "canceled", label: "Canceled" },
  { id: "payment-error", label: "Payment error" },
];

const TYPE_OPTIONS = PS_TYPE_FILTERS.filter((filter) => filter.id !== "all");

const ORDER_TYPE_OPTIONS = [
  { id: "subscription", label: "Subscription" },
  { id: "contract", label: "Contract" },
];

function countBy(rows, key) {
  return rows.reduce((acc, row) => {
    const value = row[key];
    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {});
}

function countProducts(rows) {
  return rows.reduce((acc, row) => {
    acc[row.productName] = (acc[row.productName] ?? 0) + 1;
    return acc;
  }, {});
}

function countSelected(filters) {
  return (
    filters.autoRenew.length +
    filters.status.length +
    filters.type.length +
    filters.orderType.length +
    filters.products.length +
    filters.teams.length +
    (filters.renewalDate !== "all" ? 1 : 0)
  );
}

function toggleValue(list, value) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function FilterSectionHeader({ title, expanded, onToggle, onClear, disableClear }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "8px", py: "8px", pr: "8px" }}>
      <Box
        component="button"
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          bgcolor: "transparent",
          p: 0,
          cursor: "pointer",
          color: VIS_D.colors.ink,
        }}
      >
        <CaretDownS
          sx={{
            width: 16,
            height: 16,
            transform: expanded ? "rotate(0deg)" : "rotate(-90deg)",
            transition: "transform 0.15s ease",
          }}
        />
      </Box>
      <Typography
        sx={{ ...VIS_D.typography.label16Semi, fontFamily: FONT, fontWeight: 700, flex: 1, textAlign: "left" }}
      >
        {title}
      </Typography>
      <Link
        component="button"
        underline="always"
        disabled={disableClear}
        onClick={onClear}
        sx={{
          ...VIS_D.typography.bodyMedium,
          fontFamily: FONT,
          color: disableClear ? VIS_D.colors.disabled : VIS_D.colors.ink,
          textUnderlineOffset: "3px",
        }}
      >
        Clear
      </Link>
    </Box>
  );
}

function FilterCheckboxRow({ label, count, checked, onChange }) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: "12px", py: "8px", pr: "8px" }}>
      <Checkbox checked={checked} onChange={onChange} sx={{ p: 0, mt: "2px" }} />
      <Typography sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT, lineHeight: "20px" }}>
        {label} ({count})
      </Typography>
    </Box>
  );
}

function SectionDivider() {
  return <Divider sx={{ borderColor: VIS_D.colors.rowDivider, my: "8px" }} />;
}

export function applyBillingFilters(rows, filters) {
  return rows.filter((row) => {
    if (filters.autoRenew.length > 0 && !filters.autoRenew.includes(row.autoRenew)) return false;
    if (filters.status.length > 0 && !filters.status.includes(row.status)) return false;
    if (filters.type.length > 0 && !filters.type.includes(row.productType)) return false;
    if (filters.orderType.length > 0 && !filters.orderType.includes(row.orderType)) return false;
    if (filters.products.length > 0 && !filters.products.includes(row.productName)) return false;
    if (filters.teams.length > 0 && !filters.teams.includes(row.team)) return false;
    if (filters.renewalDate !== "all" && row.renewalDate !== filters.renewalDate) return false;
    return true;
  });
}

export default function BillingFilterPanel({ open, onClose, filters, onApply }) {
  const [draft, setDraft] = useState(filters);
  const [expanded, setExpanded] = useState({
    autoRenew: true,
    status: true,
    renewalDate: true,
    type: true,
    orderType: true,
    product: true,
    team: true,
  });
  const [showAllProducts, setShowAllProducts] = useState(false);

  useEffect(() => {
    if (open) {
      setDraft(filters);
      setShowAllProducts(false);
    }
  }, [open, filters]);

  const counts = useMemo(
    () => ({
      autoRenew: countBy(BO_SUBSCRIPTIONS, "autoRenew"),
      status: countBy(BO_SUBSCRIPTIONS, "status"),
      type: countBy(BO_SUBSCRIPTIONS, "productType"),
      orderType: countBy(BO_SUBSCRIPTIONS, "orderType"),
      products: countProducts(BO_SUBSCRIPTIONS),
      teams: countBy(BO_SUBSCRIPTIONS, "team"),
    }),
    []
  );

  const productEntries = useMemo(
    () => Object.entries(counts.products).sort(([a], [b]) => a.localeCompare(b)),
    [counts.products]
  );
  const visibleProducts = showAllProducts ? productEntries : productEntries.slice(0, 6);
  const selectedCount = countSelected(draft);

  if (!open) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        width: 400,
        maxWidth: "calc(100vw - 32px)",
        maxHeight: "min(80vh, 720px)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: `${VIS_D.radius.card}px`,
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: 0, flex: 1 }}>
        <Box sx={{ px: "32px", py: "16px", borderBottom: `1px solid ${VIS_D.colors.divider}` }}>
          <Typography sx={{ ...VIS_D.typography.billingSummary, fontFamily: FONT, fontSize: "21px", fontWeight: 700 }}>
            {selectedCount} selected
          </Typography>
        </Box>

        <Box sx={{ px: "32px", py: "24px", overflowY: "auto", flex: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <FilterSectionHeader
              title="Auto-renew"
              expanded={expanded.autoRenew}
              onToggle={() => setExpanded((value) => ({ ...value, autoRenew: !value.autoRenew }))}
              disableClear={draft.autoRenew.length === 0}
              onClear={() => setDraft((value) => ({ ...value, autoRenew: [] }))}
            />
            {expanded.autoRenew
              ? AUTO_RENEW_OPTIONS.map((option) => (
                  <FilterCheckboxRow
                    key={option.id}
                    label={option.label}
                    count={counts.autoRenew[option.id] ?? 0}
                    checked={draft.autoRenew.includes(option.id)}
                    onChange={() =>
                      setDraft((value) => ({ ...value, autoRenew: toggleValue(value.autoRenew, option.id) }))
                    }
                  />
                ))
              : null}

            <SectionDivider />

            <FilterSectionHeader
              title="Status"
              expanded={expanded.status}
              onToggle={() => setExpanded((value) => ({ ...value, status: !value.status }))}
              disableClear={draft.status.length === 0}
              onClear={() => setDraft((value) => ({ ...value, status: [] }))}
            />
            {expanded.status
              ? STATUS_OPTIONS.map((option) => (
                  <FilterCheckboxRow
                    key={option.id}
                    label={option.label}
                    count={counts.status[option.id] ?? 0}
                    checked={draft.status.includes(option.id)}
                    onChange={() =>
                      setDraft((value) => ({ ...value, status: toggleValue(value.status, option.id) }))
                    }
                  />
                ))
              : null}

            <SectionDivider />

            <FilterSectionHeader
              title="Renewal or expiration date"
              expanded={expanded.renewalDate}
              onToggle={() => setExpanded((value) => ({ ...value, renewalDate: !value.renewalDate }))}
              disableClear={draft.renewalDate === "all"}
              onClear={() => setDraft((value) => ({ ...value, renewalDate: "all" }))}
            />
            {expanded.renewalDate ? (
              <Box sx={{ pl: "22px", pb: "8px" }}>
                <Select
                  fullWidth
                  value={draft.renewalDate}
                  onChange={(event) => setDraft((value) => ({ ...value, renewalDate: event.target.value }))}
                  variant={selectVariants.BOX}
                  size="small"
                  sx={{
                    height: VIS_D.sizes.fieldHeight,
                    ...VIS_D.typography.label16Semi,
                    fontFamily: FONT,
                    "& .MuiSelect-select": { py: "9px", color: VIS_D.colors.ink },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(0,0,0,0.3)",
                      borderWidth: "1px",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(0,0,0,0.3)" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: VIS_D.colors.ink },
                    boxShadow: "inset 0 -1px 0 0 #000",
                  }}
                  MenuProps={{ PaperProps: { sx: { mt: "4px" } } }}
                >
                  {BO_RENEWAL_DATE_OPTIONS.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            ) : null}

            <SectionDivider />

            <FilterSectionHeader
              title="Product type"
              expanded={expanded.type}
              onToggle={() => setExpanded((value) => ({ ...value, type: !value.type }))}
              disableClear={draft.type.length === 0}
              onClear={() => setDraft((value) => ({ ...value, type: [] }))}
            />
            {expanded.type
              ? TYPE_OPTIONS.map((option) => (
                  <FilterCheckboxRow
                    key={option.id}
                    label={option.label}
                    count={counts.type[option.id] ?? 0}
                    checked={draft.type.includes(option.id)}
                    onChange={() => setDraft((value) => ({ ...value, type: toggleValue(value.type, option.id) }))}
                  />
                ))
              : null}

            <SectionDivider />

            <FilterSectionHeader
              title="Order type"
              expanded={expanded.orderType}
              onToggle={() => setExpanded((value) => ({ ...value, orderType: !value.orderType }))}
              disableClear={draft.orderType.length === 0}
              onClear={() => setDraft((value) => ({ ...value, orderType: [] }))}
            />
            {expanded.orderType
              ? ORDER_TYPE_OPTIONS.map((option) => (
                  <FilterCheckboxRow
                    key={option.id}
                    label={option.label}
                    count={counts.orderType[option.id] ?? 0}
                    checked={draft.orderType.includes(option.id)}
                    onChange={() =>
                      setDraft((value) => ({ ...value, orderType: toggleValue(value.orderType, option.id) }))
                    }
                  />
                ))
              : null}

            <SectionDivider />

            <FilterSectionHeader
              title="Product"
              expanded={expanded.product}
              onToggle={() => setExpanded((value) => ({ ...value, product: !value.product }))}
              disableClear={draft.products.length === 0}
              onClear={() => setDraft((value) => ({ ...value, products: [] }))}
            />
            {expanded.product ? (
              <>
                {visibleProducts.map(([name, count]) => (
                  <FilterCheckboxRow
                    key={name}
                    label={name}
                    count={count}
                    checked={draft.products.includes(name)}
                    onChange={() =>
                      setDraft((value) => ({ ...value, products: toggleValue(value.products, name) }))
                    }
                  />
                ))}
                {productEntries.length > 6 ? (
                  <Link
                    component="button"
                    underline="always"
                    onClick={() => setShowAllProducts((value) => !value)}
                    sx={{
                      ...VIS_D.typography.bodyMedium,
                      fontFamily: FONT,
                      color: VIS_D.colors.ink,
                      textAlign: "left",
                      pl: "32px",
                      py: "8px",
                    }}
                  >
                    {showAllProducts ? "See less" : "See more"}
                  </Link>
                ) : null}
              </>
            ) : null}

            <SectionDivider />

            <FilterSectionHeader
              title="Team"
              expanded={expanded.team}
              onToggle={() => setExpanded((value) => ({ ...value, team: !value.team }))}
              disableClear={draft.teams.length === 0}
              onClear={() => setDraft((value) => ({ ...value, teams: [] }))}
            />
            {expanded.team
              ? Object.entries(counts.teams)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([name, count]) => (
                    <FilterCheckboxRow
                      key={name}
                      label={name}
                      count={count}
                      checked={draft.teams.includes(name)}
                      onChange={() =>
                        setDraft((value) => ({ ...value, teams: toggleValue(value.teams, name) }))
                      }
                    />
                  ))
              : null}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "16px",
            px: "32px",
            py: "16px",
            borderTop: `1px solid ${VIS_D.colors.divider}`,
          }}
        >
          <Button
            variant="text"
            onClick={onClose}
            sx={{
              ...VIS_D.typography.label16Semi,
              fontFamily: FONT,
              textTransform: "none",
              color: VIS_D.colors.ink,
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              onApply(draft);
              onClose();
            }}
            sx={{
              ...VIS_D.typography.label16Semi,
              fontFamily: FONT,
              textTransform: "none",
              height: 40,
              px: "20px",
              bgcolor: VIS_D.colors.ink,
              boxShadow: "none",
              "&:hover": { bgcolor: "#222", boxShadow: "none" },
            }}
          >
            Apply
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
