import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider, useTheme } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ContextProvider from "./context";
import NotiContextProvider from "./context/notiContext";

function Root() {
  const theme = useTheme();
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <ContextProvider>
            <NotiContextProvider>
              <App />
            </NotiContextProvider>
          </ContextProvider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
