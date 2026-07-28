import { Box, Typography } from "@weave-mui/material";
import AccountShell from "../AccountShell.jsx";
import { FONT, PAGE_X, useAccountTheme } from "../useAccountTheme.js";
import { VIS_D } from "../visdTokens.js";

export default function UserManagement({ onNavigate }) {
  const theme = useAccountTheme();

  return (
    <AccountShell theme={theme} activeNav="User Management" onNavigate={onNavigate}>
      <Box sx={{ px: PAGE_X, pt: "32px", pb: "48px", flex: 1 }}>
        <Typography
          component="h1"
          sx={{ ...VIS_D.typography.pageTitle, fontFamily: FONT, fontSize: "28px", fontWeight: 700 }}
        >
          User Management
        </Typography>
      </Box>
    </AccountShell>
  );
}
