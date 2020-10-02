'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserHeed = sequelize.define('UserHeed', {
    url: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    content: DataTypes.TEXT,
    img: DataTypes.STRING,
    publishedAt: DataTypes.STRING,
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  UserHeed.associate = function (models) {
    // associations can be defined here
    UserHeed.belongsToMany(models.User, {
      through: models.UserMark,
      foreignKey: 'userHeedId',
      otherKey: 'userId'
    });
  };
  return UserHeed;
};
