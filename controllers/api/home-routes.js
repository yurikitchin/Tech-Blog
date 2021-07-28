const { User } = require('../../models');
const Post = require('../../models/Post');

const router = require('express').Router()
//require models when they have been created
//const { modelName1, Modelname2, modelname 3 } = require("../models")


// ================= Login/signup =======================
// router.get("/", (req, res) => {
//     try {
//         res.render("homepage", {
//             loggedIn: req.session.loggedIn, 
//         });
//     } catch (err) {
//         console.error(err.message)
//     }
// })

//=================== Homepage ======================
router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll()
        console.log("AAAAAAAAAAAAAA Post Data AAAAAAAAAAAAAAAAAAA",postData)
        const renderPosts = postData.map((posts) => 
        posts.get({ plain: true}))

        console.log("BBBBBBBBBBBBBBBBb renderPosts BBBBBBBBBBBb", renderPosts)
        res.render("homepage", {
            renderPosts,
            loggedIn: req.session.loggedIn,
            username: req.session.username, 
        });
    } catch (err) {
        console.error(err.message)
    }
})

//======================== View Single post and Comments ========================//
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: Comment
        });

    } catch (err) {
        console.error(err.message)
    }
})


module.exports = router;