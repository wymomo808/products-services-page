import { useState } from "react";
import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
  IconButton,
  Link,
  TextField,
  Typography,
} from "@weave-mui/material";
import { HomeS } from "@weave-mui/icons-weave";
import { FONT } from "./useAccountTheme.js";
import { VIS_D } from "./visdTokens.js";

const STEPS = [
  { id: 1, label: "App details" },
  { id: 2, label: "Billing and budget" },
  { id: 3, label: "User assignment" },
  { id: 4, label: "Summary" },
];

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

const textFieldSx = {
  maxWidth: 480,
  width: "100%",
  "& .MuiInputLabel-root": {
    ...VIS_D.typography.label14Semi,
    fontFamily: FONT,
    color: VIS_D.colors.ink,
    position: "relative",
    transform: "none",
    mb: "4px",
  },
  "& .MuiOutlinedInput-root": {
    height: VIS_D.sizes.fieldHeight,
    borderRadius: `${VIS_D.radius.field}px ${VIS_D.radius.field}px 0 0`,
    bgcolor: VIS_D.colors.background,
    fontFamily: FONT,
    boxShadow: `inset 0 0 0 1px rgba(0,0,0,0.3), inset 0 -1px 0 0 ${VIS_D.colors.ink}`,
    "& fieldset": { border: "none" },
    "& input": {
      ...VIS_D.typography.bodyMedium,
      fontFamily: FONT,
      color: VIS_D.colors.ink,
      py: "9px",
      px: "12px",
    },
  },
  "& .MuiFormHelperText-root": {
    ...VIS_D.typography.bodySmall,
    fontFamily: FONT,
    color: VIS_D.colors.textPrimary,
    mt: "6px",
    mx: 0,
  },
};

function IntegrationStepper({ activeStep = 0 }) {
  return (
    <Box sx={{ display: "flex", width: "100%", maxWidth: 1000 }}>
      {STEPS.map((step, index) => {
        const active = index === activeStep;
        const isLast = index === STEPS.length - 1;

        return (
          <Box
            key={step.id}
            sx={{
              flex: isLast ? "0 0 auto" : "1 1 0",
              minWidth: 0,
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  border: active ? `2px solid ${VIS_D.colors.ink}` : `1.5px solid ${VIS_D.colors.ink}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontFamily: FONT,
                  fontSize: "16px",
                  fontWeight: active ? 700 : 600,
                  lineHeight: "20px",
                  color: index > activeStep ? VIS_D.colors.textLight : VIS_D.colors.ink,
                  bgcolor: VIS_D.colors.background,
                }}
              >
                {step.id}
              </Box>
              {!isLast ? (
                <Box
                  sx={{
                    flex: 1,
                    height: "1.5px",
                    bgcolor: "rgba(0, 0, 0, 0.2)",
                    ml: 0,
                    mr: 0,
                  }}
                />
              ) : null}
            </Box>
            <Typography
              sx={{
                pl: "8px",
                pr: "16px",
                pt: "6px",
                pb: "8px",
                fontFamily: FONT,
                fontSize: "16px",
                lineHeight: "20px",
                fontWeight: active ? 700 : 400,
                color: VIS_D.colors.ink,
                whiteSpace: isLast ? "nowrap" : "normal",
              }}
            >
              {step.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

export default function AddCustomIntegration({ onCancel, onAction }) {
  const [clientId, setClientId] = useState("");
  const [appName, setAppName] = useState("");

  return (
    <Box>
      <Breadcrumbs
        separator="/"
        aria-label="breadcrumb"
        sx={{ mb: "16px", "& .MuiBreadcrumbs-separator": { color: VIS_D.colors.textLight } }}
      >
        <IconButton aria-label="Home" size="small" sx={{ p: "2px", color: VIS_D.colors.ink }}>
          <HomeS sx={{ width: 16, height: 16 }} />
        </IconButton>
        <Link
          component="button"
          underline="hover"
          onClick={onCancel}
          sx={{ ...VIS_D.typography.bodySmall, fontFamily: FONT, color: VIS_D.colors.ink }}
        >
          Product and services
        </Link>
        <Typography sx={{ ...VIS_D.typography.bodySmall, fontFamily: FONT, fontWeight: 600, color: VIS_D.colors.ink }}>
          Add custom integration
        </Typography>
      </Breadcrumbs>

      <Box sx={{ mb: "24px" }}>
        <Typography
          component="h1"
          sx={{
            ...VIS_D.typography.pageTitle,
            fontFamily: FONT,
            fontSize: "30px",
            fontWeight: 800,
            mb: "8px",
          }}
        >
          Add custom integration
        </Typography>
        <Typography sx={{ ...VIS_D.typography.bodyMedium, fontFamily: FONT, color: VIS_D.colors.textPrimary }}>
          Configure your third-party application and assign billing to a team
        </Typography>
      </Box>

      <Box sx={{ mb: "24px" }}>
        <IntegrationStepper activeStep={0} />
      </Box>

      <Box
        sx={{
          bgcolor: VIS_D.colors.background,
          borderRadius: "16px",
          p: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <Typography sx={{ ...VIS_D.typography.headlineSmall, fontFamily: FONT, fontWeight: 800, fontSize: "20px" }}>
          App details
        </Typography>

        <TextField
          label="Client id"
          value={clientId}
          onChange={(event) => setClientId(event.target.value)}
          helperText="Provided by the third-party application vendor"
          InputLabelProps={{ shrink: true }}
          sx={textFieldSx}
        />

        <TextField
          label="App name"
          value={appName}
          onChange={(event) => setAppName(event.target.value)}
          helperText="This name will be displayed based on the Client Id."
          InputLabelProps={{ shrink: true }}
          sx={textFieldSx}
        />

        <Divider sx={{ borderColor: VIS_D.colors.rowDivider }} />

        <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Button
            variant="text"
            onClick={onCancel}
            sx={{
              ...VIS_D.typography.label16Semi,
              fontFamily: FONT,
              textTransform: "none",
              color: VIS_D.colors.ink,
              minWidth: 0,
              px: "8px",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => onAction("Next — Add custom integration")}
            sx={primaryBtnSx}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
