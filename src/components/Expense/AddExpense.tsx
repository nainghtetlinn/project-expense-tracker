import {
  Paper,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

import Joi from "joi";
import { useState } from "react";
import { useGlobalContext } from "../../context";
import { useNotiContext } from "../../context/notiContext";

const ExpenseSchema = Joi.object({
  title: Joi.string().required(),
  amount: Joi.number().required(),
});

export const AddExpense = () => {
  const { addNewExpense } = useGlobalContext();
  const { showNoti } = useNotiContext();

  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const handleAdd = () => {
    const { error, value } = ExpenseSchema.validate({ title, amount });
    if (error) return showNoti({ msg: error.message, type: "error" });
    addNewExpense(value);
    showNoti({ msg: "Successfully added new expense", type: "success" });
    setTitle("");
    setAmount("");
  };

  const handleChangeAmount = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const a = e.target.value.split(",").join("");
    if (Number(a) || a === "") setAmount(a);
    else showNoti({ msg: "Invalid input.", type: "error" });
  };

  return (
    <>
      <Paper>
        <DialogTitle>Add Expense</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Title"
            placeholder="Eg: Tea"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Amount (Ks)"
            placeholder="Eg: 700"
            value={amount ? Number(amount).toLocaleString() : ""}
            onChange={handleChangeAmount}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAdd} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Paper>
    </>
  );
};
