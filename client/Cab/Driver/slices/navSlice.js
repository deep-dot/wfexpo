import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
  loading: false,
  cabs:null,
  dispatchedjobdetail: null,
  carsPositionOrder: null,
  jobsDone:null,
  bookings:null,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
    setLoading: (state, action) => { state.loading = action.payload },
    setCabs: (state, action) => { 
      //console.log('cabs in slice==', action.payload);
      state.cabs = action.payload
    },
    setdispatchedjobdetail: (state, action) => {
      // console.log('dispatched job detail ===',action.payload);
      state.dispatchedjobdetail = action.payload
    },
    setCarsPositionOrder: (state, action) => { 
     // console.log('in navslice===',action.payload);
      state.carsPositionOrder = action.payload 
    },
    setJobsDone: (state, action) => {
      state.jobsDone = action.payload
    },
    setBookings: (state, action) => {
      state.bookings = action.payload
    }
  },
});

export const {
  setloggedinUser, setOrigin, setDestination,
  setTravelTimeInformation, setLoading, setCabs,
  setdispatchedjobdetail, setCarsPositionOrder,
  setJobsDone, setBookings,
} = navSlice.actions;

// Selectors
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation;
export const selectLoading = (state) => state.nav.loading;
export const selectCabs = (state) => state.nav.cabs;
export const selectdispatchedjobdetail = (state) => state.nav.dispatchedjobdetail;
export const selectCarsPositionOrder = (state) => state.nav.carsPositionOrder;
export const selectJobsDone = (state) => state.nav.jobsDone;
export const selectBooking = (state) => state.nav.bookings;

export default navSlice.reducer;
