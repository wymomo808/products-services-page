import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  MenuItem,
  Select,
  Tab,
  TabContext,
  TabList,
  TabPanel,
  Typography,
} from "@weave-mui/material";
import { selectVariants, tabAlignment, tabVariant } from "@weave-mui/enums";
import { FigmaCtaArrowRight } from "../BillingIcons.jsx";
import AccountSearchField, { SearchFilterBar } from "../AccountSearchField.jsx";
import {
  PS_AUTODESK_TYPE_FILTERS,
  PS_MARKETPLACE_TYPE_FILTERS,
  PS_PRODUCTS,
  PS_SORT_OPTIONS,
  PS_TABS,
} from "../data.js";
import AccountShell from "../AccountShell.jsx";
import { USER_ACCOUNT_NAV } from "../data.js";
import OrgApprovedSolutions from "../OrgApprovedSolutions.jsx";
import ExploreMoreSolutions from "../ExploreMoreSolutions.jsx";
import ProductCarousel from "../ProductCarousel.jsx";
import ProductDetail from "../ProductDetail.jsx";
import { resolveCatalogProduct } from "../detailConfig.js";
import AddCustomIntegration from "../AddCustomIntegration.jsx";
import WorkflowRecommendations from "../WorkflowRecommendations.jsx";
import { FONT, PAGE_X, useAccountTheme } from "../useAccountTheme.js";
import { VIS_D } from "../visdTokens.js";

const sectionTitleSx = {
  ...VIS_D.typography.sectionTitle,
  fontFamily: FONT,
  fontWeight: 800,
  fontSynthesis: "none",
  mb: "16px",
};

const pageTitleSx = {
  ...VIS_D.typography.pageTitle,
  fontFamily: FONT,
  fontSize: "28px",
  fontWeight: 800,
  fontSynthesis: "none",
  mb: "8px",
};

const addIntegrationBtnSx = {
  ...VIS_D.typography.label16Semi,
  fontFamily: FONT,
  textTransform: "none",
  bgcolor: VIS_D.colors.ink,
  color: "#fff",
  borderRadius: `${VIS_D.radius.button}px`,
  boxShadow: "none",
  py: "8px",
  px: "20px",
  flexShrink: 0,
  "&:hover": { bgcolor: "#222222", boxShadow: "none" },
};

const filterSelectSx = {
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
};

