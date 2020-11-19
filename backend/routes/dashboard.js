const router = require("express").Router();
const passport = require("passport");
const User = require("../Model/UserModel");
///Read
router.get(
  "/view",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("after passport ", req.user);

    res.send(req.user);
  }
);
//Update
router.post(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.user.id;
    console.log(id);
    ////////////

    const { name, email, dateOfBirth, telephone } = req.body;

    //////////

    User.findByIdAndUpdate(
      id,
      { name, email, dateOfBirth, telephone },
      function (err, result) {
        if (err) {
          res.status(400).send(err);
          throw err;
        } else {
          res.send(result);
        }
      }
    );
  }
);
//Delete
router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.user.id;
    User.findByIdAndDelete(id, function (err) {
      if (err) {
        res.status(400).send(`user ${id} is not  deleted`);
      } else {
        res.status(200).send(`user ${id} is succesfull deleted`);
      }
    });
  }
);
module.exports = router;
