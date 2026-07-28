import { useLayoutEffect, useRef, useState } from "react";
import { Box, IconButton } from "@weave-mui/material";
import { CaretLeftS, CaretRightS } from "@weave-mui/icons-weave";
import ProductCard3P from "./ProductCard3P.jsx";
import { VIS_D } from "./visdTokens.js";

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

export default function ProductCarousel({ products, onAction, onViewDetails, visibleCount = 4, hideDeployedBadge = false, hidePrimaryCta = false }) {
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
  }, [products.length, visibleCount]);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return undefined;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [slideWidth, products.length]);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el || !slideWidth) return;
    el.scrollBy({ left: direction * (slideWidth + gap), behavior: "smooth" });
  };

  if (!products.length) return null;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <IconButton
        aria-label="Previous products"
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
          {products.map((product) => (
            <Box
              key={product.id}
              data-carousel-card
              sx={{
                flex: slideWidth ? `0 0 ${slideWidth}px` : `0 0 ${fallbackSlideWidth}`,
                minWidth: slideWidth ?? 280,
                scrollSnapAlign: "start",
              }}
            >
              <ProductCard3P
                product={product}
                onAction={onAction}
                onViewDetails={onViewDetails}
                hideDeployedBadge={hideDeployedBadge}
                hidePrimaryCta={hidePrimaryCta}
              />
            </Box>
          ))}
        </Box>
      </Box>

      <IconButton
        aria-label="Next products"
        onClick={() => scroll(1)}
        disabled={!canScrollRight}
        sx={carouselCaretSx}
      >
        <CaretRightS sx={{ width: 20, height: 20 }} />
      </IconButton>
    </Box>
  );
}
