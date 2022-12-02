import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider, useTheme } from "@mui/material";
import App from "./App";
import ContextProvider from "./context";

function Root() {
  const theme = useTheme();
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ContextProvider>
          <App />
        </ContextProvider>
      </ThemeProvider>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
