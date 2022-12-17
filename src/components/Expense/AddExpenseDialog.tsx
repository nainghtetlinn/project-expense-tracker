import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

type PropsType = {
  open: boolean;
  handleClose: () => void;
};

export const AddExpenseDialog = ({ open, handleClose }: PropsType) => {
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
          />
          <TextField
            fullWidth
            margin="dense"
            label="Amount (Ks)"
            placeholder="Eg: 700"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
