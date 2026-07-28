import { useMemo, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  Link,
  MenuItem,
  Select,
  Typography,
} from "@weave-mui/material";
import { buttonGroupKind, selectVariants } from "@weave-mui/enums";
import { CaretDownS } from "@weave-mui/icons-weave";
import { FigmaCtaArrowRight } from "./BillingIcons.jsx";
import { AUTOCAD_DETAIL, getAdminAutocadDiscoverSolutions, getRelatedMyProductsSolutions, getUserAutocadDiscoverSolutions, getUserAutocadOwnedSolutions } from "./data.js";
import { DiscoverAutocadSolutionsSection, YourAutocadSolutionsSection } from "./AutocadSolutionsSections.jsx";
import AppManagementSummary from "./AppManagementSummary.jsx";
import ProductLockup from "./ProductLockup.jsx";
import { VIS_D } from "./visdTokens.js";

const FONT = VIS_D.font.element;

const textLinkSx = {
  ...VIS_D.typography.bodyMedium,
  fontFamily: FONT,
  color: VIS_D.colors.ink,
  textDecoration: "underline",
  cursor: "pointer",
  display: "block",
  textAlign: "left",
  p: 0,
  border: "none",
  background: "none",
};

const underlinedFieldSx = {
  width: 241,
  maxWidth: "100%",
  "& .MuiInputLabel-root": {
    ...VIS_D.typography.smallprint,
    fontFamily: FONT,
    color: VIS_D.colors.ink,
    mb: "4px",
    position: "relative",
    transform: "none",
  },
  "& .MuiOutlinedInput-root": {
    height: VIS_D.sizes.fieldHeight,
    borderRadius: `${VIS_D.radius.field}px ${VIS_D.radius.field}px 0 0`,
    bgcolor: VIS_D.colors.background,
    fontFamily: FONT,
    boxShadow: `inset 0 0 0 1px rgba(0,0,0,0.3), inset 0 -1px 0 0 ${VIS_D.colors.ink}`,
    "& fieldset": { border: "none" },
    "& .MuiSelect-select": {
      py: "9px",
      px: "12px",
      color: VIS_D.colors.textLight,
      ...VIS_D.typography.bodyMedium,
    },
  },
};

const outlineBtnSx = {
  ...VIS_D.typography.label14Semi,
  fontFamily: FONT,
  textTransform: "none",
  color: VIS_D.colors.ink,
  borderColor: VIS_D.colors.ink,
  borderRadius: `${VIS_D.radius.button}px`,
  px: "12px",
  py: "4px",
  boxShadow: "none",
  "&:hover": { borderColor: VIS_D.colors.ink, bgcolor: VIS_D.colors.searchFill, boxShadow: "none" },
};

function TextLink({ children, onClick }) {
  return (
    <Link component="button" underline="always" onClick={onClick} sx={textLinkSx}>
      {children}
    </Link>
  );
}

function YearTabs({ years, value, onChange }) {
  return (
    <Box
      sx={{
        display: "flex",
        borderBottom: `1px solid ${VIS_D.colors.rowDivider}`,
        px: "8px",
      }}
    >
      {years.map((y) => {
        const active = y === value;
        return (
          <Box
            key={y}
            component="button"
            type="button"
            onClick={() => onChange(y)}
            sx={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontFamily: FONT,
              ...VIS_D.typography.label16Semi,
              color: active ? VIS_D.colors.ink : VIS_D.colors.textLight,
              px: "16px",
              py: "12px",
              boxShadow: active ? `inset 0 -2px 0 0 ${VIS_D.colors.ink}` : "none",
            }}
          >
            {y}
          </Box>
        );
      })}
    </Box>
  );
}

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

