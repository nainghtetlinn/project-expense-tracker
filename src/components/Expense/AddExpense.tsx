import {
  Paper,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

import Joi from "joi";
import { useState } from "react";
import { useGlobalContext } from "../../context";
import { useNotiContext } from "../../context/notiContext";

const ExpenseSchema = Joi.object({
  title: Joi.string().required(),
  amount: Joi.number().required(),
  type: Joi.string().valid("earn", "spend"),
});

export const AddExpense = () => {
  const { addNewExpense } = useGlobalContext();
  const { showNoti } = useNotiContext();

  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [type, setType] = useState<"earn" | "spend" | string>(
    localStorage.getItem("type") || "earn"
  );

  const handleAdd = () => {
    const { error, value } = ExpenseSchema.validate({ title, amount, type });
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

  const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
    localStorage.setItem("type", e.target.value);
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
          <RadioGroup row value={type} onChange={handleChangeType}>
            <FormControlLabel value="earn" control={<Radio />} label="Earn" />
            <FormControlLabel value="spend" control={<Radio />} label="Spend" />
          </RadioGroup>
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
