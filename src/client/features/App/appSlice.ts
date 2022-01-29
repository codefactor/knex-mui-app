import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DrawerType = "account";

const appSlice = createSlice({
  name: "app",
  initialState: {
    opened: {},
  } as {
    opened: Partial<Record<DrawerType, boolean>>;
  },

  reducers: {
    close: (state, { payload }: PayloadAction<DrawerType>) => {
      state.opened[payload] = false;
    },
    open: (state, { payload }: PayloadAction<DrawerType>) => {
      state.opened[payload] = true;
    },
  },
});

export const { open, close } = appSlice.actions;

export default appSlice.reducer;
