import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

import { useGlobalContext } from "../../context";
import { useNotiContext } from "../../context/notiContext";

type Props = { open: boolean; close: () => void; id: string };

export const RemoveExpense = ({ open, close, id }: Props) => {
  const { removeExpense } = useGlobalContext();
  const { showNoti } = useNotiContext();
  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Do you really want to remove these expense?</DialogTitle>
      <DialogActions>
        <Button variant="outlined" onClick={close}>
          Cancel
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={() => {
            removeExpense(id);
            showNoti({ msg: "Removed expense", type: "success" });
          }}
        >
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
};
