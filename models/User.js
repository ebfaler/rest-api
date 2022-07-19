'use strict';


const { Model, DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    class User extends Model { }
    User.init({

        // id: {
        //     type: Sequelize.INTEGER,
        //     primaryKey: true,
        //     autoIncrement: true,
        // },

        firstName: {
            type: DataTypes.STRING,
            allowNull: false,

            validate: {
                notEmpty: {
                    // custom error message
                    msg: 'Please provide a value for firstName',
                },
                notNull: {
                    // custom error message
                    msg: 'firstName is required',
                }

            },

        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,


            validate: {
                notEmpty: {
                    // custom error message
                    msg: 'Please provide a value for lastName',
                },
                notNull: {
                    // custom error message
                    msg: 'lastName is required',
                }

            },


        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'The email you entered already exists'
            }, 
            validate: {
                notEmpty: {
                    // custom error message
                    msg: 'Please provide a value for emailAddress',
                },
                notNull: {
                    // custom error message
                    msg: 'emailAddress is required',
                },
                // unique: {
                //     msg: 'Email Address is already in use!',
                // },
                isEmail: {
                    msg: 'Please provide a valid emailAddress',
                }

            },

        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,


            validate: {
                notEmpty: {
                    // custom error message
                    msg: 'Please provide a value for password',
                },
                notNull: {
                    // custom error message
                    msg: 'password is required',
                }

            },


        },

    }, { sequelize });

    User.associate = (models) => {
        // one to many association.

        User.hasMany(models.Course, { foreignKey: 'userId' });


    };

    return User;
};