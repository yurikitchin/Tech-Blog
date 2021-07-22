const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          user: {
            type: DataTypes.STRING,
            allowNull: false,
        },
          Comment: {
              type: DataTypes.TEXT,
              allowNull: false,
          },
          datePosted: {
              type: DataTypes.DATE,
              allowNull: false,
          },
          post_id:{
              type: DataTypes.INTEGER,
              references: {
                  model: 'post',
                  key: 'id',
              }
          },
          user_id: {
              type: DataTypes.INTEGER,
              references: {
                  model: 'user',
                  key: 'id',
              }
          },
          
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
        },
);

module.exports = Comment