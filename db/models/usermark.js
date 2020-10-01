'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserMark = sequelize.define('UserMark', {
    userId: DataTypes.INTEGER,
    userHeedId: DataTypes.STRING
  }, {});
  UserMark.associate = function (models) {
    // associations can be defined here
  };
  return UserMark;
};
