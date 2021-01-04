const User = require('../models/User');

const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');

  if (user.role != 'admin')
    return res.status(403).send('Access Denied, not admin');
  next();
};

const isManager = async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');

  if (user.role != 'manager' && user.role != 'admin')
    return res.status(403).send('Access Denied, not manager');
  next();
};

const isUser = async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');

  if (!(user.role == 'user' || user.role == 'manager' || user.role == 'admin'))
    return res.status(403).send('Access Denied');
  next();
};

module.exports = { isManager, isAdmin, isUser };
