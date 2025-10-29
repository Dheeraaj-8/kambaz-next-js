import { createSlice } from "@reduxjs/toolkit";
import usersData from "../Database/users.json";

const initialState = {
  currentUser: null,
  users: usersData,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        if (action.payload) {
          localStorage.setItem('currentUser', JSON.stringify(action.payload));
        } else {
          localStorage.removeItem('currentUser');
        }
      }
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex((u: any) => u._id === action.payload._id);
      if (index !== -1) {
        state.users[index] = action.payload;
        // Update current user if it's the same user
        if (state.currentUser && (state.currentUser as any)._id === action.payload._id) {
          state.currentUser = action.payload;
          if (typeof window !== 'undefined') {
            localStorage.setItem('currentUser', JSON.stringify(action.payload));
          }
        }
        }
      }
    },
  },
);

export const { setCurrentUser, addUser, updateUser } = accountSlice.actions;
export default accountSlice.reducer;