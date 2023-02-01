import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_DRIVER_REQUEST,
  REGISTER_DRIVER_SUCCESS,
  REGISTER_DRIVER_FAIL,
  LOAD_DRIVER_REQUEST,
  LOAD_DRIVER_SUCCESS,
  LOAD_DRIVER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,

  CLEAR_ERRORS,
  RETRIEVE_TOKEN,
} from "../constants/driverConstants";

 export const driverReducer = (state = {driver: null, Token: null}, action) => {
 //console.log('driver and token in reducer', action.payload);
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_DRIVER_REQUEST:
    case LOAD_DRIVER_REQUEST:
      return {
        isLoading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_DRIVER_SUCCESS:
    case LOAD_DRIVER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        driver: action.payload,
      };
    case RETRIEVE_TOKEN:
      return {
        ...state,
        Token: action.payload,
        isLoading: false,
     };
    case LOGOUT_SUCCESS:
      return {
        isLoading: false,
        driver: null,
        isAuthenticated: false,
        Token: null,
      };
    case LOGIN_FAIL:
    case REGISTER_DRIVER_FAIL:
    case LOAD_DRIVER_FAIL:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        driver: null,
        error: action.payload,
      };

    case LOGOUT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

