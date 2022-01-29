import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from "@mui/material";
import { AjaxError } from "../../../core/sharedTypes";
import { HandledError } from "./errorsSlice";

interface ItemData {
  Icon?: any;
  label: string;
  text: string;
}

export function ErrorDetail({ error }: { error: HandledError }) {
  const { error: internalError } = error;
  const {
    name,
    message: errorMessage,
    status,
    statusText,
    url,
    serverError,
  } = internalError as AjaxError;
  const { errorId, fingerprint, timestamp } = serverError || {};
  const detailItems: ItemData[] = [];
  const detail = (
    label: string,
    text: string | number | undefined | null,
    Icon?: any
  ) => {
    if (text != null && text !== "") {
      detailItems.push({ label, text: String(text), Icon });
    }
  };
  detail("ErrorMessage", errorMessage);
  detail("Error ID", errorId);
  detail("Fingerprint", fingerprint);
  detail("Timestamp", timestamp);
  detail("URL", url);
  detail("Name", name);
  detail("Status Code", status);
  detail("Status Text", statusText);
  return (
    <Paper>
      <List dense>
        {detailItems.map(({ Icon, label, text }, i) => (
          <ListItem key={i}>
            {Icon && (
              <ListItemAvatar>
                <Avatar>
                  <Icon />
                </Avatar>
              </ListItemAvatar>
            )}
            <ListItemText primary={label} secondary={text} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
