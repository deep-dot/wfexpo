// import {
//     // LOAD_JOB_REQUEST,
//     // LOAD_JOB_SUCCESS,
//     // LOAD_JOB_FAIL,

//     // LOAD_JOB_LOCATION_REQUEST,
//     // LOAD_JOB_LOCATION_SUCCESS,
//     // LOAD_JOB_LOCATION_FAIL,

//     LOAD_ALL_JOBS_REQUEST,
//     LOAD_ALL_JOBS_SUCCESS,
//     LOAD_ALL_JOBS_FAIL,

//     LOAD_ALL_JOBSDONE_REQUEST,
//     LOAD_ALL_JOBSDONE_SUCCESS,
//     LOAD_ALL_JOBSDONE_FAIL,

//     CLEAR_ERRORS,
// } from "../constants/jobConstants";

// export const getAllJobsReducer = (
//     state = { jobs:null }, 
//     action
//     ) => {
//     // console.log('job in reducer===', action.payload);
//     switch (action.type) {        
//         case LOAD_ALL_JOBS_REQUEST:        
//             return {
//                 isLoading: true,
//             };        
//         case LOAD_ALL_JOBS_SUCCESS:
//             return {
//                 ...state,
//                 isLoading: false,
//                 jobs: action.payload,
//             };
//         case LOAD_ALL_JOBS_FAIL:
//             return {
//                 isLoading: false,
//                 jobs: null,
//                 error: action.payload,
//             };
//         case CLEAR_ERRORS:        
//             return {
//                 ...state,
//                 error: null,
//             };

//         default:
//             return state;
//     }
// };

// export const jobsDoneReducer = (
//     state = { jobsDone:null }, 
//     action
//     ) => {
//     // console.log('job in reducer===', action.payload);
//     switch (action.type) {        
//         case LOAD_ALL_JOBSDONE_REQUEST:        
//             return {
//                 isLoading: true,
//             };        
//         case LOAD_ALL_JOBSDONE_SUCCESS:
//             return {
//                 ...state,
//                 isLoading: false,
//                 jobsDone: action.payload,
//             };
//         case LOAD_ALL_JOBSDONE_FAIL:
//             return {
//                 isLoading: false,
//                 jobsDone: null,
//                 error: action.payload,
//             };
//         case CLEAR_ERRORS:        
//             return {
//                 ...state,
//                 error: null,
//             };

//         default:
//             return state;
//     }
// };
