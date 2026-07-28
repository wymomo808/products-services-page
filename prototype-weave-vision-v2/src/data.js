import {
  ProductIdMM,
  ProductIdAS,
  ProductIdAM,
  ProductIdSM,
  ProductIdNM,
  ProductIdCM,
  ProductIdRM,
  ProductIdDM,
  ProductIdIM,
  ProductIdFM,
} from "@weave-mui/icons-weave";

export const ACCOUNT_NAV = [
  "Home",
  "Products & solutions",
  "User Management",
  "Billing and orders",
  "Reporting",
  "Support",
  "Settings",
];

export const USER_ACCOUNT_NAV = [
  "Home",
  "Products & solutions",
  "Billing and orders",
  "Reporting",
  "Support",
  "Settings",
];

export const PAGE_TABS = [
  { id: "all", label: "My products & solutions" },
  { id: "updates", label: "Product Updates" },
  { id: "custom-install", label: "Custom install" },
  { id: "scheduled-updates", label: "Scheduled updates" },
  { id: "trials", label: "Trials" },
  { id: "hubs", label: "Hubs" },
];

export const HUB_NAV = [
  "Home",
  "Products & Solutions",
  "Team and User Management",
  "Hubs and Projects",
  "Billing and Orders",
  "Reporting",
  "Support",
  "Success Center",
];

export const HUB = {
  name: "MyHubName",
  entitlements: ["ACC", "BIM", "Forma"],
  admins: ["Albus Dumbledore", "Fred Rogers"],
  region: "US-West",
  ai: {
    advancedFeatures: false,
    projectOverrides: true,
    projectOverridesCount: 2,
  },
};

export const HUB_PROJECTS = [
  { id: "p1", name: "Project Name1", admin: "Albus Dumbledore", members: 1000, status: "Active", advancedAi: false },
  { id: "p2", name: "Project Name2", admin: "Albus Dumbledore", members: 324, status: "Active", advancedAi: true },
  { id: "p3", name: "Project Name3", admin: "Albus Dumbledore", members: 445, status: "Active", advancedAi: true },
  { id: "p4", name: "Project Name4", admin: "Albus Dumbledore", members: 13, status: "Active", advancedAi: false },
  { id: "p5", name: "Project Name5", admin: "Albus Dumbledore", members: 445, status: "Active", advancedAi: false },
];

// --- Products & Solutions (3rd-party apps Figma spec: knoJ9Ny…, node 2:28845) ---
export const PS_TABS = [
  { id: "all", label: "My products & solutions" },
  { id: "org-approved", label: "Org-approved solutions" },
  { id: "updates", label: "Product updates" },
  { id: "custom-install", label: "Custom install" },
  { id: "scheduled-updates", label: "Scheduled updates" },
  { id: "trials", label: "Trials" },
  { id: "hubs", label: "Hubs" },
];

// Demo org context for workflow-aware recommendations (vision: industry + role + usage).
export const ORG_CONTEXT = {
  industry: "Architecture, Engineering & Construction",
  role: "BIM Manager",
  ownedProducts: ["AutoCAD", "Revit", "ACC"],
};


// Workflow recommendations — Phase 1 vision: contextual discovery beyond static grid.
export const WORKFLOW_RECOMMENDATIONS = [
  {
    id: "navis-pack",
    name: "Navisworks Coordination Pack",
    tint: "#0696D7",
    worksWith: ["Revit", "ACC"],
    trust: ["Security reviewed"],
    blurb: "Streamline clash detection and issue handoff between Revit and ACC.",
    price: "$150",
    rating: 4.5,
    reviewCount: 67,
    cta: "Get",
  },
  {
    id: "dynamo-docs",
    name: "Dynamo Scripts for Documentation",
    tint: "#FF6A00",
    worksWith: ["Revit"],
    trust: [],
    blurb: "Automate sheet generation and room schedules from Revit models.",
    price: "Free",
    rating: 4.7,
    reviewCount: 142,
    cta: "Get",
  },
  {
    id: "ai-labels",
    name: "AI Room Labeling Agent",
    tint: "#8B5CF6",
    worksWith: ["Revit"],
    trust: ["Security reviewed"],
    blurb: "Suggest and apply room labels across large Revit projects.",
    price: "$50/month",
    rating: 4.8,
    reviewCount: 54,
    cta: "Get",
  },
];

// Company-approved solutions table — Phase 2 admin vision (Krishn + Sara).
export const ORG_APPROVED_SOLUTIONS = [
  {
    id: "bim-agent",
    name: "BIM Coordination Agent",
    type: "Agent",
    category: "agents",
    worksWith: ["revit", "acc"],
    status: "Approved",
    users: 42,
    price: "$50/month",
    rating: 4.6,
    reviewCount: 38,
    action: "Get",
  },
  {
    id: "model-checker",
    name: "Model Checker Pro",
    type: "App",
    category: "apps",
    worksWith: ["revit"],
    status: "Deployed",
    users: 120,
    price: "$150",
    rating: 4.9,
    reviewCount: 210,
    action: "Get",
  },
  {
    id: "plot-publisher",
    name: "AutoCAD Plot Publisher",
    type: "App",
    category: "apps",
    worksWith: ["autocad"],
    status: "Deployed",
    users: 19,
    price: "$50/month",
    rating: 4.2,
    reviewCount: 89,
    action: "Get",
  },
  {
    id: "docs-automator",
    name: "Docs Issue Automator",
    type: "Integration",
    category: "integrations",
    worksWith: ["acc"],
    status: "Approved",
    trust: ["Security reviewed"],
    users: 18,
    price: "Free",
    rating: 4.4,
    reviewCount: 56,
    action: "Get",
  },
  {
    id: "cost-skill",
    name: "Cost Estimation Skill",
    type: "Skill",
    category: "skills",
    worksWith: ["acc", "revit"],
    status: "Available",
    users: 0,
    price: "$150",
    rating: 4.3,
    reviewCount: 24,
    action: "Get",
  },
  {
    id: "dwg-markup-sync",
    name: "DWG Markup Sync",
    type: "App",
    category: "apps",
    worksWith: ["autocad"],
    status: "Approved",
    users: 34,
    price: "Free",
    rating: 4.6,
    reviewCount: 128,
    action: "Get",
  },
  {
    id: "forma-acc-sync",
    name: "Forma ACC Sync",
    type: "Integration",
    category: "integrations",
    worksWith: ["forma", "acc"],
    status: "Approved",
    users: 56,
    price: "$50/month",
    rating: 4.5,
    reviewCount: 41,
    action: "Get",
  },
  {
    id: "labeling-agent",
    name: "AI Room Labeling Agent",
    type: "Agent",
    category: "agents",
    worksWith: ["revit"],
    status: "Approved",
    users: 12,
    price: "$50/month",
    rating: 4.8,
    reviewCount: 54,
    action: "Get",
  },
  {
    id: "cad-assistant",
    name: "CAD Assistant Agent",
    type: "Agent",
    category: "agents",
    worksWith: ["autocad"],
    status: "Approved",
    trust: ["Security reviewed"],
    users: 28,
    price: "$50/month",
    rating: 4.8,
    reviewCount: 54,
    action: "Get",
  },
  {
    id: "layer-standard-sync",
    name: "Layer Standard Sync",
    type: "App",
    category: "apps",
    worksWith: ["autocad"],
    status: "Approved",
    users: 15,
    price: "$30/month",
    rating: 4.5,
    reviewCount: 67,
    action: "Get",
  },
  {
    id: "xref-manager",
    name: "Xref Manager Plus",
    type: "App",
    category: "apps",
    worksWith: ["autocad"],
    status: "Deployed",
    users: 41,
    price: "$75",
    rating: 4.7,
    reviewCount: 142,
    action: "Get",
  },
  {
    id: "clash-skill",
    name: "Clash Triage Skill",
    type: "Skill",
    category: "skills",
    worksWith: ["revit", "navisworks"],
    status: "Approved",
    users: 8,
    price: "Free",
    rating: 4.6,
    reviewCount: 31,
    action: "Get",
  },
  {
    id: "mep-template",
    name: "MEP Starter Template Pack",
    type: "Template",
    category: "templates",
    worksWith: ["revit"],
    status: "Approved",
    users: 45,
    price: "$150",
    rating: 4.4,
    reviewCount: 67,
    action: "Get",
  },
  {
    id: "acc-handover-template",
    name: "ACC Handover Template",
    type: "Template",
    category: "templates",
    worksWith: ["acc"],
    status: "Approved",
    users: 22,
    price: "Free",
    rating: 4.7,
    reviewCount: 18,
    action: "Get",
  },
];

