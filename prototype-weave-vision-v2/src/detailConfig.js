import {
  AUTOCAD_DETAIL,
  EXPLORE_MORE_SOLUTIONS,
  ORG_APPROVED_SOLUTIONS,
  PLOT_PUBLISHER_DETAIL,
  PLOT_PUBLISHER_LISTING,
  PS_PRODUCTS,
  WORKFLOW_RECOMMENDATIONS,
} from "./data.js";

const WORKFLOW_PRODUCT_MAP = {
  "ai-labels": "labeling-agent",
};

const CATEGORY_LABELS = {
  apps: "App",
  integrations: "Integration",
  agents: "Agent",
  skills: "Skill",
  templates: "Template",
};

function worksWithAutocad(product) {
  return (product.worksWith || []).some((label) => label.toLowerCase().includes("autocad"));
}

function primaryWorksWith(product) {
  return product.worksWith?.[0] ?? "Autodesk products";
}

function hashCode(value) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

function orgApprovedRow(productId) {
  return ORG_APPROVED_SOLUTIONS.find((row) => row.id === productId);
}

function exploreRow(productId) {
  return EXPLORE_MORE_SOLUTIONS.find((row) => row.id === productId);
}

function workflowRow(productId) {
  return WORKFLOW_RECOMMENDATIONS.find((row) => row.id === productId);
}

export function resolveCatalogProduct(productOrId) {
  const id = typeof productOrId === "string" ? productOrId : productOrId?.id;
  if (!id) return null;

  const mappedId = WORKFLOW_PRODUCT_MAP[id] ?? id;
  const catalogProduct = PS_PRODUCTS.find((item) => item.id === mappedId);
  if (catalogProduct) return catalogProduct;

  const workflow = workflowRow(id);
  if (!workflow) return null;

  return {
    id: workflow.id,
    name: workflow.name,
    category: "apps",
    tint: workflow.tint,
    vendor: "Marketplace",
    worksWith: workflow.worksWith,
    description: workflow.blurb,
    rating: workflow.rating,
    reviewCount: workflow.reviewCount,
    trust: workflow.trust,
    cta: workflow.cta ?? "Get",
    variant: "single",
  };
}

function personalizeAutodeskDetail(baseDetail, product) {
  const productName = product.name;
  const replaceProductName = (value) =>
    typeof value === "string" ? value.replace(/AutoCAD/g, productName) : value;

  const downloadsByCategory = Object.fromEntries(
    Object.entries(baseDetail.downloadsByCategory).map(([key, items]) => [
      key,
      items.map((item) => ({
        ...item,
        name: replaceProductName(item.name),
      })),
    ]),
  );

  return {
    ...baseDetail,
    defaultYear: product.version ?? baseDetail.defaultYear,
    downloadCategories: baseDetail.downloadCategories.map((category) => ({
      ...category,
      description: replaceProductName(category.description),
    })),
    downloadsByCategory,
  };
}

export function buildAutodeskDetail(product) {
  if (product.id === "autocad") return AUTOCAD_DETAIL;

  const seed = hashCode(product.id);
  const totalSeats = 80 + (seed % 60);
  const assignedCount = Math.min(totalSeats - 8, 50 + (seed % 30));
  const personalized = personalizeAutodeskDetail(AUTOCAD_DETAIL, product);

  return {
    ...personalized,
    purchase: {
      date: "Jan 12, 2024",
      seats: `${totalSeats} seats`,
      totalPrice: `$${(totalSeats * 150).toLocaleString()} / year`,
    },
    subscriptionExpiry: {
      daysRemaining: 20 + (seed % 90),
    },
    subscriptionSummary: {
      subscriptionId: `${77291038456102 + seed}`,
      team: "TS Organization",
      term: "1 year",
      autoRenew: "On",
      expiresOn: "Mar 15, 2027",
    },
    updateStatus: {
      installedVersion: `${product.version ?? "2025"}.1`,
      latestVersion: `${product.version ?? "2025"}.2`,
      latestReleaseDate: "Jul 14, 2025",
      updateAvailable: true,
      pendingUpdates: 1 + (seed % 3),
    },
    assignment: {
      totalSeats,
      assignedUsers: Array.from({ length: assignedCount }, (_, index) => ({ id: `${product.id}-u${index + 1}` })),
    },
    availableSeats: totalSeats - assignedCount,
  };
}

