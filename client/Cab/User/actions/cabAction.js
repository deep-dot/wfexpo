import {
    LOAD_CAB_REQUEST,
    LOAD_CAB_SUCCESS,
    LOAD_CAB_FAIL,

    LOAD_CAB_LOCATION_REQUEST,
    LOAD_CAB_LOCATION_SUCCESS,
    LOAD_CAB_LOCATION_FAIL,

    LOAD_ALL_CABS_REQUEST,
    LOAD_ALL_CABS_SUCCESS,
    LOAD_ALL_CABS_FAIL,

    CLEAR_ERRORS,
} from "../constants/cabConstants";
import axios from "axios";

// export const getCab = (rego) => async (dispatch) => {
//     //console.log('cab in cab action', rego);
//     try {
//         dispatch({type: LOAD_CAB_REQUEST });
//         const  cab  = await axios.get(`http://192.168.43.36:4000/Cab/getCab`, rego);
//        // console.log('cab in cab action', cab.data.cab.availability);
//         dispatch({type: LOAD_CAB_SUCCESS, payload: cab.data.cab });
//     } catch (e) {
//         dispatch({type: LOAD_CAB_FAIL, payload: e });
//     }
// }

export const postCabLocation = (data) => async (dispatch) => {
    // console.log('cab location in actions', data);
    try {
        dispatch({type: LOAD_CAB_REQUEST });
        dispatch({type: LOAD_CAB_LOCATION_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const  cab  = await axios.post(`http://192.168.43.36:4000/Cab/cablocation`,
            data, config);
       //console.log('cab location in actions', cab.data.cab );
        dispatch({type: LOAD_CAB_LOCATION_SUCCESS, payload: data});
        dispatch({type: LOAD_CAB_SUCCESS, payload: cab.data.cab });
    } catch (e) {
        console.log('e====',e);
        dispatch({type: LOAD_CAB_LOCATION_FAIL, payload: e});
        dispatch({type: LOAD_CAB_FAIL, payload: e });
    }
}

export const getAllCabs = () => async (dispatch) => {
    //console.log('getallcabs');
    try{
        dispatch({type: LOAD_ALL_CABS_REQUEST});
        const  response  = await axios.get('http://192.168.43.36:4000/Cab/getAllCabs');
          //console.log('getallcabs==',response.data.cabs)
          if(response.data.status === 'ok'){
        dispatch({type: LOAD_ALL_CABS_SUCCESS, payload: response.data.cabs});
          } else {
            dispatch({type: LOAD_ALL_CABS_FAIL, payload: response.data.error})
          }
    } catch (e) {
        console.log(e.message);
    }
}