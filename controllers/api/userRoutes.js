const router = require("express").Router();
const { User } = require("../../models");
require("dotenv").config();

//new user
router.post("/users", async (req, res) => {
  try {
    const exisitingUsers = await User.findOne({
      where: { userName: req.body.userName },
    });

    const userData = await User.create({
      userName: req.body.userName,
      password: req.body.password,
    });
    console.log("this is the existing users", exisitingUsers);
    console.log("this is user data", userData);
    if (exisitingUsers.userName === userData.userName) {
      let err = "User name already exists, please try new user name";
      console.log(err);
      res.status(500).json(err);
    } else {
      req.session.save(() => {
        req.session.loggedIn = true;

        res.status(200).json(userData);
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//login
router.post("/users/login", async (req, res) => {
  try {
    const UserData = await User.findOne({ where: {userName: req.body.userName} })

    if (!UserData) {
      res.status(400).json({ message: "incorrect email or password. please try again"})
      return
    }
    const validPassword = await UserData.checkPassword(req.body.password)

    if (!validPassword) {
      res.status(400).json({ message: "incorrect email or password. please try again"})
      return
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      console.log("user logged in");

      res.status(200).json({ user: UserData, message: "You are now logged in!" });
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})
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