export function buildMarketplaceAppDetail(product) {
  if (product.id === "plot-publisher") return PLOT_PUBLISHER_DETAIL;

  const seed = hashCode(product.id);
  const totalSeats = 12 + (seed % 24);
  const assignedCount = Math.min(totalSeats - 2, 4 + (seed % 8));
  const year = "2026";

  return {
    years: [year, "2025", "2024"],
    defaultYear: year,
    platforms: ["Win 64", "Mac"],
    defaultPlatform: "Win 64",
    languages: ["English", "Deutsch", "Français"],
    defaultLanguage: "English",
    latestVersionLabel: `${product.name} ${year}.2 Update`,
    downloadCategories: [
      { id: "updates", label: "Updates" },
      { id: "extensions", label: "Extensions" },
    ],
    defaultCategory: "updates",
    downloadsByCategory: {
      updates: [
        {
          id: `${product.id}-upd-1`,
          name: `${product.name} ${year}.2 Update`,
          date: "Jul 22, 2026",
          size: `${100 + (seed % 80)}.${seed % 10} MB`,
          releaseNotes: true,
        },
        {
          id: `${product.id}-upd-2`,
          name: `${product.name} ${year}.1 Update`,
          date: "May 10, 2026",
          size: `${90 + (seed % 60)}.${seed % 10} MB`,
        },
      ],
      extensions: [
        {
          id: `${product.id}-ext-1`,
          name: `${product.name} Toolkit`,
          date: "Jun 15, 2026",
          size: `${20 + (seed % 30)}.${seed % 10} MB`,
          releaseNotes: true,
        },
      ],
    },
    purchase: {
      date: "Aug 7, 2025",
      seats: `${totalSeats} seats`,
      totalPrice: String(orgApprovedRow(product.id)?.price ?? `$${50 + (seed % 100)} / month`),
    },
    subscriptionExpiry: {
      daysRemaining: 10 + (seed % 45),
    },
    subscriptionSummary: {
      subscriptionId: `${88492014567204 + seed}`,
      team: "TS Organization",
      term: "1 year",
      autoRenew: "On",
      expiresOn: "Oct 5, 2027",
    },
    updateStatus: {
      installedVersion: `${year}.1`,
      latestVersion: `${year}.2`,
      latestReleaseDate: "Jul 22, 2026",
      updateAvailable: true,
      pendingUpdates: 1 + (seed % 2),
    },
    assignment: {
      totalSeats,
      assignedUsers: PLOT_PUBLISHER_DETAIL.assignment.assignedUsers.slice(0, assignedCount),
      assignUserOptions: PLOT_PUBLISHER_DETAIL.assignment.assignUserOptions,
      assignUserGroups: PLOT_PUBLISHER_DETAIL.assignment.assignUserGroups,
      seatSources: PLOT_PUBLISHER_DETAIL.assignment.seatSources,
      defaultSeatSource: PLOT_PUBLISHER_DETAIL.assignment.defaultSeatSource,
      assignDescription: PLOT_PUBLISHER_DETAIL.assignment.assignDescription,
      assignedUserOptionCount: PLOT_PUBLISHER_DETAIL.assignment.assignedUserOptionCount,
    },
    availableSeats: totalSeats - assignedCount,
  };
}

