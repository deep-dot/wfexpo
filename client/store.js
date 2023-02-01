import { configureStore, combineReducers } from "@reduxjs/toolkit";

// admin panel
import slice4admin from "./Cab/Admin/slices/navSlice";

//Driver panel
import navReducer from "./Cab/Driver/slices/navSlice";
import {
  driverReducer,
} from "./Cab/Driver/reducers/driverReducer";
import {
  cabReducer,
} from "./Cab/Driver/reducers/cabReducer";

//User panel
import navReducer4user from "./Cab/User/slices/navSlice";
import {
  userReducer,
} from "./Cab/User/reducers/userReducer";
import {
  cabReducer4user,
  getAllCabsReducer4user,
} from "./Cab/User/reducers/cabReducer";

const reducer = combineReducers({
  navi: slice4admin,

  // navReducer,
  // driver: driverReducer,
  // cab: cabReducer,

  // navReducer4user,
  // user: userReducer,
  // cab4user: cabReducer4user,
  // cabs4user: getAllCabsReducer4user,
});

export const Store = configureStore({
  reducer,
});
