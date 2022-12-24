import { createContext, useContext, useState, useEffect } from "react";

const ExpenseContext = createContext({
  expenses: [] as ExpenseType[],
  addNewExpense: ({ title, amount }: ExpenseType) => {},
  removeExpense: (id: string) => {},
  editExpense: (id: string, value: { title?: string; amount?: number }) => {},
});

type ExpenseType = {
  id: string;
  title: string;
  amount: number;
  date: number;
};

const es = localStorage.getItem("expenses");
const esarr = es ? JSON.parse(es) : [];

function ContextProvider({ children }: { children: JSX.Element }) {
  const [expenses, setExpenses] = useState<ExpenseType[]>(esarr);

  // update localstorage
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addNewExpense = ({ title, amount }: ExpenseType) =>
    setExpenses((prev) => [
      {
        id: new Date().getTime().toString(),
        title,
        amount,
        date: new Date().getTime(),
      },
      ...prev,
    ]);
  const removeExpense = (id: string) =>
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  const editExpense = (
    id: string,
    value: { title?: string; amount?: number }
  ) =>
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id ? { ...expense, ...value } : expense
      )
    );

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addNewExpense,
        removeExpense,
        editExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export const useGlobalContext = () => useContext(ExpenseContext);
export default ContextProvider;
