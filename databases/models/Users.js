export default (sequelize, DataTypes) => {
    return sequelize.define(
        "users",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            firstname: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            lastname: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
            },
            phone: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING(1000),
                allowNull: true,
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: false,
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
            tableName: "users",
            engine: "InnoDB",
            charset: "utf8mb4",
            collate: "utf8mb4_0900_ai_ci",
            timestamps: false,
        }
    );
};
