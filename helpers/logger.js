const winston = require('winston');

const consoleTransport = new winston.transports.Console({
  level: 'debug',
  dumpExceptions: true,
  showStack: true,
  colorize: true,
});

const logger = winston.createLogger({
  transports: [consoleTransport],
  exceptionHandlers: [consoleTransport],
});

logger.silent = process.env.NODE_ENV === 'test';

const requestLoggerMeta = (req) => [
  `[${req.protocol}] [${req.method}]: ${req.url}`, {
    query: req.query,
    body: req.body,
  },
];


module.exports = {
  logger,
  errorLoggerMiddleware: (req, res, next) => {
    logger.error(requestLoggerMeta(req));
    next();
  },
};
