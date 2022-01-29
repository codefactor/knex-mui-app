import { AlertColor } from "@mui/material";
import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";

export interface BaseError {
  message?: string;
  severity?: AlertColor;
}

export interface UnhandledError extends BaseError {
  error: unknown;
}

export interface HandledError extends BaseError {
  error?: SerializedError;
}

export interface ErrorState {
  errors: HandledError[];
}

const initialState: ErrorState = {
  errors: [],
};

export const errorsSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    showError: (state, { payload }: PayloadAction<HandledError>) => {
      state.errors.push(payload);
    },
    dismissAll: (state) => {
      state.errors = [];
    },
  },
});

export function showError(
  error: unknown,
  message?: string,
  severity?: AlertColor
) {
  return errorsSlice.actions.showError({
    error: serialize(error),
    message,
    severity,
  });
}

function serialize(error: unknown) {
  if (error && typeof error === "object") {
    return {
      ...error,
    };
  }
  return "" + error;
}

export const { dismissAll } = errorsSlice.actions;

export default errorsSlice.reducer;
