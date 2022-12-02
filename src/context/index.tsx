import { createContext, useContext, useState, useEffect } from "react";

const ExpenseContext = createContext({});

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

  const [expenses, setExpenses] = useState<ExpenseType[]>([]);
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
    <ExpenseContext.Provider value={{}}>{children}</ExpenseContext.Provider>
  );
}

export const useGlobalContext = () => useContext(ExpenseContext);
export default ContextProvider;