const viewAllButtonSx = {
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

function applySort(products, sort) {
  if (sort === "alphabetical") {
    return [...products].sort((a, b) => a.name.localeCompare(b.name));
  }
  return products;
}

function applyTypeFilter(products, types) {
  if (types.includes("all") || types.length === 0) return products;
  return products.filter((product) => types.includes(product.category));
}

function createTypeChangeHandler(setTypes) {
  return (event) => {
    const value = event.target.value;
    setTypes((prev) => {
      const addedAll = value.includes("all") && !prev.includes("all");
      if (addedAll || value.length === 0) {
        return ["all"];
      }
      const specifics = value.filter((v) => v !== "all");
      return specifics.length ? specifics : ["all"];
    });
  };
}

function renderFilterValue(selected, filterOptions, defaultLabel) {
  const label =
    selected.includes("all") || selected.length === 0
      ? defaultLabel
      : filterOptions
          .filter((f) => selected.includes(f.id))
          .map((f) => f.label)
          .join(", ");
  return `Filters: ${label}`;
}

function splitMyProductsBySection(products) {
  const fromAutodesk = [];
  const fromMarketplace = [];
  const customIntegrations = [];

  for (const product of products) {
    if (product.category === "integrations") {
      customIntegrations.push(product);
      continue;
    }
    if (product.category === "products" || (product.category === "agents" && product.isAutodesk)) {
      fromAutodesk.push(product);
      continue;
    }
    if (["apps", "agents", "skills", "templates"].includes(product.category)) {
      fromMarketplace.push(product);
    }
  }

  return { fromAutodesk, fromMarketplace, customIntegrations };
}

function SectionTypeFilter({ types, onChange, filterOptions, defaultLabel, ariaLabel, width = 320 }) {
  return (
    <Box sx={{ width, flexShrink: 0 }}>
      <Select
        multiple
        fullWidth
        variant={selectVariants.BOX}
        size="small"
        value={types}
        onChange={onChange}
        renderValue={(selected) => renderFilterValue(selected, filterOptions, defaultLabel)}
        displayEmpty
        aria-label={ariaLabel}
        MenuProps={{ PaperProps: { sx: { mt: "4px" } } }}
        sx={filterSelectSx}
      >
        {filterOptions.map((f) => {
          const checked = f.id === "all" ? types.includes("all") : types.includes(f.id);
          return (
            <MenuItem key={f.id} value={f.id} sx={{ display: "flex", alignItems: "center", gap: "10px", py: "6px" }}>
              <Checkbox checked={checked} sx={{ p: 0 }} />
              <Typography component="span" sx={{ ...VIS_D.typography.bodySmall }}>
                {f.label}
              </Typography>
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
}

function SectionSortFilter({ sort, onChange, ariaLabel }) {
  return (
    <Box sx={{ width: 190, flexShrink: 0 }}>
      <Select
        fullWidth
        variant={selectVariants.BOX}
        size="small"
        value={sort}
        onChange={onChange}
        renderValue={(v) => `Sort: ${PS_SORT_OPTIONS.find((o) => o.id === v)?.label ?? ""}`}
        aria-label={ariaLabel}
        MenuProps={{ PaperProps: { sx: { mt: "4px" } } }}
        sx={filterSelectSx}
      >
        {PS_SORT_OPTIONS.map((o) => (
          <MenuItem key={o.id} value={o.id} sx={{ py: "6px" }}>
            <Typography sx={{ ...VIS_D.typography.bodySmall }}>{o.label}</Typography>
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}

function MyProductsSection({
  title,
  body,
  products,
  onAction,
  onViewDetails,
  onViewAll,
  showFilters = false,
  showSort = false,
  typeFilters = [],
  types = ["all"],
  onTypeChange,
  filterDefaultLabel = "All",
  sort = "latest",
  onSortChange,
  headerAction = null,
  alwaysShow = false,
  hideDeployedBadge = false,
  hidePrimaryCta = false,
}) {
  if (!products.length && !alwaysShow) return null;

  const showHeaderControls = showFilters || showSort || headerAction;

  return (
    <Box component="section" sx={{ mb: "48px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
          mb: body ? "8px" : "24px",
        }}
      >
        <Box component="h3" sx={{ ...sectionTitleSx, mb: 0 }}>
          {title}
        </Box>
        {showHeaderControls ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0, ml: "auto" }}>
            {headerAction}
            {showFilters ? (
              <SectionTypeFilter
                types={types}
                onChange={onTypeChange}
                filterOptions={typeFilters}
                defaultLabel={filterDefaultLabel}
                ariaLabel={`Filter ${title}`}
              />
            ) : null}
            {onSortChange ? (
              <SectionSortFilter sort={sort} onChange={onSortChange} ariaLabel={`Sort ${title}`} />
            ) : null}
          </Box>
        ) : null}
      </Box>
      {body ? (
        <Typography sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT, color: VIS_D.colors.textPrimary, mb: "24px" }}>
          {body}
        </Typography>
      ) : null}

      {products.length ? (
        <>
          <Box sx={{ mb: "24px" }}>
            <ProductCarousel
              products={products}
              onAction={onAction}
              onViewDetails={onViewDetails}
              visibleCount={4}
              hideDeployedBadge={hideDeployedBadge}
              hidePrimaryCta={hidePrimaryCta}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Button
              variant="outlined"
              onClick={() => {
                if (onViewAll) {
                  onViewAll();
                  return;
                }
                onAction(`View all — ${title}`);
              }}
              sx={viewAllButtonSx}
              endIcon={<FigmaCtaArrowRight size={20} />}
            >
              View all
            </Button>
          </Box>
        </>
      ) : null}
    </Box>
  );
}

function EmptyState({ title, body }) {
  return (
    <Box sx={{ py: "64px", textAlign: "center", maxWidth: 520, mx: "auto" }}>
      <Typography sx={{ ...VIS_D.typography.headlineSmall, fontSize: "18px", mb: "8px" }}>{title}</Typography>
      <Typography sx={{ ...VIS_D.typography.bodyMedium, color: VIS_D.colors.textPrimary }}>{body}</Typography>
    </Box>
  );
}

export default function ProductsServices({ onNavigate }) {
  const theme = useAccountTheme();
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");
  const [autodeskTypes, setAutodeskTypes] = useState(["all"]);
  const [autodeskSort, setAutodeskSort] = useState("latest");
  const [marketplaceTypes, setMarketplaceTypes] = useState(["all"]);
  const [marketplaceSort, setMarketplaceSort] = useState("latest");
  const [customIntegrationsSort, setCustomIntegrationsSort] = useState("latest");
  const [toast, setToast] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailSource, setDetailSource] = useState("my-products");
  const [addIntegrationOpen, setAddIntegrationOpen] = useState(false);

  useEffect(() => {
    if (!toast) return undefined;
    const t = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(t);
  }, [toast]);

  const searchedProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? PS_PRODUCTS.filter((p) => p.name.toLowerCase().includes(q)) : PS_PRODUCTS;
  }, [query]);

  const { fromAutodesk, fromMarketplace, customIntegrations } = useMemo(() => {
    const split = splitMyProductsBySection(searchedProducts);
    return {
      fromAutodesk: applySort(applyTypeFilter(split.fromAutodesk, autodeskTypes), autodeskSort),
      fromMarketplace: applySort(applyTypeFilter(split.fromMarketplace, marketplaceTypes), marketplaceSort),
      customIntegrations: applySort(split.customIntegrations, customIntegrationsSort),
    };
  }, [searchedProducts, autodeskTypes, autodeskSort, marketplaceTypes, marketplaceSort, customIntegrationsSort]);

  const handleAutodeskTypeChange = createTypeChangeHandler(setAutodeskTypes);
  const handleMarketplaceTypeChange = createTypeChangeHandler(setMarketplaceTypes);

  const handleViewDetails = (product, source = "my-products") => {
    const catalogProduct = resolveCatalogProduct(product);
    if (catalogProduct?.category === "integrations") {
      setToast(`View details — ${catalogProduct.name}`);
      return;
    }
    if (catalogProduct) {
      setSelectedProduct(catalogProduct);
      setDetailSource(source);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setToast(`View details — ${product.name}`);
  };

  const handleViewOrgApproved = () => {
    setSelectedProduct(null);
    setDetailSource("my-products");
    setTab("org-approved");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewAllApps = () => {
    setSelectedProduct(null);
    setTab("all");
    setMarketplaceTypes(["apps", "agents", "skills", "templates"]);
    setQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTabChange = (_event, value) => {
    setTab(value);
    setSelectedProduct(null);
    setAddIntegrationOpen(false);
  };

  const handleOpenAddIntegration = () => {
    setSelectedProduct(null);
    setAddIntegrationOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCloseAddIntegration = () => {
    setAddIntegrationOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAccountNavigate = (route) => {
    if (route === "billing-and-orders") {
      setToast("Billing and orders");
      return;
    }
    onNavigate?.(route);
  };

  return (
    <AccountShell
      theme={theme}
      activeNav="Products & solutions"
      onNavigate={handleAccountNavigate}
      toast={toast}
      navItems={USER_ACCOUNT_NAV}
      disabledNavItems={["User Management"]}
    >
        {/* Content */}
        <Box sx={{ px: PAGE_X, pt: "32px", pb: "48px", flex: 1 }}>
          {!selectedProduct && !addIntegrationOpen ? (
            <Box sx={{ mb: "24px", maxWidth: 720 }}>
              <Box component="h1" sx={pageTitleSx}>
                Products & Solutions
              </Box>
              <Typography
                sx={{
                  ...VIS_D.typography.bodyMedium,
                  fontFamily: FONT,
                  color: VIS_D.colors.textPrimary,
                }}
              >
                Discover, approve, and deploy capabilities — Autodesk products, marketplace solutions, agents, and
                integrations that help your organization achieve outcomes.
              </Typography>
            </Box>
          ) : null}

          {selectedProduct ? (
            <ProductDetail
              product={selectedProduct}
              detailSource={detailSource}
              isUserView
              onBack={() => {
                if (detailSource === "org-approved" || detailSource === "explore-more" || detailSource === "workflow") {
                  setTab("org-approved");
                }
                setSelectedProduct(null);
                setDetailSource("my-products");
              }}
              onAction={setToast}
              onViewAllApps={handleViewAllApps}
              onViewDetails={handleViewDetails}
              onViewOrgApproved={handleViewOrgApproved}
            />
          ) : addIntegrationOpen ? (
            <AddCustomIntegration onCancel={handleCloseAddIntegration} onAction={setToast} />
          ) : (
          <TabContext value={tab}>
            <TabList
              onChange={handleTabChange}
              variant={tabVariant.STANDARD}
              align={tabAlignment.LEFT}
              showAddButton={false}
              aria-label="Products & solutions views"
              sx={{
                borderBottom: `1px solid ${VIS_D.colors.rowDivider}`,
                mb: "24px",
                minHeight: 48,
                "& .MuiTab-root": {
                  ...VIS_D.typography.label16Semi,
                  fontFamily: FONT,
                  textTransform: "none",
                  color: VIS_D.colors.textLight,
                  minHeight: 48,
                  px: 2,
                },
                "& .MuiTab-root.Mui-selected": { color: VIS_D.colors.ink },
                "& .MuiTabs-indicator": { backgroundColor: VIS_D.colors.ink, height: 2 },
              }}
            >
              {PS_TABS.map((t) => (
                <Tab key={t.id} label={t.label} value={t.id} />
              ))}
            </TabList>

            <TabPanel value="all" sx={{ p: 0 }}>
              <SearchFilterBar sx={{ flexWrap: "wrap", mb: "32px" }}>
                <AccountSearchField value={query} onChange={(e) => setQuery(e.target.value)} />
              </SearchFilterBar>

              <MyProductsSection
                title="From Autodesk"
                body="Autodesk products and agents available to your organization."
                products={fromAutodesk}
                onAction={setToast}
                onViewDetails={handleViewDetails}
                onViewAll={() => setToast("View all — From Autodesk")}
                showFilters
                typeFilters={PS_AUTODESK_TYPE_FILTERS}
                types={autodeskTypes}
                onTypeChange={handleAutodeskTypeChange}
                filterDefaultLabel="All"
                sort={autodeskSort}
                onSortChange={(e) => setAutodeskSort(e.target.value)}
                hideDeployedBadge
              />
              <MyProductsSection
                title="From the Marketplace"
                body="Apps, agents, templates, and skills from the Autodesk Marketplace."
                products={fromMarketplace}
                onAction={setToast}
                onViewDetails={handleViewDetails}
                onViewAll={() => setToast("View all — From the Marketplace")}
                showFilters
                typeFilters={PS_MARKETPLACE_TYPE_FILTERS}
                types={marketplaceTypes}
                onTypeChange={handleMarketplaceTypeChange}
                filterDefaultLabel="All"
                sort={marketplaceSort}
                onSortChange={(e) => setMarketplaceSort(e.target.value)}
                hideDeployedBadge
              />
              <MyProductsSection
                title="Custom integrations"
                body="Customer-built integrations connected to your workflows."
                products={customIntegrations}
                onAction={setToast}
                onViewDetails={handleViewDetails}
                onViewAll={() => setToast("View all — Custom integrations")}
                showSort
                sort={customIntegrationsSort}
                onSortChange={(e) => setCustomIntegrationsSort(e.target.value)}
                alwaysShow
                hideDeployedBadge
                hidePrimaryCta
                headerAction={
                  <Button variant="contained" onClick={handleOpenAddIntegration} sx={addIntegrationBtnSx}>
                    Add custom integration
                  </Button>
                }
              />

              {!fromAutodesk.length && !fromMarketplace.length && !customIntegrations.length ? (
                <EmptyState
                  title="No products match your search"
                  body="Try adjusting your search."
                />
              ) : null}
            </TabPanel>

            {PS_TABS.filter((t) => t.id !== "all" && t.id !== "org-approved").map((t) => (
              <TabPanel key={t.id} value={t.id} sx={{ p: 0 }}>
                <EmptyState title={t.label} body={`${t.label} content (prototype placeholder).`} />
              </TabPanel>
            ))}

            <TabPanel value="org-approved" sx={{ p: 0 }}>
              <WorkflowRecommendations
                onAction={setToast}
                onViewDetails={(product) => handleViewDetails(product, "workflow")}
                ctaLabel="Request seat"
              />
              <Box sx={{ mt: "48px" }}>
                <OrgApprovedSolutions
                  onAction={setToast}
                  onViewDetails={(product) => handleViewDetails(product, "org-approved")}
                  ctaLabel="Request seat"
                />
              </Box>
              <ExploreMoreSolutions
                onAction={setToast}
                onViewDetails={(product) => handleViewDetails(product, "explore-more")}
              />
            </TabPanel>
          </TabContext>
          )}
        </Box>
    </AccountShell>
  );
}
