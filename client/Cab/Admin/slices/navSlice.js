import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  admin: null,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setLoading: (state, action) => { state.loading = action.payload },
    setAdmin: (state, action) => { 
      console.log(' clicked', action.payload)
      state.admin = action.payload
     },
  },
});

export const { setLoading, setAdmin } = navSlice.actions;

// Selectors

export const selectLoading = (state) => state.nav.loading;
export const selectAdmin = (state) => state.nav.admin;

export default navSlice.reducer;
