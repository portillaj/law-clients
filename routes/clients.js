const errors = require('restify-errors');
const Client = require('../models/Clients');
const rjwt = require('restify-jwt-community');
const config = require('../config');

module.exports = server => {
  server.get('/clients', async (req, res, next) => {
    try {
      const clients = await Client.find({});
      res.send(clients);
      next();
    } catch(err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  server.get('/clients/:id', async (req, res, next) => {
    try {
      const client = await Client.findById(req.params.id);
      res.send(client);
      next();
    } catch(err) {
      return next(new errors.ResourceNotFoundError(
        `There is no client with the id of ${req.params.id}`));
    }
  });

  server.post('/clients', async (req, res, next) => {
    if(!req.is('application/json')) {
      return next(new errors.InvalidContentError("Expects 'application/json'"));
    }

    const { firstName, lastName, middleName, suffix, dob,
      address: { city, state, zip }, primaryPhone, secondaryPhone,
    email } = req.body;

    const client = new Client({
      firstName, lastName, middleName, suffix, dob, address: {
        city, state, zip }, primaryPhone, secondaryPhone
      });

      try {
        const newClient = await client.save();
        res.send(201);
        next();
      } catch(err) {
        return next(new errors.InternalError(err));    
      }
    });
};