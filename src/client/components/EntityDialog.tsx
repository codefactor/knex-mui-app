import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { EntityForm } from "./EntityForm";
import { green } from "@mui/material/colors";
import { AlertColor } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions/transition";
import { Field } from "../clientTypes";

export interface EntityDialogProps<T> {
  title?: string;
  entity: Partial<T>;
  open: boolean;
  busy: boolean;
  valid: boolean;
  alert?: {
    severity?: AlertColor;
    message: string;
  };
  fields: Field<T>[];
  submitText?: string;
  TransitionProps?: TransitionProps;
  onChange: (draft: Partial<T>) => void;
  onSubmit: () => void;
  onClose: (
    event: {},
    reason: "backdropClick" | "escapeKeyDown" | "cancelButton"
  ) => void;
}

export function EntityDialog<T>({
  title,
  entity,
  open,
  busy,
  valid,
  alert,
  fields,
  submitText = "OK",
  onChange,
  onSubmit,
  onClose,
  TransitionProps,
}: EntityDialogProps<T>) {
  return (
    <Dialog
      open={open}
      TransitionProps={TransitionProps}
      onClose={(evt, reason) => {
        if (!busy) {
          onClose(evt, reason);
        }
      }}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <EntityForm
          busy={busy}
          fields={fields}
          currentEntity={entity}
          onSubmit={() => {
            if (valid) {
              onSubmit();
            }
          }}
          handleChange={(draft) => {
            onChange(draft);
          }}
        />
        {alert && (
          <Alert severity={alert.severity || "warning"}>{alert.message}</Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button disabled={busy} onClick={(evt) => onClose(evt, "cancelButton")}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={busy || !valid}
          onClick={onSubmit}
        >
          {submitText}
        </Button>
      </DialogActions>
      {busy && (
        <CircularProgress
          size={24}
          sx={{
            color: green[500],
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Dialog>
  );
}
