import { useMemo, useState } from "react";
import { Box, Button, Link, MenuItem, Select, Typography } from "@weave-mui/material";
import { selectVariants } from "@weave-mui/enums";
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

  const availableSeats = useMemo(
    () => Math.max(detail.assignment.totalSeats - detail.assignment.assignedUsers.length, 0),
    [detail.assignment.assignedUsers.length, detail.assignment.totalSeats]
  );

  const assignDisabled = availableSeats === 0;

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
            onClick={() => onAction("Assign users")}
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
  );
}
