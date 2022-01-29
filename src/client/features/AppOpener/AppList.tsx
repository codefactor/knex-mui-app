import { ApplicationMenuItem, ListProps } from "../../clientTypes";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { openApp, closeApp } from "./appOpenerSlice";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/Inbox";
import Divider from "@mui/material/Divider";

export function AppList({ items, ariaLabel }: ListProps) {
  const opened = useAppSelector((state) => state.appOpener.opened);
  const dispatch = useAppDispatch();
  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <nav aria-label={ariaLabel}>
        <List>
          {items.map((item, i) => {
            if (item.type === "divider") {
              return <Divider key={`divider-${i}`} />;
            }
            const { key, Icon, primary, secondary, type } = item;
            return (
              <ListItem
                key={key}
                disablePadding
                onClick={(evt) => {
                  if (type === "application") {
                    dispatch(openApp(key));
                  } else if (type === "simple") {
                    item.Application(evt);
                  }
                }}
              >
                <ListItemButton>
                  {Icon && (
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                  )}
                  <ListItemText primary={primary} secondary={secondary} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </nav>
      {items
        .filter(({ type }) => type === "application")
        .map((item) => {
          const { key, Application } = item as ApplicationMenuItem;
          return (
            <Application
              key={key}
              open={!!opened[key]}
              onClose={() => {
                dispatch(closeApp(key));
              }}
            />
          );
        })}
    </Box>
  );
}
