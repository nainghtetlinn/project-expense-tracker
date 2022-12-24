import AddIcon from "@mui/icons-material/Add";
import { Container, Grid, Stack, Fab, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import { AddExpense, AddExpenseDialog, ExpenseItem } from "../components";

export const Home = () => {
  const { expenses } = useGlobalContext();
  const [open, setOpen] = useState(false);
  const [money, setMoney] = useState<number>(0);

  // update total money and localstorage when expenses changes
  useEffect(() => {
    let total = 0;
    expenses.forEach((expense) => (total += expense.amount));
    setMoney(total);
  }, [expenses]);

  return (
    <>
      <Container maxWidth="lg" sx={{ pt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Stack spacing={2}>
              {expenses.length > 0 && (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h6">
                    Expenses amount : {money} Ks
                  </Typography>
                </Stack>
              )}

              {expenses.length > 0 ? (
                expenses.map((expense) => {
                  const { title, amount, date, id } = expense;
                  return (
                    <ExpenseItem
                      key={id}
                      title={title}
                      amount={amount}
                      date={date}
                      id={id}
                    />
                  );
                })
              ) : (
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ minHeight: "200px" }}
                >
                  <Typography variant="h4" align="center">
                    No Expenses
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Grid>
          <Grid item md={4} sx={{ display: { xs: "none", md: "block" } }}>
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
          display: { md: "none" },
        }}
      >
        <AddIcon />
      </Fab>
      <AddExpenseDialog open={open} handleClose={() => setOpen(false)} />
    </>
  );
};
