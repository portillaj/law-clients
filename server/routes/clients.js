const errors = require('restify-errors');
const Client = require('../models/Clients');
const rjwt = require('restify-jwt-community');
const config = require('../config');

module.exports = server => {
  //Get all clients from client list
  server.get('/clients', async (req, res, next) => {
    try {
      const clients = await Client.find({});
      res.send(clients);
      next();
    } catch(err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  //Get Client in Client list
  server.get('/clients/:id', rjwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
    try {
      const client = await Client.findById(req.params.id);
      res.send(client);
      next();
    } catch(err) {
      return next(new errors.ResourceNotFoundError(
        `There is no client with the id of ${req.params.id}`));
    }
  });

  //ADD CLIENT TO CLIENT LIST
  server.post('/clients', rjwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
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

    //EDIT CLIENT IN CLIENT LIST
    server.put('/clients/:id', rjwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
      if(!req.is('application/json')) {
        return next(new errors.InvalidContentError("Expects 'application/json'"));
      }

      try{
        const client = await Client.findOneAndUpdate({ _id: req.params.id }, req.body );
        res.send(client);
        next();
      } catch(err) {
        return next(new errors.ResourceNotFoundError(
          `There is no client with the id of ${req.params.id}`));
      }
    });

    //Delete Client in Client List
    server.del('/clients/:id', rjwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
      try {
        const client = await Client.findByIdAndDelete({ _id: req.params.id });
        res.send(204);
        next();
      } catch(err) {
        return next(new errors.ResourceNotFoundError(
          `There is no customer with the id of ${req.params.id}`));
      }
    });
};