'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserHeed = sequelize.define('UserHeed', {
    articleTitle: DataTypes.STRING
  }, {});
  UserHeed.associate = function(models) {
    // associations can be defined here
  };
  return UserHeed;
};