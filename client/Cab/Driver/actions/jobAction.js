// import {
//     LOAD_JOB_REQUEST,
//     LOAD_JOB_SUCCESS,
//     LOAD_JOB_FAIL,

//     LOAD_JOB_LOCATION_REQUEST,
//     LOAD_JOB_LOCATION_SUCCESS,
//     LOAD_JOB_LOCATION_FAIL,

//     LOAD_ALL_JOBS_REQUEST,
//     LOAD_ALL_JOBS_SUCCESS,
//     LOAD_ALL_JOBS_FAIL,

//     LOAD_ALL_JOBSDONE_REQUEST,
//     LOAD_ALL_JOBSDONE_SUCCESS,
//     LOAD_ALL_JOBSDONE_FAIL,

//     CLEAR_ERRORS,
// } from "../constants/jobConstants";
// import axios from "axios";
// import Constants from 'expo-constants';
// const url = Constants.expoConfig.extra.env;

// export const getAllJobs = () => async (dispatch) => {    
//     try{
//         dispatch({type: LOAD_ALL_JOBS_REQUEST });
//         const response = await axios.get( url + `/Job/getalljobs`);
//         if(response.data.status === 'ok'){
//        // console.log('in jobaction response.data.jobs===', response.data.jobs.length);
//          return dispatch({type: LOAD_ALL_JOBS_SUCCESS, payload: response.data.jobs });
//         } 
//         dispatch({type: LOAD_ALL_JOBS_FAIL, payload: response.data.error });
//     }catch (e) {
//        console.log(e);
//     }
// }

// export const getalljobsdonebydriver = (driverid) => async (dispatch) => {
//     //console.log('getalljobs action===', driverid);
//     try{
//         dispatch({type: LOAD_ALL_JOBSDONE_REQUEST });

//         const response = await axios.get( url + `/Job/getalljobsdonebydriver?driverid=${driverid}`);

//         if(response.data.status === 'ok'){
//           //  console.log('in jobaction response.data.jobs===', response.data.jobs[0]);
//         return dispatch({type: LOAD_ALL_JOBSDONE_SUCCESS, payload: response.data.jobs });
//         } 
//         dispatch({type: LOAD_ALL_JOBSDONE_FAIL, payload: response.data.error });
//     }catch (e) {
//        console.log(e);
//     }
// }

// export const blueScreenJob = () => async (dispatch) => {
//     try{
//        // dispatch({type:LOAD_ALL_JOBS_FAIL});
//     } catch (e) {
//         console.log(e);
//     }
// }

// export const jobStatus = (jobstatus, time, jobId) => async (dispatch) => {
//     console.log('jobaction jobstatus====', jobstatus, time, jobId);
//     try{
//         await axios.put( url + `/Job/jobStatus?id=${jobId}`, { jobstatus, time });
//     } catch (e) {
//         console.log(e);
//     }
// }