// Marketplace solutions available for org approval request (not yet company-approved).
export const EXPLORE_MORE_SOLUTIONS = [
  {
    id: "spec-check-ai",
    name: "Spec Check AI",
    type: "Agent",
    category: "agents",
    worksWith: ["revit", "acc"],
    price: "$50/month",
    rating: 4.5,
    reviewCount: 32,
  },
  {
    id: "reality-capture-sync",
    name: "Reality Capture Sync",
    type: "Integration",
    category: "integrations",
    worksWith: ["acc"],
    price: "$75/month",
    rating: 4.2,
    reviewCount: 19,
  },
  {
    id: "structural-load-agent",
    name: "Structural Load Agent",
    type: "Agent",
    category: "agents",
    worksWith: ["revit"],
    trust: ["Security reviewed"],
    price: "$50/month",
    rating: 4.7,
    reviewCount: 44,
  },
  {
    id: "pdf-redline-bridge",
    name: "PDF Redline Bridge",
    type: "App",
    category: "apps",
    worksWith: ["autocad", "acc"],
    price: "$30/month",
    rating: 4.4,
    reviewCount: 86,
  },
  {
    id: "scheduling-skill",
    name: "4D Scheduling Skill",
    type: "Skill",
    category: "skills",
    worksWith: ["acc", "revit"],
    price: "Free",
    rating: 4.1,
    reviewCount: 27,
  },
  {
    id: "safety-walk-template",
    name: "Safety Walk Template",
    type: "Template",
    category: "templates",
    worksWith: ["acc"],
    price: "$150",
    rating: 4.6,
    reviewCount: 15,
  },
];

/** User view: AutoCAD solutions already assigned to the signed-in user. */
export const USER_AUTOCAD_OWNED_SOLUTION_IDS = ["plot-publisher", "dwg-markup-sync", "cad-assistant"];

// Multi-select type filter for the org-approved solutions grid.
export const ORG_TYPE_FILTERS = [
  { id: "all", label: "All solutions" },
  { id: "apps", label: "Apps" },
  { id: "integrations", label: "Integrations" },
  { id: "agents", label: "Agents" },
  { id: "skills", label: "Skills" },
  { id: "templates", label: "Templates" },
];

// Multi-select type filter for the "My products & solutions" grid.
// `all` is the catch-all; the rest map to a product's `category`.
export const PS_TYPE_FILTERS = [
  { id: "all", label: "My products & solutions" },
  { id: "products", label: "Products" },
  { id: "apps", label: "Apps" },
  { id: "integrations", label: "Custom integration" },
  { id: "agents", label: "Agents" },
  { id: "skills", label: "Skills" },
  { id: "templates", label: "Templates" },
];

export const PS_AUTODESK_TYPE_FILTERS = [
  { id: "all", label: "All" },
  { id: "products", label: "Products" },
  { id: "agents", label: "Agents" },
];

export const PS_MARKETPLACE_TYPE_FILTERS = [
  { id: "all", label: "All" },
  { id: "apps", label: "Apps" },
  { id: "agents", label: "Agents" },
  { id: "skills", label: "Skills" },
  { id: "templates", label: "Templates" },
];

// Sort options for the "My products & solutions" grid.
export const PS_SORT_OPTIONS = [
  { id: "latest", label: "Latest" },
  { id: "alphabetical", label: "Alphabetical" },
];

// Recently purchased bundles: an Autodesk product + one or more 3rd-party apps bought with it.
// One cloud deployment, one desktop.
export const RECENTLY_PURCHASED = [
  {
    id: "bundle-fusion",
    deployment: "Cloud",
    purchasedOn: "Jul 2, 2026",
    cta: "Access",
    product: { name: "Fusion 360", logo: "./logos/fusion360.png" },
    app: {
      id: "cam-assistant",
      name: "CAM Assistant",
      tint: "#FF6A00",
      vendor: "Marketplace",
    },
  },
  {
    id: "bundle-autocad",
    deployment: "Desktop",
    purchasedOn: "Jun 18, 2026",
    cta: "Download",
    product: { name: "AutoCAD", logo: "./logos/autocad.png" },
    apps: [
      {
        id: "dwg-markup-sync",
        name: "DWG Markup Sync",
        tint: "#0696D7",
        vendor: "Marketplace",
      },
      {
        id: "plot-publisher",
        name: "AutoCAD Plot Publisher",
        tint: "#FF6A00",
        vendor: "Marketplace",
      },
    ],
  },
];

const PS_LOREM = {
  inventor:
    "Lorem ipsum dolor sit amet consectetur. In cum nibh at in pharetra nunc volutpat tincidunt. Aenean amet aliquet.",
  fusion:
    "Lorem ipsum dolor sit amet consectetur. Elementum pulvinar velit molestie morbi congue. Et nunc adipiscing et.",
  revit:
    "Lorem ipsum dolor sit amet consectetur. Pharetra sed enim aenean placerat mauris gravida pellentesque bibendum.",
};

const PS_BASE = [
  {
    id: "autocad",
    name: "AutoCAD",
    icon: ProductIdCM,
    logo: "./logos/autocad.png",
    platforms: ["windows", "apple", "linux", "cloud"],
    description:
      "2D and 3D CAD software with automation. Includes AutoCAD, specialized toolsets, and more.",
    version: "2023",
    platform: "Win 64",
    language: "English",
    cta: "Download",
    variant: "split",
    installFootnote: "Installs latest version 2023.2.1",
  },
  {
    id: "inventor",
    name: "Inventor",
    icon: ProductIdIM,
    logo: "./logos/inventor.png",
    platforms: ["windows", "apple", "linux", "cloud"],
    description: PS_LOREM.inventor,
    version: "2023",
    platform: "Win 64",
    language: "English",
    cta: "Custom Install",
    variant: "single",
    installFootnote: "Installs latest version 2023.2.1",
  },
  {
    id: "fusion360",
    name: "Fusion 360",
    icon: ProductIdFM,
    logo: "./logos/fusion360.png",
    platforms: ["windows", "apple", "linux", "cloud"],
    description: PS_LOREM.fusion,
    version: "2023",
    platform: "Win 64",
    language: "English",
    cta: "Download",
    variant: "split",
    installFootnote: "Installs latest version 2023.2.1",
  },
  {
    id: "revit",
    name: "Revit",
    icon: ProductIdRM,
    logo: "./logos/revit.png",
    platforms: ["windows", "apple", "linux", "cloud"],
    description: PS_LOREM.revit,
    version: "2023",
    platform: "Win 64",
    language: "English",
    cta: "Download",
    variant: "split",
    installFootnote: "Installs latest version 2023.2.1",
  },
];

