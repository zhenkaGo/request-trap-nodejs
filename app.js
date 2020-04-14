const createError = require('http-errors');
const express = require('express');
const path = require('path');
const sassMiddleware = require('node-sass-middleware');
const errorsHandler = require('./middlewares/errorsHandler');
const { errorLoggerMiddleware } = require('./helpers/logger');
const routes = require('./routes');

require('./initiateMongoDb')();

const PORT = process.env.PORT;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(errorLoggerMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true,
}));
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.set('port', PORT);

app.use(errorsHandler);

module.exports = app;
