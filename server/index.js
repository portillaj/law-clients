const restify = require('restify');
const config = require('./config');
const mongoose = require('mongoose');

const server = restify.createServer();

//Middleware
server.use(restify.plugins.bodyParser());

server.listen(config.PORT, () => {
  mongoose.set('useFindAndModify', false);
  mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });
});

const db = mongoose.connection;

db.on('error', (err) => console.log(err));

db.once('open', () => {
  require('./routes/clients')(server);
  require('./routes/users')(server);
  console.log(`Server started on port ${config.PORT}`);
});