import { CssBaseline } from "@mui/material";
import { Errors } from "../Errors";
import { useInitializedApp } from "../UserAccount/userAccountSlice";
import { MainMenu } from "../MainMenu";
import { Box } from "@mui/system";
import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material/styles";
import { AccountMenu } from "../AccountMenu";
import { ServerHealth } from "../ServerHealth";

const theme = createTheme({ palette: { mode: "dark" } });

export function App() {
  useInitializedApp();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box id="app" sx={{ padding: "0 1rem" }}>
        <ServerHealth />
        <MainMenu />
        <AccountMenu />
        <Errors />
      </Box>
    </ThemeProvider>
  );
}
