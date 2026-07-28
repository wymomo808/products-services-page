import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Link,
  Tab,
  TabContext,
  TabList,
  Typography,
} from "@weave-mui/material";
import { tabAlignment, tabVariant } from "@weave-mui/enums";
import { CaretDownS, DeviceDesktopS, FileDocumentS, HelpS } from "@weave-mui/icons-weave";
import { FigmaCtaArrowRight } from "./BillingIcons.jsx";
import { PLOT_PUBLISHER_LISTING } from "./data.js";
import ProductLockup from "./ProductLockup.jsx";
import StarRating from "./StarRating.jsx";
import { VIS_D } from "./visdTokens.js";

const FONT = VIS_D.font.element;

const SECTION_TABS = [
  { id: "overview", label: "Overview" },
  { id: "details", label: "Details" },
  { id: "ratings", label: "Ratings and reviews" },
  { id: "support", label: "Support" },
  { id: "faqs", label: "FAQs" },
];

const primaryBtnSx = {
  ...VIS_D.typography.label16Semi,
  fontFamily: FONT,
  textTransform: "none",
  bgcolor: VIS_D.colors.ink,
  color: "#fff",
  borderRadius: `${VIS_D.radius.button}px`,
  boxShadow: "none",
  px: "32px",
  py: "10px",
  minWidth: 120,
  "&:hover": { bgcolor: "#222", boxShadow: "none" },
};

const outlineBtnSx = {
  ...VIS_D.typography.label14Semi,
  fontFamily: FONT,
  textTransform: "none",
  borderColor: VIS_D.colors.ink,
  color: VIS_D.colors.ink,
  borderRadius: `${VIS_D.radius.button}px`,
  boxShadow: "none",
  "&:hover": { borderColor: VIS_D.colors.ink, bgcolor: VIS_D.colors.searchFill, boxShadow: "none" },
};

const sectionHeadingSx = {
  ...VIS_D.typography.headlineSmall,
  fontFamily: FONT,
  fontSize: "24px",
  fontWeight: 700,
  mb: "24px",
};

const specRowSx = {
  display: "grid",
  gridTemplateColumns: "160px minmax(0, 1fr)",
  gap: "16px",
  py: "14px",
  borderBottom: `1px solid ${VIS_D.colors.divider}`,
  "&:last-of-type": { borderBottom: "none" },
};

function SpecRow({ label, children }) {
  return (
    <Box sx={specRowSx}>
      <Typography sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT, color: VIS_D.colors.textLight }}>
        {label}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>{children}</Box>
    </Box>
  );
}

function Tag({ label }) {
  return (
    <Box
      sx={{
        ...VIS_D.typography.smallprint,
        fontFamily: FONT,
        bgcolor: VIS_D.colors.panel,
        borderRadius: "4px",
        px: "8px",
        py: "4px",
        color: VIS_D.colors.text,
      }}
    >
      {label}
    </Box>
  );
}

