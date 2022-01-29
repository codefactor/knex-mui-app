import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AjaxError } from "../../../core/sharedTypes";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ErrorDetail } from "./ErrorDetail";
import { dismissAll } from "./errorsSlice";

export function Errors() {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const errors = useAppSelector((state) => state.errors.errors);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (errors.length > 0) {
      setOpen(true);
    }
  }, [errors]);
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      TransitionProps={{
        onExited: () => {
          dispatch(dismissAll());
          setShowDetail(false);
        },
      }}
    >
      <DialogContent>
        {errors.map((error, i) => (
          <div key={i}>
            <Alert severity={error.severity || "error"}>
              <AlertTitle>{error.message}</AlertTitle>
              {(error.error as AjaxError)?.serverError?.message}
            </Alert>
            {showDetail && <ErrorDetail error={error}></ErrorDetail>}
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setShowDetail(!showDetail);
          }}
        >
          {showDetail ? "Hide Detail" : "Show Detail"}
        </Button>
        <Button variant="contained" onClick={() => setOpen(false)}>
          Dismiss
        </Button>
      </DialogActions>
    </Dialog>
  );
}