// Marketplace solutions shown alongside Autodesk products in the grid.
const PS_SOLUTIONS = [
  {
    id: "model-checker",
    name: "Model Checker Pro",
    category: "apps",
    tint: "#0696D7",
    vendor: "Autodesk validated partner",
    worksWith: ["Revit", "ACC"],
    description: "Automated model validation against BIM standards and organization rules.",
    trust: ["Validated", "Admin approved", "Security reviewed"],
    orgStatus: "Deployed",
    assignedUsers: 120,
    cta: "Download",
    variant: "single",
  },
  {
    id: "cam-assistant",
    name: "CAM Assistant",
    category: "apps",
    tint: "#FF6A00",
    vendor: "Marketplace",
    worksWith: ["Fusion 360"],
    description: "AI-assisted CAM workflows and toolpath suggestions for Fusion 360.",
    orgStatus: "Deployed",
    assignedUsers: 12,
    cta: "Access",
    variant: "single",
  },
  {
    id: "dwg-markup-sync",
    name: "DWG Markup Sync",
    category: "apps",
    tint: "#0696D7",
    vendor: "Marketplace",
    worksWith: ["AutoCAD"],
    description: "Sync markups and comments between AutoCAD drawings and cloud review sessions.",
    rating: 4.6,
    reviewCount: 128,
    trust: ["Admin approved", "Works with AutoCAD"],
    orgStatus: "Deployed",
    assignedUsers: 34,
    cta: "Download",
    variant: "single",
  },
  {
    id: "plot-publisher",
    name: "AutoCAD Plot Publisher",
    category: "apps",
    tint: "#FF6A00",
    vendor: "Autodesk validated partner",
    worksWith: ["AutoCAD"],
    description: "Batch publish sheets to PDF and DWF with organization plot standards.",
    rating: 4.2,
    reviewCount: 89,
    trust: ["Validated", "Enterprise-ready"],
    orgStatus: "Deployed",
    assignedUsers: 19,
    cta: "Download",
    variant: "single",
  },
  {
    id: "docs-automator",
    name: "Docs Issue Automator",
    category: "integrations",
    tint: "#00A94F",
    vendor: "Marketplace",
    worksWith: ["ACC"],
    description: "Route and assign ACC issues automatically from clash results and RFIs.",
    trust: ["Admin approved", "Works with ACC"],
    orgStatus: "Deployed",
    assignedUsers: 18,
    cta: "Connect",
    variant: "single",
  },
  {
    id: "forma-acc-sync",
    name: "Forma ACC Sync",
    category: "integrations",
    isAutodesk: true,
    tint: "#FF6A00",
    vendor: "Autodesk",
    worksWith: ["Forma", "ACC"],
    description: "Sync design options and environmental insights from Forma into ACC projects.",
    orgStatus: "Deployed",
    assignedUsers: 56,
    cta: "Connect",
    variant: "single",
  },
  {
    id: "bim-agent",
    name: "BIM Coordination Agent",
    category: "agents",
    isAutodesk: true,
    tint: "#5F60FF",
    vendor: "AI Agent",
    worksWith: ["Revit", "ACC"],
    description: "Suggests coordination fixes and drafts issue packages across linked models.",
    trust: ["Validated", "Admin approved", "Security reviewed"],
    orgStatus: "Deployed",
    assignedUsers: 42,
    cta: "Add",
    variant: "single",
  },
  {
    id: "labeling-agent",
    name: "AI Room Labeling Agent",
    category: "agents",
    isAutodesk: true,
    tint: "#8B5CF6",
    vendor: "AI Agent",
    worksWith: ["Revit"],
    description: "Proposes and applies room labels across large Revit projects.",
    trust: ["Validated", "Security reviewed"],
    orgStatus: "Available",
    cta: "Add",
    variant: "single",
  },
  {
    id: "cad-assistant",
    name: "CAD Assistant Agent",
    category: "agents",
    isAutodesk: true,
    tint: "#5F60FF",
    vendor: "AI Agent",
    worksWith: ["AutoCAD"],
    description: "Suggests blocks, layers, and drafting fixes based on your CAD standards.",
    rating: 4.8,
    reviewCount: 54,
    orgStatus: "Deployed",
    assignedUsers: 28,
    cta: "Add",
    variant: "single",
  },
  {
    id: "layer-standard-sync",
    name: "Layer Standard Sync",
    category: "apps",
    tint: "#0696D7",
    vendor: "Marketplace",
    worksWith: ["AutoCAD"],
    description: "Enforces organization layer standards and audits drawings against CAD guidelines.",
    rating: 4.5,
    reviewCount: 67,
    trust: ["Admin approved", "Works with AutoCAD"],
    orgStatus: "Deployed",
    assignedUsers: 15,
    cta: "Download",
    variant: "single",
  },
  {
    id: "xref-manager",
    name: "Xref Manager Plus",
    category: "apps",
    tint: "#FF6A00",
    vendor: "Autodesk validated partner",
    worksWith: ["AutoCAD"],
    description: "Batch-repair broken xrefs, reload paths, and audit external references across projects.",
    rating: 4.7,
    reviewCount: 142,
    trust: ["Validated", "Enterprise-ready"],
    orgStatus: "Deployed",
    assignedUsers: 41,
    cta: "Download",
    variant: "single",
  },
  {
    id: "cost-skill",
    name: "Cost Estimation Skill",
    category: "skills",
    tint: "#8B5CF6",
    vendor: "Marketplace",
    worksWith: ["ACC", "Revit"],
    description: "Extract quantities and map cost codes from model data.",
    trust: ["Works with ACC"],
    orgStatus: "Available",
    cta: "Add",
    variant: "single",
  },
  {
    id: "clash-skill",
    name: "Clash Triage Skill",
    category: "skills",
    tint: "#5F60FF",
    vendor: "Marketplace",
    worksWith: ["Revit", "Navisworks"],
    description: "Prioritize clashes by trade, severity, and location for faster review.",
    cta: "Add",
    variant: "single",
  },
  {
    id: "mep-template",
    name: "MEP Starter Template Pack",
    category: "templates",
    tint: "#00A94F",
    vendor: "Marketplace",
    worksWith: ["Revit"],
    description: "Pre-built Revit families, views, and sheets for MEP workflows.",
    cta: "Download",
    variant: "single",
  },
  {
    id: "acc-handover-template",
    name: "ACC Handover Template",
    category: "templates",
    tint: "#0696D7",
    vendor: "Autodesk",
    worksWith: ["ACC"],
    description: "Standard folder structure and issue types for project closeout.",
    cta: "Download",
    variant: "single",
  },
  {
    id: "spec-check-ai",
    name: "Spec Check AI",
    category: "agents",
    tint: "#8B5CF6",
    vendor: "Marketplace",
    worksWith: ["Revit", "ACC"],
    description: "Compare model elements against project specifications and flag variances automatically.",
    rating: 4.5,
    reviewCount: 32,
    trust: ["Security reviewed"],
    cta: "Add",
    variant: "single",
  },
  {
    id: "reality-capture-sync",
    name: "Reality Capture Sync",
    category: "integrations",
    tint: "#00A94F",
    vendor: "Marketplace",
    worksWith: ["ACC"],
    description: "Publish reality capture scans and alignments directly to ACC project folders.",
    rating: 4.2,
    reviewCount: 19,
    cta: "Connect",
    variant: "single",
  },
  {
    id: "structural-load-agent",
    name: "Structural Load Agent",
    category: "agents",
    isAutodesk: true,
    tint: "#5F60FF",
    vendor: "AI Agent",
    worksWith: ["Revit"],
    description: "Reviews load paths and flags structural coordination issues in Revit models.",
    rating: 4.7,
    reviewCount: 44,
    trust: ["Validated", "Security reviewed"],
    cta: "Add",
    variant: "single",
  },
  {
    id: "pdf-redline-bridge",
    name: "PDF Redline Bridge",
    category: "apps",
    tint: "#0696D7",
    vendor: "Marketplace",
    worksWith: ["AutoCAD", "ACC"],
    description: "Import PDF redlines into AutoCAD and sync markup status back to ACC reviews.",
    rating: 4.4,
    reviewCount: 86,
    cta: "Download",
    variant: "single",
  },
  {
    id: "scheduling-skill",
    name: "4D Scheduling Skill",
    category: "skills",
    tint: "#5F60FF",
    vendor: "Marketplace",
    worksWith: ["ACC", "Revit"],
    description: "Link model elements to schedule activities for 4D visualization and progress tracking.",
    rating: 4.1,
    reviewCount: 27,
    cta: "Add",
    variant: "single",
  },
  {
    id: "safety-walk-template",
    name: "Safety Walk Template",
    category: "templates",
    tint: "#FF6A00",
    vendor: "Marketplace",
    worksWith: ["ACC"],
    description: "Pre-built ACC forms and issue types for field safety walkthroughs and reporting.",
    rating: 4.6,
    reviewCount: 15,
    cta: "Download",
    variant: "single",
  },
];

