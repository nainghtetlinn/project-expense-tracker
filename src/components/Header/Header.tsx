import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar disableGutters>
          <Container maxWidth="lg">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="h5">Expense Tracker</Typography>
                <Button
                  onClick={() => navigate("/")}
                  color="inherit"
                  size="small"
                >
                  Home
                </Button>
                <Button
                  onClick={() => navigate("/about")}
                  color="inherit"
                  size="small"
                >
                  About
                </Button>
              </Stack>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};
