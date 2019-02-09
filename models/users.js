'use strict';
module.exports = (sequelize, DataTypes) => {
	let jwt = require('jsonwebtoken');
    let randomString = require('randomstring');
	const users = sequelize.define('users', {
		username: {
            allowNull: {
                args: false,
                msg: 'Username address is required'
            },
            type: DataTypes.STRING,
            unique: {
                args: true,
                msg: 'Username address already in use!'
            }
        },
		email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail:true
            },
            unique: {
                args: true,
                msg: 'Email address already in use!'
            }
        },
		role: {
            type:   DataTypes.ENUM,
            defaultValue: 'user',
            values: ['user','x000']
        }
	}, {
        paranoid: true
    });
	users.associate = function(models) {
		// associations can be defined here
	};


    users.prototype.getJWT = function () {
        return jwt.sign({
            id: this.id,
			username: this.username,
			email: this.email,
            role: this.role
        }, process.env.JWT_SECRET);
    };
    users.prototype.resetPassword = function () {
        return randomString.generate(8);
    };
	return users;
};