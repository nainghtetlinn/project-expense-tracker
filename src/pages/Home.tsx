import AddIcon from "@mui/icons-material/Add";
import { Container, Grid, Fab } from "@mui/material";
import { useState } from "react";
import { useGlobalContext } from "../context";
import {
  AddExpense,
  AddExpenseDialog,
  ExpenseItem,
} from "../components/Expense";

export const Home = () => {
  const { expenses } = useGlobalContext();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Container maxWidth="lg" sx={{ pt: 1 }}>
        <Grid container>
          <Grid item xs={12} lg={8}></Grid>
          <Grid item lg={4} sx={{ display: { xs: "none", lg: "block" } }}>
            <AddExpense />
          </Grid>
        </Grid>
      </Container>
      <Fab
        onClick={() => setOpen(true)}
        color="primary"
        sx={{
          position: "fixed",
          right: "20px",
          bottom: "20px",
          display: { lg: "none" },
        }}
      >
        <AddIcon />
      </Fab>
      <AddExpenseDialog open={open} handleClose={() => setOpen(false)} />
    </>
  );
};
