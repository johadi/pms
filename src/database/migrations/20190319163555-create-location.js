'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Locations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Location name can not be empty'
          }
        }
      },
      maleNo: {
        defaultValue: 0,
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Number of males can not be empty'
          }
        }
      },
      femaleNo: {
        defaultValue: 0,
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Number of females can not be empty'
          }
        }
      },
      parentLocationId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Locations',
          key: 'id',
          as: 'childLocation',
        },
        onDelete: 'set null',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Locations');
  }
};