import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Typography,
  Paper,
  Stack,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { useState } from "react";
import { RemoveExpense } from "./RemoveExpense";
import { EditExpense } from "./EditExpense";

type Props = {
  title: string;
  amount: number;
  date: number | any;
  id: string;
};

export const ExpenseItem = ({ title, amount, date, id }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClose = () => setAnchorEl(null);

  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  return (
    <>
      <Paper sx={{ padding: 2 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Typography variant="body1">{title}</Typography>
            <Typography variant="body2">
              {amount.toLocaleString()} Ks
            </Typography>
          </Stack>
          <IconButton
            size="small"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <MoreVertIcon />
          </IconButton>
        </Stack>
      </Paper>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          onClick={() => {
            setOpenEdit(true);
            handleClose();
          }}
        >
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenConfirm(true);
            handleClose();
          }}
        >
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText>Remove</ListItemText>
        </MenuItem>
      </Menu>
      <RemoveExpense
        open={openConfirm}
        close={() => setOpenConfirm(false)}
        id={id}
      />
      <EditExpense
        open={openEdit}
        close={() => setOpenEdit(false)}
        id={id}
        defaultValues={{ amount, title }}
      />
    </>
  );
};
