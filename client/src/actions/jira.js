import axios from 'axios';
import { setAlert } from './alert';

import { GET_JIRA } from './types';

export const getJira = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/jira');
    dispatch({
      type: GET_JIRA,
      payload: res.data,
    });
  } catch (error) {
    let errors = '';
    error.response.data.errors
      ? (errors = error.response.data.errors)
      : (errors = error.response.statusText + ' (Jira)');
    if (Array.isArray(errors)) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    } else {
      dispatch(setAlert(errors, 'error'));
    }
  }
};

// const body = JSON.stringify({ url });
// const url =
//   'https://jira.dev.e2open.com/jira/rest/api/2/search?jql=assignee+%3D+skurakula+AND+resolution+%3D+Unresolved';
// const config = {
//   headers: {
//     'Content-Type': 'application/json',
//   },
// };

// , {
//   params: {
//     url:
//       'https://jira.dev.e2open.com/jira/rest/api/2/search?jql=assignee+%3D+skurakula+AND+resolution+%3D+Unresolved',
//   },
// }
