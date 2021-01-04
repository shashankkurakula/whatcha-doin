const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Schedule = require('../../models/Schedule');

//@route  GET api/schedule
//@desc  GET all Schedules
//@access Private
router.get('/', auth, async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.json(schedules);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  GET api/schedule/:id
//@desc  GET schedule by ID
//@access Private
router.get('/:id', checkObjectId('id'), auth, async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    res.json(schedule);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  DELETE api/schedule/:id
//@desc  DELETE schedule by ID
//@access Private
router.delete('/:id', checkObjectId('id'), auth, async (req, res) => {
  try {
    Schedule.findByIdAndDelete(req.params.id);
    res.json('Schedule deleted successfully');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  POST api/schedules
//@desc  Create a Schedule
//@access Private
router.post(
  '/',
  [
    auth,
    [check('assignee', 'Assignee is required').not().isEmpty()],
    [check('key', 'Key is required').not().isEmpty()],
    [check('title', 'Title is required').not().isEmpty()],
    [check('type', 'Type is required').not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let {
        assignee,
        key,
        title,
        description,
        type,
        status,
        resolution,
        created,
        due,
      } = req.body;

      const reporter = await User.findById(req.user.id).select('-password');

      assignee = await User.findOne({
        email: assignee,
      }).select('-password');
      if (!assignee) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Assignee not found' }] });
      }

      const newSchedule = new Schedule({
        assignee,
        assigneeName: assignee.name,
        assigneeAvatar: assignee.avatar,
        reporter: req.user.id,
        reporterName: reporter.name,
        reporterAvatar: reporter.avatar,
        key,
        title,
        description,
        type,
        status,
        resolution,
        created,
        due,
      });

      const schedule = await newSchedule.save();
      res.json(schedule);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');
    }
  }
);

//@route  POST api/schedule/:id
//@desc   update Schedule
//@access Private
router.post(
  '/:id',
  checkObjectId('id'),
  [
    auth,
    [check('assignee', 'Assignee is required').not().isEmpty()],
    [check('key', 'Key is required').not().isEmpty()],
    [check('title', 'Title is required').not().isEmpty()],
    [check('type', 'Type is required').not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let {
        assignee,
        key,
        title,
        description,
        type,
        status,
        resolution,
        created,
        due,
      } = req.body;

      const reporter = await User.findById(req.user.id).select('-password');

      assignee = await User.findOne({
        email: assignee,
      }).select('-password');
      if (!assignee) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Assignee not found' }] });
      }

      let schedule = await Schedule.findById(req.params.id);
      if (!schedule) {
        return res.status(400).json({ msg: 'schedule not found' });
      }
      const newSchedule = {
        assignee,
        assigneeName: assignee.name,
        assigneeAvatar: assignee.avatar,
        reporter: req.user.id,
        reporterName: reporter.name,
        reporterAvatar: reporter.avatar,
        key,
        title,
        description,
        type,
        status,
        resolution,
        created,
        due,
      };
      if (schedule) {
        schedule = await Schedule.findOneAndUpdate(
          req.params.id,
          { $set: newSchedule },
          { new: false, upsert: true }
        );
      }

      // const schedule = await newSchedule.save();
      res.json(schedule);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');
    }
  }
);

module.exports = router;
