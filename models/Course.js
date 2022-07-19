'use strict';
const { Model, DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  class Course extends Model { }
  Course.init({

    title: {
      type: DataTypes.STRING,
      allowNull: false,


      validate: {
        notEmpty: {
          // custom error message
          msg: 'Please provide a value for the Title',
        },
        notNull: {
          // custom error message
          msg: 'Title is required',
        }
      },


    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,


      validate: {
        notEmpty: {
          // custom error message
          msg: 'Please provide a value for the Description',
        },
        notNull: {
          // custom error message
          msg: 'Description is required',
        }
      },


    },
    estimatedTime: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    materialsNeeded: {
      type: DataTypes.STRING,
      allowNull: false,


    },

    userId: {
      type: DataTypes.STRING,
      allowNull: false,


    },

  }, { sequelize });

  Course.associate = (models) => {
    // one-to-one association.

    Course.belongsTo(models.User, { foreignKey: 'userId' });


  };

  return Course;
};