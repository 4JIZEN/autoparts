export default (sequelize, DataTypes) => {
    return sequelize.define(
        "carts",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: "users",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            prod_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: "products",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            qty: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            underscored: true,
            freezeTableName: true,
        }
    );
};
