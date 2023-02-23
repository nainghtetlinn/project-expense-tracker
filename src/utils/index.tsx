import { ExpenseType } from "./ExpenseSchema";

export const filterExpenses = (expenses: ExpenseType[], option: string) => {
  if (option === "all") return expenses;
  return expenses.filter((e) => e.type === option);
};

export const sortExpenses = (expenses: ExpenseType[], option: string) => {
  return expenses.sort((a, b) => {
    switch (option) {
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
};
