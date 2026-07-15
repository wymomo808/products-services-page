(function () {
  "use strict";

  var VARIANT = document.body.getAttribute("data-variant") || "p2";
  var DATA = window.PS_EVIDENCE_DATA;
  var state = {
    tab: "products",
    detailTab: "updates",
    productId: null,
    filter: "all",
    approvedFilter: null,
  };

  var root = document.getElementById("ep-root");
  var toast = document.getElementById("ep-toast");

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

  function productById(id) {
    return DATA.products.find(function (p) {
      return p.id === id;
    });
  }

  function solutionsForProduct(productId) {
    return DATA.approvedSolutions.filter(function (s) {
      return s.worksWith.indexOf(productId) !== -1;
    });
  }

  function parseHash() {
    var hash = window.location.hash.replace(/^#\/?/, "");
    var parts = hash.split("/");
    if (parts[0] === "product" && parts[1]) {
      state.productId = parts[1];
      state.tab = "products";
      return;
    }
    if (parts[0] === "approved") {
      state.productId = null;
      state.tab = "approved";
      state.approvedFilter = parts[1] || null;
      return;
    }
    if (["products", "updates", "trials", "approved"].indexOf(parts[0]) !== -1) {
      state.productId = null;
      state.tab = parts[0];
      state.approvedFilter = null;
      return;
    }
    state.productId = null;
    state.tab = "products";
    state.approvedFilter = null;
  }

  function setHash() {
    if (state.productId) {
      window.location.hash = "#/product/" + state.productId;
      return;
    }
    if (state.tab === "approved" && state.approvedFilter) {
      window.location.hash = "#/approved/" + state.approvedFilter;
      return;
    }
    window.location.hash = "#/" + state.tab;
  }

  function esc(text) {
    var d = document.createElement("div");
    d.textContent = text;
    return d.innerHTML;
  }

  function renderProductCard(product) {
    var enriched = VARIANT === "p3";
    var meta = product.version
      ? "Version " + esc(product.version)
      : "Cloud service";
    if (product.updateCount > 0) {
      meta += " · " + product.updateCount + " update" + (product.updateCount === 1 ? "" : "s");
    }
    if (enriched) {
      meta +=
        '<div class="ep-eco-meta">' +
        product.integrations +
        " approved integrations · " +
        product.recommendedApps +
        " recommended apps</div>";
    }

    return (
      '<article class="ep-product-card" data-product="' +
      esc(product.id) +
      '" tabindex="0" role="button" aria-label="Open ' +
      esc(product.name) +
      '">' +
      "<h3>" +
      esc(product.name) +
      "</h3>" +
      '<div class="ep-product-meta">' +
      meta +
      (enriched ? "<br>" + product.assignedUsers + " users assigned" : "") +
      "</div>" +
      '<div class="ep-card-actions">' +
      '<button type="button" class="ep-btn ep-btn-primary" data-action="cta" data-product="' +
      esc(product.id) +
      '">' +
      esc(product.cta) +
      "</button>" +
      (enriched
        ? '<button type="button" class="ep-btn ep-btn-secondary" data-action="detail" data-product="' +
          esc(product.id) +
          '">View details</button>'
        : "") +
      "</div>" +
      "</article>"
    );
  }

  function renderRecommendations() {
    if (VARIANT !== "p3") {
      return "";
    }
    var cards = DATA.recommendations
      .map(function (rec) {
        var badges = rec.trust
          .map(function (t) {
            return '<span class="ep-badge">' + esc(t) + "</span>";
          })
          .join("");
        return (
          '<div class="ep-rec-card">' +
          "<h4>" +
          esc(rec.name) +
          "</h4>" +
          '<p class="ep-product-meta">' +
          esc(rec.vendor) +
          "</p>" +
          '<div class="ep-trust-row">' +
          badges +
          "</div>" +
          "<p>" +
          esc(rec.blurb) +
          "</p>" +
          '<button type="button" class="ep-btn ep-btn-secondary" data-action="request" data-name="' +
          esc(rec.name) +
          '">Request approval</button>' +
          "</div>"
        );
      })
      .join("");

    return (
      '<section class="ep-module">' +
      "<h2>Recommended for your workflows</h2>" +
      "<p class=\"ep-product-meta\" style=\"margin-bottom:12px\">Based on products owned, industry, and admin-approved tools.</p>" +
      '<div class="ep-rec-grid">' +
      cards +
      "</div>" +
      "</section>"
    );
  }

  function renderFilters() {
    if (VARIANT !== "p3") {
      return "";
    }
    var chips = [
      { id: "all", label: "Products" },
      { id: "apps", label: "Apps" },
      { id: "integrations", label: "Integrations" },
      { id: "agents", label: "AI tools" },
    ];
    return (
      '<div class="ep-filters">' +
      chips
        .map(function (chip) {
          var active = state.filter === chip.id ? " is-active" : "";
          return (
            '<button type="button" class="ep-chip' +
            active +
            '" data-filter="' +
            chip.id +
            '">' +
            esc(chip.label) +
            "</button>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  function renderApprovedTable(filterProductId) {
    var rows = DATA.approvedSolutions.filter(function (s) {
      if (!filterProductId) {
        return true;
      }
      return s.worksWith.indexOf(filterProductId) !== -1;
    });

    var productName = filterProductId ? productById(filterProductId) : null;
    var title = filterProductId
      ? "Approved solutions for " + (productName ? productName.name : filterProductId)
      : "Company-approved solutions";

    var body = rows
      .map(function (s) {
        var works = s.worksWith
          .map(function (id) {
            var p = productById(id);
            return p ? p.name.replace("Autodesk ", "") : id;
          })
          .join(", ");
        var statusClass = s.status.toLowerCase();
        return (
          "<tr>" +
          "<td><strong>" +
          esc(s.name) +
          "</strong></td>" +
          "<td>" +
          esc(s.type) +
          "</td>" +
          "<td>" +
          esc(works) +
          "</td>" +
          "<td><span class=\"ep-status " +
          statusClass +
          '">' +
          esc(s.status) +
          "</span></td>" +
          "<td>" +
          s.users +
          "</td>" +
          "<td><button type=\"button\" class=\"ep-btn ep-btn-secondary\" data-action=\"solution\" data-name=\"" +
          esc(s.name) +
          "\">" +
          esc(s.action) +
          "</button></td>" +
          "</tr>"
        );
      })
      .join("");

    return (
      "<div class=\"ep-toolbar\"><h2 style=\"font-size:1rem;font-weight:700\">" +
      esc(title) +
      "</h2></div>" +
      '<p class="ep-product-meta" style="margin-bottom:14px">Manage org-approved 3rd-party apps alongside Autodesk products.</p>' +
      '<div class="ep-table-wrap"><table class="ep-table"><thead><tr>' +
      "<th>Solution</th><th>Type</th><th>Works with</th><th>Status</th><th>Users</th><th>Action</th>" +
      "</tr></thead><tbody>" +
      body +
      "</tbody></table></div>"
    );
  }

  function renderDetail(product) {
    var p2Link =
      VARIANT === "p2" || VARIANT === "p3"
        ? '<p class="ep-link-row"><a href="#" data-nav="approved-filter" data-product="' +
          esc(product.id) +
          '">View approved integrations for this product →</a></p>'
        : "";

    var ecosystemBlock = "";
    if (VARIANT === "p3") {
      var recs = DATA.productRecommendations[product.id] || [];
      var recCards = recs
        .map(function (r) {
          var badges = r.trust
            .map(function (t) {
              return '<span class="ep-badge green">' + esc(t) + "</span>";
            })
            .join("");
          return (
            '<div class="ep-rec-card">' +
            "<h4>" +
            esc(r.name) +
            "</h4>" +
            '<p class="ep-product-meta">' +
            esc(r.type) +
            "</p>" +
            '<div class="ep-trust-row">' +
            badges +
            "</div>" +
            '<button type="button" class="ep-btn ep-btn-secondary" data-action="assign" data-name="' +
            esc(r.name) +
            '">Assign users</button>' +
            "</div>"
          );
        })
        .join("");

      ecosystemBlock =
        '<section class="ep-detail-section">' +
        "<h3>Compatible marketplace apps</h3>" +
        '<div class="ep-rec-grid">' +
        recCards +
        "</div>" +
        "</section>" +
        '<section class="ep-detail-section">' +
        "<h3>Recommended for " +
        esc(product.name.replace("Autodesk ", "")) +
        "</h3>" +
        "<p class=\"ep-product-meta\">Trust signals: Validated · Admin approved · Works with product</p>" +
        "</section>";
    }

    var detailTabs = [
      { key: "updates", label: "Updates" },
      { key: "extensions", label: "Extensions" },
      { key: "plugins", label: "Plugins" },
      { key: "language-packs", label: "Language packs" },
    ];
    if (VARIANT === "p3") {
      detailTabs.push({ key: "solutions", label: "Solutions" });
    }

    var tabButtons = detailTabs
      .map(function (tab) {
        var active = state.detailTab === tab.key ? " is-active" : "";
        return (
          '<button type="button" class="ep-tab ep-detail-tab' +
          active +
          '" data-detail-tab="' +
          tab.key +
          '">' +
          esc(tab.label) +
          "</button>"
        );
      })
      .join("");

    var detailContent =
      state.detailTab === "solutions" && VARIANT === "p3"
        ? ecosystemBlock
        : '<p class="ep-placeholder-tab">Field Guide pattern: ' +
          esc(state.detailTab) +
          " content for " +
          esc(product.name) +
          ".</p>" +
          (state.detailTab === "updates"
            ? '<button type="button" class="ep-btn ep-btn-primary" style="margin-top:12px" data-action="cta" data-product="' +
              esc(product.id) +
              '">' +
              esc(product.cta) +
              "</button>"
            : "");

    return (
      '<div class="ep-detail-header">' +
      '<button type="button" class="ep-back" data-nav="back">← Back to products</button>' +
      "<h1 class=\"ep-page-title\">" +
      esc(product.name) +
      "</h1>" +
      '<p class="ep-page-sub">' +
      (product.version ? "Version " + esc(product.version) + " · " : "") +
      product.assignedUsers +
      " users assigned" +
      (VARIANT === "p3"
        ? " · " + product.integrations + " approved integrations"
        : "") +
      "</p>" +
      p2Link +
      "</div>" +
      '<div class="ep-detail-tabs">' +
      tabButtons +
      "</div>" +
      '<div class="ep-detail-body">' +
      detailContent +
      "</div>"
    );
  }

  function renderLanding() {
    var showApprovedTab = VARIANT === "p2" || VARIANT === "p3";
    var tabs =
      '<button type="button" class="ep-tab' +
      (state.tab === "products" ? " is-active" : "") +
      '" data-tab="products">All products</button>' +
      '<button type="button" class="ep-tab' +
      (state.tab === "updates" ? " is-active" : "") +
      '" data-tab="updates">Product updates</button>' +
      '<button type="button" class="ep-tab' +
      (state.tab === "trials" ? " is-active" : "") +
      '" data-tab="trials">Trials</button>';

    if (showApprovedTab) {
      tabs +=
        '<button type="button" class="ep-tab' +
        (state.tab === "approved" ? " is-active" : "") +
        '" data-tab="approved">Company-approved solutions</button>';
    }

    var productsPanel =
      renderFilters() +
      (VARIANT === "p3" ? renderRecommendations() : "") +
      '<div class="ep-toolbar">' +
      '<input class="ep-search" type="search" placeholder="Search products" aria-label="Search products" />' +
      "</div>" +
      '<div class="ep-product-grid">' +
      DATA.products.map(renderProductCard).join("") +
      "</div>";

    var updatesPanel =
      '<p class="ep-placeholder-tab">Products with available updates — same fulfillment workflow as production.</p>';
    var trialsPanel =
      '<p class="ep-placeholder-tab">Trial-eligible products and active/expired history. Start trial provisions access only.</p>';
    var approvedPanel = renderApprovedTable(state.approvedFilter);

    return (
      '<nav class="ep-tabs" aria-label="Products and Services tabs">' +
      tabs +
      "</nav>" +
      '<section class="ep-panel' +
      (state.tab === "products" ? " is-active" : "") +
      '" data-panel="products">' +
      productsPanel +
      "</section>" +
      '<section class="ep-panel' +
      (state.tab === "updates" ? " is-active" : "") +
      '" data-panel="updates">' +
      updatesPanel +
      "</section>" +
      '<section class="ep-panel' +
      (state.tab === "trials" ? " is-active" : "") +
      '" data-panel="trials">' +
      trialsPanel +
      "</section>" +
      (showApprovedTab
        ? '<section class="ep-panel' +
          (state.tab === "approved" ? " is-active" : "") +
          '" data-panel="approved">' +
          approvedPanel +
          "</section>"
        : "")
    );
  }

  function render() {
    if (!root) {
      return;
    }

    if (state.productId) {
      var product = productById(state.productId);
      if (!product) {
        state.productId = null;
        setHash();
        return;
      }
      root.innerHTML =
        '<div class="ep-main-card">' + renderDetail(product) + "</div>";
      return;
    }

    root.innerHTML = '<div class="ep-main-card">' + renderLanding() + "</div>";
  }

  function onClick(e) {
    var t = e.target;
    if (!(t instanceof Element)) {
      return;
    }

    var tabBtn = t.closest("[data-tab]");
    if (tabBtn) {
      state.tab = tabBtn.getAttribute("data-tab");
      state.approvedFilter = null;
      setHash();
      render();
      return;
    }

    var filterBtn = t.closest("[data-filter]");
    if (filterBtn) {
      state.filter = filterBtn.getAttribute("data-filter");
      showToast("Filter: " + state.filter + " (concept only)");
      render();
      return;
    }

    var card = t.closest("[data-product]");
    var actionBtn = t.closest("[data-action]");

    if (actionBtn) {
      var action = actionBtn.getAttribute("data-action");
      var pid = actionBtn.getAttribute("data-product");
      var name = actionBtn.getAttribute("data-name");
      if (action === "cta" && pid) {
        var p = productById(pid);
        showToast((p ? p.cta : "Action") + " started (prototype)");
        e.stopPropagation();
        return;
      }
      if (action === "detail" && pid) {
        state.productId = pid;
        state.detailTab = "updates";
        setHash();
        render();
        e.stopPropagation();
        return;
      }
      if (action === "request" || action === "assign" || action === "solution") {
        showToast((name || "Solution") + " — action recorded (prototype)");
        e.stopPropagation();
        return;
      }
    }

    if (card && !actionBtn) {
      state.productId = card.getAttribute("data-product");
      state.detailTab = "updates";
      setHash();
      render();
      return;
    }

    var nav = t.closest("[data-nav]");
    if (nav) {
      var navType = nav.getAttribute("data-nav");
      if (navType === "back") {
        state.productId = null;
        state.tab = "products";
        setHash();
        render();
        return;
      }
      if (navType === "approved-filter") {
        state.productId = null;
        state.tab = "approved";
        state.approvedFilter = nav.getAttribute("data-product");
        setHash();
        render();
        return;
      }
    }

    var detailTab = t.closest("[data-detail-tab]");
    if (detailTab) {
      state.detailTab = detailTab.getAttribute("data-detail-tab");
      render();
    }
  }

  function onKeydown(e) {
    if (e.key !== "Enter" && e.key !== " ") {
      return;
    }
    var card = e.target.closest("[data-product]");
    if (card && !e.target.closest("[data-action]")) {
      e.preventDefault();
      state.productId = card.getAttribute("data-product");
      state.detailTab = "updates";
      setHash();
      render();
    }
  }

  window.addEventListener("hashchange", function () {
    parseHash();
    render();
  });

  document.addEventListener("click", onClick);
  document.addEventListener("keydown", onKeydown);

  parseHash();
  render();
})();
