import {
    // LOAD_CAB_REQUEST,
    // LOAD_CAB_SUCCESS,
    // LOAD_CAB_FAIL,

    LOAD_CAB_LOCATION_REQUEST,
    LOAD_CAB_LOCATION_SUCCESS,
    LOAD_CAB_LOCATION_FAIL,

    // POST_CAB_LOCATION_REQUEST,
    // POST_CAB_LOCATION_SUCCESS,
    // POST_CAB_LOCATION_FAIL,

    // LOAD_ALL_CABS_REQUEST,
    // LOAD_ALL_CABS_SUCCESS,
    // LOAD_ALL_CABS_FAIL,

    // CLEAR_ERRORS,
} from "../constants/cabConstants";
import axios from "axios";
import * as Location from 'expo-location';
import Constants from 'expo-constants';
const url = Constants.expoConfig.extra.env;

// export const getCab = (rego) => async (dispatch) => {
//     // console.log('cab in cab action', rego);
//     try {
//         dispatch({ type: LOAD_CAB_REQUEST });
//         const cab = await axios.get(url + `/Cab/getCab?rego=${rego}`)
//         //console.log('cab in cab action', cab.data.success);
//         if (cab.data.success) {
//             // console.log('cab in cab action', cab.data.cab.availability);
//             let Cab = cab.data.cab
//             return dispatch({ type: LOAD_CAB_SUCCESS, payload: { Cab: cab.data.cab.availability }});
//         }
//     } catch (e) {
//         console.log(e);
//         dispatch({ type: LOAD_CAB_FAIL, payload: e.response.cab.data.msg });
//     }
//}

export const postCabLocation = (rego) => async (dispatch) => {
    //console.log('cab location in actions', rego);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
    }
    let loc = await Location.getCurrentPositionAsync({}),
        region = await Location.reverseGeocodeAsync({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude
        });
    try {
        let location = {
            location: {
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude
            },
            description: {
                streetnumber: region[0].streetNumber,
                street: region[0].street,
                city: region[0].city,
                postalcode: region[0].postalCode
            },
            rego
        }
        dispatch({ type: LOAD_CAB_LOCATION_REQUEST });
        const res = await axios.post( url + `/Cab/cablocation`,
            { locationdetail: location });
        if (res.data.success) {
            //console.log('res in postcablocation ==', res.data.success, location.description.city)
            return dispatch({ type: LOAD_CAB_LOCATION_SUCCESS, payload:{location: location } });
        }
    } catch (e) {
        console.log('e====', e);
        dispatch({ type: LOAD_CAB_LOCATION_FAIL, payload: e.res.data.msg });
    }
}

// export const getAllCabs = (cabs) => async (dispatch) => {
//     // console.log('getallcabs in action==', cabs.length);
//     try {
//         dispatch({ type: LOAD_ALL_CABS_REQUEST });
//         // const response = await axios.get(url + '/Cab/getAllCabs');
//         // if (response.data.success) {
//         //      console.log('getallcabs==', response.data.cabs.length);
//             return dispatch({ type: LOAD_ALL_CABS_SUCCESS, payload:{ cabs: cabs }});
//        // }
//     } catch (e) {
//         console.log(e.message);
//         dispatch({ type: LOAD_ALL_CABS_FAIL, payload: e.response.data.error })
//     }
// }