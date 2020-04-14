const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const websockets = require('./websockets');
const { logger } = require('./helpers/logger');


const PORT = process.env.PORT;

async function start() {
  try {
    app.set('port', PORT);

    const server = http.createServer(app);

    websockets(server);

    server.listen(PORT, (err) => {
      if (err) {
        logger.error('Server error', err.message);
      } else {
        logger.info('Server success started');
      }
    });
  } catch (err) {
    logger.error('Server error', err.message);
    process.exit(1);
  }
}

start();

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.error('Mongoose connection disconnected');
    process.exit(0);
  });
});
