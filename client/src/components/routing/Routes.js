import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from 'components/routing/PrivateRoute';
import Login from 'components/auth/Login';
import Register from 'components/auth/Register';
import Alerts from 'components/layout/Alerts';
import MyProfile from 'components/profile/MyProfile';
import ProfileForm from 'components/profile/ProfileForm';
import Profiles from 'components/profiles/Profiles';
import Profile from 'components/profile/Profile';
import Jira from 'components/jira/Jira';
import Schedules from 'components/schedules';

const Routes = (props) => {
  return (
    <section className='container'>
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/my-profile' component={MyProfile} />
        <PrivateRoute exact path='/profile-form' component={ProfileForm} />
        <PrivateRoute exact path='/jira' component={Jira} />
        <PrivateRoute exact path='/schedules' component={Schedules} />
      </Switch>
      <Alerts />
    </section>
  );
};

export default Routes;