// Grid contents: Autodesk products + marketplace solutions.
export const PS_PRODUCTS = [
  ...PS_BASE.map((p) => ({ ...p, category: "products", isAutodesk: true })),
  ...PS_SOLUTIONS,
];

/** Solutions from My products that work with the given Autodesk product. */
export function getRelatedMyProductsSolutions(product) {
  const matchKeys = new Set(
    [product.id, product.name]
      .filter(Boolean)
      .map((value) => value.toLowerCase()),
  );

  return PS_PRODUCTS.filter(
    (item) =>
      item.id !== product.id &&
      item.category !== "products" &&
      (item.worksWith || []).some((label) =>
        label
          .split(/,\s*/)
          .map((part) => part.trim().toLowerCase())
          .some((part) => matchKeys.has(part)),
      ),
  );
}

export function getUserAutocadOwnedSolutions() {
  return USER_AUTOCAD_OWNED_SOLUTION_IDS.map((id) => PS_PRODUCTS.find((product) => product.id === id)).filter(Boolean);
}

/** User discover carousel on AutoCAD detail — solutions not yet assigned, with mixed CTAs. */
export function getUserAutocadDiscoverSolutions() {
  const ownedIds = new Set(USER_AUTOCAD_OWNED_SOLUTION_IDS);

  const withSeat = (id) => {
    const solution = ORG_APPROVED_SOLUTIONS.find((item) => item.id === id);
    return solution && !ownedIds.has(solution.id) ? { ...solution, ctaLabel: "Request seat" } : null;
  };

  const withApproval = (id) => {
    const solution = EXPLORE_MORE_SOLUTIONS.find((item) => item.id === id);
    return solution && !ownedIds.has(solution.id) ? { ...solution, ctaLabel: "Request approval" } : null;
  };

  const leading = [
    withSeat("layer-standard-sync"),
    withApproval("pdf-redline-bridge"),
    withSeat("xref-manager"),
  ].filter(Boolean);

  const usedIds = new Set([...ownedIds, ...leading.map((item) => item.id)]);

  const restApproved = ORG_APPROVED_SOLUTIONS.filter(
    (solution) => solution.worksWith.includes("autocad") && !usedIds.has(solution.id),
  ).map((solution) => ({
    ...solution,
    ctaLabel: "Request seat",
  }));

  const restUnapproved = EXPLORE_MORE_SOLUTIONS.filter(
    (solution) => solution.worksWith.includes("autocad") && !usedIds.has(solution.id),
  ).map((solution) => ({
    ...solution,
    ctaLabel: "Request approval",
  }));

  return [...leading, ...restApproved, ...restUnapproved];
}

/** Admin discover carousel on AutoCAD detail — solutions to procure or approve, with mixed CTAs. */
export function getAdminAutocadDiscoverSolutions() {
  const ownedIds = new Set(USER_AUTOCAD_OWNED_SOLUTION_IDS);

  const withBuy = (id) => {
    const solution = ORG_APPROVED_SOLUTIONS.find((item) => item.id === id);
    return solution && !ownedIds.has(solution.id) ? { ...solution, ctaLabel: "Buy" } : null;
  };

  const withApproval = (id) => {
    const solution = EXPLORE_MORE_SOLUTIONS.find((item) => item.id === id);
    return solution && !ownedIds.has(solution.id) ? { ...solution, ctaLabel: "Request approval" } : null;
  };

  const leading = [
    withBuy("layer-standard-sync"),
    withApproval("pdf-redline-bridge"),
    withBuy("xref-manager"),
  ].filter(Boolean);

  const usedIds = new Set([...ownedIds, ...leading.map((item) => item.id)]);

  const restApproved = ORG_APPROVED_SOLUTIONS.filter(
    (solution) => solution.worksWith.includes("autocad") && !usedIds.has(solution.id),
  ).map((solution) => ({
    ...solution,
    ctaLabel: "Buy",
  }));

  const restUnapproved = EXPLORE_MORE_SOLUTIONS.filter(
    (solution) => solution.worksWith.includes("autocad") && !usedIds.has(solution.id),
  ).map((solution) => ({
    ...solution,
    ctaLabel: "Request approval",
  }));

  return [...leading, ...restApproved, ...restUnapproved];
}

// AutoCAD product detail — Figma node 632:336612 (years per research brief).
export const AUTOCAD_DETAIL = {
  years: ["2026", "2025", "2024", "2023"],
  defaultYear: "2025",
  platforms: ["Windows", "Mac", "Linux"],
  defaultPlatform: "Windows",
  languages: ["English", "Deutsch", "Français", "日本語"],
  defaultLanguage: "English",
  downloadCategories: [
    {
      id: "extensions",
      label: "Extensions",
      description: "Extensions: description for what extensions are goes here.",
    },
    {
      id: "plugins",
      label: "Plug-ins",
      description: "Plug-ins: description for what plug-ins are goes here.",
    },
    {
      id: "language",
      label: "Language",
      description: "Language packs: description for language packs goes here.",
    },
    {
      id: "libraries",
      label: "Libraries",
      description: "Libraries: description for libraries goes here.",
    },
    {
      id: "updates",
      label: "Updates",
      description: "Updates: description for product updates goes here.",
    },
  ],
  defaultCategory: "plugins",
  recommendedAppIds: ["dwg-markup-sync", "plot-publisher", "cad-assistant"],
  downloadsByCategory: {
    extensions: [
      { id: "ext-1", name: "AutoCAD {year} Ext Pen", date: "May 19, 2025", size: "56.84 MB", releaseNotes: true },
      { id: "ext-2", name: "AutoCAD {year} Ext Pen", date: "May 19, 2025", size: "56.84 MB" },
      { id: "ext-3", name: "AutoCAD {year} Ext Pen", date: "May 19, 2025", size: "56.84 MB" },
      { id: "ext-4", name: "AutoCAD {year} Ext Pen", date: "May 19, 2025", size: "56.84 MB" },
      { id: "ext-5", name: "AutoCAD {year} Ext Pen", date: "May 19, 2025", size: "56.84 MB" },
    ],
    plugins: [
      { id: "plg-1", name: "AutoCAD {year} Ext Pen", date: "May 19, 2025", size: "56.84 MB", releaseNotes: true },
      { id: "plg-2", name: "AutoCAD {year} Ext Pen", date: "May 19, 2025", size: "56.84 MB" },
      { id: "plg-3", name: "AutoCAD {year} Ext Pen", date: "May 19, 2025", size: "56.84 MB" },
      { id: "plg-4", name: "AutoCAD {year} Ext Pen", date: "May 19, 2025", size: "56.84 MB" },
    ],
    language: [
      { id: "lang-1", name: "AutoCAD {year} Language Pack EN", date: "Apr 2, 2025", size: "42.10 MB", releaseNotes: true },
      { id: "lang-2", name: "AutoCAD {year} Language Pack DE", date: "Apr 2, 2025", size: "41.88 MB" },
    ],
    libraries: [
      { id: "lib-1", name: "AutoCAD {year} Content Library", date: "Mar 10, 2025", size: "128.40 MB", releaseNotes: true },
    ],
    updates: [
      { id: "upd-1", name: "AutoCAD {year} Update 1", date: "Jun 1, 2025", size: "312.05 MB", releaseNotes: true },
      { id: "upd-2", name: "AutoCAD {year} Hotfix 2", date: "Jul 14, 2025", size: "18.22 MB" },
    ],
  },
  purchase: {
    date: "Jan 12, 2024",
    seats: "120 seats",
    totalPrice: "$18,000 / year",
  },
  subscriptionExpiry: {
    daysRemaining: 42,
  },
  subscriptionSummary: {
    subscriptionId: "77291038456102",
    team: "TS Organization",
    term: "1 year",
    autoRenew: "On",
    expiresOn: "Mar 15, 2027",
  },
  updateStatus: {
    installedVersion: "2025.1",
    latestVersion: "2025.2",
    latestReleaseDate: "Jul 14, 2025",
    updateAvailable: true,
    pendingUpdates: 2,
  },
  assignment: {
    totalSeats: 120,
    assignedUsers: Array.from({ length: 98 }, (_, index) => ({ id: `acad-u${index + 1}` })),
  },
  availableSeats: 22,
};

