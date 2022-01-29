import { createSlice, SerializedError } from "@reduxjs/toolkit";
import { useEffect } from "react";
import {
  Credentials,
  InitialPayload,
  LoginPayload,
  NewUser,
} from "../../../core/sharedTypes";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { createApiThunk } from "../../apis/util";
import {
  fetchInitialPayload,
  requestCreateUser,
  requestLogin,
  requestLogout,
} from "../../apis/userAccountApi";

export interface UserAccountState extends Partial<InitialPayload> {
  status: "init" | "idle" | "pending" | "failed";
  createUserStatus: "idle" | "pending" | "failed" | "closed";
  createUserError?: SerializedError;
  failedAttempt?: boolean;
  error?: SerializedError;
}

const initialState: UserAccountState = {
  status: "init",
  createUserStatus: "closed",
};

export const initialize = createApiThunk<InitialPayload, void>(
  "userAccount/initialize",
  async () => {
    return await fetchInitialPayload();
  }
);

export const createUser = createApiThunk<void, NewUser>(
  "userAccount/createUser",
  async (user) => {
    return await requestCreateUser(user);
  }
);

export const attemptLogin = createApiThunk<LoginPayload, Credentials>(
  "userAccount/login",
  async (credentials) => {
    return await requestLogin(credentials);
  }
);

export const logout = createApiThunk<void, void>("logout", async () => {
  await requestLogout();
});

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    credentialsChanged: (state) => {
      state.failedAttempt = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initialize.pending, (state) => {
        state.status = "pending";
      })
      .addCase(initialize.fulfilled, (state, { payload }) => {
        state.status = "idle";
        Object.assign(state, payload);
      })
      .addCase(initialize.rejected, (state, { error }) => {
        state.status = "failed";
        console.error(error);
      });

    builder
      .addCase(attemptLogin.pending, (state) => {
        state.status = "pending";
      })
      .addCase(
        attemptLogin.fulfilled,
        (state, { payload: { success, user } }) => {
          state.status = "idle";
          state.failedAttempt = !success;
          if (success) {
            state.currentUser = user;
          }
        }
      )
      .addCase(attemptLogin.rejected, (state, { error }) => {
        state.status = "failed";
        state.error = error;
      });

    builder
      .addCase(logout.pending, (state) => {
        state.status = "pending";
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "idle";
        state.currentUser = undefined;
      })
      .addCase(logout.rejected, (state, { error }) => {
        state.status = "failed";
        console.error(error);
      });

    builder
      .addCase(createUser.pending, (state) => {
        state.createUserStatus = "pending";
      })
      .addCase(createUser.fulfilled, (state) => {
        state.createUserStatus = "closed";
      })
      .addCase(createUser.rejected, (state, { error }) => {
        state.createUserStatus = "failed";
        state.createUserError = error;
      });
  },
});

export const { credentialsChanged } = loginSlice.actions;

export function useInitializedApp() {
  const status = useAppSelector((state) => state.userAccount.status);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (status === "init") {
      dispatch(initialize());
    }
  }, [dispatch, status]);
}

export default loginSlice.reducer;