export function buildMarketplaceListing(product, detailSource = "org-approved") {
  if (product.id === "plot-publisher" && detailSource === "org-approved") {
    return PLOT_PUBLISHER_LISTING;
  }

  const seed = hashCode(product.id);
  const approved = orgApprovedRow(product.id);
  const explore = exploreRow(product.id);
  const workflow = workflowRow(product.id);
  const price = approved?.price ?? explore?.price ?? workflow?.price ?? product.price ?? "$50";
  const priceCadence = price.includes("/") ? "" : " / month";
  const rating = product.rating ?? approved?.rating ?? explore?.rating ?? workflow?.rating ?? 4.2;
  const reviewCount = product.reviewCount ?? approved?.reviewCount ?? explore?.reviewCount ?? workflow?.reviewCount ?? 40 + (seed % 80);
  const developer = product.vendor ?? "Marketplace publisher";
  const compatibleProduct = primaryWorksWith(product);
  const categoryLabel = CATEGORY_LABELS[product.category] ?? "Solution";

  return {
    developer,
    price,
    priceCadence,
    rating,
    reviewCount,
    heroDescription: product.description,
    overview: {
      intro: `${product.name} helps teams extend ${compatibleProduct} workflows with ${categoryLabel.toLowerCase()}-based automation and collaboration.`,
      keyFeatures: [
        `Works with ${(product.worksWith || [compatibleProduct]).join(", ")}`,
        "Security reviewed for enterprise deployment",
        "Org approval and seat assignment supported",
        "Includes documentation, support, and release updates",
      ],
    },
    details: {
      operatingSystem: "Windows",
      releaseDate: "Aug 7, 2025",
      lastUpdated: "Jul 22, 2026",
      version: "2026.2",
      language: "English",
      compatibleProduct,
      compatibleVersions: ["2023", "2024", "2025", "2026"],
      industries: ["AEC"],
      capabilities: [(product.trust || []).join(", ") || categoryLabel, "Cloud connected", "Team workflows"].filter(Boolean),
    },
    ratings: {
      average: rating,
      distribution: {
        5: Math.round(reviewCount * 0.62),
        4: Math.round(reviewCount * 0.22),
        3: Math.round(reviewCount * 0.1),
        2: Math.round(reviewCount * 0.04),
        1: Math.max(1, Math.round(reviewCount * 0.02)),
      },
    },
    support: {
      publisherName: developer,
      websiteLabel: "Visit website",
      guideLabel: "User guide",
      privacyLabel: "Publisher Privacy Policy",
      eulaLabel: "End User Agreement (EULA)",
    },
    faqs: [
      {
        id: `${product.id}-faq-1`,
        question: `What should I know before deploying ${product.name}?`,
        answer: `${product.name} requires a compatible ${compatibleProduct} installation and an org-approved license before assignment.`,
      },
      {
        id: `${product.id}-faq-2`,
        question: "Are there any known issues with this solution?",
        answer: "See release notes for the latest fixes, compatibility updates, and deployment guidance.",
      },
      {
        id: `${product.id}-faq-3`,
        question: "How do I request approval for my company?",
        answer: "Use Request approval to submit this solution for admin review. Once approved, admins can buy licenses and assign seats.",
      },
    ],
  };
}

export function resolveDetailView(product, detailSource = "my-products", isUserView = false) {
  const isAutodeskProduct = product.category === "products" && product.isAutodesk;
  const catalogProduct = PS_PRODUCTS.find((item) => item.id === product.id);
  const isDeployedSolution = catalogProduct?.orgStatus === "Deployed" && !isAutodeskProduct;

  if (isAutodeskProduct) {
    return {
      type: "autodesk",
      detail: buildAutodeskDetail(product),
    };
  }

  if (
    isDeployedSolution &&
    (detailSource === "my-products" || detailSource === "org-approved")
  ) {
    return {
      type: "marketplace-app",
      detail: buildMarketplaceAppDetail(product),
    };
  }

  if (detailSource === "org-approved" || detailSource === "explore-more" || detailSource === "workflow") {
    const listingCta =
      detailSource === "explore-more" || detailSource === "workflow"
        ? "Request approval"
        : isUserView
          ? "Request seat"
          : "Buy";

    return {
      type: "marketplace-listing",
      listing: buildMarketplaceListing(product, detailSource),
      listingCta,
      backLabel: "Back to org-approved solutions",
    };
  }

  return {
    type: "marketplace-app",
    detail: buildMarketplaceAppDetail(product),
  };
}

export function worksWithAutocadProduct(product) {
  return worksWithAutocad(product);
}
