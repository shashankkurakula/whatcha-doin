import { GET_JIRA } from 'actions/types';

const initialState = {
  items: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_JIRA:
      return {
        ...state,
        items: payload,
        loading: false,
      };

    default:
      return state;
  }
}
