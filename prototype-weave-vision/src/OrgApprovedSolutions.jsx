import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Box, Button, Checkbox, IconButton, MenuItem, Select, Typography } from "@weave-mui/material";
import { selectVariants } from "@weave-mui/enums";
import { CaretLeftS, CaretRightS } from "@weave-mui/icons-weave";
import AccountSearchField, { SearchFilterBar } from "./AccountSearchField.jsx";
import CardViewDetailsFooter from "./CardViewDetailsFooter.jsx";
import { FigmaCtaArrowRight } from "./BillingIcons.jsx";
import { ORG_APPROVED_SOLUTIONS, ORG_TYPE_FILTERS, PS_PRODUCTS, PS_SORT_OPTIONS } from "./data.js";
import AutodeskBadge from "./AutodeskBadge.jsx";
import ProductLockup from "./ProductLockup.jsx";
import StarRating from "./StarRating.jsx";
import { SecurityReviewedBadge } from "./TrustBadges.jsx";
import { FONT } from "./useAccountTheme.js";
import { VIS_D } from "./visdTokens.js";

function productName(id) {
  return PS_PRODUCTS.find((p) => p.id === id)?.name ?? id;
}

function solutionProduct(id) {
  return PS_PRODUCTS.find((p) => p.id === id);
}

function OrgApprovedSolutionCard({ row, onAction, onViewDetails, ctaLabel = "Get" }) {
  const product = solutionProduct(row.id);
  const worksWithLabels = product?.worksWith ?? row.worksWith.map(productName);
  const rating = row.rating ?? product?.rating;
  const reviewCount = row.reviewCount ?? product?.reviewCount;
  const showAutodeskBadge = product?.isAutodesk;
  const showSecurityBadge =
    row.trust?.includes("Security reviewed") || product?.trust?.includes("Security reviewed");

  const handleViewDetails = () => {
    if (!product) {
      onAction(`View details — ${row.name}`);
      return;
    }
    if (onViewDetails) {
      onViewDetails(product);
      return;
    }
    onAction(`View details — ${row.name}`);
  };

  return (
    <Box
      sx={{
        bgcolor: VIS_D.colors.background,
        borderRadius: `${VIS_D.radius.card}px`,
        boxShadow: `inset 0 0 0 1px ${VIS_D.colors.border}`,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {showAutodeskBadge ? (
        <Box sx={{ position: "absolute", top: "24px", right: "24px", zIndex: 1 }}>
          <AutodeskBadge />
        </Box>
      ) : null}

      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px", flex: 1, p: "24px" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px", pr: showAutodeskBadge ? "44px" : 0 }}>
          <Typography
            sx={{
              ...VIS_D.typography.smallprint,
              fontWeight: 600,
              color: VIS_D.colors.textLight,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            {row.type}
          </Typography>
          <ProductLockup
            logoSrc={product?.logo}
            tint={product?.tint}
            icon={product?.icon}
            name={row.name}
            size={30}
            nameWeight={700}
          />
        </Box>

        {rating !== undefined ? (
          <StarRating rating={rating} reviewCount={reviewCount} />
        ) : null}

        {showSecurityBadge || worksWithLabels.length ? (
          <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px" }}>
            {showSecurityBadge ? <SecurityReviewedBadge /> : null}
            {worksWithLabels.map((label) => (
              <Box
                key={label}
                sx={{
                  ...VIS_D.typography.smallprint,
                  color: VIS_D.colors.text,
                  bgcolor: VIS_D.colors.panel,
                  borderRadius: "4px",
                  px: "8px",
                  py: "2px",
                }}
              >
                {label}
              </Box>
            ))}
          </Box>
        ) : null}

        {product?.description ? (
          <Typography sx={{ ...VIS_D.typography.bodySmall, color: VIS_D.colors.textPrimary, flex: 1 }}>
            {product.description}
          </Typography>
        ) : null}

        <Typography sx={{ ...VIS_D.typography.headlineSmall, fontFamily: FONT, fontWeight: 800 }}>
          {row.price}
        </Typography>

        <Button
          variant="contained"
          onClick={() => onAction(`${ctaLabel} — ${row.name}`)}
          sx={{
            ...VIS_D.typography.label14Semi,
            fontFamily: FONT,
            textTransform: "none",
            alignSelf: "flex-start",
            bgcolor: VIS_D.colors.ink,
            boxShadow: "none",
            borderRadius: `${VIS_D.radius.button}px`,
            "&:hover": { bgcolor: "#222", boxShadow: "none" },
          }}
        >
          {ctaLabel}
        </Button>
      </Box>

      <CardViewDetailsFooter onClick={handleViewDetails} />
    </Box>
  );
}

const viewMoreButtonSx = {
  ...VIS_D.typography.label14Semi,
  fontFamily: FONT,
  textTransform: "none",
  color: VIS_D.colors.ink,
  borderColor: VIS_D.colors.ink,
  borderRadius: `${VIS_D.radius.button}px`,
  px: "16px",
  py: "8px",
  boxShadow: "none",
  gap: "8px",
  "&:hover": { borderColor: VIS_D.colors.ink, bgcolor: VIS_D.colors.searchFill, boxShadow: "none" },
};

const carouselCaretSx = {
  flexShrink: 0,
  width: 40,
  height: 40,
  color: VIS_D.colors.ink,
  border: `1px solid ${VIS_D.colors.border}`,
  borderRadius: `${VIS_D.radius.button}px`,
  bgcolor: VIS_D.colors.background,
  "&:hover": { bgcolor: VIS_D.colors.panel },
  "&.Mui-disabled": { color: VIS_D.colors.disabled, borderColor: VIS_D.colors.border },
};

function SolutionCarousel({ rows, onAction, onViewDetails, ctaLabel = "Get", visibleCount = 3 }) {
  const gap = 19;
  const fallbackSlideWidth = `calc((100% - ${gap * (visibleCount - 1)}px) / ${visibleCount})`;
  const viewportRef = useRef(null);
  const scrollRef = useRef(null);
  const [slideWidth, setSlideWidth] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < maxScroll - 4);
  };

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;

    const measure = () => {
      setSlideWidth((viewport.clientWidth - gap * (visibleCount - 1)) / visibleCount);
      window.requestAnimationFrame(updateScrollState);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [rows.length, visibleCount]);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return undefined;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [slideWidth, rows.length]);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el || !slideWidth) return;
    el.scrollBy({ left: direction * (slideWidth + gap), behavior: "smooth" });
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <IconButton
        aria-label="Previous solutions"
        onClick={() => scroll(-1)}
        disabled={!canScrollLeft}
        sx={carouselCaretSx}
      >
        <CaretLeftS sx={{ width: 20, height: 20 }} />
      </IconButton>

      <Box ref={viewportRef} sx={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            gap: "19px",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
            "&::-webkit-scrollbar": { display: "none" },
            py: "4px",
          }}
        >
          {rows.map((row) => (
            <Box
              key={row.id}
              data-carousel-card
              sx={{
                flex: slideWidth ? `0 0 ${slideWidth}px` : `0 0 ${fallbackSlideWidth}`,
                minWidth: slideWidth ?? 280,
                scrollSnapAlign: "start",
              }}
            >
              <OrgApprovedSolutionCard
                row={row}
                onAction={onAction}
                onViewDetails={onViewDetails}
                ctaLabel={ctaLabel}
              />
            </Box>
          ))}
        </Box>
      </Box>

      <IconButton
        aria-label="Next solutions"
        onClick={() => scroll(1)}
        disabled={!canScrollRight}
        sx={carouselCaretSx}
      >
        <CaretRightS sx={{ width: 20, height: 20 }} />
      </IconButton>
    </Box>
  );
}

