import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const appOpenerSlice = createSlice({
  name: "openedApps",
  initialState: { opened: {} } as {
    opened: Record<string, boolean | undefined>;
  },
  reducers: {
    openApp: (state, { payload }: PayloadAction<string>) => {
      state.opened = {
        ...state.opened,
        [payload]: true,
      };
    },
    closeApp: (state, { payload }: PayloadAction<string>) => {
      state.opened = {
        ...state.opened,
        [payload]: false,
      };
    },
  },
});

export const { openApp, closeApp } = appOpenerSlice.actions;

export default appOpenerSlice.reducer;
