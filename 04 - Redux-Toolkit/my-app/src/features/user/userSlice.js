import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "Jean-Marie CLÉRY",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    update: (state, action) => {
      console.log("action =", action);
      state.name = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { update } = userSlice.actions;

export const selectUser = (state) => state.user;
