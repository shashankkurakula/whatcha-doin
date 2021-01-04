import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//Redux
import { connect } from 'react-redux';
import { logout } from 'actions/auth';

const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
  const authLinks = (
    <div
      className='collapse navbar-collapse navbar-fixed'
      id='navbarTogglerDemo02'
    >
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <Link className='nav-link' to={'/schedules'}>
            Schedules
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to={'/jira'}>
            Jira
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to={'/profiles'}>
            Profiles
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to={'/dashboard'}>
            Dashboard
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link ' onClick={logout} to={'/'}>
            {/* <i className='fas fa-sign-out-alt'> */}
            Logout
            {/* <span className='hide-sm'>Logout</span> */}
            {/* </i> */}
          </Link>
        </li>
      </ul>
    </div>
  );

  const guestLinks = (
    <div className='collapse navbar-collapse' id='navbarTogglerDemo02'>
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <Link className='nav-link' to={'/profiles'}>
            Profiles
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to={'/login'}>
            Login
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to={'/register'}>
            Register
          </Link>
        </li>
      </ul>
    </div>
  );

  return (
    <nav className='navbar navbar-expand-lg navbar-light '>
      <div className='container'>
        <Link className='navbar-brand' to={'/'}>
          What'cha Doin?
        </Link>

        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
