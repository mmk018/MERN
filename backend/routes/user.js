const express = require("express");
const router = express.Router();
const User = require("../Model/UserModel");
const bcrypt = require("bcrypt");

const jwtIssuer = require("../utils/jwtIssuer");

router.get("/", (req, res) => {
  res.send("Inside user route");
});

///////////////Register

router.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, email, password, dateOfBirth } = req.body;
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(12313, user);
    if (user) {
      throw "This email is already in use";
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log({
      name: name,
      email: email,
      hash: hashedPassword,
    });
    await User.create({
      name: name,
      email: email,
      hash: hashedPassword,
      dateOfBirth,
    });
    console.log("user saved");
    res.status(200).send({ success: true, message: "User registered" });
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
});
///Login
router.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const match = await User.findOne({ email: email });
    console.log(match.id);

    if (!match) {
      throw "With this email user is not exist";
    } else {
      const PasswordProof = await bcrypt.compare(password, match.hash);
      console.log(PasswordProof);
      if (PasswordProof) {
        console.log("start jwzissue");

        const token = await jwtIssuer(match);
        console.log(token);

        res
          .cookie("jwt", token, {
            httpOnly: true,
            sameSite: "lax",
          })
          .send({ msg: "cookies sendet" });
      } else {
        res.status(400).send("Password is not correct");
        throw "Password is not Correct";
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
});

module.exports = router;
