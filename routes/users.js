const errors = require('restify-errors');
const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../auth');
const config = require('../config');

module.exports = server => {
  server.post('/register', (req, res, next) => {
    const { email, password } = req.body;

    const user = new User({
      email,
      password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, async (err, hash) => {
        user.password = hash;
        try {
          const newUser = await user.save();
          res.send(201);
          next();
        } catch(err) {
          return next(new errors.InternalError(err.message));
        }
      });
    });
  });

  //Auth User
  server.post('/auth', async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await auth.authenticate(email, password);
      console.log('the user ', user);
      const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
        expiresIn: '15m'
      });
      console.log('the user', user);
      console.log('token', token);
      const { iat, exp } = jwt.decode(token);
      res.send({ iat, exp, token });
      next();
    } catch(err) {
      return next(new errors.UnauthorizedError(err));
    }
  });
};