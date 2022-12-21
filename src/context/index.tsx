import { createContext, useContext, useState, useEffect } from "react";

const ExpenseContext = createContext({
  money: 0,
  expenses: [] as ExpenseType[],
  addNewExpense: ({ title, amount }: ExpenseType) => {},
  removeExpense: (id: string) => {},
  editExpense: (id: string, value: { title?: string; amount?: number }) => {},
});

type ExpenseType = {
  id?: string;
  title: string;
  amount: number;
  date?: number;
};

function ContextProvider({ children }: { children: JSX.Element }) {
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);
  const [money, setMoney] = useState<number>(0);

  useEffect(() => {
    let total = 0;
    expenses.forEach((expense) => (total += expense.amount));
    setMoney(total);
  }, [expenses]);

  const addNewExpense = ({ title, amount }: ExpenseType) =>
    setExpenses((prev) => [
      ...prev,
      {
        id: new Date().getTime().toString(),
        title,
        amount,
        date: new Date().getTime(),
      },
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
        money,
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
