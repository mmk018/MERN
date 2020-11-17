const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const cors = require("cors");

require("dotenv").config();
const User = require("./Model/UserModel");
const router = require("./routes/user");
const dashboard = require("./routes/dashboard");
const myStrategy = require("./config/passport-jwt");
const cookieParser = require("cookie-parser");

///Configs and middleware

const app = express();
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
passport.use(myStrategy);

app.use(express.json());

app.use(passport.initialize());
app.use("/user", router);
app.use("/dashboard", dashboard);

//MOngoose Connection

mongoose.set("useFindAndModify", false);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connection ok");
  })
  .catch((err) => {
    console.log("connection failed", err);
  });

/////

////Routing

/* app.get("/user", (req, res) => {
  res.redirect('"./routes/user"');
}); */

app.get(
  "/dashboard",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("ok");
  }
);

app.listen(3002, () => {
  console.log("the server started at 3002", process.env.DB_USER);
});

///second test
