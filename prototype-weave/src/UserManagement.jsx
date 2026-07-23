import { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  IconButton,
  Link,
  MenuItem,
  Select,
  Tab,
  TabContext,
  TabList,
  TabPanel,
  Typography,
} from "@weave-mui/material";
import { selectVariants, tabAlignment, tabVariant } from "@weave-mui/enums";
import { CaretDownS, CtaArrowRightS, FilterS, SettingsS } from "@weave-mui/icons-weave";
import AccountSearchField, { FilterBarButton, SearchFilterBar } from "./AccountSearchField.jsx";
import AccountShell from "./AccountShell.jsx";
import UserDetail from "./UserDetail.jsx";
import {
  UM_PRODUCT_LOGOS,
  UM_TABS,
  UM_TEAMS,
  UM_TOTAL_USERS,
  UM_USER_DETAILS,
  UM_USERS,
} from "./data.js";
import { FONT, PAGE_X, useAccountTheme } from "./useAccountTheme.js";
import { VIS_D } from "./visdTokens.js";

const GRID_COLS = "40px minmax(220px, 2fr) 1fr 1fr 1.4fr 40px";

const tabListSx = {
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
};

const outlinedButtonSx = {
  ...VIS_D.typography.label14Semi,
  textTransform: "none",
  borderRadius: `${VIS_D.radius.button}px`,
  borderColor: VIS_D.colors.border,
  color: VIS_D.colors.ink,
  height: 36,
  whiteSpace: "nowrap",
  "&:hover": { borderColor: VIS_D.colors.ink, bgcolor: "transparent" },
};

function initials(name) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function ProductIcons({ products, moreProducts }) {
  const visible = products.slice(0, 4);
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {visible.map((key, index) => (
          <Box
            key={`${key}-${index}`}
            component="img"
            src={UM_PRODUCT_LOGOS[key]}
            alt=""
            sx={{
              width: 24,
              height: 24,
              borderRadius: "4px",
              objectFit: "cover",
              border: "1px solid rgba(0,0,0,0.08)",
              ml: index === 0 ? 0 : "-6px",
              bgcolor: "#fff",
            }}
          />
        ))}
      </Box>
      {moreProducts ? (
        <Typography sx={{ ...VIS_D.typography.bodySmall, color: VIS_D.colors.textLight }}>
          + {moreProducts} more
        </Typography>
      ) : null}
    </Box>
  );
}

