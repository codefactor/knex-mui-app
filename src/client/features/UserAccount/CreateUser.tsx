import { useEffect, useState } from "react";
import { ApplicationProps, Field } from "../../clientTypes";
import { NewUser } from "../../../core/sharedTypes";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { isEntityValid } from "../../util/fields";
import { EntityDialog } from "../../components/EntityDialog";
import { createUser } from "./userAccountSlice";

const fields: Field<NewUser>[] = [
  {
    prop: "username",
    label: "User Name",
    required: true,
  },
  {
    prop: "email",
    label: "Email Address",
    required: true,
  },
  {
    prop: "password",
    label: "Password",
    required: true,
  },
];

export function CreateUser({ open, onClose }: ApplicationProps) {
  const dispatch = useAppDispatch();
  const [newUser, setNewUser] = useState<Partial<NewUser>>({});
  const [valid, setValid] = useState<boolean>(false);
  const currentUser = useAppSelector((state) => state.userAccount.currentUser);
  const status = useAppSelector((state) => state.userAccount.status);
  const newUserStatus = useAppSelector(
    (state) => state.userAccount.createUserStatus
  );
  const hasUsers = useAppSelector((state) => state.userAccount.hasUsers);
  const busy = newUserStatus === "pending";
  useEffect(() => {
    setValid(isEntityValid(fields, newUser));
  }, [newUser]);
  if (status !== "idle" || (hasUsers && !currentUser)) {
    return null;
  }
  return (
    <EntityDialog
      title="Create User"
      open={open}
      entity={newUser}
      busy={busy}
      fields={fields}
      valid={valid}
      onClose={onClose}
      onChange={(value) => setNewUser(value)}
      onSubmit={() => {
        dispatch(createUser(newUser as NewUser));
      }}
    />
  );
}
