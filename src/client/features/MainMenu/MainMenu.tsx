import { Typography } from "@mui/material";
import { MenuItem } from "../../clientTypes";
import { useAppSelector } from "../../store/hooks";
import { AppList } from "../AppOpener";
import { CreateUser, Login } from "../UserAccount";

export function MainMenu() {
  const status = useAppSelector((state) => state.userAccount.status);
  const currentUser = useAppSelector((state) => state.userAccount.currentUser);
  const hasUsers = useAppSelector((state) => state.userAccount.hasUsers);
  const items: MenuItem[] = [];
  if (status === "idle") {
    if (!currentUser && hasUsers) {
      items.push({
        type: "application",
        Application: Login,
        key: "login",
        primary: "Login",
      });
    }
    if (currentUser || !hasUsers) {
      items.push({
        type: "application",
        Application: CreateUser,
        key: "createUser",
        primary: "Create User",
      });
    }
  }
  return (
    <div>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div">
        Main Menu
      </Typography>
      <AppList ariaLabel="main menu" items={items} />
    </div>
  );
}