export default function UserManagement({ onNavigate }) {
  const theme = useAccountTheme();
  const [tab, setTab] = useState("by-user");
  const [team, setTeam] = useState(UM_TEAMS[0].id);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(() => new Set());
  const [selectedUser, setSelectedUser] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const users = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return UM_USERS;
    return UM_USERS.filter(
      (user) =>
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.role.toLowerCase().includes(q)
    );
  }, [query]);

  const allSelected = users.length > 0 && users.every((user) => selected.has(user.id));
  const someSelected = users.some((user) => selected.has(user.id)) && !allSelected;

  const toggleAll = () => {
    if (allSelected) {
      setSelected(new Set());
      return;
    }
    setSelected(new Set(users.map((user) => user.id)));
  };

  const toggleOne = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const openUserDetail = (user) => {
    if (UM_USER_DETAILS[user.id]) {
      setSelectedUser(user);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setToast(`View ${user.name}`);
    }
  };

  return (
    <AccountShell theme={theme} activeNav="User Management" onNavigate={onNavigate} toast={toast}>
      <Box sx={{ px: PAGE_X, pt: "32px", pb: "48px", flex: 1 }}>
        {selectedUser ? (
          <UserDetail
            user={selectedUser}
            onBack={() => setSelectedUser(null)}
            onAction={setToast}
          />
        ) : (
          <>
        <Typography
          component="h1"
          sx={{ ...VIS_D.typography.pageTitle, fontSize: "28px", fontWeight: 700, mb: "16px" }}
        >
          User Management
        </Typography>

        <TabContext value={tab}>
          <TabList
            onChange={(_event, value) => setTab(value)}
            variant={tabVariant.STANDARD}
            align={tabAlignment.LEFT}
            showAddButton={false}
            aria-label="User management views"
            sx={tabListSx}
          >
            {UM_TABS.map((item) => (
              <Tab key={item.id} label={item.label} value={item.id} />
            ))}
          </TabList>

          {UM_TABS.map((item) => (
            <TabPanel key={item.id} value={item.id} sx={{ p: 0 }}>
              {item.id === "by-user" ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      mb: "24px",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography sx={{ ...VIS_D.typography.label14Semi, color: VIS_D.colors.ink }}>
                      Team
                    </Typography>
                    <Select
                      value={team}
                      onChange={(event) => setTeam(event.target.value)}
                      variant={selectVariants.OUTLINED}
                      IconComponent={CaretDownS}
                      sx={{
                        minWidth: 220,
                        height: VIS_D.sizes.fieldHeight,
                        ...VIS_D.typography.bodySmall,
                        "& .MuiOutlinedInput-notchedOutline": { borderColor: VIS_D.colors.border },
                        "& .MuiSelect-select": { py: "8px" },
                      }}
                    >
                      {UM_TEAMS.map((entry) => (
                        <MenuItem key={entry.id} value={entry.id}>
                          {entry.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <Link
                      component="button"
                      underline="hover"
                      onClick={() => setToast("Team settings")}
                      sx={{
                        ...VIS_D.typography.label14Semi,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        ml: "4px",
                      }}
                    >
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          border: `1px solid ${VIS_D.colors.border}`,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <SettingsS sx={{ width: 14, height: 14 }} />
                      </Box>
                      Team settings
                    </Link>
                  </Box>

                  <SearchFilterBar>
                    <AccountSearchField value={query} onChange={(event) => setQuery(event.target.value)} />
                    <FilterBarButton
                      startIcon={<FilterS sx={{ width: 16, height: 16 }} />}
                      onClick={() => setToast("Filter")}
                    >
                      Filter
                    </FilterBarButton>
                  </SearchFilterBar>

                  <Box
                    sx={{
                      border: `1px solid ${VIS_D.colors.border}`,
                      borderRadius: `${VIS_D.radius.card}px`,
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 2,
                        bgcolor: VIS_D.colors.panel,
                        px: "24px",
                        py: "16px",
                        borderBottom: `1px solid ${VIS_D.colors.border}`,
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography sx={{ ...VIS_D.typography.headlineSmall, fontSize: "18px" }}>
                        Users ({UM_TOTAL_USERS})
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                        <Button
                          variant="contained"
                          onClick={() => setToast("Invite users")}
                          sx={{
                            ...VIS_D.typography.label14Semi,
                            textTransform: "none",
                            borderRadius: `${VIS_D.radius.button}px`,
                            height: 36,
                            px: "16px",
                          }}
                        >
                          Invite users
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => setToast("Change role with CSV")}
                          sx={outlinedButtonSx}
                        >
                          Change role with CSV
                        </Button>
                        <Button variant="outlined" onClick={() => setToast("Export")} sx={outlinedButtonSx}>
                          Export
                        </Button>
                        <Box sx={{ width: "1px", height: 24, bgcolor: VIS_D.colors.border, mx: "4px" }} />
                        <Typography sx={{ ...VIS_D.typography.bodySmall, color: VIS_D.colors.textLight }}>
                          {selected.size} selected
                        </Typography>
                        <Button
                          variant="outlined"
                          disabled={selected.size === 0}
                          onClick={() => setToast(`Remove ${selected.size} user(s)`)}
                          sx={outlinedButtonSx}
                        >
                          Remove users
                        </Button>
                        <Button
                          variant="outlined"
                          disabled={selected.size === 0}
                          onClick={() => setToast(`Change role for ${selected.size} user(s)`)}
                          sx={outlinedButtonSx}
                        >
                          Change role
                        </Button>
                      </Box>
                    </Box>

                    <Box
                      role="row"
                      sx={{
                        display: "grid",
                        gridTemplateColumns: GRID_COLS,
                        alignItems: "center",
                        px: "24px",
                        py: "12px",
                        borderBottom: `1px solid ${VIS_D.colors.border}`,
                      }}
                    >
                      <Checkbox
                        checked={allSelected}
                        indeterminate={someSelected}
                        onChange={toggleAll}
                        aria-label="Select all users"
                        sx={{ p: 0, ml: "-2px" }}
                      />
                      {["Name", "Role", "Account status", "Products assigned", ""].map((heading, index) => (
                        <Typography
                          key={heading || `col-${index}`}
                          sx={{ ...VIS_D.typography.label14Semi, color: VIS_D.colors.ink }}
                        >
                          {heading}
                        </Typography>
                      ))}
                    </Box>

                    {users.map((user) => (
                      <Box
                        key={user.id}
                        role="row"
                        sx={{
                          display: "grid",
                          gridTemplateColumns: GRID_COLS,
                          alignItems: "center",
                          px: "24px",
                          py: "16px",
                          borderBottom: `1px solid ${VIS_D.colors.rowDivider}`,
                          "&:last-of-type": { borderBottom: "none" },
                          bgcolor: selected.has(user.id) ? "rgba(95,96,255,0.04)" : "transparent",
                        }}
                      >
                        <Checkbox
                          checked={selected.has(user.id)}
                          onChange={() => toggleOne(user.id)}
                          aria-label={`Select ${user.name}`}
                          sx={{ p: 0, ml: "-2px" }}
                        />
                        <Box sx={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
                          <Avatar sx={{ width: 40, height: 40, bgcolor: "#BDBDBD", fontSize: "14px", flexShrink: 0 }}>
                            {initials(user.name)}
                          </Avatar>
                          <Box sx={{ minWidth: 0 }}>
                            <Typography
                              sx={{
                                ...VIS_D.typography.label14Semi,
                                fontWeight: 700,
                                color: VIS_D.colors.ink,
                              }}
                            >
                              {user.name}
                            </Typography>
                            <Typography
                              sx={{
                                ...VIS_D.typography.bodySmall,
                                color: VIS_D.colors.textLight,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {user.email}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography sx={{ ...VIS_D.typography.bodySmall, color: VIS_D.colors.textLight }}>
                          {user.role}
                        </Typography>
                        <Typography sx={{ ...VIS_D.typography.bodySmall, color: VIS_D.colors.textLight }}>
                          {user.status}
                        </Typography>
                        <ProductIcons products={user.products} moreProducts={user.moreProducts} />
                        <IconButton
                          aria-label={`View ${user.name}`}
                          size="small"
                          onClick={() => openUserDetail(user)}
                          sx={{ justifySelf: "end" }}
                        >
                          <CtaArrowRightS sx={{ width: 16, height: 16 }} />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                </>
              ) : (
                <Box sx={{ py: "64px", textAlign: "center" }}>
                  <Typography sx={{ ...VIS_D.typography.headlineSmall, fontSize: "18px", mb: "8px" }}>
                    {item.label}
                  </Typography>
                  <Typography sx={{ ...VIS_D.typography.bodyMedium, color: VIS_D.colors.textPrimary }}>
                    {item.label} content (prototype placeholder).
                  </Typography>
                </Box>
              )}
            </TabPanel>
          ))}
        </TabContext>
          </>
        )}
      </Box>
    </AccountShell>
  );
}
