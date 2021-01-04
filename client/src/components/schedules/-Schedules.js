//React
import PropTypes from 'prop-types';
import React, { Fragment, useState, useEffect } from 'react';
import moment from 'moment';

import Spinner from 'components/layout/Spinner';

//Redux
import { connect } from 'react-redux';
import { getSchedules } from 'actions/schedule';

//Material-UI
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';

const Schedules = ({
  getSchedules,
  auth: { user, isAuthenticated },
  schedule: { schedules, loading },
}) => {
  useEffect(() => {
    getSchedules();
  }, [getSchedules]);

  schedules.length && console.log(schedules);
  return loading ? (
    <Spinner />
  ) : (
    <Grid container spacing={1}>
      <Grid container item xs={12} spacing={2}>
        {isAuthenticated &&
          schedules &&
          schedules.length &&
          schedules.map((schedule) => (
            <Grid item xs={4} key={schedule.key}>
              <RecipeReviewCard schedule={schedule} />
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};

Schedules.propTypes = {
  getSchedules: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  schedule: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  schedule: state.schedule,
});

export default connect(mapStateToProps, { getSchedules })(Schedules);

function RecipeReviewCard({ schedule }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label='recipe'
            className={classes.avatar}
            src={schedule.reporterAvatar}
          ></Avatar>
        }
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={schedule.reporterName}
        subheader={moment(schedule.createdDate).fromNow()}
      />
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {schedule.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>{schedule.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
