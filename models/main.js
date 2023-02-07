const Sequelize = require("sequelize");

module.exports = class Main extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                number: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    unique: true,
                },
                title: {
                    type: Sequelize.STRING(40),
                    allowNull: true,
                    unique: false,
                },
                contents: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                    unique: false,
                },
                writer: {
                    type: Sequelize.STRING(20),
                    alloNull: false,
                    unique: true,
                },
                views: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    unique: true,                    
                },
                comments: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    unique: true,
                },
                registration_date: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    unique: true,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: "Main",
                tableName: "Main",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }
    static associate(db) {
    }
};



