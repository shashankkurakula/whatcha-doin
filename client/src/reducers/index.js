import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import profile from './profile';
import jira from './jira';
import schedule from './schedule';

export default combineReducers({ alert, auth, profile, jira, schedule });
