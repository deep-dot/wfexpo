import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  admin: null,
};

export const slice4admin = createSlice({
  name: "navi",
  initialState,
  reducers: {
    setLoading: (state, action) => { state.loading = action.payload },
    setAdmin: (state, action) => { 
      state.admin = action.payload
     // console.log('admin in navslice===', state.admin, state.loading)
     },    
  },
});
export const { setLoading, setAdmin } = slice4admin.actions;

// Selectors
//console.log('state in slice==', state)
export const selectLoading = (state) => state.navi.loading;
export const selectAdmin = (state) => state.navi.admin;

export default slice4admin.reducer;
