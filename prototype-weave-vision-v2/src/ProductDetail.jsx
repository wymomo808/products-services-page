import PlatformBadges from "./PlatformBadges.jsx";
import AutodeskProductDetail from "./AutodeskProductDetail.jsx";
import MarketplaceAppDetail from "./MarketplaceAppDetail.jsx";
import MarketplaceListingDetail from "./MarketplaceListingDetail.jsx";
import ProductLockup from "./ProductLockup.jsx";
import { resolveDetailView } from "./detailConfig.js";

export default function ProductDetail({
  product,
  detailSource = "my-products",
  onBack,
  onAction,
  onViewAllApps,
  onViewDetails,
  onViewOrgApproved,
  onViewUser,
  isUserView = false,
}) {
  const view = resolveDetailView(product, detailSource, isUserView);

  if (view.type === "autodesk") {
    return (
      <AutodeskProductDetail
        product={product}
        detail={view.detail}
        onBack={onBack}
        onAction={onAction}
        onViewDetails={onViewDetails}
        onViewOrgApproved={onViewOrgApproved}
        isUserView={isUserView}
      />
    );
  }

  if (view.type === "marketplace-listing") {
    return (
      <MarketplaceListingDetail
        product={product}
        listing={view.listing}
        primaryCtaLabel={view.listingCta}
        onBack={onBack}
        onAction={onAction}
        backLabel={view.backLabel}
      />
    );
  }

  return (
    <MarketplaceAppDetail
      product={product}
      detail={view.detail}
      onBack={onBack}
      onAction={onAction}
      onViewDetails={onViewDetails}
      onViewOrgApproved={onViewOrgApproved}
      onViewUser={onViewUser}
      isUserView={isUserView}
    />
  );
}
