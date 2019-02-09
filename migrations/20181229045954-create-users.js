'use strict';
module.exports = {
  	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			username: {
				allowNull: false,
				type: Sequelize.STRING,
				unique: {
					args: true,
					msg: 'Email address already in use!'
				},
			},
			email: {
				validate: {
					unique: true,
					isEmail:true
				},
				isUnique: {
					args: true,
					msg: 'Email address already in use!'
				},
				allowNull: false,
				type: Sequelize.STRING(100)
			},
			role: {
				type:   Sequelize.ENUM,
            	values: ['user','x000']
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			deletedAt: {	
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('users');
	}
};