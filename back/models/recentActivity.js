const { Sequelize, sequelize } = require('./database');

class RecentActivity extends Sequelize.Model {}

RecentActivity.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: Sequelize.CHAR(9),
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    action: {
        type: Sequelize.STRING(255)
    },
    time: {
        type: Sequelize.DATE,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('pending', 'passed', 'failed'),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'RecentActivity',
    tableName: 'recentActivity',
    timestamps: false
});

module.exports = RecentActivity;
