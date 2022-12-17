import {
  Paper,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

export const AddExpense = () => {
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
          />
          <TextField
            fullWidth
            margin="dense"
            label="Amount (Ks)"
            placeholder="Eg: 700"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained">Add</Button>
        </DialogActions>
      </Paper>
    </>
  );
};
