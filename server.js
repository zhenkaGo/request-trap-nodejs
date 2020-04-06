const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || '3000';

async function start() {
  try {
    await mongoose.connect('mongodb+srv://admin:qwertqwert@cluster0-lqcpf.mongodb.net/app?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.set('port', PORT);

    const server = http.createServer(app);

    server.listen(PORT, (err) => {
      if (err) {
        console.error('Server error', err.message);
      } else {
        console.log('Server success started');
      }
    });
  } catch (err) {
    console.error('Server error', err.message);
    process.exit(1);
  }
}

start();

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.error('Mongoose connection disconnected');
    process.exit(0);
  });
});
