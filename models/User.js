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
                    msg: 'Please provide a value for First Name',
                },
                notNull: {
                    // custom error message
                    msg: 'First Name is required',
                }

            },

        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,


            validate: {
                notEmpty: {
                    // custom error message
                    msg: 'Please provide a value for Last Name',
                },
                notNull: {
                    // custom error message
                    msg: 'Last Name is required',
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
                    msg: 'Please provide a value for Email Address',
                },
                notNull: {
                    // custom error message
                    msg: 'Email Address is required',
                },
                // unique: {
                //     msg: 'Email Address is already in use!',
                // },
                isEmail: {
                    msg: 'Please provide a valid email address',
                }

            },

        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,


            validate: {
                notEmpty: {
                    // custom error message
                    msg: 'Please provide a value for Password',
                },
                notNull: {
                    // custom error message
                    msg: 'Password is required',
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