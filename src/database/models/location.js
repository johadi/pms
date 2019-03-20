'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Location name can not be empty',
        },
      },
    },
    maleNo: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Number of males can not be empty',
        },
      },
    },
    femaleNo: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Number of females can not be empty',
        },
      },
    },
  }, {});
  Location.associate = function(models) {
    // associations can be defined here
    Location.hasMany(models.Location, { as: 'childLocation', foreignKey: 'parentLocationId' }, { onDelete: 'set null', hooks: true });
  };

  Location.createRules = () => ({
    name: 'required'
  });

  return Location;
};