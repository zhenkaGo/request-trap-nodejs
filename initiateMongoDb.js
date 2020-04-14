const mongoose = require('mongoose');
const { logger } = require('./helpers/logger');

module.exports = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    logger.info(`Successfully connected to ${process.env.DB_URI}`);
  } catch (err) {
    logger.error(`Connect failed to database: ${process.env.DB_URI} (${err})`);
  }
};