export { OrgApprovedSolutionCard, SolutionCarousel };

export default function OrgApprovedSolutions({
  onAction,
  onViewDetails,
  filterProductId,
  title,
  layout = "grid",
  onViewMore,
}) {
  const isCarousel = layout === "carousel";
  const [query, setQuery] = useState("");
  const [types, setTypes] = useState(["all"]);
  const [sort, setSort] = useState("latest");

  const handleTypeChange = (event) => {
    const value = event.target.value;
    const addedAll = value.includes("all") && !types.includes("all");
    if (addedAll || value.length === 0) {
      setTypes(["all"]);
      return;
    }
    const specifics = value.filter((v) => v !== "all");
    setTypes(specifics.length ? specifics : ["all"]);
  };

  const renderTypeValue = (selected) => {
    const label =
      selected.includes("all") || selected.length === 0
        ? "All solutions"
        : ORG_TYPE_FILTERS.filter((f) => selected.includes(f.id))
            .map((f) => f.label)
            .join(", ");
    return `Filters: ${label}`;
  };

  const rows = useMemo(() => {
    let list = filterProductId
      ? ORG_APPROVED_SOLUTIONS.filter((s) => s.worksWith.includes(filterProductId))
      : ORG_APPROVED_SOLUTIONS;

    if (isCarousel) {
      return list;
    }

    const q = query.trim().toLowerCase();

    if (!types.includes("all")) {
      list = list.filter((s) => types.includes(s.category));
    }

    if (q) {
      list = list.filter((s) => s.name.toLowerCase().includes(q));
    }

    if (sort === "alphabetical") {
      return [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [filterProductId, isCarousel, query, types, sort]);

  const heading =
    title ??
    (filterProductId
      ? `Approved solutions for ${productName(filterProductId)}`
      : "Company-approved solutions");

  const description = filterProductId
    ? `Your company has approved these solutions for ${productName(filterProductId)}. Get or buy licenses, then assign and deploy them to users on your team.`
    : "Your company has approved these solutions. Get or buy licenses, then assign and deploy them to users on your team.";

  return (
    <Box>
      <Box component="h2" sx={{ ...VIS_D.typography.sectionTitle, fontFamily: FONT, fontWeight: 800, mb: "8px" }}>
        {heading}
      </Box>
      <Typography sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT, color: VIS_D.colors.textPrimary, mb: "16px" }}>
        {description}
      </Typography>

      {!isCarousel ? (
        <SearchFilterBar sx={{ flexWrap: "wrap", mb: "24px" }}>
          <AccountSearchField value={query} onChange={(e) => setQuery(e.target.value)} />

          <Box sx={{ width: 320, flexShrink: 0 }}>
            <Select
              multiple
              fullWidth
              variant={selectVariants.BOX}
              size="small"
              value={types}
              onChange={handleTypeChange}
              renderValue={renderTypeValue}
              displayEmpty
              aria-label="Filter solutions by type"
              MenuProps={{ PaperProps: { sx: { mt: "4px" } } }}
              sx={{
                height: VIS_D.sizes.fieldHeight,
                bgcolor: VIS_D.colors.searchFill,
                borderRadius: `${VIS_D.radius.field}px`,
                ...VIS_D.typography.bodySmall,
                "& .MuiSelect-select": {
                  py: "9px",
                  color: VIS_D.colors.ink,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                },
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
              }}
            >
              {ORG_TYPE_FILTERS.map((f) => {
                const checked = f.id === "all" ? types.includes("all") : types.includes(f.id);
                return (
                  <MenuItem
                    key={f.id}
                    value={f.id}
                    sx={{ display: "flex", alignItems: "center", gap: "10px", py: "6px" }}
                  >
                    <Checkbox checked={checked} sx={{ p: 0 }} />
                    <Typography component="span" sx={{ ...VIS_D.typography.bodySmall }}>
                      {f.label}
                    </Typography>
                  </MenuItem>
                );
              })}
            </Select>
          </Box>

          <Box sx={{ width: 190, flexShrink: 0 }}>
            <Select
              fullWidth
              variant={selectVariants.BOX}
              size="small"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              renderValue={(v) => `Sort: ${PS_SORT_OPTIONS.find((o) => o.id === v)?.label ?? ""}`}
              aria-label="Sort solutions"
              MenuProps={{ PaperProps: { sx: { mt: "4px" } } }}
              sx={{
                height: VIS_D.sizes.fieldHeight,
                bgcolor: VIS_D.colors.searchFill,
                borderRadius: `${VIS_D.radius.field}px`,
                ...VIS_D.typography.bodySmall,
                "& .MuiSelect-select": { py: "9px", color: VIS_D.colors.ink },
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
              }}
            >
              {PS_SORT_OPTIONS.map((o) => (
                <MenuItem key={o.id} value={o.id} sx={{ py: "6px" }}>
                  <Typography sx={{ ...VIS_D.typography.bodySmall }}>{o.label}</Typography>
                </MenuItem>
              ))}
            </Select>
          </Box>
        </SearchFilterBar>
      ) : null}

      {rows.length === 0 ? (
        <Typography sx={{ ...VIS_D.typography.bodyMedium, color: VIS_D.colors.textPrimary, py: "32px" }}>
          No solutions match your filters.
        </Typography>
      ) : isCarousel ? (
        <>
          <SolutionCarousel rows={rows} onAction={onAction} onViewDetails={onViewDetails} />
          <Box sx={{ display: "flex", justifyContent: "flex-start", mt: "24px" }}>
            <Button
              variant="outlined"
              onClick={() => {
                if (onViewMore) {
                  onViewMore();
                  return;
                }
                onAction("View more — approved solutions");
              }}
              sx={viewMoreButtonSx}
              endIcon={<FigmaCtaArrowRight size={20} />}
            >
              View more
            </Button>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, minmax(0, 1fr))" },
            gap: "19px",
          }}
        >
          {rows.map((row) => (
            <OrgApprovedSolutionCard key={row.id} row={row} onAction={onAction} onViewDetails={onViewDetails} />
          ))}
        </Box>
      )}
    </Box>
  );
}
