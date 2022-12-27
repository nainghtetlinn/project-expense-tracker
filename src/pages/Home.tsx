import AddIcon from "@mui/icons-material/Add";
import {
  Container,
  Grid,
  Stack,
  Fab,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { useGlobalContext } from "../context";
import { AddExpense, AddExpenseDialog, ExpenseItem } from "../components";

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortParam = searchParams.get("sort") || "";
  const { expenses } = useGlobalContext();
  const [open, setOpen] = useState(false);

  // update total money when expenses changes
  const money: number = useMemo(() => {
    return expenses.reduce((sum, a) => (sum += a.amount), 0);
  }, [expenses]);
  // sort expenses when search query and expenses change
  const sortedExpenses = useMemo(() => {
    return expenses.sort((a, b) => {
      switch (sortParam) {
        case "newest":
          return b.date - a.date;
        case "oldest":
          return a.date - b.date;
        case "cheapest":
          return a.amount - b.amount;
        case "expensive":
          return b.amount - a.amount;
        case "a-z":
          if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
          else if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
          else return 0;
        case "z-a":
          if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
          else if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
          else return 0;
        default:
          return 0;
      }
    });
  }, [sortParam, expenses]);

  const handleChange = (e: SelectChangeEvent) => {
    setSearchParams({ sort: e.target.value });
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ pt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Stack spacing={2}>
              {sortedExpenses.length > 0 && (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h6">
                    Expenses amount : {money.toLocaleString()} Ks
                  </Typography>
                  <FormControl size="small" sx={{ minWidth: 80, m: 1 }}>
                    <InputLabel>Sort</InputLabel>
                    <Select
                      label="Sort"
                      autoWidth
                      value={
                        [
                          "newest",
                          "oldest",
                          "cheapest",
                          "expensive",
                          "a-z",
                          "z-a",
                        ].includes(sortParam)
                          ? sortParam
                          : ""
                      }
                      onChange={handleChange}
                    >
                      <MenuItem value="newest">Newest first</MenuItem>
                      <MenuItem value="oldest">Oldest first</MenuItem>
                      <MenuItem value="cheapest">Cheapest first</MenuItem>
                      <MenuItem value="expensive">Expensive first</MenuItem>
                      <MenuItem value="a-z">A - Z</MenuItem>
                      <MenuItem value="z-a">Z - A</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              )}

              {expenses.length > 0 ? (
                sortedExpenses.map((expense) => {
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
