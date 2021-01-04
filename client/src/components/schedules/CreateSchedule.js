//React
import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

//Redux
import { connect } from 'react-redux';

import { setAlert } from 'actions/alert';
import { createSchedule } from 'actions/schedule';

//Material-UI
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

let initialState = {
  key: uuidv4(),
  assignee: '',
  title: '',
  description: '',
  type: '',
  due: '',
};

const CreateSchedule = ({ setAlert, createSchedule }) => {
  const classes = useStyles();

  // useEffect(() => {

  // },[])

  let [formData, setFormData] = useState(initialState);

  const assignees = [
    {
      value: 'skurakula',
      label: '$',
    },
    {
      value: 'sallani',
      label: '€',
    },
    {
      value: 'gvissakoti',
      label: '฿',
    },
    {
      value: 'sbandil',
      label: '¥',
    },
  ];
  const scheduleTypes = [
    {
      value: 'Task',
      label: '$',
    },
    {
      value: 'Block time',
      label: '€',
    },
    {
      value: 'others',
      label: '฿',
    },
  ];

  let { assignee, title, description, type, due } = formData;

  let [dueDate, setDue] = useState(new Date(today));

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = () => {
    // e.preventDefault();
    due = dueDate;
    if ((assignee && title && type && due).length === 0) {
      console.log(formData);
      setAlert('Please enter all details', 'error');
    } else {
      createSchedule(formData);
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Fab onClick={handleClickOpen} color='primary' aria-label='add'>
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Create Schedule</DialogTitle>
        <DialogContent>
          <DialogContentText>To Create a schedule do this.</DialogContentText>
          <form
            id='ScheduleForm'
            className={classes.root}
            noValidate
            autoComplete='off'
            onSubmit={onSubmit}
          >
            <div className='form-group'>
              <TextField
                select
                label='Assignee'
                name='assignee'
                value={assignee}
                onChange={onChange}
                // helperText='Assignee'
                fullWidth
              >
                {assignees.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label} {option.value}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                required
                label='Title'
                type='text'
                name='title'
                value={title}
                onChange={onChange}
                fullWidth
              />

              <TextField
                required
                type='text'
                label='Description'
                name='description'
                value={description}
                onChange={onChange}
                fullWidth
              />

              <TextField
                select
                label='Type'
                name='type'
                value={type}
                onChange={onChange}
                // helperText='Type'
                fullWidth
              >
                {scheduleTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label} {option.value}
                  </MenuItem>
                ))}
              </TextField>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify='space-around'>
                  <KeyboardDatePicker
                    disableToolbar
                    // variant='inline'
                    format='dd/MM/yyyy'
                    // margin='normal'
                    id='date-picker-inline'
                    label='Due Date'
                    value={dueDate}
                    onChange={(date) => setDue(date)}
                    fullWidth
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSubmit();
            }}
            color='primary'
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));

export default connect(null, { setAlert, createSchedule })(CreateSchedule);
