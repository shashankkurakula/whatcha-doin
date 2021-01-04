import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import MyProfile from 'components/profile/MyProfile';
import Avatar from './Avatar';
import Sidebar from './Sidebar';

//Redux
import { connect } from 'react-redux';
import { logout } from 'actions/auth';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';

const Navbar = ({ logout, auth: { isAuthenticated, loading, user } }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const authLinks = (
    <div>
      <IconButton
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={handleMenu}
        color='inherit'
      >
        {user && <Avatar avatar={(user.name, user.avatar)} />}
      </IconButton>

      <Menu
        id='menu-appbar'
        style={{
          marginTop: '40px',
        }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        // onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem>
          <Link className='nav-link' to={'/my-profile'}>
            Profile
          </Link>
        </MenuItem>
        <MenuItem>
          <Link className='nav-link ' onClick={logout} to={'/'}>
            Logout
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );

  // const guestLinks = (
  //   <div className='collapse navbar-collapse'>
  //     <ul className='navbar-nav ml-auto'>
  //       <li className='nav-item'>
  //         <Link className='nav-link' to={'/profiles'}>
  //           Profiles
  //         </Link>
  //       </li>
  //       <li className='nav-item'>
  //         <Link className='nav-link' to={'/login'}>
  //           Login
  //         </Link>
  //       </li>
  //       <li className='nav-item'>
  //         <Link className='nav-link' to={'/register'}>
  //           Register
  //         </Link>
  //       </li>
  //     </ul>
  //   </div>
  // );

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          {!loading && isAuthenticated && (
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
            >
              <Sidebar />
            </IconButton>
          )}
          <Typography variant='h6' className={classes.title}>
            <Link to='/'>What'cha Doin?</Link>
          </Typography>
          {!loading && isAuthenticated && authLinks}
          {/* {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )} */}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
