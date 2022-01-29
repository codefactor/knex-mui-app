import {
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { PropsWithChildren, useState } from "react";
import { ListProps } from "../../clientTypes";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeApp, openApp } from "./appOpenerSlice";
import { v4 as uuid } from "uuid";

export function AppMenu({
  Icon,
  items,
  ariaLabel,
}: PropsWithChildren<{ Icon: any } & ListProps>) {
  const [menuId] = useState(() => uuid());
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const opened = !!useAppSelector((state) => state.appOpener.opened[menuId]);
  const dispatch = useAppDispatch();
  return (
    <>
      <IconButton
        id={`${menuId}-btn`}
        aria-controls={opened ? menuId : undefined}
        aria-haspopup="true"
        aria-label={ariaLabel}
        aria-expanded={opened ? "true" : undefined}
        onClick={(evt) => {
          setAnchorEl(evt.currentTarget);
          dispatch(openApp(menuId));
        }}
      >
        <Icon />
      </IconButton>
      <Menu
        id={menuId}
        open={opened}
        anchorEl={anchorEl}
        onClose={() => dispatch(closeApp(menuId))}
        MenuListProps={{
          "aria-labelledby": `${menuId}-btn`,
        }}
      >
        {items.map((item, i) => {
          if (item.type === "divider") {
            return <Divider key={`divider-${i}`} />;
          }
          const { key, Icon: MenuIcon, primary, secondary, type } = item;
          return (
            <MenuItem
              key={key}
              onClick={(evt) => {
                if (type === "application") {
                  dispatch(openApp(key));
                } else if (type === "simple") {
                  item.Application(evt);
                }
                dispatch(closeApp(menuId));
              }}
            >
              {MenuIcon && (
                <ListItemIcon>
                  <MenuIcon />
                </ListItemIcon>
              )}
              <ListItemText primary={primary} secondary={secondary} />
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
