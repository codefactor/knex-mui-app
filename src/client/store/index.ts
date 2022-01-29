import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import appReducer from "../features/App/appSlice";
import userAccountReducer from "../features/UserAccount/userAccountSlice";
import errorsReducer from "../features/Errors/errorsSlice";
import appOpenerReducer from "../features/AppOpener/appOpenerSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    userAccount: userAccountReducer,
    errors: errorsReducer,
    appOpener: appOpenerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
