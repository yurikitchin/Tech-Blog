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

module.exports = router;
