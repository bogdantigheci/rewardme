const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const moment = require('moment');
const cors = require('cors');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();
mongoose.Promise = global.Promise;
mongoose.connect(`${process.env.MONGODB_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(passport.initialize());
require('./middleware/passport')(passport);

const { pointsCheck } = require('./middleware/pointsCheck');
const { validateRegisterInput } = require('./middleware/register');
const { validateLoginInput } = require('./middleware/login');

const { sendEmail } = require('./utils/mail/index');

const { User } = require('./models/user');
const { Company } = require('./models/company');

app.use(express.static('client/build'));

app.post('/api/users/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' });
    } else {
      const newUser = new User(req.body);
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => res.json(err));
        });
      });
    }
  });
});

app.post('/api/users/register_admin', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' });
    } else {
      const newUser = new User({ ...req.body, role: 1 });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => res.json(err));
        });
      });
    }
    // else {
    //   return res
    //     .status(400)
    //     .json({ noRights: 'You are not allowed. Please contact the owner.' });
    // }
  });
});

app.post('/api/users/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ emailnotfound: 'Email not found' });
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
        };
        jwt.sign(
          payload,
          process.env.SECRET,
          {
            expiresIn: 31556926,
          },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: 'Password incorrect' });
      }
    });
  });
});

app.get('/api/users/logout', (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

app.post('/api/users/give_points/', (req, res) => {
  const history = [];
  history.push({
    date: Date.now(),
    quantity: req.body.points,
    user: mongoose.Types.ObjectId(req.user._id),
    firstname: req.user.firstname,
    lastname: req.user.lastname,
  });

  User.findOneAndUpdate(
    { _id: req.body.id },
    {
      $inc: { bonusPoints: req.body.points },
      $push: { history: history },
    },
    { new: true },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send(doc);
    }
  );
});

app.post('/api/users/take_points/', (req, res) => {
  const history = [];
  history.push({
    date: Date.now(),
    quantity: req.body.points,
    user: mongoose.Types.ObjectId(req.user._id),
    firstname: req.user.firstname,
    lastname: req.user.lastname,
  });
  if (req.user.points >= req.body.points) {
    User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $inc: { points: -req.body.points },
        $push: { history: history },
      },
      { new: true },
      (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send(doc);
      }
    );
  } else {
    res
      .status(400)
      .send({ error: `Not enough points! You have ${req.user.points} left` });
  }
});

app.get('/api/users/history', (req, res) => {
  User.find({}, (err, users) => {
    let completeHistory = [];
    if (err) return res.status(400).send(err);
    users.forEach((user) => {
      completeHistory.push(user.history);
    });
    res.status(200).send({ completeHistory });
  });
});

app.get('/api/users/all_users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(400).send(err);

    res.status(200).send({ ...users });
  });
});

app.post('/api/company/add_company', (req, res) => {
  const company = new Company(req.body);

  company.save((err, doc) => {
    if (err) return res.json({ success: false, err });

    res.status(200).json({
      success: true,
      company: doc,
    });
  });
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
