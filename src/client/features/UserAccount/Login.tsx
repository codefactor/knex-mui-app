import { useEffect, useState } from "react";
import { ApplicationProps, Field } from "../../clientTypes";
import { Credentials } from "../../../core/sharedTypes";
import { attemptLogin, credentialsChanged } from "./userAccountSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { isEntityValid } from "../../util/fields";
import { EntityDialog } from "../../components/EntityDialog";

const fields: Field<Credentials>[] = [
  { prop: "username", label: "User Name", required: true },
  { prop: "password", label: "Password", required: true },
];

export function Login({ open, onClose }: ApplicationProps) {
  const [valid, setValid] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<Partial<Credentials>>({});
  const status = useAppSelector((state) => state.userAccount.status);
  const busy = status === "pending";
  const currentUser = useAppSelector((state) => state.userAccount.currentUser);
  const failedAttempt = useAppSelector(
    (state) => state.userAccount.failedAttempt
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    setValid(isEntityValid(fields, credentials));
  }, [credentials]);
  useEffect(() => {
    if (currentUser || failedAttempt) {
      setCredentials({});
    }
    if (currentUser) {
      onClose();
    }
  }, [currentUser, failedAttempt, onClose]);
  if (status === "init" || currentUser) {
    return null;
  }
  return (
    <EntityDialog
      title="Login"
      entity={credentials}
      busy={busy}
      fields={fields}
      onClose={onClose}
      onChange={(draft) => {
        setCredentials(draft);
        dispatch(credentialsChanged());
      }}
      onSubmit={() => dispatch(attemptLogin(credentials as Credentials))}
      open={open}
      valid={valid}
      alert={failedAttempt ? { message: "Incorrect Login" } : undefined}
    />
  );
}
