export default (sequelize, DataTypes) => {
    return sequelize.define(
        "order_prods",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            order_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "orders",
                    key: "id",
                },
            },
            prod_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "products",
                    key: "id",
                },
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
