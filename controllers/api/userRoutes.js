const router = require("express").Router();
const { User } = require("../../models");
require("dotenv").config();

//new user
router.post("/users", async (req, res) => {
    try {
      const exisitingUsers = await User.findAll();

      console.log(exisitingUsers)
      
      const userData = await User.create({
        userName: req.body.userName,
        password: req.body.password,
      });
      console.log("line 12 user data aaaaaaaaaaaaaaaaaaaaaa",userData.userName)
      req.session.save(() => {
        req.session.loggedIn = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  module.exports = router