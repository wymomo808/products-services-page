import { useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  Divider,
  IconButton,
  Link,
  MenuItem,
  Select,
  Typography,
} from "@weave-mui/material";
import { selectVariants } from "@weave-mui/enums";
import { AlertS, CtaArrowRightS, PermissionGroupS } from "@weave-mui/icons-weave";
import AccountSearchField from "./AccountSearchField.jsx";
import ProductLockup from "./ProductLockup.jsx";
import { UM_PRODUCT_TYPE_FILTERS, UM_USER_DETAILS } from "./data.js";
import { FONT } from "./useAccountTheme.js";
import { VIS_D } from "./visdTokens.js";

const TYPE_LABELS = {
  products: "Product",
  apps: "App",
  integrations: "Integration",
  agents: "Agent",
  skills: "Skill",
  templates: "Template",
};

const filterSelectSx = {
  width: 320,
  flexShrink: 0,
  height: VIS_D.sizes.fieldHeight,
  bgcolor: VIS_D.colors.searchFill,
  borderRadius: `${VIS_D.radius.field}px`,
  ...VIS_D.typography.bodySmall,
  fontFamily: FONT,
  "& .MuiSelect-select": {
    py: "9px",
    color: VIS_D.colors.ink,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
  "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
};

const outlinedButtonSx = {
  ...VIS_D.typography.label14Semi,
  textTransform: "none",
  borderRadius: `${VIS_D.radius.button}px`,
  borderColor: VIS_D.colors.border,
  color: VIS_D.colors.ink,
  height: 36,
  whiteSpace: "nowrap",
  "&:hover": { borderColor: VIS_D.colors.ink, bgcolor: "transparent" },
};

function SegmentedControl({ options, value, onChange }) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        borderRadius: `${VIS_D.radius.field}px`,
        border: "1px solid rgba(204,204,204,0.4)",
        bgcolor: "rgba(204,204,204,0.2)",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {options.map((option) => {
        const active = option.id === value;
        return (
          <Box
            key={option.id}
            component="button"
            type="button"
            onClick={() => onChange(option.id)}
            sx={{
              border: "none",
              cursor: "pointer",
              fontFamily: FONT,
              ...VIS_D.typography.label14Semi,
              px: "16px",
              py: "7px",
              bgcolor: active ? VIS_D.colors.background : "transparent",
              color: active ? VIS_D.colors.ink : VIS_D.colors.textLight,
              boxShadow: active ? `inset 0 0 0 1px ${VIS_D.colors.ink}` : "none",
            }}
          >
            {option.label}
          </Box>
        );
      })}
    </Box>
  );
}

function InfoRow({ label, value }) {
  return (
    <Typography sx={{ ...VIS_D.typography.bodySmall, color: VIS_D.colors.ink }}>
      <Box component="span" sx={{ fontWeight: 600 }}>
        {label}
      </Box>{" "}
      <Box component="span" sx={{ color: VIS_D.colors.textLight }}>
        {value}
      </Box>
    </Typography>
  );
}

function ContentTypeBadge({ category }) {
  const label = TYPE_LABELS[category];
  if (!label) return null;

  return (
    <Box
      sx={{
        ...VIS_D.typography.smallprint,
        fontWeight: 600,
        color: VIS_D.colors.textLight,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
      }}
    >
      {label}
    </Box>
  );
}

