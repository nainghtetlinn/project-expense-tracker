import AddIcon from "@mui/icons-material/Add";
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
} from "@mui/material";
import Joi from "joi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalContext } from "../../context";
import { useNotiContext } from "../../context/notiContext";

export const Header = () => {
  const navigate = useNavigate();
  const { money, addMoney } = useGlobalContext();
  const { showNoti } = useNotiContext();

  const [open, setOpen] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");

  const handleAdd = () => {
    const { error, value } = Joi.number().required().validate(amount);
    if (error) {
      setAmount("");
      showNoti({ type: "error", msg: error.message });
      return;
    }
    addMoney(Number(value));
    showNoti({ type: "success", msg: "Successfully added money" });
    setAmount("");
  };

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
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="h6">{money} Ks</Typography>
                <IconButton
                  onClick={() => setOpen(true)}
                  color="inherit"
                  size="small"
                >
                  <AddIcon />
                </IconButton>
              </Stack>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Money</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            variant="outlined"
            label="Amount"
            placeholder="1000"
            margin="dense"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary" variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
