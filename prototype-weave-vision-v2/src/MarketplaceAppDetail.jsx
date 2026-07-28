import { useMemo } from "react";
import { Box, Link, Typography } from "@weave-mui/material";
import { FigmaCtaArrowRight } from "./BillingIcons.jsx";
import {
  PLOT_PUBLISHER_DETAIL,
  getAdminAutocadDiscoverSolutions,
  getRelatedMyProductsSolutions,
  getUserAutocadDiscoverSolutions,
  getUserAutocadOwnedSolutions,
} from "./data.js";
import { DiscoverAutocadSolutionsSection, YourAutocadSolutionsSection } from "./AutocadSolutionsSections.jsx";
import { worksWithAutocadProduct } from "./detailConfig.js";
import ProductDownloadsSection from "./ProductDownloadsSection.jsx";
import ProductLockup from "./ProductLockup.jsx";
import AppManagementSummary from "./AppManagementSummary.jsx";
import { VIS_D } from "./visdTokens.js";

const FONT = VIS_D.font.element;

function LinkButton({ icon, children, onClick }) {
  return (
    <Link
      component="button"
      underline="none"
      onClick={onClick}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        color: VIS_D.colors.ink,
        ...VIS_D.typography.label16Semi,
        fontFamily: FONT,
        p: "6px 0",
      }}
    >
      {icon}
      {children}
    </Link>
  );
}

function DocumentIcon() {
  return (
    <Box
      component="svg"
      viewBox="0 0 20 20"
      aria-hidden
      sx={{ width: 20, height: 20, display: "block", flexShrink: 0 }}
    >
      <path
        d="M6 2h6l4 4v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path d="M12 2v4h4" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </Box>
  );
}

function ExternalLinkIcon() {
  return (
    <Box
      component="svg"
      viewBox="0 0 20 20"
      aria-hidden
      sx={{ width: 20, height: 20, display: "block", flexShrink: 0 }}
    >
      <path
        d="M11 3h6v6M17 3 10 10M8 5H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Box>
  );
}

export default function MarketplaceAppDetail({
  product,
  detail = PLOT_PUBLISHER_DETAIL,
  onBack,
  onAction,
  onViewDetails,
  onViewOrgApproved,
  isUserView = false,
}) {
  const availableSeats =
    detail.availableSeats ??
    Math.max(0, (detail.assignment?.totalSeats ?? 0) - (detail.assignment?.assignedUsers?.length ?? 0));
  const showAutocadSections = worksWithAutocadProduct(product);
  const autocadOwnedSolutions = useMemo(() => {
    if (!showAutocadSections) return [];
    const solutions = isUserView
      ? getUserAutocadOwnedSolutions()
      : getRelatedMyProductsSolutions({ id: "autocad", name: "AutoCAD" });
    return solutions.filter((item) => item.id !== product.id);
  }, [isUserView, product.id, showAutocadSections]);

  const autocadDiscoverRows = useMemo(
    () => (showAutocadSections ? (isUserView ? getUserAutocadDiscoverSolutions() : getAdminAutocadDiscoverSolutions()) : []),
    [isUserView, showAutocadSections],
  );

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
          alignSelf: "flex-start",
        }}
      >
        <FigmaCtaArrowRight size={20} sx={{ transform: "rotate(180deg)" }} />
        Back to my products & solutions
      </Link>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
          <ProductLockup
            logoSrc={product.logo}
            tint={product.tint}
            icon={product.icon}
            name={product.name}
            size={57}
            nameSize={30}
            nameWeight={800}
          />
          <LinkButton icon={<ExternalLinkIcon />} onClick={() => onAction("View listing")}>
            View listing
          </LinkButton>
        </Box>

        <Typography sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT, maxWidth: 820 }}>
          {product.description}
        </Typography>

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
            availableSeats={availableSeats}
            onViewSubscription={() => onAction("View subscription")}
            onAssignUsers={() => onAction("Assign users")}
            onViewUpdates={() => onAction("View updates")}
          />
        )}

        <LinkButton icon={<DocumentIcon />} onClick={() => onAction("User guide")}>
          User guide
        </LinkButton>
      </Box>

      <ProductDownloadsSection config={detail} productName={product.name} onAction={onAction} />

      {showAutocadSections ? (
        <>
          <YourAutocadSolutionsSection
            products={autocadOwnedSolutions}
            isUserView={isUserView}
            onAction={onAction}
            onViewDetails={onViewDetails}
          />

          <DiscoverAutocadSolutionsSection
            rows={autocadDiscoverRows}
            isUserView={isUserView}
            onAction={onAction}
            onViewDetails={onViewDetails}
            onViewOrgApproved={onViewOrgApproved}
          />
        </>
      ) : null}
    </Box>
  );
}
