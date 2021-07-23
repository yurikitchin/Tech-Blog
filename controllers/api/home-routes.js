const router = require('express').Router()
//require models when they have been created
//const { modelName1, Modelname2, modelname 3 } = require("../models")


// ================= Login/signup =======================
router.get("/", (req, res) => {
    try {
        res.render("login", {
            loggedIn: req.session.loggedIn, 
        });
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router;

//=================== Homepage ======================