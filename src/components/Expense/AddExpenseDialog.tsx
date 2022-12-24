import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import Joi from "joi";
import { useState } from "react";
import { useGlobalContext } from "../../context";
import { useNotiContext } from "../../context/notiContext";

const ExpenseSchema = Joi.object({
  title: Joi.string().required(),
  amount: Joi.number().required(),
});

type PropsType = {
  open: boolean;
  handleClose: () => void;
};

export const AddExpenseDialog = ({ open, handleClose }: PropsType) => {
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

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
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
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleAdd}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
