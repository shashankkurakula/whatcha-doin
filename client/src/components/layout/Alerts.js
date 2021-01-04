//React
import React from 'react';
import PropTypes from 'prop-types';

//Material-UI
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

//Redux
import { connect } from 'react-redux';

const Alerts = ({ alerts }) => {
  const classes = useStyles();
  return (
    alerts != null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <Snackbar key={alert.id} className={classes.root} open={true}>
        <Alert
          variant='filled'
          severity={alert.alertType ? alert.alertType : 'info'}
        >
          {alert.msg}
        </Alert>
      </Snackbar>
    ))
  );
};

// Alert.propTypes = {
//   alerts: PropTypes.array.isRequired,
// };

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alerts);
