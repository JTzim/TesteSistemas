const { Sequelize, sequelize } = require('./database');

class User extends Sequelize.Model {}

User.init({
    id: {
        type: Sequelize.STRING(9),
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    role: {
        type: Sequelize.ENUM('admin', 'tester', 'programmer'),
        allowNull: false
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'created_at'
    },
    senha: {
        type: Sequelize.CHAR(10),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
});

module.exports = User;
