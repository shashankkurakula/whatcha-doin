import React from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function Sidebar() {
  const classes = useStyles();
  const [state, setState] = React.useState(false);

  const toggleDrawer = () => (event) => {
    // if (
    //   (event && event.type === 'keydown' && event.key === 'Tab') ||
    //   event.key === 'Shift'
    // ) {
    //   return;
    // }

    setState(!state);
  };
  const list = () => (
    <div
      className={clsx(classes.list)}
      role='presentation'
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
    >
      <List>
        <ListItem button>
          <Link className='nav-link' to={'/schedules'}>
            Schedules
          </Link>
        </ListItem>
        <ListItem button>
          <Link className='nav-link' to={'/jira'}>
            Jira
          </Link>
        </ListItem>
        <ListItem button>
          <Link className='nav-link' to={'/profiles'}>
            Profiles
          </Link>
        </ListItem>
        <ListItem button>
          <Link className='nav-link' to={'/dashboard'}>
            Dashboard
          </Link>
        </ListItem>
        {/* <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem> */}
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      {
        <React.Fragment>
          <MenuIcon onClick={toggleDrawer()} />
          <SwipeableDrawer
            open={state}
            onClose={toggleDrawer()}
            onOpen={toggleDrawer()}
          >
            {list('left')}
          </SwipeableDrawer>
        </React.Fragment>
      }
    </div>
  );
}
