"use strict";

/** Express app for jobly. */

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const companiesRoutes = require("./routes/companies");
const usersRoutes = require("./routes/users");
const jobsRoutes = require("./routes/jobs");

//morgan: HTTP request logger middleware for Node.js.
const morgan = require("morgan");

//create express app
const app = express();
//cross origin resource sharing (cors)

app.use(cors());
//app.use(express.json()): Parses incoming JSON requests and makes the resulting data available in req.body.
app.use(express.json());
//app.use(morgan("tiny")): Logs HTTP requests in a concise format ("tiny" version).
app.use(morgan("tiny"));
//app.use(authenticateJWT): Applies JWT authentication middleware to verify and decode JWT tokens for protected routes.
app.use(authenticateJWT);

app.use("/auth", authRoutes);
app.use("/companies", companiesRoutes);
app.use("/users", usersRoutes);
app.use("/jobs", jobsRoutes);


/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
