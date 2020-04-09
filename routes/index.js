const traps = require('./traps');

module.exports = (app) => {
  app.use('/', traps);
};
