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

export const ReduceMoneyDialog = ({ show, close }: Props) => {
  const { showNoti } = useNotiContext();
  const { reduceMoney } = useGlobalContext();
  const [amount, setAmount] = useState<string>("");

  const handleReduce = () => {
    const { error, value } = Joi.number().required().validate(amount);
    if (error) {
      setAmount("");
      showNoti({ type: "error", msg: error.message });
      return;
    }
    reduceMoney(Number(value));
    showNoti({ type: "success", msg: "Successfully reduced money" });
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
        <Button onClick={handleReduce} color="error" variant="contained">
          Reduce
        </Button>
      </DialogActions>
    </Dialog>
  );
};
