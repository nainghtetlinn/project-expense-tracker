import { Snackbar, Alert } from "@mui/material";
import { useNotiContext } from "../../context/notiContext";

const types = ["info", "error", "success"];

export const Noti = () => {
  const { msg, type, show, hideNoti } = useNotiContext();
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    hideNoti();
  };
  return (
    <>
      <Snackbar open={show} onClose={handleClose} autoHideDuration={3000}>
        <Alert
          severity={
            types.includes(type)
              ? (type as "info" | "success" | "error")
              : "info"
          }
        >
          {msg}
        </Alert>
      </Snackbar>
    </>
  );
};