// AutoCAD Plot Publisher detail — Figma node 26165:103370 (sections below success banner).
export const PLOT_PUBLISHER_DETAIL = {
  years: ["2026", "2025", "2024", "2023"],
  defaultYear: "2026",
  platforms: ["Win 64", "Win 32", "Mac"],
  defaultPlatform: "Win 64",
  languages: ["English", "Deutsch", "Français"],
  defaultLanguage: "English",
  latestVersionLabel: "AutoCAD Plot Publisher {year}.2 Update",
  downloadCategories: [
    { id: "updates", label: "Updates" },
    { id: "extensions", label: "Extensions" },
  ],
  defaultCategory: "updates",
  downloadsByCategory: {
    updates: [
      {
        id: "plot-upd-1",
        name: "AutoCAD Plot Publisher {year}.2 Update",
        date: "Jul 22, 2026",
        size: "124.5 MB",
        releaseNotes: true,
      },
      {
        id: "plot-upd-2",
        name: "AutoCAD Plot Publisher {year}.1 Update",
        date: "May 10, 2026",
        size: "118.2 MB",
      },
      {
        id: "plot-upd-3",
        name: "AutoCAD Plot Publisher {year}.0",
        date: "Mar 4, 2026",
        size: "512.8 MB",
      },
    ],
    extensions: [
      {
        id: "plot-ext-1",
        name: "Plot Standards Pack",
        date: "Jun 15, 2026",
        size: "24.1 MB",
        releaseNotes: true,
      },
      {
        id: "plot-ext-2",
        name: "Batch Publish Toolkit",
        date: "Apr 8, 2026",
        size: "18.6 MB",
      },
    ],
  },
  purchase: {
    date: "Aug 7, 2025",
    seats: "20 seats",
    totalPrice: "$500 / month",
  },
  subscriptionExpiry: {
    daysRemaining: 15,
  },
  subscriptionSummary: {
    subscriptionId: "88492014567204",
    team: "TS Organization",
    term: "1 year",
    autoRenew: "On",
    expiresOn: "Oct 5, 2027",
  },
  updateStatus: {
    installedVersion: "2026.1",
    latestVersion: "2026.2",
    latestReleaseDate: "Jul 22, 2026",
    updateAvailable: true,
    pendingUpdates: 2,
  },
  assignment: {
    totalSeats: 20,
    assignedUsers: [
      {
        id: "u1",
        displayName: "01-Bat Man",
        email: "hero-bat.man@autodesk.com",
        initials: "OM",
        avatarColor: "#5F60FF",
        assignedFrom: "Pool",
      },
      {
        id: "u2",
        displayName: "02-Wonder Woman",
        email: "hero-wonder.woman@autodesk.com",
        initials: "OW",
        avatarColor: "#FF6A00",
        assignedFrom: "Pool",
      },
      {
        id: "u3",
        displayName: "03-Incredible Hulk",
        email: "hero-incredible.hulk@autodesk.com",
        initials: "OH",
        avatarColor: "#E03078",
        assignedFrom: "Pool",
      },
      {
        id: "u4",
        displayName: "04-Super Man",
        email: "hero-super.man@autodesk.com",
        initials: "SM",
        avatarColor: "#0696D7",
        assignedFrom: "Pool",
      },
      {
        id: "u5",
        displayName: "05-Cat Woman",
        email: "hero-cat.woman@autodesk.com",
        initials: "CW",
        avatarColor: "#8B5CF6",
        assignedFrom: "Pool",
      },
      {
        id: "u6",
        displayName: "06-Aquawoman",
        email: "hero-aquawoman@autodesk.com",
        initials: "AQ",
        avatarColor: "#00A94F",
        assignedFrom: "Pool",
      },
      {
        id: "u7",
        displayName: "07-The Flash",
        email: "hero-the-flash@autodesk.com",
        initials: "TF",
        avatarColor: "#FFC21A",
        assignedFrom: "Pool",
      },
      {
        id: "u8",
        displayName: "Aashima Mehta",
        email: "aashima.mehta@autodesk.com",
        initials: "AM",
        avatarColor: "#00838F",
        assignedFrom: "Pool",
      },
      {
        id: "u9",
        displayName: "Abhinav Chauhan",
        email: "abhinav.chauhan@autodesk.com",
        initials: "AC",
        avatarColor: "#0696D7",
        assignedFrom: "Pool",
      },
      {
        id: "u10",
        displayName: "Adam Smith",
        email: "adam.smith@autodesk.com",
        initials: "AS",
        avatarColor: "#64748B",
        assignedFrom: "Pool",
      },
    ],
    seatSources: ["Pool"],
    defaultSeatSource: "Pool",
    assignDescription:
      "AutoCAD Plot Publisher includes batch plotting tools for AutoCAD. If you don't want to assign all included items to these users, click Customize.",
    assignUserOptions: [
      {
        id: "u1",
        displayName: "01-Bat Man",
        email: "hero-bat.man@autodesk.com",
        initials: "OM",
        avatarColor: "#5F60FF",
        assigned: false,
      },
      {
        id: "u2",
        displayName: "02-Wonder Woman",
        email: "hero-wonder.woman@autodesk.com",
        initials: "OW",
        avatarColor: "#FF6A00",
        assigned: false,
      },
      {
        id: "u3",
        displayName: "03-Incredible Hulk",
        email: "hero-incredible.hulk@autodesk.com",
        initials: "OH",
        avatarColor: "#E03078",
        assigned: false,
      },
      {
        id: "u4",
        displayName: "04-Super Man",
        email: "hero-super.man@autodesk.com",
        initials: "SM",
        avatarColor: "#0696D7",
        assigned: false,
      },
      {
        id: "u5",
        displayName: "05-Cat Woman",
        email: "hero-cat.woman@autodesk.com",
        initials: "CW",
        avatarColor: "#8B5CF6",
        assigned: false,
      },
      {
        id: "u6",
        displayName: "06-Aquawoman",
        email: "hero-aquawoman@autodesk.com",
        initials: "AQ",
        avatarColor: "#00A94F",
        assigned: false,
      },
      {
        id: "u7",
        displayName: "07-The Flash",
        email: "hero-the-flash@autodesk.com",
        initials: "TF",
        avatarColor: "#FFC21A",
        assigned: false,
      },
      {
        id: "u8",
        displayName: "Aashima Mehta",
        email: "aashima.mehta@autodesk.com",
        initials: "AM",
        avatarColor: "#00838F",
        assigned: false,
      },
      {
        id: "u9",
        displayName: "Abhinav Chauhan",
        email: "abhinav.chauhan@autodesk.com",
        initials: "AC",
        avatarColor: "#0696D7",
        assigned: false,
      },
      {
        id: "u10",
        displayName: "Adam Smith",
        email: "adam.smith@autodesk.com",
        initials: "AS",
        avatarColor: "#64748B",
        assigned: false,
      },
      {
        id: "u11",
        displayName: "Abhishek Kaushik",
        email: "abhishek.kaushik@autodesk.com",
        initials: "AK",
        avatarColor: "#2563EB",
        assigned: false,
      },
    ],
    assignUserGroups: [
      { id: "amer-aeco", name: "AMER AECO", userIds: ["u1", "u2", "u3", "u4", "u5", "u6", "u7"] },
      { id: "emea-architects", name: "EMEA Architects", userIds: ["u8", "u9", "u10", "u11"] },
      { id: "flex-acad", name: "_Flex ACAD", userIds: ["u1", "u2", "u3", "u4", "u5", "u11"] },
    ],
    assignedUserOptionCount: 13,
  },
};

