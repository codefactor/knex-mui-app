import { useAppDispatch, useAppSelector } from "../../store/hooks";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AppMenu } from "../AppOpener";
import { logout } from "../UserAccount/userAccountSlice";

export function AccountMenu() {
  const currentUser = useAppSelector((state) => state.userAccount.currentUser);
  const dispatch = useAppDispatch();
  if (!currentUser) return null;
  return (
    <AppMenu
      ariaLabel="account menu"
      items={[
        {
          type: "simple",
          Icon: AccountCircleIcon,
          primary: `Hello, ${currentUser.username}`,
          Application: () => {},
          key: "accountName",
        },
        {
          type: "divider",
        },
        {
          key: "logout",
          type: "simple",
          Application: () => dispatch(logout()),
          primary: "Logout",
        },
      ]}
      Icon={AccountCircleIcon}
    />
  );
}
