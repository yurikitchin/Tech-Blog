const sequelize = require('../config/connection');
const User = require('../models/User')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const testUser = require('./users.json');
const testPost = require('./post.json');
const testComment = require('./comment.json')


const seedDatabase = async () => {
    await sequelize.sync({force: true})
    await User.bulkCreate(testUser, {
        individualHooks: true,
        returning: true
    })
    await Post.bulkCreate(testPost);
    await Comment.bulkCreate(testComment)

    process.exit(0)
}

seedDatabase()