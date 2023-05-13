export default (sequelize, DataTypes) => {
    return sequelize.define(
        "admin",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
                collate: "utf8mb4_0900_ai_ci",
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: false,
                collate: "utf8mb4_0900_ai_ci",
            },
        },
        {
            tableName: "admin",
            engine: "InnoDB",
            charset: "utf8mb4",
            collate: "utf8mb4_0900_ai_ci",
            timestamps: false,
        }
    );
};
