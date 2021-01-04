const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const { isAdmin, isManager } = require('../../middleware/roles');
const checkObjectId = require('../../middleware/checkObjectId');
const Team = require('../../models/Team');
const User = require('../../models/User');

// @route    GET api/team
// @desc     get all teams
// @access   private

router.get('/', auth, async (req, res) => {
  try {
    const teams = await Team.find().populate('team');
    res.json(teams);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route    GET api/team/:id
// @desc     get team by id
// @access   private

router.get('/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('team');
    res.json(team);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/profile
// @desc     create team
// @access   private, admin, manager only
router.post(
  '/create',
  [auth, isManager, [check('name', 'Team Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { name, members } = req.body;
    try {
      let team = await Team.findOne({ name });
      if (team) {
        return res.status(400).json({
          errors: [{ msg: 'Team already exists, please try with new name' }],
        });
      }

      var _member = '';
      var _members = [];
      for (const member of members) {
        _member = await User.findOne({ email: member });
        _members.push(_member);
      }

      team = new Team({
        name,
        admin: req.user.id,
        members: _members,
      });

      await team.save();

      res.json({ msg: 'Team Created' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    POST api/profile
// @desc     create team
// @access   private, admin, manager only
router.post(
  '/add/:id',
  [
    auth,
    isManager,
    [check('members', 'please add atleast one member ').not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { members } = req.body;
    try {
      let team = await Team.findById(req.params.id);
      if (!team) {
        return res.status(400).json({
          errors: [{ msg: 'not able to find Team' }],
        });
      }

      var _member = '';
      var _members = [];
      for (const member of members) {
        _member = await User.findOne({ email: member });
        _members.push(_member);
      }
      console.log(_members);

      // const updateTeam = {
      //   admin: req.user.id,
      //   members: _members,
      // };

      team = await Team.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { members: _members } },
        { new: false, upsert: true }
      );

      res.json({ msg: 'members added' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
