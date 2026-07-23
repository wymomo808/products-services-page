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
import { AUTOCAD_DETAIL, PS_PRODUCTS } from "./data.js";
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

const sectionTitleSx = {
  ...VIS_D.typography.sectionTitle,
  fontFamily: FONT,
};

function StarIcon({ filled = true, size = 14 }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 16 16"
      aria-hidden
      sx={{ width: size, height: size, display: "block", flexShrink: 0 }}
    >
      <path
        fill={filled ? VIS_D.colors.warning : VIS_D.colors.panel}
        stroke={filled ? "none" : VIS_D.colors.textLight}
        strokeWidth={filled ? 0 : 1}
        d="M8 1.2l1.96 3.97 4.38.64-3.17 3.09.75 4.36L8 11.9l-3.92 2.06.75-4.36-3.17-3.09 4.38-.64L8 1.2z"
      />
    </Box>
  );
}

function StarRating({ rating, reviewCount }) {
  if (rating === undefined) return null;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: "2px" }} aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, index) => (
          <StarIcon key={index} filled={index < Math.round(rating)} size={14} />
        ))}
      </Box>
      <Typography sx={{ ...VIS_D.typography.smallprint, fontFamily: FONT, fontWeight: 600, color: VIS_D.colors.ink }}>
        {rating.toFixed(1)}
      </Typography>
      {reviewCount !== undefined && (
        <Typography sx={{ ...VIS_D.typography.smallprint, fontFamily: FONT, color: VIS_D.colors.textLight }}>
          ({reviewCount})
        </Typography>
      )}
    </Box>
  );
}

