const cors = require('cors');
const createError = require('http-errors');
const cookieParser = require('cookie-parser')
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const logger = require('morgan');
// const csurf = require('csurf');
const dotenv = require('dotenv');
dotenv.config();
const routes = require('./routes');
const { getUserFromToken } = require('./auth');

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());


// Security Middleware
app.use(cors({ origin: true }));
app.use(helmet({ hsts: false }));
// app.use(csurf({
//   cookie: {
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: process.env.NODE_ENV === 'production',
//     httpOnly: true
//   }
// }));

//JWT check
// app.use(async (req, res, next) => {
//   const token = req.cookies.token;
//   console.log("I'm working, I'm checking the token...")
//   if (!token) return next();

//   console.log("There's a token!")
//   const user = await getUserFromToken(token, res);
//   if (user) req.user = user;
//   else res.clearCookie('token');
//   next();
// });

app.use(routes);

// Serve React Application
// This should come after routes, but before 404 and error handling.
// if (process.env.NODE_ENV === "production") {
app.use(express.static("client/build"));
app.get(/\/(?!api)*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
// }


app.use(function (_req, _res, next) {
  next(createError(404));
});

app.use(function (err, _req, res, _next) {
  res.status(err.status || 500);
  if (err.status === 401) {
    res.set('WWW-Authenticate', 'Bearer');
  }
  res.json({
    message: err.message,
    error: JSON.parse(JSON.stringify(err)),
  });
});

module.exports = app;
