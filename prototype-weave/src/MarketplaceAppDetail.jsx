import { useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  ClickAwayListener,
  IconButton,
  Link,
  MenuItem,
  Paper,
  Select,
  Switch,
  Tab,
  TabContext,
  TabList,
  TabPanel,
  Typography,
} from "@weave-mui/material";
import { selectVariants, tabAlignment, tabVariant } from "@weave-mui/enums";
import { CaretDownS, PermissionGroupS } from "@weave-mui/icons-weave";
import { FigmaCtaArrowRight } from "./BillingIcons.jsx";
import { PLOT_PUBLISHER_DETAIL } from "./data.js";
import ProductLockup from "./ProductLockup.jsx";
import { VIS_D } from "./visdTokens.js";

const FONT = VIS_D.font.element;

const sectionTitleSx = {
  ...VIS_D.typography.headlineSmall,
  fontFamily: FONT,
  fontSize: "18px",
  lineHeight: 1.25,
  fontWeight: 700,
  mb: "16px",
};

const detailCardSx = {
  borderRadius: `${VIS_D.radius.card}px`,
  bgcolor: VIS_D.colors.background,
  boxShadow: `inset 0 0 0 1px rgba(0, 0, 0, 0.1)`,
  p: "32px",
};

const underlinedFieldSx = {
  width: 300,
  maxWidth: "100%",
  "& .MuiOutlinedInput-root": {
    height: VIS_D.sizes.fieldHeight,
    borderRadius: `${VIS_D.radius.field}px ${VIS_D.radius.field}px 0 0`,
    bgcolor: VIS_D.colors.background,
    fontFamily: FONT,
    boxShadow: `inset 0 0 0 1px rgba(0,0,0,0.3), inset 0 -1px 0 0 ${VIS_D.colors.ink}`,
    "& fieldset": { border: "none" },
    "& .MuiSelect-select": {
      py: "9px",
      px: "12px",
      color: VIS_D.colors.ink,
      ...VIS_D.typography.label16Semi,
    },
  },
};

const outlineBtnSx = {
  ...VIS_D.typography.label14Semi,
  fontFamily: FONT,
  textTransform: "none",
  color: VIS_D.colors.ink,
  borderColor: VIS_D.colors.ink,
  borderRadius: `${VIS_D.radius.button}px`,
  px: "12px",
  py: "4px",
  minWidth: 64,
  boxShadow: "none",
  "&:hover": { borderColor: VIS_D.colors.ink, bgcolor: VIS_D.colors.searchFill, boxShadow: "none" },
};

const primaryBtnSx = {
  ...VIS_D.typography.label16Semi,
  fontFamily: FONT,
  textTransform: "none",
  bgcolor: VIS_D.colors.ink,
  color: "#fff",
  borderRadius: `${VIS_D.radius.button}px`,
  boxShadow: "none",
  py: "8px",
  px: "20px",
  minWidth: 80,
  "&:hover": { bgcolor: "#222222", boxShadow: "none" },
};

const modalSelectSx = {
  width: "100%",
  "& .MuiOutlinedInput-root": {
    height: VIS_D.sizes.fieldHeight,
    borderRadius: `${VIS_D.radius.field}px ${VIS_D.radius.field}px 0 0`,
    bgcolor: VIS_D.colors.background,
    fontFamily: FONT,
    boxShadow: `inset 0 0 0 1px rgba(0,0,0,0.3), inset 0 -1px 0 0 ${VIS_D.colors.ink}`,
    "& fieldset": { border: "none" },
    "& .MuiSelect-select": {
      py: "9px",
      px: "12px",
      color: VIS_D.colors.ink,
      ...VIS_D.typography.label16Semi,
    },
  },
};

