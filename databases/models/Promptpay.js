module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "Promptpay",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING(10),
                collate: "utf8mb4_general_ci",
                allowNull: true,
            },
        },
        {
            timestamps: false,
            tableName: "promptpay",
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
        }
    );
};
