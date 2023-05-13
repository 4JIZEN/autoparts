export default (sequelize, DataTypes) => {
    return sequelize.define(
        "claims",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            product_name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            order_no: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            message: {
                type: DataTypes.STRING(1000),
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            tableName: "claims",
            timestamps: false,
        }
    );
};