function RatingBars({ distribution, total }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%", maxWidth: 280 }}>
      {[5, 4, 3, 2, 1].map((stars) => {
        const count = distribution[stars] ?? 0;
        const width = total > 0 ? `${(count / total) * 100}%` : "0%";
        return (
          <Box key={stars} sx={{ display: "grid", gridTemplateColumns: "16px 1fr 28px", gap: "8px", alignItems: "center" }}>
            <Typography sx={{ ...VIS_D.typography.smallprint, fontFamily: FONT }}>{stars}</Typography>
            <Box sx={{ height: 8, bgcolor: VIS_D.colors.panel, borderRadius: "4px", overflow: "hidden" }}>
              <Box sx={{ width, height: "100%", bgcolor: VIS_D.colors.ink, borderRadius: "4px" }} />
            </Box>
            <Typography sx={{ ...VIS_D.typography.smallprint, fontFamily: FONT, color: VIS_D.colors.textLight, textAlign: "right" }}>
              {count}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

function FaqItem({ item, expanded, onToggle }) {
  return (
    <Box sx={{ borderBottom: `1px solid ${VIS_D.colors.divider}` }}>
      <Box
        component="button"
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          py: "18px",
          px: 0,
          border: "none",
          bgcolor: "transparent",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <Typography sx={{ ...VIS_D.typography.label16Semi, fontFamily: FONT, fontWeight: 600 }}>
          {item.question}
        </Typography>
        <CaretDownS
          sx={{
            width: 16,
            height: 16,
            color: VIS_D.colors.ink,
            flexShrink: 0,
            transform: expanded ? "rotate(180deg)" : "none",
            transition: "transform 0.2s ease",
          }}
        />
      </Box>
      {expanded ? (
        <Typography sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT, color: VIS_D.colors.textPrimary, pb: "18px", pr: "32px" }}>
          {item.answer}
        </Typography>
      ) : null}
    </Box>
  );
}

export default function MarketplaceListingDetail({
  product,
  listing = PLOT_PUBLISHER_LISTING,
  primaryCtaLabel = "Get",
  onBack,
  onAction,
  backLabel = "Back to org-approved solutions",
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const [openFaq, setOpenFaq] = useState(null);
  const totalReviews = Object.values(listing.ratings?.distribution ?? {}).reduce((sum, n) => sum + n, 0);
  const averageRating = Number(listing.ratings?.average ?? listing.rating ?? 0);

  const scrollToSection = (sectionId) => {
    setActiveTab(sectionId);
    document.getElementById(`listing-${sectionId}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
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
        {backLabel}
      </Link>

      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "24px" }}>
        <Box sx={{ display: "flex", gap: "20px", flex: 1, minWidth: 280 }}>
          <Box
            aria-hidden
            sx={{
              width: 72,
              height: 72,
              flexShrink: 0,
              borderRadius: "8px",
              bgcolor: product.tint ?? VIS_D.colors.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontFamily: FONT,
              fontSize: "28px",
              fontWeight: 800,
            }}
          >
            {product.name.slice(0, 2).toUpperCase()}
          </Box>
          <Box sx={{ pt: "2px", minWidth: 0 }}>
            <Typography sx={{ ...VIS_D.typography.pageTitle, fontFamily: FONT, fontSize: "34px", fontWeight: 800, mb: "4px" }}>
              {product.name}
            </Typography>
            <Link
              component="button"
              underline="always"
              onClick={() => onAction(`Publisher — ${listing.developer}`)}
              sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT, color: VIS_D.colors.ink, mb: "8px", display: "inline-block" }}
            >
              {listing.developer}
            </Link>
            <Box sx={{ mb: "12px" }}>
              <StarRating rating={listing.rating} reviewCount={listing.reviewCount} />
            </Box>
            <Typography sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT, color: VIS_D.colors.textPrimary, maxWidth: 560 }}>
              {listing.heroDescription}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ textAlign: { xs: "left", md: "right" }, flexShrink: 0 }}>
          <Typography sx={{ ...VIS_D.typography.headlineSmall, fontFamily: FONT, fontWeight: 800, mb: "12px" }}>
            {listing.price}
            <Typography component="span" sx={{ ...VIS_D.typography.bodyMedium, fontWeight: 400 }}>
              {listing.priceCadence}
            </Typography>
          </Typography>
          <Button variant="contained" onClick={() => onAction(`${primaryCtaLabel} — ${product.name}`)} sx={primaryBtnSx}>
            {primaryCtaLabel}
          </Button>
        </Box>
      </Box>

      <Box sx={{ bgcolor: VIS_D.colors.panel, borderRadius: `${VIS_D.radius.card}px`, px: "8px" }}>
        <TabContext value={activeTab}>
          <TabList
            variant={tabVariant.STANDARD}
            align={tabAlignment.LEFT}
            onChange={(_, value) => scrollToSection(value)}
            aria-label="Listing sections"
            sx={{
              minHeight: 48,
              "& .MuiTab-root": {
                ...VIS_D.typography.label16Semi,
                fontFamily: FONT,
                textTransform: "none",
                minHeight: 48,
                color: VIS_D.colors.textLight,
              },
              "& .MuiTab-root.Mui-selected": { color: VIS_D.colors.ink },
              "& .MuiTabs-indicator": { backgroundColor: VIS_D.colors.ink, height: 2 },
            }}
          >
            {SECTION_TABS.map((tab) => (
              <Tab key={tab.id} label={tab.label} value={tab.id} />
            ))}
          </TabList>
        </TabContext>
      </Box>

      <Box id="listing-overview" sx={{ scrollMarginTop: "24px" }}>
        <Typography component="h2" sx={sectionHeadingSx}>
          Overview
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) minmax(280px, 420px)" }, gap: "32px" }}>
          <Box>
            <Typography sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT, color: VIS_D.colors.textPrimary, mb: "16px" }}>
              {listing.overview.intro}
            </Typography>
            <Typography sx={{ ...VIS_D.typography.label16Semi, fontFamily: FONT, fontWeight: 700, mb: "12px" }}>
              Key features
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {listing.overview.keyFeatures.map((feature) => (
                <Typography key={feature} component="li" sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT, color: VIS_D.colors.textPrimary }}>
                  {feature}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              borderRadius: `${VIS_D.radius.card}px`,
              overflow: "hidden",
              bgcolor: "#1E1E1E",
              minHeight: 260,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `1px solid ${VIS_D.colors.border}`,
            }}
          >
            <Typography sx={{ ...VIS_D.typography.bodySmall, fontFamily: FONT, color: "rgba(255,255,255,0.55)" }}>
              Product screenshot
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ borderColor: VIS_D.colors.divider }} />

      <Box id="listing-details" sx={{ scrollMarginTop: "24px" }}>
        <Typography component="h2" sx={sectionHeadingSx}>
          Details
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" }, gap: "32px" }}>
          <Box>
            <SpecRow label="Operating system">
              <DeviceDesktopS sx={{ width: 16, height: 16, color: VIS_D.colors.ink }} />
              <Typography sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT }}>{listing.details.operatingSystem}</Typography>
            </SpecRow>
            <SpecRow label="Release date">
              <Typography sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT }}>{listing.details.releaseDate}</Typography>
            </SpecRow>
            <SpecRow label="Last updated">
              <Typography sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT }}>{listing.details.lastUpdated}</Typography>
            </SpecRow>
            <SpecRow label="Version">
              <Typography sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT }}>{listing.details.version}</Typography>
            </SpecRow>
            <SpecRow label="Language">
              <Typography sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT }}>{listing.details.language}</Typography>
            </SpecRow>
          </Box>
          <Box>
            <Typography sx={{ ...VIS_D.typography.label16Semi, fontFamily: FONT, fontWeight: 700, mb: "16px" }}>
              Compatible with
            </Typography>
            <ProductLockup tint="#E51937" abbr="AC" name={listing.details.compatibleProduct} size={32} nameSize={16} nameWeight={700} />
            <Typography sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT, color: VIS_D.colors.textPrimary, mt: "12px" }}>
              {listing.details.compatibleVersions.join(", ")}
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ ...VIS_D.typography.label16Semi, fontFamily: FONT, fontWeight: 700, mb: "12px" }}>
              Industries
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px", mb: "20px" }}>
              {listing.details.industries.map((item) => (
                <Tag key={item} label={item} />
              ))}
            </Box>
            <Typography sx={{ ...VIS_D.typography.label16Semi, fontFamily: FONT, fontWeight: 700, mb: "12px" }}>
              Capabilities
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {listing.details.capabilities.map((item) => (
                <Tag key={item} label={item} />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ borderColor: VIS_D.colors.divider }} />

      <Box id="listing-ratings" sx={{ scrollMarginTop: "24px" }}>
        <Typography component="h2" sx={sectionHeadingSx}>
          Ratings and reviews
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "280px minmax(0, 1fr)" },
            gap: "32px",
            border: `1px solid ${VIS_D.colors.border}`,
            borderRadius: `${VIS_D.radius.card}px`,
            p: "24px",
          }}
        >
          <Box>
            <Typography sx={{ fontFamily: FONT, fontSize: "48px", fontWeight: 800, lineHeight: 1, mb: "8px" }}>
              {averageRating.toFixed(1)}
            </Typography>
            <StarRating rating={averageRating} reviewCount={listing.reviewCount} />
            <Box sx={{ mt: "20px" }}>
              <RatingBars distribution={listing.ratings?.distribution ?? {}} total={totalReviews} />
            </Box>
            <Box sx={{ mt: "24px" }}>
              <Typography sx={{ ...VIS_D.typography.label16Semi, fontFamily: FONT, fontWeight: 700, mb: "8px" }}>
                Write a review
              </Typography>
              <Button variant="contained" disabled sx={{ ...primaryBtnSx, bgcolor: VIS_D.colors.textLight, "&:hover": { bgcolor: VIS_D.colors.textLight } }}>
                Review
              </Button>
            </Box>
          </Box>
          <Box>
            <Typography sx={{ ...VIS_D.typography.label16Semi, fontFamily: FONT, fontWeight: 700, mb: "16px" }}>
              Reviews ({listing.reviewCount})
            </Typography>
            <Box sx={{ bgcolor: "#FDECEC", borderRadius: `${VIS_D.radius.field}px`, p: "16px" }}>
              <Typography sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT, color: VIS_D.colors.textPrimary }}>
                No reviews for that filter. Try again later.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ borderColor: VIS_D.colors.divider }} />

      <Box id="listing-support" sx={{ scrollMarginTop: "24px" }}>
        <Typography component="h2" sx={sectionHeadingSx}>
          Support
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "320px minmax(0, 1fr)" }, gap: "32px" }}>
          <Box sx={{ border: `1px solid ${VIS_D.colors.border}`, borderRadius: `${VIS_D.radius.card}px`, p: "24px" }}>
            <ProductLockup tint={product.tint} name={listing.support.publisherName} size={40} nameSize={18} nameWeight={700} />
            <Box sx={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start", mt: "20px" }}>
              <Button variant="contained" onClick={() => onAction("Contact support")} sx={primaryBtnSx}>
                Contact support
              </Button>
              <Button variant="outlined" onClick={() => onAction(listing.support.websiteLabel)} sx={outlineBtnSx}>
                {listing.support.websiteLabel}
              </Button>
            </Box>
          </Box>
          <Box>
            <Typography sx={{ ...VIS_D.typography.label16Semi, fontFamily: FONT, fontWeight: 700, mb: "12px" }}>
              Resources
            </Typography>
            <Link
              component="button"
              underline="none"
              onClick={() => onAction(listing.support.guideLabel)}
              sx={{ display: "inline-flex", alignItems: "center", gap: "8px", color: VIS_D.colors.ink, mb: "24px" }}
            >
              <FileDocumentS sx={{ width: 16, height: 16 }} />
              <Typography component="span" sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT, textDecoration: "underline" }}>
                {listing.support.guideLabel}
              </Typography>
            </Link>
            <Typography sx={{ ...VIS_D.typography.label16Semi, fontFamily: FONT, fontWeight: 700, mb: "12px" }}>
              Policies
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-start" }}>
              {[listing.support.privacyLabel, listing.support.eulaLabel].map((label) => (
                <Link
                  key={label}
                  component="button"
                  underline="always"
                  onClick={() => onAction(label)}
                  sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT, color: VIS_D.colors.ink }}
                >
                  {label}
                </Link>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ borderColor: VIS_D.colors.divider }} />

      <Box id="listing-faqs" sx={{ scrollMarginTop: "24px" }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px", mb: "8px" }}>
          <Typography component="h2" sx={{ ...sectionHeadingSx, mb: 0 }}>
            Frequently asked questions (FAQs)
          </Typography>
          <Link
            component="button"
            underline="always"
            onClick={() => onAction("Report a problem")}
            sx={{ ...VIS_D.typography.bodySmall, fontFamily: FONT, color: VIS_D.colors.ink, display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <HelpS sx={{ width: 16, height: 16 }} />
            Found an issue? Report a problem
          </Link>
        </Box>
        <Box sx={{ borderTop: `1px solid ${VIS_D.colors.divider}` }}>
          {listing.faqs.map((item) => (
            <FaqItem
              key={item.id}
              item={item}
              expanded={openFaq === item.id}
              onToggle={() => setOpenFaq((current) => (current === item.id ? null : item.id))}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
