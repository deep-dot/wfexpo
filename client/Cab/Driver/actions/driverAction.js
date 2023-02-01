
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

  RETRIEVE_TOKEN,
} from "../constants/driverConstants";
import axios from "axios";
import { _retrieveData, _storeData, _removeData, _clearData } from '../../components/_Asyncstorage';
import Constants from 'expo-constants';
const url = Constants.expoConfig.extra.env;
// Login
export const login = (formBody) => async (dispatch) => {  
  console.log('driver action login',formBody,);
  try {
    dispatch({ type: LOGIN_REQUEST });
    const response = await axios.post( url + `/Driver/login`,formBody );
    if (response.data.status === 'ok') {
      _storeData('Token', response.data.driver.token);
      _storeData('Rego', response.data.cab.rego);
       console.log('driver action',response.data.driver.token)
      let tokenAndDriver = {
        // Token: response.data.driver.token,
        driver: response.data.driver,
        cab: response.data.cab,
      }
      // console.log('driver action login',tokenAndDriver);
     // dispatch({ type: LOAD_CAB_SUCCESS, payload: tokenAndDriver.cab });
     dispatch({ type: RETRIEVE_TOKEN, payload: response.data.driver.token });
      return dispatch({ type: LOGIN_SUCCESS, payload: tokenAndDriver });
    }
    console.log('error==', response.data.error);
    dispatch({ type: LOGIN_FAIL, payload: response.data.error });
  } catch (error) {
    console.log('error==', error.message);
  }
};

// Register
export const register = (driverData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_DRIVER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post( url + `/Driver/registerDriver`, driverData, config);

    dispatch({ type: REGISTER_DRIVER_SUCCESS, payload: data.driver });
  } catch (error) {
    dispatch({
      type: REGISTER_DRIVER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Load Driver
export const loadDriver = (driverId) => async (dispatch) => {
  const id = driverId;
  try {
    dispatch({ type: LOAD_DRIVER_REQUEST });
    const { data } = await axios.get( url + `/Driver/getDriver`, {
      params: { id }
    });
    dispatch({ type: LOAD_DRIVER_SUCCESS, payload: data.driver });
  } catch (error) {
    dispatch({ type: LOAD_DRIVER_FAIL, payload: error.response.data.message });
  }
};

// Logout Driver
export const logout = () => async (dispatch) => {
  try {    
    _removeData('Token'); 
    dispatch({ type: LOGOUT_SUCCESS });
    let Rego = await _retrieveData('Rego');    
    await axios.put( url + `/Driver/logout?Rego=${Rego}`);    
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.message });
  }
};
