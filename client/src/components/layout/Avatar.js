import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  img: {
    width: '25px',
    height: '25px',
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: '50px',
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
export default function ImageAvatars({ avatar, name, size }) {
  // console.log(size);
  let classes = useStyles();
  let styles = { width: '40px', height: '40px' };
  if (size === 'medium') {
    size = classes.small;
    styles = { width: '60px', height: '60px' };
  } else if (size === 'large') {
    size = classes.large;
    styles = { width: '100px', height: '100px' };
  }
  return (
    <div className={size} style={styles}>
      <Avatar alt={name} src={avatar} style={styles} />
    </div>
  );
}
