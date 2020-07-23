const { User } = require('../models/user');

let pointsCheck = (req, res, next) => {
  User.findOne({ points: req.body.points }, (err, user) => {
    if (user && user.points > req.body.points) {
      return res.send(`Not enough points! You have ${user.points} left!`);
    }
    next();
  });
};

module.exports = { pointsCheck };
