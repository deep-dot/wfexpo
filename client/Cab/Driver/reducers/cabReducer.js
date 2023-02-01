import {
    // LOAD_CAB_REQUEST,
    // LOAD_CAB_SUCCESS,
    // LOAD_CAB_FAIL,

    LOAD_CAB_LOCATION_REQUEST,
    LOAD_CAB_LOCATION_SUCCESS,
    LOAD_CAB_LOCATION_FAIL,

    // LOAD_ALL_CABS_REQUEST,
    // LOAD_ALL_CABS_SUCCESS,
    // LOAD_ALL_CABS_FAIL,

    CLEAR_ERRORS,
} from "../constants/cabConstants";

export const cabReducer = (state = { isLoading: false, currentLocation: {} },
    action ) => {
    // console.log('cab in reducer===', action)
     //.payload.location, action.payload.Cab, action.payload.cabs);
    switch (action.type) {
        // case LOAD_CAB_REQUEST:        
        // case LOAD_ALL_CABS_REQUEST:
        case LOAD_CAB_LOCATION_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        // case LOAD_CAB_SUCCESS:        
        // case LOAD_ALL_CABS_SUCCESS:
        case LOAD_CAB_LOCATION_SUCCESS:
            return {
                 ...state,
                isLoading: false,
                // cab: action.payload.Cab,               
                // cabs: action.payload.cabs,
                currentLocation: action.payload.location,
            };
        // case LOAD_CAB_FAIL:
        // case LOAD_ALL_CABS_FAIL:
        case LOAD_CAB_LOCATION_FAIL:
            return {
                isLoading: false,
                // cab: null,
                // cabs: null,
                currentLocation: null,
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
