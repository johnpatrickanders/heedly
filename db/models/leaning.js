'use strict';
module.exports = (sequelize, DataTypes) => {
  const Leaning = sequelize.define('Leaning', {
    userId: DataTypes.INTEGER,
    politicalAffiliation: DataTypes.STRING
  }, {});
  Leaning.associate = function (models) {
    // associations can be defined here
    Leaning.hasMany(models.User, { foreignKey: 'userId', otherKey: 'leaning' })
  };
  return Leaning;
};
