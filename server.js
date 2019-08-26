const express = require('express');
const Cabin = require('cabin');
const requestReceived = require('request-received');
const responseTime = require('response-time');
const requestId = require('express-request-id');
// const { Signale } = require('signale');
const pino = require('pino')({
  customLevels: {
    log: 30
  }
});

// const env = process.env.NODE_ENV || 'development';

const app = express();
const cabin = new Cabin({
  // (optional: your free API key from https://cabinjs.com)
  // key: 'YOUR-CABIN-API-KEY',
  axe: {
    logger: pino
  },
  capture: false
});

// adds request received hrtime and date symbols to request object
// (which is used by Cabin internally to add `request.timestamp` to logs
app.use(requestReceived);

// adds `X-Response-Time` header to responses
app.use(responseTime());

// adds or re-uses `X-Request-Id` header
app.use(requestId());

// use the cabin middleware (adds request-based logging and helpers)
app.use(cabin.middleware);

// add your user/session management middleware here (e.g. passport)
// ...

// an example home page route
app.get('/', (req, res) => {
  req.logger.info('visited home page');
  res.send('hello world');
});

// this assumes that you are using passport which
// exposes `req.logout` to log out the logged in user
// app.get('/logout', (req, res) => {
//   req.logger.warn('logged out');
//   req.logout();
//   res.redirect('/');
// });

app.listen(3000, () => {
  cabin.info('app started');
});
