const restify = require('restify');
const config = require('./config');
const mongoose = require('mongoose');

const server = restify.createServer();

server.listen(config.PORT, (req, res) => {
  console.log(`Server listening on PORT ${config.PORT}`);
});