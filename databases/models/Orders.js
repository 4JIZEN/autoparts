export default (sequelize, DataTypes) => {
    return sequelize.define(
        "orders",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            payment: {
                type: DataTypes.STRING(50),
                collate: "utf8mb4_general_ci",
                allowNull: true,
            },
            payment_status: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            },
        },
        {
            tableName: "orders",
            engine: "InnoDB",
            charset: "utf8mb4",
            collate: "utf8mb4_0900_ai_ci",
            timestamps: false,
        }
    );
};
