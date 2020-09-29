'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    hashedPassword: DataTypes.STRING,
    firstName: DataTypes.STRING,
    leaning: DataTypes.INTEGER
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.belongsTo(models.Leaning, { foreignKey: 'leaning', otherKey: 'userId' });
    User.belongsToMany(models.UserHeed, { through: models.UserMark, foreignKey: 'id', otherKey: 'userHeedId' });
  };
  return User;
};
