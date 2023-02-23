import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import Joi from "joi";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../../context";
import { useNotiContext } from "../../context/notiContext";

type Props = {
  open: boolean;
  close: () => void;
  id: string;
  defaultValues: {
    amount: number;
    title: string;
    type: "earn" | "spend" | string;
  };
};

const ExpenseSchema = Joi.object({
  title: Joi.string().required(),
  amount: Joi.number().required(),
  type: Joi.string().valid("earn", "spend"),
});

export const EditExpense = ({ open, close, id, defaultValues }: Props) => {
  const { editExpense } = useGlobalContext();
  const { showNoti } = useNotiContext();

  const [title, setTitle] = useState<string>(defaultValues.title);
  const [amount, setAmount] = useState<string | number>(defaultValues.amount);
  const [type, setType] = useState<"earn" | "spend" | string>(
    defaultValues.type
  );
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    setIsEdited(true);
  }, [title, amount, type]);

  const handleChangeAmount = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const a = e.target.value.split(",").join("");
    if (Number(a) || a === "") setAmount(a);
    else showNoti({ msg: "Invalid input.", type: "error" });
  };

  const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };

  const handleEdit = () => {
    if (!isEdited) return;
    const { error, value } = ExpenseSchema.validate({ title, amount, type });
    if (error) return showNoti({ msg: error.message, type: "error" });
    editExpense(id, value);
    close();
    showNoti({ msg: "Updated", type: "success" });
    setIsEdited(false);
  };
  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Edit expense</DialogTitle>
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
        <Button variant="outlined" color="primary" onClick={close}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleEdit}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
