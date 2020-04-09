const { logger } = require('../helpers/logger');
const Trap = require('../models/Trap');

const getTrap = (req, res) => {
  const {
    headers,
    body,
    method,
    ip,
    cookies,
    query,
    params,
    protocol,
  } = req;
  const trap = new Trap({
    headers,
    body,
    method,
    ip,
    cookies,
    query,
    params,
    protocol,
    trap_id: params.trap_id,
  });
  logger.info(req.params);
  res.send('success');
};

module.exports = { getTrap };