export const PLOT_PUBLISHER_LISTING = {
  developer: "PlotFlow Systems",
  price: "$50",
  priceCadence: "/ month",
  rating: 4.2,
  reviewCount: 89,
  heroDescription:
    "AutoCAD Plot Publisher batch publishes sheets to PDF and DWF using your organization plot standards, sheet sets, and publish configurations in Autodesk AutoCAD.",
  overview: {
    intro:
      "Plot Publisher helps CAD teams automate sheet publishing workflows. Configure plot styles once, then publish entire sheet sets with consistent output for review and delivery.",
    keyFeatures: [
      "Batch publish sheet sets to PDF, DWF, and plot files",
      "Apply organization plot standards and page setups automatically",
      "Queue and monitor publish jobs from AutoCAD",
      "Supports multi-sheet and multi-file publishing in one run",
    ],
  },
  details: {
    operatingSystem: "Windows",
    releaseDate: "Aug 7, 2025",
    lastUpdated: "Jul 22, 2026",
    version: "2026.2",
    language: "English",
    compatibleProduct: "AutoCAD",
    compatibleVersions: ["2023", "2024", "2025", "2026"],
    industries: ["AEC"],
    capabilities: ["Batch plotting", "PDF publishing", "Plot standards"],
  },
  ratings: {
    average: 4.2,
    distribution: { 5: 62, 4: 18, 3: 6, 2: 2, 1: 1 },
  },
  support: {
    publisherName: "PlotFlow Systems",
    websiteLabel: "Visit website",
    guideLabel: "User guide",
    privacyLabel: "Publisher Privacy Policy",
    eulaLabel: "End User Agreement (EULA)",
  },
  faqs: [
    {
      id: "faq-1",
      question: "What else should I know about this product?",
      answer:
        "Plot Publisher requires AutoCAD 2023 or later on Windows. Organization plot standards must be configured before batch publishing.",
    },
    {
      id: "faq-2",
      question: "Are there any known issues with this product?",
      answer:
        "Large sheet sets may require additional processing time. See release notes for the latest fixes and compatibility updates.",
    },
    {
      id: "faq-3",
      question: "Is there additional support information provided?",
      answer:
        "Contact PlotFlow Systems through the support link below or refer to the user guide for setup and troubleshooting.",
    },
  ],
};

export const MARKETPLACE_FILTERS = [
  { id: "all", label: "All" },
  { id: "apps", label: "Apps" },
  { id: "agents", label: "Agents" },
  { id: "templates", label: "Templates" },
  { id: "skills", label: "Skills" },
];

export const PRODUCTS = [
  {
    id: "3dsmax",
    name: "3ds Max",
    icon: ProductIdMM,
    description:
      "Autodesk® 3ds Max™ 2027.1 brings you new features and important fixes. For the complete list of updates, refer to the release notes.",
    version: "2027",
    platform: "Win 64",
    language: "English",
    cta: "Download",
    desktop: true,
    platforms: ["Windows"],
  },
  {
    id: "advance-steel",
    name: "Advance Steel",
    icon: ProductIdAS,
    description:
      "The Advance Steel detailing software helps accelerate design, including steel detailing, fabrication and construction.",
    version: "2027",
    platform: "Win 64",
    language: "English",
    cta: "Download",
    desktop: true,
    platforms: ["Windows"],
  },
  {
    id: "alias-concept",
    name: "Alias Concept",
    icon: ProductIdAM,
    description:
      "Autodesk Alias 2027.0.1 Hotfix addresses an OpenModel license validation issue and resolves other reported problems.",
    version: "2027",
    platform: "Win 64",
    language: "English",
    cta: "Download",
    desktop: true,
    platforms: ["Windows"],
  },
  {
    id: "alias-surface",
    name: "Alias Surface",
    icon: ProductIdSM,
    description:
      "Autodesk Alias 2027.0.1 Hotfix addresses an OpenModel license validation issue and resolves other reported problems.",
    version: "2027",
    platform: "Win 64",
    language: "English",
    cta: "Download",
    desktop: true,
    platforms: ["Windows"],
  },
  {
    id: "arnold",
    name: "Arnold",
    icon: ProductIdNM,
    description:
      "Arnold is an advanced Monte Carlo ray tracing renderer built for the demands of feature-length animation and visual effects.",
    version: "2027",
    platform: "Win 64",
    language: "English",
    cta: "Download",
    desktop: true,
    platforms: ["Windows", "macOS", "Linux"],
  },
  {
    id: "autocad",
    name: "AutoCAD",
    icon: ProductIdCM,
    description:
      "AutoCAD 2027 includes faster drawing regeneration, trace collaboration updates, and improved markup import.",
    version: "2027",
    platform: "Win 64",
    language: "English",
    cta: "Download",
    desktop: true,
    platforms: ["Windows"],
  },
  {
    id: "autocad-architecture",
    name: "AutoCAD Architecture",
    icon: ProductIdRM,
    description:
      "AutoCAD Architecture is AutoCAD software for architects, with purpose-built tools for architectural drawing and documentation.",
    version: "2027",
    platform: "Win 64",
    language: "English",
    cta: "Download",
    desktop: true,
    platforms: ["Windows"],
  },
  {
    id: "autocad-dwg-history",
    name: "AutoCAD DWG history",
    icon: ProductIdDM,
    description:
      "Compare and restore previous versions of your DWG files stored in supported cloud storage locations.",
    version: null,
    platform: null,
    language: null,
    cta: "Access",
    desktop: false,
  },
];

export const MARKETPLACE_SOLUTIONS = [
  {
    id: "model-checker",
    name: "Model Checker Pro",
    category: "apps",
    vendor: "Autodesk validated partner",
    worksWith: ["Revit", "ACC"],
    status: "Deployed",
    blurb: "Automated model validation against BIM standards and org rules.",
  },
  {
    id: "docs-automator",
    name: "Docs Issue Automator",
    category: "apps",
    vendor: "Marketplace",
    worksWith: ["ACC"],
    status: "Approved",
    blurb: "Route and assign ACC issues from clash results and RFIs.",
  },
  {
    id: "bim-agent",
    name: "BIM Coordination Agent",
    category: "agents",
    vendor: "AI Agent",
    worksWith: ["Revit", "ACC"],
    status: "Approved",
    blurb: "Suggests coordination fixes and drafts issue packages across models.",
  },
  {
    id: "ai-labels",
    name: "AI Room Labeling Agent",
    category: "agents",
    vendor: "AI Agent",
    worksWith: ["Revit"],
    status: "Available",
    blurb: "Proposes and applies room labels across large Revit projects.",
  },
  {
    id: "mep-template",
    name: "MEP Starter Template Pack",
    category: "templates",
    vendor: "Marketplace",
    worksWith: ["Revit"],
    status: "Available",
    blurb: "Pre-built Revit families, views, and sheets for MEP workflows.",
  },
  {
    id: "acc-handover",
    name: "ACC Handover Template",
    category: "templates",
    vendor: "Autodesk",
    worksWith: ["ACC"],
    status: "Deployed",
    blurb: "Standard folder structure and issue types for project closeout.",
  },
  {
    id: "cost-skill",
    name: "Cost Estimation Skill",
    category: "skills",
    vendor: "Marketplace",
    worksWith: ["ACC", "Revit"],
    status: "Approved",
    blurb: "Extract quantities and map cost codes from model data.",
  },
  {
    id: "clash-skill",
    name: "Clash Triage Skill",
    category: "skills",
    vendor: "Marketplace",
    worksWith: ["Revit", "Navisworks"],
    status: "Available",
    blurb: "Prioritize clashes by trade, severity, and location for faster review.",
  },
];

// --- User Management (Account → User Management) ---
export const UM_TABS = [
  { id: "by-user", label: "By user" },
  { id: "by-product", label: "By product" },
  { id: "by-group", label: "By group" },
  { id: "by-permission", label: "By permission" },
];

