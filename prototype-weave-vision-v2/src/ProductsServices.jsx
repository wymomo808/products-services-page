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
import AccountSearchField, { FilterBarButton, SearchFilterBar } from "./AccountSearchField.jsx";
import {
  PS_PRODUCTS,
  PS_SORT_OPTIONS,
  PS_TABS,
  PS_TYPE_FILTERS,
  RECENTLY_PURCHASED,
} from "./data.js";
import AccountShell from "./AccountShell.jsx";
import BundleCard from "./BundleCard.jsx";
import OrgApprovedSolutions from "./OrgApprovedSolutions.jsx";
import ExploreMoreSolutions from "./ExploreMoreSolutions.jsx";
import ProductCard3P from "./ProductCard3P.jsx";
import ProductDetail from "./ProductDetail.jsx";
import AddCustomIntegration from "./AddCustomIntegration.jsx";
import WorkflowRecommendations from "./WorkflowRecommendations.jsx";
import { FONT, PAGE_X, useAccountTheme } from "./useAccountTheme.js";
import { VIS_D } from "./visdTokens.js";

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
  const [types, setTypes] = useState(["all"]);
  const [sort, setSort] = useState("latest");
  const [toast, setToast] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailSource, setDetailSource] = useState("my-products");
  const [addIntegrationOpen, setAddIntegrationOpen] = useState(false);

  useEffect(() => {
    if (!toast) return undefined;
    const t = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(t);
  }, [toast]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const byType = types.includes("all")
      ? PS_PRODUCTS
      : PS_PRODUCTS.filter((p) => types.includes(p.category));
    const searched = q ? byType.filter((p) => p.name.toLowerCase().includes(q)) : byType;
    // "latest" keeps source order; "alphabetical" sorts by name.
    if (sort === "alphabetical") {
      return [...searched].sort((a, b) => a.name.localeCompare(b.name));
    }
    return searched;
  }, [query, types, sort]);

  // Multi-select filter behavior: "All" is exclusive; picking a specific type clears it.
  const handleTypeChange = (event) => {
    const value = event.target.value; // array of selected ids
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
        ? "My products & solutions"
        : PS_TYPE_FILTERS.filter((f) => selected.includes(f.id))
            .map((f) => f.label)
            .join(", ");
    return `Filters: ${label}`;
  };

  const myProductsDetailPageIds = new Set(["autocad", "plot-publisher"]);

  const handleViewDetails = (product, source = "my-products") => {
    if (source === "org-approved") {
      if (product.id === "plot-publisher") {
        setSelectedProduct(product);
        setDetailSource("org-approved");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      setToast(`View details — ${product.name}`);
      return;
    }

    if (myProductsDetailPageIds.has(product.id)) {
      setSelectedProduct(product);
      setDetailSource("my-products");
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
    setTypes(["apps", "integrations", "agents", "skills", "templates"]);
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

  return (
    <AccountShell theme={theme} activeNav="Products & solutions" onNavigate={onNavigate} toast={toast}>
        {/* Content */}
        <Box sx={{ px: PAGE_X, pt: "32px", pb: "48px", flex: 1 }}>
          {!selectedProduct && !addIntegrationOpen ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "16px",
                mb: "24px",
              }}
            >
              <Box sx={{ maxWidth: 720 }}>
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
              {tab === "all" ? (
                <Button variant="contained" onClick={handleOpenAddIntegration} sx={addIntegrationBtnSx}>
                  Add custom integration
                </Button>
              ) : null}
            </Box>
          ) : null}

          {selectedProduct ? (
            <ProductDetail
              product={selectedProduct}
              detailSource={detailSource}
              onBack={() => {
                if (detailSource === "org-approved") {
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
              {/* Recently purchased */}
              <Box sx={{ mb: "32px" }}>
                <Box component="h2" sx={sectionTitleSx}>
                  Recently purchased
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 330px))" },
                    gap: "19px",
                  }}
                >
                  {RECENTLY_PURCHASED.map((b) => (
                    <BundleCard key={b.id} bundle={b} onAction={setToast} />
                  ))}
                </Box>
              </Box>

              <Box sx={{ mb: "24px" }}>
                <Box component="h2" sx={{ ...sectionTitleSx, mb: "8px" }}>
                  My products & solutions
                </Box>
                <Typography sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT, color: VIS_D.colors.textPrimary }}>
                  Products and solutions available to use
                </Typography>
              </Box>

              <SearchFilterBar sx={{ flexWrap: "wrap" }}>
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
                    aria-label="Filter products by type"
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
                    {PS_TYPE_FILTERS.map((f) => {
                      const checked =
                        f.id === "all" ? types.includes("all") : types.includes(f.id);
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
                    renderValue={(v) =>
                      `Sort: ${PS_SORT_OPTIONS.find((o) => o.id === v)?.label ?? ""}`
                    }
                    aria-label="Sort products"
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

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" },
                  gap: "19px",
                }}
              >
                {filtered.map((product) => (
                  <ProductCard3P
                    key={product.id}
                    product={product}
                    onAction={setToast}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </Box>
            </TabPanel>

            {PS_TABS.filter((t) => t.id !== "all" && t.id !== "org-approved").map((t) => (
              <TabPanel key={t.id} value={t.id} sx={{ p: 0 }}>
                <EmptyState title={t.label} body={`${t.label} content (prototype placeholder).`} />
              </TabPanel>
            ))}

            <TabPanel value="org-approved" sx={{ p: 0 }}>
              <WorkflowRecommendations onAction={setToast} />
              <Box sx={{ mt: "48px" }}>
                <OrgApprovedSolutions
                  onAction={setToast}
                  onViewDetails={(product) => handleViewDetails(product, "org-approved")}
                />
              </Box>
              <Box sx={{ mt: "48px" }}>
                <ExploreMoreSolutions
                  onAction={setToast}
                  onViewDetails={(product) => handleViewDetails(product, "org-approved")}
                />
              </Box>
            </TabPanel>
          </TabContext>
          )}
        </Box>
    </AccountShell>
  );
}
