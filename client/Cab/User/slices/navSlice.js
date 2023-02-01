import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentLocation: null,
  origin: null,
  destination: null,
  travelTimeInformation: null,
  loading: false,
  dispatchedjobdetail: null,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setdispatchedjobdetail: (state, action) => {
      // console.log('dispatched job detail ===',action.payload);
      state.dispatchedjobdetail = action.payload
    },
    setLoading: (state, action) => { state.loading = action.payload },
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      // console.log('destination payload===',action.payload);
      // console.log('destination',action.payload)
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
  },
});

export const { setdispatchedjobdetail, setLoading, setCurrentLocation, setloggedinUser, setOrigin, setDestination, setTravelTimeInformation } =
  navSlice.actions;

// Selectors
export const selectdispatchedjobdetail = (state) => state.nav.dispatchedjobdetail;
export const selectLoading = (state) => state.nav.loading;
export const selectCurrentLocation = (state) => state.nav.currentLocation;
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) =>
  state.nav.travelTimeInformation;

export default navSlice.reducer;
