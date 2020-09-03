const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts")
const userRoutes = require("./routes/user")

const app = express();

// NOTE: If cyclic dependency error detected then remove ?retryWrites=true&w=majority
// Deleted username:password
const mongooseConnectTo = "mongodb+srv://**DELETED_PAT_09/03/2020**:**DELETED_PAT_09/03/2020**@cluster0-ge8n0.mongodb.net/node-angular?retryWrites=true&w=majority";
console.log(mongooseConnectTo);
const mongooseConnectTo2 = "mongodb+srv://"
  + process.env.MONGO_ATLAS_USERNAME
  + ":" + process.env.MONGO_ATLAS_PW   + "@cluster0-ge8n0.mongodb.net/node-angular?retryWrites=true&w=majority";
console.log(mongooseConnectTo2);
mongoose.connect(
  mongooseConnectTo
  )
// mongoose.connect(
//
//   )

.then(() => {
  console.log('Connect to database!')
})
.catch(() => {
  console.log('Connection Failed')
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false})); // Not used in code, but showing what parser is able to do.
// app.use("/images", express.static(path.join("backend/images")));
app.use("/images", express.static(path.join("images")));

// Resolve DEV CORS error.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");  // Which domains allowed
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
  next();
})

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;

