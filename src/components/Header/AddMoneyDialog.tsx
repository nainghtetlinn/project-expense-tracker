import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import Joi from "joi";
import { useState } from "react";

import { useGlobalContext } from "../../context";
import { useNotiContext } from "../../context/notiContext";

type Props = {
  show: boolean;
  close: () => void;
};

export const AddMoneyDialog = ({ show, close }: Props) => {
  const { showNoti } = useNotiContext();
  const { addMoney } = useGlobalContext();
  const [amount, setAmount] = useState<string>("");

  const handleAdd = () => {
    const { error, value } = Joi.number().required().validate(amount);
    if (error) {
      setAmount("");
      showNoti({ type: "error", msg: error.message });
      return;
    }
    addMoney(Number(value));
    showNoti({ type: "success", msg: "Successfully added money" });
    setAmount("");
  };

  return (
    <Dialog open={show} onClose={close} maxWidth="sm" fullWidth>
      <DialogTitle>Add Money</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          variant="outlined"
          label="Amount"
          placeholder="1000"
          margin="dense"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary" variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
