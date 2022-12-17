import { createContext, useContext, useState, useEffect } from "react";

const ExpenseContext = createContext({
  money: 0,
  addMoney: (amount: number) => {},
  reduceMoney: (amount: number) => {},
  resetMoney: () => {},
  expenses: [] as ExpenseType[],
  addNewExpense: ({ name, amount }: ExpenseType) => {},
  removeExpense: (id: string) => {},
  editExpense: (id: string, value: { name?: string; amount?: number }) => {},
});

type ExpenseType = {
  id?: string;
  name: string;
  amount: number;
  date?: number;
};

function ContextProvider({ children }: { children: JSX.Element }) {
  const [money, setMoney] = useState<number>(0);
  const addMoney = (amount: number) => setMoney((prev) => prev + amount);
  const reduceMoney = (amount: number) => setMoney((prev) => prev - amount);
  const resetMoney = () => setMoney(0);

  const [expenses, setExpenses] = useState<ExpenseType[]>([
    { id: "e1", name: "tea", amount: 1000, date: new Date().getTime() },
  ]);
  const addNewExpense = ({ name, amount }: ExpenseType) =>
    setExpenses((prev) => [
      ...prev,
      {
        id: new Date().getTime().toString(),
        name,
        amount,
        date: new Date().getTime(),
      },
    ]);
  const removeExpense = (id: string) =>
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  const editExpense = (id: string, value: { name?: string; amount?: number }) =>
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id ? { ...expense, ...value } : expense
      )
    );

  return (
    <ExpenseContext.Provider
      value={{
        money,
        addMoney,
        reduceMoney,
        resetMoney,
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
