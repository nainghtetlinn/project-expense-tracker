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
import { sortExpenses, filterExpenses } from "../utils";

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortParam = searchParams.get("sort") || "";
  const filterParam = searchParams.get("filter") || "";
  const { expenses } = useGlobalContext();
  const [open, setOpen] = useState(false);

  // update total money when expenses changes
  const money = useMemo(() => {
    return expenses.reduce(
      (money: { earn: number; spend: number }, a) => {
        a.type === "earn"
          ? (money.earn += a.amount)
          : (money.spend += a.amount);
        return money;
      },
      { earn: 0, spend: 0 }
    );
  }, [expenses]);
  // filter expenses when search query and expenses change
  const filteredExpenses = useMemo(() => {
    return filterExpenses(expenses, filterParam || "all");
  }, [filterParam, expenses]);
  // sort expenses when search query and expenses change
  const sortedExpenses = useMemo(() => {
    return sortExpenses(filteredExpenses, sortParam || "newest");
  }, [sortParam, filteredExpenses]);

  const handleChange = (e: SelectChangeEvent) => {
    searchParams.set(e.target.name, e.target.value);
    setSearchParams(searchParams);
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
                  <Stack>
                    <Typography variant="body1">
                      Earn : {money.earn.toLocaleString()} Ks
                    </Typography>

                    <Typography variant="body1">
                      Spend : {money.spend.toLocaleString()} Ks
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <FormControl size="small" sx={{ minWidth: 80, m: 1 }}>
                      <InputLabel>Sort</InputLabel>
                      <Select
                        label="Sort"
                        autoWidth
                        name="sort"
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
                    <FormControl size="small" sx={{ minWidth: 80, m: 1 }}>
                      <InputLabel>Filter</InputLabel>
                      <Select
                        label="Filter"
                        autoWidth
                        name="filter"
                        value={
                          ["earn", "spend", "all"].includes(filterParam)
                            ? filterParam
                            : ""
                        }
                        onChange={handleChange}
                      >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="earn">Earn</MenuItem>
                        <MenuItem value="spend">Spend</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </Stack>
              )}

              {sortedExpenses.length > 0 ? (
                sortedExpenses.map((expense) => {
                  const { title, amount, date, id, type } = expense;
                  return (
                    <ExpenseItem
                      key={id}
                      title={title}
                      amount={amount}
                      type={type}
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