function DownloadsTable({ rows, onAction }) {
  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Box sx={{ minWidth: 760 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "minmax(200px, 1.4fr) 114px minmax(120px, 1fr) 132px minmax(180px, 1.2fr)",
            borderBottom: `1px solid #808080`,
          }}
        >
          {[
            { label: "Name", sort: true },
            { label: "Date" },
            { label: "File Size", align: "right" },
            { label: "" },
            { label: "" },
          ].map((col, index) => (
            <Box key={`header-${index}`} sx={{ py: "18px", pr: "16px", pl: col.sort ? "16px" : 0 }}>
              {col.label && (
                <Box sx={{ display: "flex", alignItems: "center", gap: "2px", justifyContent: col.align === "right" ? "flex-end" : "flex-start" }}>
                  <Typography sx={{ ...VIS_D.typography.label16Semi, fontFamily: FONT, fontWeight: 700 }}>
                    {col.label}
                  </Typography>
                  {col.sort && <CaretDownS sx={{ width: 20, height: 20, color: VIS_D.colors.ink }} />}
                </Box>
              )}
            </Box>
          ))}
        </Box>

        {rows.map((row, index) => (
          <Box
            key={row.id}
            sx={{
              display: "grid",
              gridTemplateColumns: "minmax(200px, 1.4fr) 114px minmax(120px, 1fr) 132px minmax(180px, 1.2fr)",
              minHeight: 72,
              alignItems: "center",
              borderBottom: index < rows.length - 1 ? `1px solid ${VIS_D.colors.rowDivider}` : "none",
            }}
          >
            <Typography sx={{ ...VIS_D.typography.label16Semi, fontFamily: FONT, fontWeight: 700, pl: "16px", pr: "16px" }}>
              {row.name}
            </Typography>
            <Typography sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT, pr: "16px" }}>{row.date}</Typography>
            <Typography
              sx={{
                ...VIS_D.typography.bodyMedium,
                fontFamily: FONT,
                pr: "16px",
                textAlign: "right",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {row.size}
            </Typography>
            <Box sx={{ pr: "16px" }}>
              {row.releaseNotes && (
                <Link
                  component="button"
                  underline="always"
                  onClick={() => onAction(`Release notes — ${row.name}`)}
                  sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT, color: VIS_D.colors.ink, p: 0 }}
                >
                  Release notes
                </Link>
              )}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px", pr: "16px" }}>
              <Button variant="outlined" onClick={() => onAction(`Download — ${row.name}`)} sx={outlineBtnSx}>
                Download
              </Button>
              <IconButton
                aria-label={`More options for ${row.name}`}
                size="small"
                onClick={() => onAction(`More — ${row.name}`)}
                sx={{ color: VIS_D.colors.ink }}
              >
                <FigmaCtaArrowRight size={20} />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default function AutodeskProductDetail({
  product,
  detail = AUTOCAD_DETAIL,
  onBack,
  onAction,
  onViewDetails,
  onViewOrgApproved,
  isUserView = false,
}) {
  const [year, setYear] = useState(detail.defaultYear);
  const [platform, setPlatform] = useState(detail.defaultPlatform);
  const [language, setLanguage] = useState(detail.defaultLanguage);
  const [category, setCategory] = useState(detail.defaultCategory);

  const relatedSolutions = useMemo(() => {
    if (isUserView && product.id === "autocad") {
      return getUserAutocadOwnedSolutions();
    }
    return getRelatedMyProductsSolutions(product);
  }, [isUserView, product]);
  const autocadDiscoverRows = useMemo(() => {
    if (product.id !== "autocad") return null;
    return isUserView ? getUserAutocadDiscoverSolutions() : getAdminAutocadDiscoverSolutions();
  }, [isUserView, product.id]);

  const activeCategory = detail.downloadCategories.find((c) => c.id === category);
  const downloads = useMemo(() => {
    const items = detail.downloadsByCategory[category] || [];
    return items.map((item) => ({
      ...item,
      name: item.name.replace("{year}", year),
    }));
  }, [category, year]);

  const countLabel = `${downloads.length} ${activeCategory?.label ?? "Items"} available for download`;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "36px" }}>
      <Link
        component="button"
        underline="none"
        onClick={onBack}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          color: VIS_D.colors.ink,
          ...VIS_D.typography.bodySmall,
          fontFamily: FONT,
          alignSelf: "flex-start",
        }}
      >
        <FigmaCtaArrowRight size={20} sx={{ transform: "rotate(180deg)" }} />
        Back to my products & solutions
      </Link>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "24px",
        }}
      >
        <Box sx={{ flex: 1, minWidth: 280, maxWidth: 640 }}>
          <ProductLockup
            logoSrc={product.logo}
            tint={product.tint}
            icon={product.icon}
            name={product.name}
            size={60}
            nameSize={34}
            nameWeight={800}
          />
          <Typography sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT, mt: "16px", maxWidth: 640 }}>
            {product.description}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-start", pt: "8px" }}>
          <TextLink onClick={() => onAction("View subscriptions")}>View subscriptions</TextLink>
          <TextLink onClick={() => onAction("View product assignment")}>View product assignment</TextLink>
        </Box>
      </Box>

      <Box sx={{ mb: "32px" }}>
        {isUserView ? (
          <AppManagementSummary
            updatesOnly
            updateStatus={detail.updateStatus}
            onViewUpdates={() => onAction("View updates")}
          />
        ) : (
          <AppManagementSummary
            purchase={detail.purchase}
            subscriptionSummary={detail.subscriptionSummary}
            subscriptionExpiry={detail.subscriptionExpiry}
            updateStatus={detail.updateStatus}
            assignment={detail.assignment}
            availableSeats={detail.availableSeats}
            onViewSubscription={() => onAction("View subscription")}
            onAssignUsers={() => onAction("Assign users")}
            onViewUpdates={() => onAction("View updates")}
          />
        )}
      </Box>

      {/* Version + downloads card */}
      <Box
        sx={{
          borderRadius: `${VIS_D.radius.card}px`,
          bgcolor: VIS_D.colors.background,
          boxShadow: `inset 0 0 0 1px ${VIS_D.colors.border}`,
          overflow: "hidden",
        }}
      >
        <YearTabs years={detail.years} value={year} onChange={setYear} />

        <Box sx={{ p: "16px" }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              gap: "16px",
              mb: "20px",
              maxWidth: 498,
            }}
          >
            <Box>
              <Typography
                component="label"
                sx={{ ...VIS_D.typography.smallprint, fontFamily: FONT, mb: "4px", display: "block" }}
              >
                Platform
              </Typography>
              <Select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                variant={selectVariants.BOX}
                size="small"
                sx={underlinedFieldSx}
                MenuProps={{ PaperProps: { sx: { mt: "4px" } } }}
              >
                {detail.platforms.map((p) => (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <Box>
              <Typography
                component="label"
                sx={{ ...VIS_D.typography.smallprint, fontFamily: FONT, mb: "4px", display: "block" }}
              >
                Language
              </Typography>
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                variant={selectVariants.BOX}
                size="small"
                sx={underlinedFieldSx}
                MenuProps={{ PaperProps: { sx: { mt: "4px" } } }}
              >
                {detail.languages.map((lang) => (
                  <MenuItem key={lang} value={lang}>
                    {lang}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              mb: "20px",
            }}
          >
            <ButtonGroup kind={buttonGroupKind.SPLIT} sx={{ width: 241, maxWidth: "100%" }}>
              <Button
                variant="contained"
                onClick={() => onAction(`Install — ${product.name} ${year}`)}
                sx={{
                  ...VIS_D.typography.label14Semi,
                  fontFamily: FONT,
                  textTransform: "none",
                  flex: 1,
                  height: 32,
                  bgcolor: VIS_D.colors.ink,
                  boxShadow: "none",
                  borderRadius: `${VIS_D.radius.button}px 0 0 ${VIS_D.radius.button}px`,
                  "&:hover": { bgcolor: "#222", boxShadow: "none" },
                }}
              >
                Install
              </Button>
              <Button
                variant="contained"
                aria-label="More install options"
                onClick={() => onAction(`Install options — ${product.name} ${year}`)}
                sx={{
                  height: 32,
                  minWidth: 34,
                  px: 0,
                  bgcolor: VIS_D.colors.ink,
                  boxShadow: "none",
                  borderRadius: `0 ${VIS_D.radius.button}px ${VIS_D.radius.button}px 0`,
                  "&:hover": { bgcolor: "#222", boxShadow: "none" },
                }}
              >
                <CaretDownS sx={{ width: 16, height: 16, color: "#fff" }} />
              </Button>
            </ButtonGroup>

            <TextLink onClick={() => onAction("License details")}>License details</TextLink>
          </Box>

          <Divider sx={{ borderColor: VIS_D.colors.rowDivider, mb: "24px" }} />

          <Typography sx={{ ...VIS_D.typography.headlineSmall, fontFamily: FONT, fontWeight: 700, mb: "16px" }}>
            Available Downloads
          </Typography>

          <Box
            sx={{
              border: `1px solid ${VIS_D.colors.border}`,
              borderRadius: `${VIS_D.radius.field}px`,
              p: "16px",
              mb: "24px",
            }}
          >
            <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px" }}>
              <SegmentedControl
                options={detail.downloadCategories}
                value={category}
                onChange={setCategory}
              />
              <Typography
                sx={{
                  ...VIS_D.typography.bodySmall,
                  fontFamily: FONT,
                  flex: 1,
                  minWidth: 200,
                  lineHeight: 1.25,
                }}
              >
                {activeCategory?.description}
              </Typography>
            </Box>
          </Box>

          <Typography sx={{ ...VIS_D.typography.bodySmall, fontFamily: FONT, mb: "8px", lineHeight: 1.25 }}>
            {countLabel}
          </Typography>

          <DownloadsTable rows={downloads} onAction={onAction} />
        </Box>
      </Box>

      <YourAutocadSolutionsSection
        products={relatedSolutions}
        productName={product.name}
        isUserView={isUserView}
        onAction={onAction}
        onViewDetails={onViewDetails}
      />

      {product.id === "autocad" && autocadDiscoverRows ? (
        <DiscoverAutocadSolutionsSection
          rows={autocadDiscoverRows}
          isUserView={isUserView}
          onAction={onAction}
          onViewDetails={onViewDetails}
          onViewOrgApproved={onViewOrgApproved}
        />
      ) : null}
    </Box>
  );
}