export const UM_TEAMS = [{ id: "ts-org", label: "TS Organization" }];

export const UM_PRODUCT_LOGOS = {
  autocad: "./logos/autocad.png",
  inventor: "./logos/inventor.png",
  fusion360: "./logos/fusion360.png",
  revit: "./logos/revit.png",
};

export const UM_USERS = [
  {
    id: "u1",
    name: "Bat Man",
    email: "hero-bat.man@autodesk.com",
    role: "External user",
    status: "Verified",
    products: ["autocad", "inventor", "fusion360", "revit"],
    moreProducts: 2,
  },
  {
    id: "u2",
    name: "Wonder Woman",
    email: "hero-wonder.woman@autodesk.com",
    role: "User",
    status: "Verified",
    products: ["autocad"],
  },
  {
    id: "u3",
    name: "Incredible Hulk",
    email: "hero-incredible.hulk@autodesk.com",
    role: "User",
    status: "Verified",
    products: ["inventor"],
  },
  {
    id: "u4",
    name: "Super Man",
    email: "hero-super.man@autodesk.com",
    role: "User",
    status: "Verified",
    products: ["autocad", "revit"],
  },
  {
    id: "u5",
    name: "Cat Woman",
    email: "hero-cat.woman@autodesk.com",
    role: "User",
    status: "Verified",
    products: ["fusion360"],
  },
  {
    id: "u6",
    name: "Aquawoman",
    email: "hero-aquawoman@autodesk.com",
    role: "User",
    status: "Verified",
    products: ["revit", "autocad"],
  },
  {
    id: "u7",
    name: "The Flash",
    email: "hero-the-flash@autodesk.com",
    role: "User",
    status: "Verified",
    products: ["inventor", "fusion360"],
  },
  {
    id: "u8",
    name: "Aashima Mehta",
    email: "aashima.mehta@autodesk.com",
    role: "Secondary admin",
    status: "Verified",
    products: ["autocad", "revit"],
  },
  {
    id: "u9",
    name: "Abhinav Chauhan",
    email: "abhinav.chauhan@autodesk.com",
    role: "Secondary admin",
    status: "Verified",
    products: ["fusion360"],
  },
  {
    id: "u10",
    name: "Adam Smith",
    email: "adam.smith@autodesk.com",
    role: "User",
    status: "Verified",
    products: ["autocad", "inventor", "revit"],
    moreProducts: 1,
  },
];

export const UM_TOTAL_USERS = 1007;

export const UM_PRODUCT_TYPE_FILTERS = [
  { id: "all", label: "All" },
  ...PS_TYPE_FILTERS.filter((filter) => filter.id !== "all"),
];

const UM_ASSIGNED = [
  {
    id: "aec-collection",
    name: "Architecture Engineering & Construction Collection",
    category: "products",
    isAutodesk: true,
    tint: "#0696D7",
    abbr: "AEC",
  },
  {
    id: "fusion-design",
    name: "Fusion for Design",
    category: "products",
    isAutodesk: true,
    tint: "#FF6A00",
    abbr: "FUS",
    logoSrc: "./logos/fusion360.png",
  },
  {
    id: "flex",
    name: "Flex",
    category: "products",
    isAutodesk: true,
    tint: "#FFC21A",
    abbr: "F",
  },
  {
    id: "dwg-markup-sync",
    name: "DWG Markup Sync",
    category: "apps",
    tint: "#0696D7",
    abbr: "D",
  },
  {
    id: "docs-automator",
    name: "Docs Issue Automator",
    category: "integrations",
    tint: "#00A94F",
    abbr: "D",
  },
  {
    id: "bim-agent",
    name: "BIM Coordination Agent",
    category: "agents",
    isAutodesk: true,
    tint: "#5F60FF",
    abbr: "B",
  },
  {
    id: "cost-skill",
    name: "Cost Estimation Skill",
    category: "skills",
    tint: "#8B5CF6",
    abbr: "C",
  },
  {
    id: "mep-template",
    name: "MEP Starter Template Pack",
    category: "templates",
    tint: "#00A94F",
    abbr: "M",
  },
];

const UM_UNASSIGNED_STUB = [
  { id: "navisworks", name: "Navisworks Manage", category: "products", isAutodesk: true, tint: "#00A94F", abbr: "N" },
  { id: "3ds-max", name: "3ds Max", category: "products", isAutodesk: true, tint: "#0696D7", abbr: "3" },
  { id: "maya", name: "Maya", category: "products", isAutodesk: true, tint: "#00A94F", abbr: "M" },
  { id: "model-checker", name: "Model Checker Pro", category: "apps", tint: "#0696D7", abbr: "M" },
  { id: "forma-acc-sync", name: "Forma ACC Sync", category: "integrations", tint: "#FF6A00", abbr: "F" },
  { id: "cad-assistant", name: "CAD Assistant Agent", category: "agents", isAutodesk: true, tint: "#5F60FF", abbr: "C" },
  { id: "clash-skill", name: "Clash Triage Skill", category: "skills", tint: "#5F60FF", abbr: "S" },
  { id: "acc-handover-template", name: "ACC Handover Template", category: "templates", tint: "#0696D7", abbr: "A" },
];

export const UM_USER_DETAILS = {
  u1: {
    displayName: "01-Bat Man",
    groups: ["AMER AECO", "_Flex Vault", "_Flex ACAD", "EMEA Architects"],
    autodeskId: "hero-bat.man",
    addedToTeam: "March 15, 2022",
    assignedProducts: UM_ASSIGNED,
    unassignedProducts: UM_UNASSIGNED_STUB,
    unassignedCount: 32,
  },
};

export function getUserDetail(user) {
  if (UM_USER_DETAILS[user.id]) {
    return UM_USER_DETAILS[user.id];
  }

  const userIndex = UM_USERS.findIndex((entry) => entry.id === user.id);
  const displayNumber = String(Math.max(userIndex + 1, 1)).padStart(2, "0");
  const autodeskId = user.email.split("@")[0];

  return {
    displayName: `${displayNumber}-${user.name}`,
    groups: UM_USER_DETAILS.u1.groups,
    autodeskId,
    addedToTeam: "March 15, 2022",
    assignedProducts: UM_ASSIGNED,
    unassignedProducts: UM_UNASSIGNED_STUB,
    unassignedCount: 32,
  };
}

// --- Billing and orders (Subscription Hub VisD) ---
export const BO_TABS = [
  { id: "summary", label: "Summary" },
  { id: "subscriptions", label: "Subscriptions and contracts" },
  { id: "quotes", label: "Quotes" },
  { id: "invoices", label: "Invoices and credit memos" },
  { id: "upcoming-payments", label: "Upcoming payments" },
  { id: "order-history", label: "Order history" },
  { id: "payment-methods", label: "Payment methods" },
  { id: "customer-details", label: "Customer details" },
];

export const BO_UPCOMING = [
  {
    id: "quotes",
    title: "Quotes",
    subtitle: "(next 30 days)",
    count: 3,
    action: "Manage quotes",
  },
  {
    id: "expirations",
    title: "Expirations",
    subtitle: "(next 90 days)",
    count: 12,
    action: "Manage subscriptions",
    note: true,
  },
  {
    id: "payments",
    title: "Overdue payments",
    subtitle: "",
    count: 1,
    action: "Manage payments",
  },
  {
    id: "invoices",
    title: "Invoices",
    subtitle: "(next 30 days)",
    count: 8,
    action: "Manage invoices",
  },
];

