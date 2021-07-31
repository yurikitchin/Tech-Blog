const router = require("express").Router();
const { User } = require("../../models");
const { format_date } = require("../../utils/helpers");
require("dotenv").config();

//create new user
router.post("/users", async (req, res) => {
  try {
     const userData = await User.create({
      userName: req.body.userName,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = userData.id;
      req.session.userName = userData.useName

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const UserData = await User.findOne({
      where: { userName: req.body.userName },
    });

    if (!UserData) {
      res
        .status(400)
        .json({ message: "incorrect email or password. please try again" });
      return;
    }
    const validPassword = await UserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "incorrect email or password. please try again" });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = UserData.id;
      req.session.userName = UserData.userName
      console.log("user logged in", req.session.userId);

      res
        .status(200)
        .json({ user: UserData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;

//Log Out
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
