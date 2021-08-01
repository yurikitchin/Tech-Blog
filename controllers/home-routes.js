const { User } = require("../models");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const { format_date } = require("../utils/helpers");
const withAuth = require("../utils/auth");

const router = require("express").Router();

//=================== Homepage ======================
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["userName"],
        },
      ],
    });
    const renderPosts = postData.map((posts) => posts.get({ plain: true }));
    console.log(
      "GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
      renderPosts[0].datePosted
    );
    res.render("homepage", {
      renderPosts,
      loggedIn: req.session.loggedIn,
      username: req.session.username,
    });
  } catch (err) {
    console.error(err.message);
  }
});

//============================== Dashboard ==================================//
//view all posts by logged in user, add post, delete post
router.get("/dashboard", async (req, res) => {
  try {
    const dbPosts = await Post.findAll({
      where: { user_id: req.session.userId },
      include: [
        {
          model: User,
          attributes: ["userName"],
        },
      ],
    });
    const userPosts = dbPosts.map((posts) => posts.get({ plain: true }));
    req.session.save(() => {
      req.session.loggedIn = true;
      //   res.status(200).json(userPosts);
      res.render("dashboard", {
        userPosts,
        loggedIn: req.session.loggedIn,
        username: req.session.username,
        userId: req.session.userId,
      });
    });
  } catch (err) {
    console.console.error(err.message);
  }
});

//============================== add new post to dashboard ===========================//
router.post("/newpost", async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      blog: req.body.blog,
      user_id: req.session.userId,
    });
    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json(newPost);
    });
  } catch (err) {
    console.error(err.message);
  }
});

//================================ update post on dashboard ========================//
router.put("/updatepost", async (req, res) => {
  try {
    const postID = req.body.id
    const update = await Post.update(
      {
        title: req.body.title,
        blog: req.body.blog
      }, 
      {
      where: {
        id: postID
      }     
    })
    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json(update);
    });
  } catch (err) {
    console.error(err.message);
  }
})

//==========================delete post on dashboard ============================//
router.delete('/:id', async (req, res) => {
  try {
    const deletePost = await Post.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(deletePost)
  } catch(err) {
    res.status(500).json(err)
  }
})
//======================== View Single post and Comments ========================//
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["userName"],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["userName"],
            },
          ],
        },
      ],
    });
    const viewPost = postData.get({ plain: true });
    // res.status(200).json(viewPost)
    res.render("post", {
      viewPost,
      comments: viewPost.comments,
      loggedIn: req.session.loggedIn,
      username: req.session.username,
    });
  } catch (err) {
    console.error(err.message);
  }
});

//============================= Add Comment to Post ===========================//
router.post("/comment", async (req, res) => {
  try {
    const newComment = await Comment.create({
      Comment: req.body.Comment,
      post_id: req.body.post_id,
      user_id: req.session.userId,
      loggedIn: req.session.loggedIn,
    });
    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json(newComment);
    });
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