export const BO_SUBSCRIPTION_CARDS = [
  {
    id: "autocad",
    name: "AutoCAD",
    type: "autodesk",
    logoSrc: "./logos/autocad.png",
    stats: [
      { label: "Contracts", value: "5" },
      { label: "Seats", value: "21" },
      { label: "Teams", value: "2" },
    ],
  },
  {
    id: "revit",
    name: "Revit",
    type: "autodesk",
    logoSrc: "./logos/revit.png",
    stats: [
      { label: "Subscriptions", value: "8" },
      { label: "Seats", value: "20" },
      { label: "Teams", value: "2" },
    ],
  },
  {
    id: "civil-3d",
    name: "Civil 3D",
    type: "autodesk",
    tint: "#5F60FF",
    abbr: "C3D",
    stats: [
      { label: "Subscriptions", value: "3" },
      { label: "Seats", value: "60" },
      { label: "Teams", value: "2" },
    ],
  },
  {
    id: "dwg-markup-sync",
    name: "DWG Markup Sync",
    type: "marketplace",
    tint: "#0696D7",
    abbr: "D",
    vendor: "Marketplace",
    stats: [
      { label: "Subscriptions", value: "2" },
      { label: "Seats", value: "15" },
      { label: "Teams", value: "1" },
    ],
  },
  {
    id: "docs-automator",
    name: "Docs Issue Automator",
    type: "marketplace",
    tint: "#00A94F",
    abbr: "D",
    vendor: "Marketplace",
    stats: [
      { label: "Subscriptions", value: "1" },
      { label: "Seats", value: "10" },
      { label: "Teams", value: "1" },
    ],
  },
  {
    id: "model-checker",
    name: "Model Checker Pro",
    type: "marketplace",
    tint: "#0696D7",
    abbr: "M",
    vendor: "Autodesk validated partner",
    stats: [
      { label: "Subscriptions", value: "1" },
      { label: "Seats", value: "8" },
      { label: "Teams", value: "1" },
    ],
  },
];

export const BO_TOTAL_SUBSCRIPTIONS = 60;

export const BO_RENEWAL_DATE_OPTIONS = [
  { id: "all", label: "All dates" },
  { id: "2026", label: "2026" },
  { id: "2027", label: "2027" },
  { id: "2028", label: "2028" },
];

/** Subscriptions list — product rows aligned with `PS_PRODUCTS` (Autodesk + marketplace apps/agents). */
export const BO_SUBSCRIPTIONS = [
  {
    id: "sub-autocad-1",
    productId: "autocad",
    displayName: "AutoCAD — including specialized toolsets",
    productName: "AutoCAD — including specialized toolsets",
    logoSrc: "./logos/autocad.png",
    referenceLabel: "Subscription ID 73348785692472",
    team: "TS Organization",
    seats: 1,
    term: "3 year",
    paymentMethod: "N/A",
    expires: "Nov 21, 2027",
    productType: "products",
    orderType: "subscription",
    autoRenew: "on",
    status: "eligible",
    renewalDate: "2027",
  },
  {
    id: "sub-revit-1",
    productId: "revit",
    displayName: "Revit",
    productName: "Revit",
    logoSrc: "./logos/revit.png",
    referenceLabel: "Contract #110004910264",
    team: "TS Organization",
    seats: 21,
    term: "3 year",
    paymentMethod: "N/A",
    expires: "Nov 21, 2027",
    productType: "products",
    orderType: "contract",
    autoRenew: "off",
    status: "eligible",
    renewalDate: "2027",
  },
  {
    id: "sub-inventor-1",
    productId: "inventor",
    displayName: "Inventor",
    productName: "Inventor",
    logoSrc: "./logos/inventor.png",
    referenceLabel: "Subscription ID 73348785692480",
    team: "TS Organization",
    seats: 5,
    term: "1 year",
    paymentMethod: "N/A",
    expires: "Mar 14, 2027",
    productType: "products",
    orderType: "subscription",
    autoRenew: "on",
    status: "expiring",
    renewalDate: "2027",
  },
  {
    id: "sub-fusion-1",
    productId: "fusion360",
    displayName: "Fusion 360",
    productName: "Fusion 360",
    logoSrc: "./logos/fusion360.png",
    referenceLabel: "Subscription ID 73348785692491",
    team: "TS Organization",
    seats: 3,
    term: "1 year",
    paymentMethod: "N/A",
    expires: "Jul 2, 2027",
    productType: "products",
    orderType: "subscription",
    autoRenew: "on",
    status: "eligible",
    renewalDate: "2027",
  },
  {
    id: "sub-dwg-markup-1",
    productId: "dwg-markup-sync",
    displayName: "DWG Markup Sync",
    productName: "DWG Markup Sync",
    tint: "#0696D7",
    abbr: "D",
    referenceLabel: "Subscription ID 88492014567201",
    team: "TS Organization",
    seats: 15,
    term: "1 year",
    paymentMethod: "N/A",
    expires: "Jun 18, 2027",
    productType: "apps",
    orderType: "subscription",
    autoRenew: "on",
    status: "eligible",
    renewalDate: "2027",
  },
  {
    id: "sub-model-checker-1",
    productId: "model-checker",
    displayName: "Model Checker Pro",
    productName: "Model Checker Pro",
    tint: "#0696D7",
    abbr: "M",
    referenceLabel: "Subscription ID 88492014567202",
    team: "TS Organization",
    seats: 8,
    term: "1 year",
    paymentMethod: "N/A",
    expires: "Aug 3, 2027",
    productType: "apps",
    orderType: "subscription",
    autoRenew: "off",
    status: "suspended",
    renewalDate: "2027",
  },
  {
    id: "sub-docs-automator-1",
    productId: "docs-automator",
    displayName: "Docs Issue Automator",
    productName: "Docs Issue Automator",
    tint: "#00A94F",
    abbr: "D",
    referenceLabel: "Subscription ID 88492014567203",
    team: "TS Organization",
    seats: 10,
    term: "1 year",
    paymentMethod: "N/A",
    expires: "Sep 12, 2027",
    productType: "integrations",
    orderType: "subscription",
    autoRenew: "on",
    status: "eligible",
    renewalDate: "2027",
  },
  {
    id: "sub-plot-publisher-1",
    productId: "plot-publisher",
    displayName: "AutoCAD Plot Publisher",
    productName: "AutoCAD Plot Publisher",
    tint: "#FF6A00",
    abbr: "P",
    referenceLabel: "Subscription ID 88492014567204",
    team: "TS Organization",
    seats: 4,
    term: "1 year",
    paymentMethod: "N/A",
    expires: "Oct 5, 2027",
    productType: "apps",
    orderType: "subscription",
    autoRenew: "on",
    status: "payment-error",
    renewalDate: "2027",
  },
  {
    id: "sub-bim-agent-1",
    productId: "bim-agent",
    displayName: "BIM Coordination Agent",
    productName: "BIM Coordination Agent",
    tint: "#5F60FF",
    abbr: "B",
    referenceLabel: "Subscription ID 88492014567205",
    team: "TS Organization",
    seats: 12,
    term: "1 year",
    paymentMethod: "N/A",
    expires: "Dec 1, 2027",
    productType: "agents",
    orderType: "subscription",
    autoRenew: "on",
    status: "eligible",
    renewalDate: "2027",
  },
  {
    id: "sub-labeling-agent-1",
    productId: "labeling-agent",
    displayName: "AI Room Labeling Agent",
    productName: "AI Room Labeling Agent",
    tint: "#8B5CF6",
    abbr: "A",
    referenceLabel: "Subscription ID 88492014567206",
    team: "TS Organization",
    seats: 6,
    term: "1 year",
    paymentMethod: "N/A",
    expires: "Jan 15, 2028",
    productType: "agents",
    orderType: "subscription",
    autoRenew: "on",
    status: "eligible",
    renewalDate: "2028",
  },
  {
    id: "sub-cad-assistant-1",
    productId: "cad-assistant",
    displayName: "CAD Assistant Agent",
    productName: "CAD Assistant Agent",
    tint: "#5F60FF",
    abbr: "C",
    referenceLabel: "Subscription ID 88492014567207",
    team: "TS Organization",
    seats: 2,
    term: "1 year",
    paymentMethod: "N/A",
    expires: "Feb 28, 2028",
    productType: "agents",
    orderType: "subscription",
    autoRenew: "off",
    status: "canceled",
    renewalDate: "2028",
  },
];