function RecommendedAppCard({ app, onAction, onViewDetails }) {
  const cta = "Get";
  return (
    <Box
      sx={{
        border: `1px solid ${VIS_D.colors.border}`,
        borderRadius: `${VIS_D.radius.card}px`,
        p: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        height: "100%",
        bgcolor: VIS_D.colors.background,
      }}
    >
      <ProductLockup tint={app.tint} name={app.name} size={30} nameSize={16} nameWeight={700} />
      <StarRating rating={app.rating} reviewCount={app.reviewCount} />
      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px" }}>
        <Typography sx={{ ...VIS_D.typography.smallprint, fontWeight: 600, color: VIS_D.colors.textLight }}>
          {app.vendor}
        </Typography>
        {(app.worksWith || []).map((w) => (
          <Box
            key={w}
            sx={{
              ...VIS_D.typography.smallprint,
              bgcolor: VIS_D.colors.panel,
              borderRadius: "4px",
              px: "8px",
              py: "2px",
            }}
          >
            {w}
          </Box>
        ))}
      </Box>
      <Typography sx={{ ...VIS_D.typography.bodySmall, color: VIS_D.colors.textPrimary, flex: 1 }}>
        {app.description}
      </Typography>
      <Button
        variant="contained"
        onClick={() => onAction(cta)}
        sx={{
          ...VIS_D.typography.label16Semi,
          fontFamily: FONT,
          textTransform: "none",
          alignSelf: "flex-start",
          bgcolor: VIS_D.colors.ink,
          boxShadow: "none",
          borderRadius: `${VIS_D.radius.button}px`,
          "&:hover": { bgcolor: "#222", boxShadow: "none" },
        }}
      >
        {cta}
      </Button>
      <Link
        component="button"
        underline="none"
        onClick={() => (onViewDetails ? onViewDetails(app) : onAction(`View details — ${app.name}`))}
        sx={{ display: "inline-flex", alignItems: "center", gap: "8px", color: VIS_D.colors.ink }}
      >
        <FigmaCtaArrowRight size={20} />
        <Typography component="span" sx={{ ...VIS_D.typography.bodySmall, fontFamily: FONT }}>
          View details
        </Typography>
      </Link>
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

export default function AutodeskProductDetail({ product, onBack, onAction, onViewAllApps, onViewDetails }) {
  const [year, setYear] = useState(AUTOCAD_DETAIL.defaultYear);
  const [platform, setPlatform] = useState(AUTOCAD_DETAIL.defaultPlatform);
  const [language, setLanguage] = useState(AUTOCAD_DETAIL.defaultLanguage);
  const [category, setCategory] = useState(AUTOCAD_DETAIL.defaultCategory);

  const recommendedApps = useMemo(
    () =>
      AUTOCAD_DETAIL.recommendedAppIds
        .map((id) => PS_PRODUCTS.find((item) => item.id === id))
        .filter(Boolean),
    []
  );

  const activeCategory = AUTOCAD_DETAIL.downloadCategories.find((c) => c.id === category);
  const downloads = useMemo(() => {
    const items = AUTOCAD_DETAIL.downloadsByCategory[category] || [];
    return items.map((item) => ({
      ...item,
      name: item.name.replace("{year}", year),
    }));
  }, [category, year]);

  const countLabel = `${downloads.length} ${activeCategory?.label ?? "Items"} available for download`;

  return (
    <Box>
      {/* Product header — Figma deprecated/header */}
      <IconButton
        aria-label="Back to all products & solutions"
        onClick={onBack}
        sx={{ mb: "24px", color: VIS_D.colors.ink, p: 0 }}
      >
        <FigmaCtaArrowRight size={24} sx={{ transform: "rotate(180deg)" }} />
      </IconButton>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "24px",
          mb: "32px",
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

      {/* Version + downloads card */}
      <Box
        sx={{
          borderRadius: `${VIS_D.radius.card}px`,
          bgcolor: VIS_D.colors.background,
          boxShadow: `inset 0 0 0 1px ${VIS_D.colors.border}`,
          overflow: "hidden",
        }}
      >
        <YearTabs years={AUTOCAD_DETAIL.years} value={year} onChange={setYear} />

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
                {AUTOCAD_DETAIL.platforms.map((p) => (
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
                {AUTOCAD_DETAIL.languages.map((lang) => (
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
                onClick={() => onAction(`Install — AutoCAD ${year}`)}
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
                onClick={() => onAction(`Install options — AutoCAD ${year}`)}
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
                options={AUTOCAD_DETAIL.downloadCategories}
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

      <Box sx={{ mt: "40px" }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: "16px",
            mb: "16px",
          }}
        >
          <Typography component="h2" sx={sectionTitleSx}>
            Marketplace solutions that work with {product.name}
          </Typography>
          <Link
            component="button"
            underline="none"
            onClick={() => (onViewAllApps ? onViewAllApps() : onAction("View all apps"))}
            sx={{ display: "inline-flex", alignItems: "center", gap: "8px", color: VIS_D.colors.ink }}
          >
            <Typography component="span" sx={{ ...VIS_D.typography.bodySmall, fontFamily: FONT }}>
              View all apps
            </Typography>
            <FigmaCtaArrowRight size={16} />
          </Link>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, minmax(0, 1fr))" },
            gap: "19px",
          }}
        >
          {recommendedApps.map((app) => (
            <RecommendedAppCard
              key={app.id}
              app={app}
              onAction={onAction}
              onViewDetails={onViewDetails}
            />
          ))}
        </Box>
      </Box>

      <Divider sx={{ borderColor: VIS_D.colors.rowDivider, my: "32px" }} />

      <Link
        component="button"
        underline="none"
        onClick={onBack}
        sx={{ display: "inline-flex", alignItems: "center", gap: "8px", color: VIS_D.colors.ink }}
      >
        <FigmaCtaArrowRight size={20} sx={{ transform: "rotate(180deg)" }} />
        <Typography component="span" sx={{ ...VIS_D.typography.bodySmall, fontFamily: FONT }}>
          Back to all products & solutions
        </Typography>
      </Link>
    </Box>
  );
}
