import axios from 'axios';

import { setAlert } from './alert';
import {
  GET_SCHEDULE,
  GET_SCHEDULES,
  CREATE_SCHEDULE,
  UPDATE_SCHEDULE,
  DELETE_SCHEDULE,
  SCHEDULE_ERROR,
} from './types';

export const createSchedule = (formData, edit = false) => async (dispatch) => {
  try {
    const res = await axios.post('/api/schedule', formData);
    dispatch({
      type: CREATE_SCHEDULE,
      payload: res.data,
    });
    dispatch(setAlert('Schedule Created', 'success'));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
  }
};

export const updateSchedule = (scheduleId) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/schedule/${scheduleId}`);
    dispatch({
      type: UPDATE_SCHEDULE,
      payload: res.data,
    });
    dispatch(setAlert('Schedule Updated', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
    dispatch({
      type: SCHEDULE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getSchedules = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/schedule');
    dispatch({
      type: GET_SCHEDULES,
      payload: res.data,
    });
    dispatch(setAlert('getting all Schedules', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
    dispatch({
      type: SCHEDULE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getScheduleById = (scheduleId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/schedule/${scheduleId}`);
    dispatch({
      type: GET_SCHEDULE,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
    dispatch({
      type: SCHEDULE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const deleteSchedule = (scheduleId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/schedule/${scheduleId}`);
    dispatch({
      type: DELETE_SCHEDULE,
      payload: scheduleId,
    });
    dispatch(setAlert('Schedule Deleted', 'sucess'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
    dispatch({
      type: SCHEDULE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
