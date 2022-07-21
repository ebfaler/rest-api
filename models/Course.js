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
          msg: 'Please provide a value for the title',
        },
        notNull: {
          // custom error message
          msg: 'title is required',
        }
      },


    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,


      validate: {
        notEmpty: {
          // custom error message
          msg: 'Please provide a value for the description',
        },
        notNull: {
          // custom error message
          msg: 'description is required',
        }
      },


    },
    estimatedTime: {
      type: DataTypes.STRING,
  
    },
    materialsNeeded: {
      type: DataTypes.STRING,
   
    }

  }, { sequelize });

  Course.associate = (models) => {
    // one-to-one association.

    Course.belongsTo(models.User, { foreignKey: {
      
      fieldName:'userId',
      allowNull: false
  }} ,
    );


  };

  return Course;
};