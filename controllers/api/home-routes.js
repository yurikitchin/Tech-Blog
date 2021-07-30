const { User } = require('../../models');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment')

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
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['userName']
                }
            ]
        })
        const renderPosts = postData.map((posts) => 
        posts.get({ plain: true}))
        console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",renderPosts[0].datePosted)
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
            include: [
                {
                    model: User,
                    attributes: ['userName']
                },
                {
                    model: Comment,
                    include: [{
                        model: User,
                        attributes: ['userName']
                    }                      
                    ]
                }
            ]
        });
        const viewPost = postData.get({ plain: true})
        console.log(viewPost.comments[0].author)
        // res.status(200).json(viewPost)
        res.render('post', {
            viewPost,
            comments: viewPost.comments,
            loggedIn: req.session.loggedIn,
            username: req.session.username, 
        })


    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router;