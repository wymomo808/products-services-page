(function () {
  "use strict";

  var DATA = window.PS_WEAVE_DATA;
  var state = {
    tab: "all",
    marketplaceFilter: "all",
    searchQuery: "",
    solutionQuery: "",
  };

  var PAGE_TABS = [
    { id: "all", label: "All products & solutions" },
    { id: "my-app", label: "My app" },
    { id: "updates", label: "Product Updates" },
    { id: "custom-install", label: "Custom install" },
    { id: "scheduled-updates", label: "Scheduled updates" },
    { id: "trials", label: "Trials" },
    { id: "hubs", label: "Hubs" },
  ];

  var root = document.getElementById("wp-root");
  var toast = document.getElementById("wp-toast");

  function esc(text) {
    var d = document.createElement("div");
    d.textContent = text == null ? "" : String(text);
    return d.innerHTML;
  }

  function showToast(msg) {
    if (!toast) {
      return;
    }
    toast.textContent = msg;
    toast.classList.add("show");
    window.setTimeout(function () {
      toast.classList.remove("show");
    }, 2200);
  }

  function filteredProducts() {
    var q = state.searchQuery.trim().toLowerCase();
    if (!q) {
      return DATA.products;
    }
    return DATA.products.filter(function (p) {
      return p.name.toLowerCase().indexOf(q) !== -1;
    });
  }

  function filteredSolutions() {
    var q = state.solutionQuery.trim().toLowerCase();
    return DATA.marketplaceSolutions.filter(function (s) {
      var matchesFilter =
        state.marketplaceFilter === "all" || s.category === state.marketplaceFilter;
      var matchesQuery =
        !q ||
        s.name.toLowerCase().indexOf(q) !== -1 ||
        s.vendor.toLowerCase().indexOf(q) !== -1;
      return matchesFilter && matchesQuery;
    });
  }

  function renderIconLines(lines) {
    return lines.map(function (line) {
      return esc(line);
    }).join("<br>");
  }

  function renderSelects(product) {
    if (!product.version) {
      return "";
    }
    return (
      '<div class="wp-prod-card__selects">' +
      '<div class="wp-select-wrap"><label>Version</label>' +
      '<select class="wp-select" aria-label="Version for ' + esc(product.name) + '">' +
      '<option>' + esc(product.version) + "</option></select></div>" +
      '<div class="wp-select-wrap"><label>Platform</label>' +
      '<select class="wp-select" aria-label="Platform for ' + esc(product.name) + '">' +
      '<option>' + esc(product.platformOption) + "</option></select></div>" +
      '<div class="wp-select-wrap"><label>Language</label>' +
      '<select class="wp-select" aria-label="Language for ' + esc(product.name) + '">' +
      '<option>' + esc(product.language) + "</option></select></div>" +
      "</div>"
    );
  }

  function renderSplitButton(product) {
    if (product.splitButton) {
      return (
        '<div class="wp-split-btn">' +
        '<button type="button" class="wp-split-btn__main" data-action="cta" data-label="' +
        esc(product.cta) + '">' + esc(product.cta) + "</button>" +
        '<button type="button" class="wp-split-btn__caret" aria-label="More download options">▼</button>' +
        "</div>"
      );
    }
    return (
      '<div class="wp-split-btn wp-split-btn--single">' +
      '<button type="button" class="wp-split-btn__main" data-action="cta" data-label="' +
      esc(product.cta) + '">' + esc(product.cta) + "</button>" +
      "</div>"
    );
  }

  function renderProductCard(product) {
    var platform =
      product.platform === "windows"
        ? '<div class="wp-platform-icon" aria-label="Windows">⊞ Windows</div>'
        : "";

    return (
      '<article class="wp-prod-card">' +
      '<div class="wp-prod-card__head">' +
      '<div class="wp-prod-icon wp-prod-icon--' + esc(product.iconColor) + '">' +
      renderIconLines(product.iconLines) +
      "</div>" +
      '<h2 class="wp-prod-card__title">' + esc(product.name) + "</h2>" +
      "</div>" +
      platform +
      '<p class="wp-prod-card__desc">' + esc(product.description) + "</p>" +
      renderSelects(product) +
      renderSplitButton(product) +
      '<div class="wp-prod-card__footer">' +
      '<button type="button" class="wp-view-details" data-action="details" data-name="' +
      esc(product.name) + '">' +
      '<span class="wp-view-details__circle" aria-hidden="true">→</span>View details</button>' +
      "</div></article>"
    );
  }

  function renderSolutionCard(solution) {
    return (
      '<article class="wp-sol-card">' +
      '<div class="wp-prod-card__head">' +
      '<div class="wp-prod-icon wp-prod-icon--blue">MP</div>' +
      "<div>" +
      '<h2 class="wp-prod-card__title">' + esc(solution.name) + "</h2>" +
      '<span class="wp-sol-card__badge">' + esc(solution.status) + "</span>" +
      "</div></div>" +
      '<p class="wp-prod-card__desc">' +
      esc(solution.vendor) + " · Works with " + esc(solution.worksWith.join(", ")) +
      "<br><br>" + esc(solution.blurb) +
      "</p>" +
      '<div class="wp-split-btn wp-split-btn--single">' +
      '<button type="button" class="wp-split-btn__main" data-action="manage" data-name="' +
      esc(solution.name) + '">Manage</button></div>' +
      '<div class="wp-prod-card__footer">' +
      '<button type="button" class="wp-view-details" data-action="details" data-name="' +
      esc(solution.name) + '">' +
      '<span class="wp-view-details__circle" aria-hidden="true">→</span>View details</button>' +
      "</div></article>"
    );
  }

  function renderFilterTabs() {
    return (
      '<div class="wp-filter-tabs" role="tablist" aria-label="Marketplace solution type">' +
      DATA.marketplaceFilters.map(function (filter) {
        var active = state.marketplaceFilter === filter.id;
        return (
          '<button type="button" role="tab" class="wp-filter-tab' + (active ? " is-active" : "") +
          '" data-filter="' + esc(filter.id) + '" aria-selected="' + (active ? "true" : "false") +
          '">' + esc(filter.label) + "</button>"
        );
      }).join("") +
      "</div>"
    );
  }

  function renderPageSearch(inputId, value, placeholder) {
    return (
      '<div class="wp-page-search">' +
      '<span class="wp-page-search__icon" aria-hidden="true">⌕</span>' +
      '<input type="search" id="' + esc(inputId) + '" data-input="' + esc(inputId) +
      '" value="' + esc(value) + '" placeholder="' + esc(placeholder) + '" />' +
      "</div>"
    );
  }

  function renderAllPanel() {
    var products = filteredProducts().map(renderProductCard).join("");
    var solutions = filteredSolutions().map(renderSolutionCard).join("");

    return (
      renderPageSearch("page-search", state.searchQuery, "Search...") +
      '<div class="wp-card-grid">' + products + "</div>" +
      '<section class="wp-section">' +
      '<h2 class="wp-section-title">Marketplace solutions</h2>' +
      '<p class="wp-section-desc">Apps, agents, templates, and skills from the Autodesk ecosystem.</p>' +
      renderFilterTabs() +
      renderPageSearch("solution-search", state.solutionQuery, "Search marketplace solutions...") +
      '<div class="wp-card-grid">' + solutions + "</div>" +
      (filteredSolutions().length === 0
        ? '<p class="wp-placeholder">No marketplace solutions match this filter.</p>'
        : "") +
      "</section>"
    );
  }

  function renderPlaceholder(text) {
    return (
      '<a class="wp-help-link" href="#">Can\'t find a product?</a>' +
      '<p class="wp-placeholder">' + esc(text) + "</p>"
    );
  }

  function render() {
    if (!root) {
      return;
    }

    var subtabs = PAGE_TABS.map(function (tab) {
      var active = state.tab === tab.id;
      return (
        '<button type="button" role="tab" class="wp-subtab' + (active ? " is-active" : "") +
        '" data-tab="' + esc(tab.id) + '" aria-selected="' + (active ? "true" : "false") +
        '">' + esc(tab.label) + "</button>"
      );
    }).join("");

    var panels = PAGE_TABS.map(function (tab) {
      var active = state.tab === tab.id;
      var content = "";

      if (tab.id === "all") {
        content =
          '<a class="wp-help-link" href="#">Can\'t find a product?</a>' + renderAllPanel();
      } else if (tab.id === "my-app") {
        content = renderPlaceholder(
          "My app — a dedicated workspace within Products & solutions."
        );
      } else if (tab.id === "updates") {
        content = renderPlaceholder(
          "Searchable list of product updates, plug-ins, extensions, and language packs."
        );
      } else if (tab.id === "custom-install") {
        content = renderPlaceholder("Build and deploy custom installs for desktop products.");
      } else if (tab.id === "scheduled-updates") {
        content = renderPlaceholder("Schedule and monitor product updates for managed deployments.");
      } else if (tab.id === "trials") {
        content = renderPlaceholder("Start trials and view active or expired trial history.");
      } else if (tab.id === "hubs") {
        content = renderPlaceholder("Manage cloud collaboration hubs and regional settings.");
      }

      return (
        '<div class="wp-panel' + (active ? " is-active" : "") + '" data-panel="' +
        esc(tab.id) + '" role="tabpanel">' + content + "</div>"
      );
    }).join("");

    root.innerHTML =
      '<nav class="wp-subtabs" role="tablist" aria-label="Products & solutions views">' +
      subtabs + "</nav>" + panels;
  }

  function restoreFocus(inputId) {
    var input = root.querySelector('[data-input="' + inputId + '"]');
    if (input) {
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }
  }

  function onClick(e) {
    var t = e.target;
    if (!(t instanceof Element)) {
      return;
    }

    var tabBtn = t.closest("[data-tab]");
    if (tabBtn) {
      state.tab = tabBtn.getAttribute("data-tab");
      render();
      return;
    }

    var filterBtn = t.closest("[data-filter]");
    if (filterBtn) {
      state.marketplaceFilter = filterBtn.getAttribute("data-filter");
      render();
      return;
    }

    var actionBtn = t.closest("[data-action]");
    if (!actionBtn) {
      return;
    }

    var action = actionBtn.getAttribute("data-action");
    if (action === "cta") {
      showToast(actionBtn.getAttribute("data-label") + " started (prototype)");
    }
    if (action === "details" || action === "manage") {
      showToast((actionBtn.getAttribute("data-name") || "Item") + " — " + action + " (prototype)");
    }
  }

  function onInput(e) {
    var t = e.target;
    if (!(t instanceof HTMLInputElement)) {
      return;
    }
    var inputId = t.getAttribute("data-input");
    if (inputId === "page-search") {
      state.searchQuery = t.value;
      render();
      restoreFocus("page-search");
    }
    if (inputId === "solution-search") {
      state.solutionQuery = t.value;
      render();
      restoreFocus("solution-search");
    }
  }

  document.addEventListener("click", onClick);
  document.addEventListener("input", onInput);
  render();
})();