function ProductRow({ product, onAction }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        px: "24px",
        py: "16px",
        borderBottom: `1px solid ${VIS_D.colors.rowDivider}`,
        "&:last-of-type": { borderBottom: "none" },
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ mb: "8px" }}>
          <ContentTypeBadge category={product.category} />
        </Box>
        <ProductLockup
          name={product.name}
          tint={product.logoSrc ? undefined : product.tint}
          logoSrc={product.logoSrc}
          abbr={product.abbr}
          size={32}
          nameSize={16}
          nameWeight={700}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
        <PermissionGroupS sx={{ width: 20, height: 20, color: VIS_D.colors.textLight }} />
        <Button
          variant="outlined"
          onClick={() => onAction(`Unassign ${product.name}`)}
          sx={outlinedButtonSx}
        >
          Unassign
        </Button>
        <IconButton aria-label={`View ${product.name}`} size="small" onClick={() => onAction(`View ${product.name}`)}>
          <CtaArrowRightS sx={{ width: 16, height: 16 }} />
        </IconButton>
      </Box>
    </Box>
  );
}

export default function UserDetail({ user, onBack, onAction }) {
  const detail = UM_USER_DETAILS[user.id];
  const [assignmentTab, setAssignmentTab] = useState("assigned");
  const [types, setTypes] = useState(["all"]);
  const [query, setQuery] = useState("");

  const assignedCount = detail?.assignedProducts.length ?? 0;
  const unassignedCount = detail?.unassignedCount ?? 0;

  const assignmentOptions = useMemo(
    () => [
      { id: "assigned", label: `Assigned (${assignedCount})` },
      { id: "unassigned", label: `Unassigned (${unassignedCount})` },
    ],
    [assignedCount, unassignedCount]
  );

  const products = useMemo(() => {
    if (!detail) return [];
    const source =
      assignmentTab === "assigned" ? detail.assignedProducts : detail.unassignedProducts;
    const byType = types.includes("all")
      ? source
      : source.filter((product) => types.includes(product.category));
    const q = query.trim().toLowerCase();
    return byType.filter((product) => !q || product.name.toLowerCase().includes(q));
  }, [assignmentTab, detail, query, types]);

  const handleTypeChange = (event) => {
    const value = event.target.value;
    const addedAll = value.includes("all") && !types.includes("all");
    if (addedAll || value.length === 0) {
      setTypes(["all"]);
      return;
    }
    const specifics = value.filter((item) => item !== "all");
    setTypes(specifics.length ? specifics : ["all"]);
  };

  const renderTypeValue = (selected) => {
    const label =
      selected.includes("all") || selected.length === 0
        ? "All"
        : UM_PRODUCT_TYPE_FILTERS.filter((filter) => selected.includes(filter.id))
            .map((filter) => filter.label)
            .join(", ");
    return `Show: ${label}`;
  };

  if (!detail) {
    return (
      <Box sx={{ py: "64px", textAlign: "center" }}>
        <Typography sx={{ ...VIS_D.typography.headlineSmall, mb: "8px" }}>User not found</Typography>
        <Link component="button" underline="hover" onClick={onBack} sx={{ ...VIS_D.typography.label14Semi }}>
          Back to users
        </Link>
      </Box>
    );
  }

  return (
    <>
      <Breadcrumbs
        separator="/"
        aria-label="breadcrumb"
        sx={{ mb: "20px", "& .MuiBreadcrumbs-separator": { color: VIS_D.colors.textLight } }}
      >
        <Link
          component="button"
          underline="hover"
          onClick={onBack}
          sx={{ ...VIS_D.typography.bodySmall, color: VIS_D.colors.textLight }}
        >
          User management by user
        </Link>
        <Typography sx={{ ...VIS_D.typography.bodySmall, color: VIS_D.colors.ink }}>
          {detail.displayName}
        </Typography>
      </Breadcrumbs>

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
        <Box sx={{ display: "flex", alignItems: "center", gap: "16px", minWidth: 0 }}>
          <Avatar sx={{ width: 64, height: 64, bgcolor: "#BDBDBD", fontSize: "20px", flexShrink: 0 }}>
            {user.name
              .split(/\s+/)
              .slice(0, 2)
              .map((part) => part[0])
              .join("")
              .toUpperCase()}
          </Avatar>
          <Box>
            <Typography
              component="h1"
              sx={{ ...VIS_D.typography.pageTitle, fontSize: "28px", fontWeight: 800, mb: "4px" }}
            >
              {detail.displayName}
            </Typography>
            <Box sx={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <Typography sx={{ ...VIS_D.typography.bodySmall, color: VIS_D.colors.textLight }}>
                {user.role}
              </Typography>
              <AlertS sx={{ width: 14, height: 14, color: VIS_D.colors.warning }} />
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <Button variant="outlined" onClick={() => onAction("Change role")} sx={outlinedButtonSx}>
            Change role
          </Button>
          <Button variant="outlined" onClick={() => onAction("Edit assigned groups")} sx={outlinedButtonSx}>
            Edit assigned groups
          </Button>
          <Button variant="outlined" onClick={() => onAction("Remove user")} sx={outlinedButtonSx}>
            Remove user
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          border: `1px solid ${VIS_D.colors.border}`,
          borderRadius: `${VIS_D.radius.card}px`,
          p: "24px",
          mb: "24px",
        }}
      >
        <Typography sx={{ ...VIS_D.typography.bodySmall, color: VIS_D.colors.ink, mb: "16px" }}>
          <Box component="span" sx={{ fontWeight: 600 }}>
            Assigned groups
          </Box>{" "}
          <Box component="span" sx={{ color: VIS_D.colors.textLight }}>
            {detail.groups.join(", ")}
          </Box>
        </Typography>
        <Divider sx={{ mb: "16px", borderColor: VIS_D.colors.border }} />
        <Box sx={{ display: "grid", gap: "8px" }}>
          <InfoRow label="Email" value={user.email} />
          <InfoRow label="Autodesk ID" value={detail.autodeskId} />
          <InfoRow label="Account status" value={user.status} />
          <InfoRow label="Added to team" value={detail.addedToTeam} />
        </Box>
      </Box>

      <Box
        sx={{
          border: `1px solid ${VIS_D.colors.border}`,
          borderRadius: `${VIS_D.radius.card}px`,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            px: "24px",
            py: "16px",
            borderBottom: `1px solid ${VIS_D.colors.border}`,
            flexWrap: "wrap",
          }}
        >
          <SegmentedControl options={assignmentOptions} value={assignmentTab} onChange={setAssignmentTab} />
          <AccountSearchField
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            sx={{ width: 280, flex: "none" }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            px: "24px",
            py: "12px",
            borderBottom: `1px solid ${VIS_D.colors.border}`,
            bgcolor: VIS_D.colors.backgroundPanel,
            flexWrap: "wrap",
          }}
        >
          <Select
            multiple
            value={types}
            onChange={handleTypeChange}
            variant={selectVariants.BOX}
            size="small"
            displayEmpty
            aria-label="Filter by content type"
            renderValue={renderTypeValue}
            MenuProps={{ PaperProps: { sx: { mt: "4px" } } }}
            sx={filterSelectSx}
          >
            {UM_PRODUCT_TYPE_FILTERS.map((filter) => {
              const checked = filter.id === "all" ? types.includes("all") : types.includes(filter.id);
              return (
                <MenuItem
                  key={filter.id}
                  value={filter.id}
                  sx={{ display: "flex", alignItems: "center", gap: "10px", py: "6px" }}
                >
                  <Checkbox checked={checked} sx={{ p: 0 }} />
                  <Typography component="span" sx={{ ...VIS_D.typography.bodySmall, fontFamily: FONT }}>
                    {filter.label}
                  </Typography>
                </MenuItem>
              );
            })}
          </Select>
        </Box>

        {products.length > 0 ? (
          products.map((product) => (
            <ProductRow key={product.id} product={product} onAction={onAction} />
          ))
        ) : (
          <Box sx={{ px: "24px", py: "48px", textAlign: "center" }}>
            <Typography sx={{ ...VIS_D.typography.bodyMedium, color: VIS_D.colors.textPrimary }}>
              No products match your filters.
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
}