const modalSelectTriggerSx = {
  width: "100%",
  height: VIS_D.sizes.fieldHeight,
  borderRadius: `${VIS_D.radius.field}px ${VIS_D.radius.field}px 0 0`,
  bgcolor: VIS_D.colors.background,
  fontFamily: FONT,
  boxShadow: `inset 0 0 0 1px rgba(0,0,0,0.3), inset 0 -1px 0 0 ${VIS_D.colors.ink}`,
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  px: "12px",
  cursor: "pointer",
  textAlign: "left",
  "&:focus-visible": {
    outline: `2px solid ${VIS_D.colors.accent}`,
    outlineOffset: 2,
  },
};

function CloseIcon() {
  return (
    <Box component="svg" viewBox="0 0 20 20" aria-hidden sx={{ width: 20, height: 20, display: "block" }}>
      <path d="M5 5l10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </Box>
  );
}

function InfoIcon() {
  return (
    <Box
      component="svg"
      viewBox="0 0 16 16"
      aria-hidden
      sx={{ width: 16, height: 16, display: "block", color: VIS_D.colors.textLight }}
    >
      <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 7v4M8 5.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </Box>
  );
}

function UserSelectField({ users, groups = [], assignedCount, selectedIds, onChange, onAction }) {
  const [open, setOpen] = useState(false);
  const [showAssigned, setShowAssigned] = useState(false);

  const visibleUsers = useMemo(
    () => (showAssigned ? users : users.filter((user) => !user.assigned)),
    [showAssigned, users]
  );

  const visibleUserIds = useMemo(() => new Set(visibleUsers.map((user) => user.id)), [visibleUsers]);

  const getGroupMemberIds = (group) => group.userIds.filter((userId) => visibleUserIds.has(userId));

  const selectedUsers = useMemo(
    () => users.filter((user) => selectedIds.includes(user.id)),
    [selectedIds, users]
  );

  const displayValue =
    selectedUsers.length === 0
      ? ""
      : selectedUsers.length === 1
        ? selectedUsers[0].displayName
        : `${selectedUsers.length} users selected`;

  const toggleSelected = (userId) => {
    if (selectedIds.includes(userId)) {
      onChange(selectedIds.filter((id) => id !== userId));
      return;
    }
    onChange([...selectedIds, userId]);
  };

  const toggleGroup = (group) => {
    const memberIds = getGroupMemberIds(group);
    if (memberIds.length === 0) return;

    const allSelected = memberIds.every((userId) => selectedIds.includes(userId));
    if (allSelected) {
      onChange(selectedIds.filter((userId) => !memberIds.includes(userId)));
      return;
    }

    onChange([...new Set([...selectedIds, ...memberIds])]);
  };

  const getGroupSelectionState = (group) => {
    const memberIds = getGroupMemberIds(group);
    if (memberIds.length === 0) {
      return { checked: false, indeterminate: false };
    }

    const selectedCount = memberIds.filter((userId) => selectedIds.includes(userId)).length;
    if (selectedCount === 0) {
      return { checked: false, indeterminate: false };
    }
    if (selectedCount === memberIds.length) {
      return { checked: true, indeterminate: false };
    }
    return { checked: false, indeterminate: true };
  };

  const visibleGroups = useMemo(
    () => groups.filter((group) => group.userIds.some((userId) => visibleUserIds.has(userId))),
    [groups, visibleUsers]
  );

  const renderSelectRow = ({ key, checked, indeterminate = false, onToggle, leading, title, subtitle, actionLabel, onActionClick }) => (
    <Box
      key={key}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        px: "16px",
        py: "12px",
        borderBottom: `1px solid ${VIS_D.colors.divider}`,
      }}
    >
      <Checkbox
        checked={checked}
        indeterminate={indeterminate}
        onChange={onToggle}
        sx={{ p: 0, flexShrink: 0 }}
      />
      {leading}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ ...VIS_D.typography.label14Semi, fontFamily: FONT, fontWeight: 700 }}>
          {title}
        </Typography>
        {subtitle ? (
          <Typography sx={{ ...VIS_D.typography.bodySmall, fontFamily: FONT, color: VIS_D.colors.textLight }}>
            {subtitle}
          </Typography>
        ) : null}
      </Box>
      <Link
        component="button"
        underline="always"
        onClick={onActionClick}
        sx={{
          ...VIS_D.typography.label14Semi,
          fontFamily: FONT,
          color: VIS_D.colors.ink,
          flexShrink: 0,
          textUnderlineOffset: "3px",
        }}
      >
        {actionLabel}
      </Link>
    </Box>
  );

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Box sx={{ position: "relative" }}>
        <Box
          component="button"
          type="button"
          aria-expanded={open}
          aria-haspopup="listbox"
          onClick={() => setOpen((value) => !value)}
          sx={{
            ...modalSelectTriggerSx,
            ...(open
              ? {
                  boxShadow: `inset 0 0 0 2px ${VIS_D.colors.accent}, inset 0 -1px 0 0 ${VIS_D.colors.ink}`,
                }
              : null),
          }}
        >
          <Typography
            sx={{
              ...(displayValue ? VIS_D.typography.label16Semi : VIS_D.typography.bodyMedium),
              fontFamily: FONT,
              color: displayValue ? VIS_D.colors.ink : VIS_D.colors.textLight,
            }}
          >
            {displayValue}
          </Typography>
          <CaretDownS sx={{ width: 16, height: 16, color: VIS_D.colors.ink, flexShrink: 0 }} />
        </Box>

        {open ? (
          <Paper
            elevation={0}
            sx={{
              position: "absolute",
              top: "calc(100% + 4px)",
              left: 0,
              right: 0,
              zIndex: 2,
              borderRadius: `${VIS_D.radius.field}px`,
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              border: `1px solid ${VIS_D.colors.divider}`,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                px: "16px",
                py: "12px",
                borderBottom: `1px solid ${VIS_D.colors.divider}`,
              }}
            >
              <Switch
                checked={showAssigned}
                onChange={(event) => setShowAssigned(event.target.checked)}
                size="small"
              />
              <Typography sx={{ ...VIS_D.typography.bodySmall, fontFamily: FONT, color: VIS_D.colors.text }}>
                Show assigned users ({assignedCount})
              </Typography>
            </Box>

            <Box
              role="listbox"
              aria-label="Select users"
              sx={{ maxHeight: 320, overflowY: "auto" }}
            >
              {visibleGroups.length > 0 ? (
                <>
                  <Box sx={{ px: "16px", py: "10px", bgcolor: VIS_D.colors.backgroundPanel }}>
                    <Typography sx={{ ...VIS_D.typography.label14Semi, fontFamily: FONT, color: VIS_D.colors.textLight }}>
                      Groups
                    </Typography>
                  </Box>
                  {visibleGroups.map((group) => {
                    const memberIds = getGroupMemberIds(group);
                    const selection = getGroupSelectionState(group);
                    return renderSelectRow({
                      key: group.id,
                      checked: selection.checked,
                      indeterminate: selection.indeterminate,
                      onToggle: () => toggleGroup(group),
                      leading: (
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            bgcolor: VIS_D.colors.panel,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <PermissionGroupS sx={{ width: 18, height: 18, color: VIS_D.colors.textLight }} />
                        </Box>
                      ),
                      title: group.name,
                      subtitle: `${memberIds.length} users`,
                      actionLabel: "Add",
                      onActionClick: () => {
                        toggleGroup(group);
                        onAction(`Add group ${group.name}`);
                      },
                    });
                  })}
                  <Box sx={{ px: "16px", py: "10px", bgcolor: VIS_D.colors.backgroundPanel }}>
                    <Typography sx={{ ...VIS_D.typography.label14Semi, fontFamily: FONT, color: VIS_D.colors.textLight }}>
                      Users
                    </Typography>
                  </Box>
                </>
              ) : null}

              {visibleUsers.map((user) => {
                const checked = selectedIds.includes(user.id);
                return renderSelectRow({
                  key: user.id,
                  checked,
                  onToggle: () => toggleSelected(user.id),
                  leading: (
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: user.avatarColor,
                        fontSize: "12px",
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {user.initials}
                    </Avatar>
                  ),
                  title: user.displayName,
                  subtitle: user.email,
                  actionLabel: "Add",
                  onActionClick: () => {
                    toggleSelected(user.id);
                    onAction(`Add ${user.displayName}`);
                  },
                });
              })}
            </Box>
          </Paper>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
}

function AssignUsersModal({ open, onClose, productName, availableSeats, assignment, onAction }) {
  const [tab, setTab] = useState("assign");
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [seatSource, setSeatSource] = useState(assignment.defaultSeatSource ?? "Pool");

  if (!open) return null;

  const assignUsers = assignment.assignUserOptions ?? [];
  const canAssign = selectedUserIds.length > 0;

  return (
    <Box
      role="presentation"
      onClick={onClose}
      sx={{
        position: "fixed",
        inset: 0,
        bgcolor: "rgba(0, 0, 0, 0.4)",
        zIndex: 1400,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        px: "24px",
        py: "48px",
        overflowY: "auto",
      }}
    >
      <Box
        role="dialog"
        aria-modal="true"
        aria-labelledby="assign-users-title"
        onClick={(event) => event.stopPropagation()}
        sx={{
          width: "100%",
          maxWidth: 720,
          bgcolor: VIS_D.colors.background,
          borderRadius: `${VIS_D.radius.card}px`,
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: "32px",
            py: "20px",
            borderBottom: `1px solid ${VIS_D.colors.divider}`,
          }}
        >
          <Typography id="assign-users-title" sx={{ ...VIS_D.typography.billingSummary, fontFamily: FONT, fontSize: "21px" }}>
            Assign users
          </Typography>
          <IconButton aria-label="Close assign users dialog" onClick={onClose} sx={{ color: VIS_D.colors.ink, p: "6px" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <TabContext value={tab}>
          <TabList
            onChange={(_event, value) => setTab(value)}
            variant={tabVariant.STANDARD}
            align={tabAlignment.LEFT}
            aria-label="Assign users methods"
            sx={{
              px: "32px",
              minHeight: 48,
              borderBottom: `1px solid ${VIS_D.colors.divider}`,
              "& .MuiTab-root": {
                ...VIS_D.typography.label16Semi,
                fontFamily: FONT,
                textTransform: "none",
                minHeight: 48,
                px: 0,
                mr: "24px",
                color: VIS_D.colors.textLight,
              },
              "& .MuiTab-root.Mui-selected": { color: VIS_D.colors.ink },
              "& .MuiTabs-indicator": { backgroundColor: VIS_D.colors.ink, height: 2 },
            }}
          >
            <Tab label="Assign" value="assign" />
            <Tab label="Import" value="import" />
          </TabList>

          <TabPanel value="assign" sx={{ p: "32px" }}>
            <Typography sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT, mb: "24px" }}>
              You can assign{" "}
              <Box component="span" sx={{ fontWeight: 700 }}>
                {availableSeats} more
              </Box>{" "}
              users.
            </Typography>

            <Box sx={{ mb: "24px" }}>
              <Typography sx={{ ...VIS_D.typography.smallprint, fontFamily: FONT, display: "block", mb: "4px" }}>
                Select users
              </Typography>
              <UserSelectField
                users={assignUsers}
                groups={assignment.assignUserGroups ?? []}
                assignedCount={assignment.assignedUserOptionCount ?? 0}
                selectedIds={selectedUserIds}
                onChange={setSelectedUserIds}
                onAction={onAction}
              />
              <Typography sx={{ ...VIS_D.typography.smallprint, fontFamily: FONT, color: VIS_D.colors.textLight, mt: "8px" }}>
                Example: John Doe &lt;john.doe@email.com&gt;
              </Typography>
            </Box>

            <Typography sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT, mb: "24px" }}>
              {assignment.assignDescription}
            </Typography>

            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "6px", mb: "4px" }}>
                <Typography sx={{ ...VIS_D.typography.smallprint, fontFamily: FONT }}>Assign seat from</Typography>
                <InfoIcon />
              </Box>
              <Select
                fullWidth
                value={seatSource}
                onChange={(event) => setSeatSource(event.target.value)}
                variant={selectVariants.BOX}
                size="small"
                sx={modalSelectSx}
                MenuProps={{ PaperProps: { sx: { mt: "4px" } } }}
              >
                {(assignment.seatSources ?? ["Pool"]).map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </TabPanel>

          <TabPanel value="import" sx={{ p: "32px" }}>
            <Typography sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT, color: VIS_D.colors.textPrimary }}>
              Import users from a CSV file to assign {productName}.
            </Typography>
          </TabPanel>
        </TabContext>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            px: "32px",
            py: "16px",
            borderTop: `1px solid ${VIS_D.colors.divider}`,
          }}
        >
          <Link
            component="button"
            underline="always"
            onClick={() => onAction("Customize assignment")}
            sx={{
              ...VIS_D.typography.label16Semi,
              fontFamily: FONT,
              color: VIS_D.colors.ink,
              textUnderlineOffset: "3px",
            }}
          >
            Customize assignment
          </Link>
          <Button
            variant="contained"
            disabled={!canAssign}
            onClick={() => {
              onAction(`Assign all items — ${selectedUserIds.length} users`);
              onClose();
            }}
            sx={{
              ...VIS_D.typography.label16Semi,
              fontFamily: FONT,
              textTransform: "none",
              height: 40,
              px: "20px",
              boxShadow: "none",
              bgcolor: canAssign ? VIS_D.colors.ink : "rgba(0,0,0,0.38)",
              color: "#fff",
              "&:hover": { bgcolor: canAssign ? "#222222" : "rgba(0,0,0,0.38)", boxShadow: "none" },
              "&.Mui-disabled": { bgcolor: "rgba(0,0,0,0.38)", color: "#fff" },
            }}
          >
            Assign all items
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

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

