import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  MenuItem,
  Select,
  Typography,
} from "@weave-mui/material";
import { selectVariants } from "@weave-mui/enums";
import { CaretDownS, CaretRightS } from "@weave-mui/icons-weave";
import SplitInstallDownloadButton from "./SplitInstallDownloadButton.jsx";
import { VIS_D } from "./visdTokens.js";

const FONT = VIS_D.font.element;

const underlinedFieldSx = {
  width: 241,
  maxWidth: "100%",
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
      color: VIS_D.colors.ink,
      ...VIS_D.typography.label16Semi,
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
  minWidth: 64,
  boxShadow: "none",
  "&:hover": { borderColor: VIS_D.colors.ink, bgcolor: VIS_D.colors.searchFill, boxShadow: "none" },
};

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
            borderBottom: "1px solid #808080",
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
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2px",
                    justifyContent: col.align === "right" ? "flex-end" : "flex-start",
                  }}
                >
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
              {row.releaseNotes ? (
                <Link
                  component="button"
                  underline="always"
                  onClick={() => onAction(`Release notes — ${row.name}`)}
                  sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT, color: VIS_D.colors.ink, p: 0 }}
                >
                  Release notes
                </Link>
              ) : null}
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
                <CaretRightS sx={{ width: 16, height: 16, display: "block" }} />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default function ProductDownloadsSection({ config, productName, onAction }) {
  const [year, setYear] = useState(config.defaultYear);
  const [platform, setPlatform] = useState(config.defaultPlatform);
  const [language, setLanguage] = useState(config.defaultLanguage);
  const [category, setCategory] = useState(config.defaultCategory);

  const activeCategory = config.downloadCategories.find((item) => item.id === category);
  const downloads = useMemo(() => {
    const items = config.downloadsByCategory[category] || [];
    return items.map((item) => ({
      ...item,
      name: item.name.replace("{year}", year),
    }));
  }, [category, config.downloadsByCategory, year]);

  const latestVersion = (config.latestVersionLabel || `${productName} {year}.2 Update`).replace("{year}", year);
  const countLabel = `${downloads.length} ${activeCategory?.label?.toLowerCase() ?? "items"} available for download`;

  return (
    <Box
      sx={{
        borderRadius: `${VIS_D.radius.card}px`,
        bgcolor: VIS_D.colors.background,
        boxShadow: `inset 0 0 0 1px ${VIS_D.colors.border}`,
        overflow: "hidden",
      }}
    >
      <YearTabs years={config.years} value={year} onChange={setYear} />

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
          <Select
            value={platform}
            onChange={(event) => setPlatform(event.target.value)}
            variant={selectVariants.BOX}
            size="small"
            sx={underlinedFieldSx}
            MenuProps={{ PaperProps: { sx: { mt: "4px" } } }}
          >
            {config.platforms.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>

          <Select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            variant={selectVariants.BOX}
            size="small"
            sx={underlinedFieldSx}
            MenuProps={{ PaperProps: { sx: { mt: "4px" } } }}
          >
            {config.languages.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <SplitInstallDownloadButton
          label="Download"
          onPrimaryClick={() => onAction(`Download — ${productName} ${year}`)}
          onMenuClick={() => onAction(`Download options — ${productName} ${year}`)}
          menuAriaLabel="More download options"
          sx={{ mb: "12px" }}
        />

        <Typography sx={{ ...VIS_D.typography.smallprint, fontFamily: FONT, color: VIS_D.colors.ink, mb: "20px" }}>
          Downloads latest version:{" "}
          <Link
            component="button"
            underline="always"
            onClick={() => onAction(`Latest version — ${latestVersion}`)}
            sx={{ ...VIS_D.typography.smallprint, fontFamily: FONT, color: VIS_D.colors.ink }}
          >
            {latestVersion}
          </Link>
        </Typography>

        <Divider sx={{ borderColor: VIS_D.colors.rowDivider, mb: "24px" }} />

        <Typography sx={{ ...VIS_D.typography.headlineSmall, fontFamily: FONT, fontWeight: 700, mb: "16px" }}>
          Available downloads
        </Typography>

        <Box sx={{ mb: "16px" }}>
          <SegmentedControl options={config.downloadCategories} value={category} onChange={setCategory} />
        </Box>

        <Typography sx={{ ...VIS_D.typography.bodySmall, fontFamily: FONT, mb: "8px", lineHeight: 1.25 }}>
          {countLabel}
        </Typography>

        <DownloadsTable rows={downloads} onAction={onAction} />
      </Box>
    </Box>
  );
}
