import {
  GET_SCHEDULE,
  GET_SCHEDULES,
  CREATE_SCHEDULE,
  UPDATE_SCHEDULE,
  DELETE_SCHEDULE,
  SCHEDULE_ERROR,
} from 'actions/types';

const initialState = {
  schedule: null,
  schedules: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_SCHEDULE:
    case UPDATE_SCHEDULE:
      return {
        ...state,
        schedule: payload,
        loading: false,
      };
    case GET_SCHEDULE:
      return {
        ...state,
        schedule: payload,
        loading: false,
      };
    case GET_SCHEDULES:
      return {
        ...state,
        schedules: payload,
        loading: false,
      };
    case DELETE_SCHEDULE:
      return {
        ...state,
        schedules: state.schedules.filter(
          (schedule) => schedule._id !== payload
        ),
        loading: false,
      };

    default:
      return state;
  }
}