function DetailTable({ columns, rows }) {
  return (
    <Box sx={{ borderRadius: `${VIS_D.radius.card}px`, overflow: "hidden", boxShadow: `inset 0 0 0 1px ${VIS_D.colors.rowDivider}` }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
          borderBottom: "1px solid #808080",
        }}
      >
        {columns.map((column) => (
          <Box key={column} sx={{ p: "16px" }}>
            <Typography sx={{ ...VIS_D.typography.label16Semi, fontFamily: FONT, fontWeight: 700 }}>{column}</Typography>
          </Box>
        ))}
      </Box>
      {rows.map((row, index) => (
        <Box
          key={row.id}
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
            borderBottom: index < rows.length - 1 ? `1px solid ${VIS_D.colors.divider}` : "none",
            alignItems: "center",
          }}
        >
          {row.cells.map((cell, cellIndex) => (
            <Box key={`${row.id}-${cellIndex}`} sx={{ p: "16px", display: "flex", justifyContent: cell.align === "right" ? "flex-end" : "flex-start" }}>
              {typeof cell.content === "string" ? (
                <Typography
                  sx={{
                    ...(cell.bold ? VIS_D.typography.label16Semi : VIS_D.typography.bodyMedium),
                    fontFamily: FONT,
                    fontWeight: cell.bold ? 700 : 400,
                    lineHeight: 1.25,
                    fontVariantNumeric: cell.tabular ? "tabular-nums" : undefined,
                  }}
                >
                  {cell.content}
                </Typography>
              ) : (
                cell.content
              )}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}

export default function MarketplaceAppDetail({ product, detail = PLOT_PUBLISHER_DETAIL, onBack, onAction }) {
  const [platform, setPlatform] = useState(detail.defaultPlatform);
  const [language, setLanguage] = useState(detail.defaultLanguage);
  const [assignModalOpen, setAssignModalOpen] = useState(false);

  const availableSeats = useMemo(
    () => Math.max(detail.assignment.totalSeats - detail.assignment.assignedUsers.length, 0),
    [detail.assignment.assignedUsers.length, detail.assignment.totalSeats]
  );

  const assignDisabled = availableSeats === 0;

  return (
    <>
      <AssignUsersModal
        open={assignModalOpen}
        onClose={() => setAssignModalOpen(false)}
        productName={product.name}
        availableSeats={availableSeats}
        assignment={detail.assignment}
        onAction={onAction}
      />

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
        Back to all products & solutions
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

        <LinkButton icon={<DocumentIcon />} onClick={() => onAction("User guide")}>
          User guide
        </LinkButton>
      </Box>

      <Box
        sx={{
          ...detailCardSx,
          minHeight: 200,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          <Select
            value={platform}
            onChange={(event) => setPlatform(event.target.value)}
            variant={selectVariants.BOX}
            size="small"
            sx={underlinedFieldSx}
            MenuProps={{ PaperProps: { sx: { mt: "4px" } } }}
          >
            {detail.platforms.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          <Select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            variant={selectVariants.BOX}
            size="small"
            sx={underlinedFieldSx}
            MenuProps={{ PaperProps: { sx: { mt: "4px" } } }}
          >
            {detail.languages.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Button variant="contained" onClick={() => onAction(`Download — ${product.name}`)} sx={{ ...primaryBtnSx, alignSelf: "flex-start", width: 184 }}>
          Download
        </Button>

        <Typography sx={{ ...VIS_D.typography.smallprint, fontFamily: FONT, color: VIS_D.colors.ink }}>
          Downloads{" "}
          <Link component="button" underline="always" onClick={() => onAction("Latest version")} sx={{ ...VIS_D.typography.smallprint, fontFamily: FONT, color: VIS_D.colors.ink }}>
            latest version
          </Link>
        </Typography>
      </Box>

      <Box sx={detailCardSx}>
        <Typography component="h2" sx={sectionTitleSx}>
          Purchase details
        </Typography>
        <DetailTable
          columns={["Purchase date", "Seats", "Total price"]}
          rows={[
            {
              id: "purchase-1",
              cells: [
                { content: detail.purchase.date },
                { content: detail.purchase.seats },
                { content: detail.purchase.totalPrice, tabular: true },
              ],
            },
          ]}
        />
      </Box>

      <Box sx={detailCardSx}>
        <Typography component="h2" sx={sectionTitleSx}>
          Assigned users
        </Typography>

        <Box sx={{ borderTop: `1px solid ${VIS_D.colors.rowDivider}`, pt: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <Typography sx={{ ...VIS_D.typography.bodySmall, fontFamily: FONT, color: VIS_D.colors.text }}>
            {availableSeats} of {detail.assignment.totalSeats} seats available
          </Typography>

          <Button
            variant="contained"
            disabled={assignDisabled}
            onClick={() => setAssignModalOpen(true)}
            sx={{ ...primaryBtnSx, alignSelf: "flex-start" }}
          >
            Assign users
          </Button>

          <Box
            sx={{
              borderRadius: `${VIS_D.radius.field}px`,
              overflow: "hidden",
              boxShadow: `inset 0 0 0 1px ${VIS_D.colors.rowDivider}`,
            }}
          >
            {detail.assignment.assignedUsers.map((user, index) => (
              <Box
                key={user.email}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  p: "16px",
                  borderBottom:
                    index < detail.assignment.assignedUsers.length - 1
                      ? `1px solid ${VIS_D.colors.divider}`
                      : "none",
                }}
              >
                <Typography sx={{ ...VIS_D.typography.label16Semi, fontFamily: FONT, fontWeight: 700 }}>
                  {user.email}
                </Typography>
                <Button variant="outlined" onClick={() => onAction(`Unassign ${user.email}`)} sx={outlineBtnSx}>
                  Unassign
                </Button>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
    </>
  );
}
