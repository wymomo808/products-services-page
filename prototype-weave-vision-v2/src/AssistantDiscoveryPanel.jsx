import { useState } from "react";
import { Box, Button, TextField, Typography } from "@weave-mui/material";
import { ASSISTANT_SUGGESTIONS } from "./data.js";
import { FONT } from "./useAccountTheme.js";
import { VIS_D } from "./visdTokens.js";

export default function AssistantDiscoveryPanel({ onAction }) {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);

  const handleAsk = (text) => {
    const prompt = text || query.trim();
    if (!prompt) return;
    onAction(`Assistant: "${prompt}" — showing matching org-approved solutions`);
    setQuery("");
    setExpanded(true);
  };

  return (
    <Box
      sx={{
        mb: "24px",
        borderRadius: `${VIS_D.radius.card}px`,
        overflow: "hidden",
        boxShadow: `inset 0 0 0 1px ${VIS_D.colors.border}`,
        bgcolor: VIS_D.colors.background,
      }}
    >
      <Box
        sx={{
          px: "20px",
          py: "14px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          bgcolor: "#F5F5FF",
          borderBottom: expanded ? `1px solid ${VIS_D.colors.border}` : "none",
        }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            bgcolor: VIS_D.colors.accent,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: "14px",
            flexShrink: 0,
          }}
        >
          A
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ ...VIS_D.typography.headlineSmall, fontFamily: FONT }}>
            Autodesk Assistant
          </Typography>
          <Typography sx={{ ...VIS_D.typography.smallprint, color: VIS_D.colors.textLight }}>
            Discover capabilities, request approvals, and deploy solutions for your organization
          </Typography>
        </Box>
        <Button
          size="small"
          onClick={() => setExpanded((v) => !v)}
          sx={{ textTransform: "none", color: VIS_D.colors.link, fontFamily: FONT }}
        >
          {expanded ? "Hide" : "Open"}
        </Button>
      </Box>

      {expanded ? (
        <Box sx={{ p: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <Box sx={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Ask about apps, agents, integrations, or workflows…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAsk();
              }}
              sx={{
                flex: 1,
                minWidth: 240,
                "& .MuiOutlinedInput-root": {
                  fontFamily: FONT,
                  bgcolor: VIS_D.colors.searchFill,
                  borderRadius: `${VIS_D.radius.field}px`,
                },
              }}
            />
            <Button
              variant="contained"
              onClick={() => handleAsk()}
              sx={{
                ...VIS_D.typography.label14Semi,
                fontFamily: FONT,
                textTransform: "none",
                bgcolor: VIS_D.colors.ink,
                boxShadow: "none",
                "&:hover": { bgcolor: "#222", boxShadow: "none" },
              }}
            >
              Ask Assistant
            </Button>
          </Box>

          <Box>
            <Typography sx={{ ...VIS_D.typography.smallprint, fontWeight: 600, mb: "8px", color: VIS_D.colors.textLight }}>
              Suggested prompts
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {ASSISTANT_SUGGESTIONS.map((s) => (
                <Button
                  key={s}
                  size="small"
                  variant="outlined"
                  onClick={() => handleAsk(s)}
                  sx={{
                    textTransform: "none",
                    fontFamily: FONT,
                    fontSize: "13px",
                    color: VIS_D.colors.text,
                    borderColor: VIS_D.colors.border,
                  }}
                >
                  {s}
                </Button>
              ))}
            </Box>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
}
