import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
} from "@mui/material";
import Joi from "joi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalContext } from "../../context";
import { AddMoneyDialog } from "./AddMoneyDialog";
import { ReduceMoneyDialog } from "./ReduceMoneyDialog";

export const Header = () => {
  const navigate = useNavigate();
  const { money } = useGlobalContext();

  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openReduce, setOpenReduce] = useState<boolean>(false);

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
              <Paper>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <IconButton
                    onClick={() => setOpenReduce(true)}
                    color="inherit"
                    size="small"
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="h6">{money} Ks</Typography>
                  <IconButton
                    onClick={() => setOpenAdd(true)}
                    color="inherit"
                    size="small"
                  >
                    <AddIcon />
                  </IconButton>
                </Stack>
              </Paper>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <AddMoneyDialog show={openAdd} close={() => setOpenAdd(false)} />
      <ReduceMoneyDialog show={openReduce} close={() => setOpenReduce(false)} />
    </>
  );
};
