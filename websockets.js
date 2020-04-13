const WebSocket = require('ws');
const Trap = require('./models/Trap');

module.exports = (server) => {
  const wss = new WebSocket.Server({ server });
  wss.on('connection', (ws) => {
    Trap.watch().on('change', (data) => {
      ws.send(JSON.stringify(data));
    });
  });
};
