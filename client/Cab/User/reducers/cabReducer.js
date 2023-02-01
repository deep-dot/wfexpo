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

export const cabReducer4user = (
    state = { cab: null },
    action
) => {
    // console.log('cab in reducer===', action.payload);
    switch (action.type) {
        case LOAD_CAB_REQUEST:
            return {
                isLoading: true,
            };
        case LOAD_CAB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                cab: action.payload,
            };
        case LOAD_CAB_FAIL:
            return {
                isLoading: false,
                cab: null,
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

export const cabLocationReducer = (
    state = { currentLocation: null, origin: null, destination: null },
    action
) => {
    //console.log('cabLocation in reducer===', action.payload);
    switch (action.type) {
        case LOAD_CAB_LOCATION_REQUEST:
            return {
                isLoading: true,
            };
        case LOAD_CAB_LOCATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentLocation: action.payload,
            };
        case LOAD_CAB_LOCATION_FAIL:
            return {
                isLoading: false,
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

export const getAllCabsReducer4user = (
    state = { cabs: [] },
    action
) => {
     //console.log('cab in reducer===', action.payload);
    switch (action.type) {
        case LOAD_ALL_CABS_REQUEST:
            return {
                isLoading: true,
            };
        case LOAD_CAB_LOCATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                cab: action.payload,
            };
        case LOAD_ALL_CABS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                cabs: action.payload,
            };
        case LOAD_ALL_CABS_FAIL:
            return {
                isLoading: false,
                cabs: null,
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



