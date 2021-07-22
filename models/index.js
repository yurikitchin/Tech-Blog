const User = require('./User');
const Post = require('./Post')
const Comment = require('./Comment')

module.exports = { User };

User.hasMany(Post, {foreignKey: "user_id"})

User.hasMany(Comment, {foreignKey: "user_id"})

Post.hasMany(Comment, {foreignKey: "podt_id"})

Post.belongsTo(User, {foreignKey: "user_id"})

Comment.belongsTo(User, {foreignKey: "user_id"})

Comment.belongsTo(Post, {foreignKey: "post_id"})