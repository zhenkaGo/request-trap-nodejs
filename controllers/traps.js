const Trap = require('../models/Trap');

const routeTrap = async (req, res) => {
  try {
    const {
      headers,
      body,
      method,
      ip,
      cookies,
      query,
      params,
      protocol,
      path,
    } = req;
    const trap = new Trap({
      method,
      ip,
      protocol,
      path,
      cookies: cookies || {},
      headers: JSON.stringify(headers),
      body: JSON.stringify(body),
      query: JSON.stringify(query),
      params: JSON.stringify(params),
      trapId: params.trapId,
      createdAt: new Date(),
    });
    await trap.save();
    res.send('This request has been capture');
  } catch (err) {
    res.send('This request has not been capture. You have some error');
  }
};

const getRequests = async (req, res) => {
  const { params } = req;
  const requests = await Trap.find({ trapId: params.trapId }).sort({ createdAt: -1 });
  res.render('traps/requests', { requests });
};

module.exports = { routeTrap, getRequests };
