const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          title: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          blog: {
              type: DataTypes.TEXT,
              allowNull: false,
          },
          user: {
              type: DataTypes.STRING,
              allowNull: false,
          },
          datePosted: {
              type: DataTypes.DATE,
              allowNull: false,
          },
          user_id: {
              type: DataTypes.INTEGER,
              allowNull: false,
          }
    },
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
    },
);

module.exports = Post