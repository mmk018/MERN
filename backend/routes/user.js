const express = require("express");
const router = express.Router();
const User = require("../Model/UserModel");
const bcrypt = require("bcrypt");

const jwtIssuer = require("../utils/jwtIssuer");

router.get("/", (req, res) => {
  res.send("INside user route");
});

router.post("/register2", async (req, res) => {
  console.log(req.body);

  /* User.findOne({ email: req.body.email })
    .then((data) => {
      if (data) {
        res.send("This email is already in use");
      } else {
        const { name, email, password } = req.body;
        let hashedPassword=
        await bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            console.log(err, "hashing problem in bcrypt");
          } else {
            console.log(hash);
            hashedPassword = hash;
          }
        });
        const clearData = {
          name: name,
          email: email,
          hash: hashedPassword,
        };
        console.log(clearData);

        // const newUser = new User(req.body);
        // newUser
        //   .save()
        //   .then(() => {
        //     console.log("user saved");
        //     res.status(200).send("User registered");
        //   })
        //   .catch((err) => {});
      }
    })
    .catch((err) => {
      console.log("user is not registered, because of error", err);

      res.status(400).send("user is not registered, because of error", err);
    }); */
});

///////////////Franco

router.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
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
    });
    console.log("user saved");
    res.status(200).send({ success: true, message: "User registered" });
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
});

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
        throw "Password is not Correct";
      }
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
});

module.exports = router;
